import React, { useState, useEffect } from 'react'
import { Pencil, Trash2, Eye, Search, Settings2, Funnel, ExternalLink, Plus } from "lucide-react";
import { CalendarDropDown } from '@/components/calendarDropDown';
import InvoiceTemplate from '@/components/InvoiceTemplate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { invoiceAPI, companyAPI } from '@/lib/api';

interface Company {
  id: string;
  name: string;
}

interface InvoiceItem {
  description: string;
  unitCost: number;
  qty: number;
  price: number;
}

interface InvoiceData {
  id?: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  client: string;
  clientAddress: string;
  publisher: string;
  publisherDesc: string;
  total: number;
  status: string;
  balance: number;
  items: InvoiceItem[];
  subtotal: number;
}

export default function UnpaidInvoice() {
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    company_id: '',
    invoiceNumber: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    client: '',
    clientAddress: '',
    publisher: '',
    publisherDesc: '',
    status: 'Unpaid',
    items: [{ description: '', unitCost: 0, qty: 1, price: 0 }],
  });

  useEffect(() => {
    fetchCompanies();
    fetchInvoices();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await companyAPI.list();
      if (response.success && Array.isArray(response.data)) {
        setCompanies(response.data);
        if (response.data.length > 0) {
          setFormData(prev => ({ ...prev, company_id: response.data[0].id }));
        }
      }
    } catch (err: any) {
      console.error('Failed to fetch companies:', err);
    }
  };

  const fetchInvoices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await invoiceAPI.list();
      if (response.success && Array.isArray(response.data)) {
        // Transform backend data to match InvoiceData structure
        const transformedInvoices = response.data
          .filter((inv: any) => inv.status.toLowerCase() === 'unpaid')
          .map((inv: any) => ({
            id: inv.id,
            invoiceNumber: inv.invoice_number,
            date: new Date(inv.created_at * 1000).toISOString().split('T')[0],
            dueDate: new Date(inv.created_at * 1000).toISOString().split('T')[0],
            client: 'Client Name',
            clientAddress: 'Client Address',
            publisher: 'Publisher',
            publisherDesc: 'Service Description',
            total: inv.amount,
            status: inv.status,
            balance: inv.amount,
            items: [
              {
                description: `Invoice ${inv.invoice_number}`,
                unitCost: inv.amount,
                qty: 1,
                price: inv.amount,
              }
            ],
            subtotal: inv.amount,
          }));
        setInvoices(transformedInvoices);
      } else {
        setError(response.message || 'Failed to fetch invoices');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const newItems = [...formData.items];
    newItems[index] = {
      ...newItems[index],
      [field]: field === 'description' ? value : Number(value)
    };
    
    // Calculate price
    if (field === 'unitCost' || field === 'qty') {
      newItems[index].price = newItems[index].unitCost * newItems[index].qty;
    }
    
    setFormData(prev => ({
      ...prev,
      items: newItems
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', unitCost: 0, qty: 1, price: 0 }]
    }));
  };

  const removeItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => sum + item.price, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    setError(null);

    try {
      if (!formData.company_id) {
        setError('Please select a company');
        setIsCreating(false);
        return;
      }

      const total = calculateTotal();
      const response = await invoiceAPI.create({
        company_id: formData.company_id,
        invoice_number: formData.invoiceNumber,
        amount: total,
        status: formData.status,
      });

      if (response.success) {
        // Refresh invoices list
        await fetchInvoices();
        setCreateOpen(false);
        // Reset form
        setFormData({
          company_id: companies.length > 0 ? companies[0].id : '',
          invoiceNumber: '',
          date: new Date().toISOString().split('T')[0],
          dueDate: '',
          client: '',
          clientAddress: '',
          publisher: '',
          publisherDesc: '',
          status: 'Unpaid',
          items: [{ description: '', unitCost: 0, qty: 1, price: 0 }],
        });
      } else {
        setError(response.message || 'Failed to create invoice');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
    } finally {
      setIsCreating(false);
    }
  };

  const handleView = (invoice: InvoiceData) => {
    setSelectedInvoice(invoice);
    setDialogOpen(true);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="my-8 backdrop-blur-[32px] bg-white/20 border border-white/80 shadow-2xl shadow-white/30 ring-1 ring-white/40 rounded-[2rem] w-full max-w-[1600px] p-0 flex flex-col overflow-hidden relative transition-all duration-300 ease-in-out ml-0 before:content-[''] before:absolute before:inset-0 before:rounded-[2rem] before:pointer-events-none before:shadow-[inset_0_4px_64px_0_rgba(255,255,255,0.45)] mx-auto min-h-[400px]">
      <main className="flex-1 p-4 sm:p-6 md:p-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Unpaid Invoices</h1>
          <Button 
            onClick={() => setCreateOpen(true)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Plus className="w-4 h-4" />
            Create Invoice
          </Button>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

        {/* Search and Calendar Filter */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-2 md:space-y-0 md:space-x-4 mb-6 w-full">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for Invoice Number, Client, etc."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="w-full md:w-auto">
            <CalendarDropDown />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white/40 backdrop-blur-xl border border-white/30 rounded-lg shadow-md text-gray-700 hover:bg-white/60 transition-colors cursor-pointer">
            <Funnel className="w-4 h-4" />
          </button>
          <button className="flex items-center space-x-2 px-4 py-2  bg-white/40 backdrop-blur-xl border border-white/30 rounded-lg shadow-md text-gray-700 hover:bg-white/60 transition-colors w-full md:w-auto cursor-pointer">
            <Settings2 className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-white/40 backdrop-blur-xl p-4 sm:p-8 rounded-xl shadow-md border border-white/30 w-full mb-8">
          <table className="w-full table-fixed divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Number</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Publisher at</th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">TOTAL</th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white/30 divide-y divide-gray-200">
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-4 text-center text-gray-500">No unpaid invoices found</td>
                </tr>
              ) : (
                invoices.map((inv, idx) => (
                  <tr key={inv.id || idx} className="hover:bg-white/10">
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{inv.invoiceNumber}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{inv.date}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{inv.dueDate}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{inv.client}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{inv.publisher}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-purple-700 font-semibold text-center">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(inv.total)}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-center">
                      <button className="inline-flex items-center justify-center p-1 rounded hover:bg-purple-100 mr-1" title="Edit"><Pencil className="w-4 h-4 text-purple-600" /></button>
                      <button className="inline-flex items-center justify-center p-1 rounded hover:bg-red-100 mr-1" title="Delete"><Trash2 className="w-4 h-4 text-red-600" /></button>
                      <button className="inline-flex items-center justify-center p-1 rounded hover:bg-blue-100 mr-1" title="View" onClick={() => handleView(inv)}><Eye className="w-4 h-4 text-blue-600" /></button>
                      <a href={`/invoice/${inv.invoiceNumber}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center p-1 rounded hover:bg-green-100" title="Open in New Tab"><ExternalLink className="w-4 h-4 text-green-600" /></a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Dialog for Invoice Details */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0">
            <DialogHeader className="px-6 py-4 border-b">
              <DialogTitle>Invoice Details - {selectedInvoice?.invoiceNumber}</DialogTitle>
            </DialogHeader>
            <div className="overflow-auto max-h-[80vh] p-6">
              {selectedInvoice && (
                <InvoiceTemplate
                  invoiceNumber={selectedInvoice.invoiceNumber}
                  date={selectedInvoice.date}
                  dueDate={selectedInvoice.dueDate}
                  client={selectedInvoice.client}
                  clientAddress={selectedInvoice.clientAddress}
                  publisher={selectedInvoice.publisher}
                  publisherDesc={selectedInvoice.publisherDesc}
                  total={selectedInvoice.total}
                  status={selectedInvoice.status}
                  balance={selectedInvoice.balance}
                  items={selectedInvoice.items}
                  subtotal={selectedInvoice.subtotal}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Create Invoice Dialog */}
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Company *</label>
                <select
                  name="company_id"
                  value={formData.company_id}
                  onChange={handleFormChange}
                  required
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a company</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>{company.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Invoice Number *</label>
                  <input
                    type="text"
                    name="invoiceNumber"
                    value={formData.invoiceNumber}
                    onChange={handleFormChange}
                    placeholder="e.g., INV-001"
                    required
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleFormChange}
                    required
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Due Date *</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleFormChange}
                    required
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Status *</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleFormChange}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Unpaid">Unpaid</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Client Name *</label>
                  <input
                    type="text"
                    name="client"
                    value={formData.client}
                    onChange={handleFormChange}
                    placeholder="Client name"
                    required
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Publisher/Company *</label>
                  <input
                    type="text"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleFormChange}
                    placeholder="Your company name"
                    required
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Client Address</label>
                <textarea
                  name="clientAddress"
                  value={formData.clientAddress}
                  onChange={handleFormChange}
                  placeholder="Client address"
                  rows={2}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Service Description</label>
                <textarea
                  name="publisherDesc"
                  value={formData.publisherDesc}
                  onChange={handleFormChange}
                  placeholder="Service description"
                  rows={2}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Invoice Items */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Invoice Items</h3>
                {formData.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-5 gap-2 mb-3 pb-3 border-b">
                    <input
                      type="text"
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Unit Cost"
                      value={item.unitCost || ''}
                      onChange={(e) => handleItemChange(index, 'unitCost', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Qty"
                      value={item.qty}
                      onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={item.price}
                      disabled
                      className="px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addItem}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 text-sm"
                >
                  Add Item
                </button>
              </div>

              {/* Total */}
              <div className="bg-gray-100 p-4 rounded">
                <div className="text-right">
                  <p className="text-lg font-semibold">Total: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(calculateTotal())}</p>
                </div>
              </div>

              {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

              <div className="flex gap-2">
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? 'Creating...' : 'Create Invoice'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setCreateOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
