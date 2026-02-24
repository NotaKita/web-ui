import React, { useState, useEffect } from 'react';
import { Eye, Search, Funnel, Settings2, ExternalLink, Plus } from "lucide-react";
import InvoiceTemplate from '@/components/InvoiceTemplate';
import { CalendarDropDown } from '@/components/calendarDropDown';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { invoiceAPI } from '@/lib/api';

interface PaidInvoiceItem {
  description: string;
  unitCost: number;
  qty: number;
  price: number;
}

interface PaidInvoiceData {
  id?: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  client: string;
  publisher: string;
  total: number;
  items: PaidInvoiceItem[];
  clientAddress: string;
  publisherDesc: string;
  status: string;
  balance: number;
  subtotal: number;
}

export default function PaidInvoice() {
  const [invoices, setInvoices] = useState<PaidInvoiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<PaidInvoiceData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await invoiceAPI.list();
      if (response.success && Array.isArray(response.data)) {
        // Transform backend data to match PaidInvoiceData structure
        const transformedInvoices = response.data
          .filter((inv: any) => inv.status.toLowerCase() === 'paid')
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
            balance: 0,
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

  const handleView = (invoice: PaidInvoiceData) => {
    setSelectedInvoice(invoice);
    setDialogOpen(true);
  };

  // Filter invoices by search
  const filteredInvoices = invoices.filter(inv =>
    inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
    inv.client.toLowerCase().includes(search.toLowerCase()) ||
    inv.publisher.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="my-8 backdrop-blur-[32px] bg-white/20 border border-white/80 shadow-2xl shadow-white/30 ring-1 ring-white/40 rounded-[2rem] w-full max-w-[1600px] p-0 flex flex-col overflow-hidden relative transition-all duration-300 ease-in-out ml-0 before:content-[''] before:absolute before:inset-0 before:rounded-[2rem] before:pointer-events-none before:shadow-[inset_0_4px_64px_0_rgba(255,255,255,0.45)] mx-auto min-h-[400px]">
      <main className="flex-1 p-4 sm:p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Paid Invoices</h1>
        {/* Search and Calendar Filter */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-2 md:space-y-0 md:space-x-4 mb-6 w-full">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for Invoice Number, Client, etc."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={search}
              onChange={e => setSearch(e.target.value)}
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
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Publisher at</th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white/30 divide-y divide-gray-200">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-4 text-center text-gray-500">No paid invoices found</td>
                </tr>
              ) : (
                filteredInvoices.map((inv, idx) => (
                  <tr key={inv.id || idx} className="hover:bg-white/10">
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{inv.invoiceNumber}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{inv.date}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{inv.client}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{inv.publisher}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-purple-700 font-semibold text-center">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(inv.total)}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-center">
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
      </main>
    </div>
  );
}
