import React, { useState } from 'react'
import { Pencil, Trash2, Eye, Search, Settings2, Funnel, ExternalLink } from "lucide-react";
import { CalendarDropDown } from '@/components/calendarDropDown';
import InvoiceTemplate from '@/components/InvoiceTemplate';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface InvoiceItem {
  description: string;
  unitCost: number;
  qty: number;
  price: number;
}

interface InvoiceData {
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

const unpaidInvoices: InvoiceData[] = [
  {
    invoiceNumber: "000001",
    date: "6/12/2025",
    dueDate: "12/12/2025",
    client: "Toko Emas Sabar Jaya 2",
    clientAddress: "Pasar Tumpang, Kabupaten Malang, Jawa Timur, Indonesia",
    publisher: "Rofiq - DSS Staff",
    publisherDesc: "Software Development Services, System Integration & Consulting",
    total: 1900000,
    status: "Unpaid",
    balance: 1900000,
    items: [
      {
        description: "Daily report on dashboard and dedicated page for details with grocery list of daily report and transaction",
        unitCost: 600000,
        qty: 1,
        price: 600000,
      },
      {
        description: "Gold weight conversion for each grocery category (24k) on dashboard and category page",
        unitCost: 200000,
        qty: 1,
        price: 200000,
      },
      {
        description: "Minimum purchase price for each different grocery category on penjualan page",
        unitCost: 700000,
        qty: 1,
        price: 700000,
      },
      {
        description: "Ringkasan laporan bulanan on dashboard",
        unitCost: 200000,
        qty: 1,
        price: 200000,
      },
      {
        description: "Filter Barang Terjual, belum terjual, lebur on Barang Masuk page",
        unitCost: 200000,
        qty: 1,
        price: 200000,
      },
    ],
    subtotal: 1900000,
  },
  {
    invoiceNumber: "000002",
    date: "8/12/2025",
    dueDate: "14/12/2025",
    client: "PT. Maju Jaya",
    clientAddress: "Jl. Sudirman No. 45, Surabaya, Jawa Timur, Indonesia",
    publisher: "Ahmad - DSS Staff",
    publisherDesc: "Software Development Services, System Integration & Consulting",
    total: 1500000,
    status: "Unpaid",
    balance: 1500000,
    items: [
      {
        description: "E-commerce website development with payment gateway integration",
        unitCost: 800000,
        qty: 1,
        price: 800000,
      },
      {
        description: "Mobile app development for Android and iOS",
        unitCost: 700000,
        qty: 1,
        price: 700000,
      },
    ],
    subtotal: 1500000,
  },
  {
    invoiceNumber: "000003",
    date: "10/12/2025",
    dueDate: "16/12/2025",
    client: "CV. Berkah Teknologi",
    clientAddress: "Jl. Gatot Subroto No. 123, Bandung, Jawa Barat, Indonesia",
    publisher: "Sari - DSS Staff",
    publisherDesc: "Software Development Services, System Integration & Consulting",
    total: 2200000,
    status: "Unpaid",
    balance: 2200000,
    items: [
      {
        description: "Enterprise resource planning system development",
        unitCost: 1200000,
        qty: 1,
        price: 1200000,
      },
      {
        description: "Database optimization and performance tuning",
        unitCost: 500000,
        qty: 1,
        price: 500000,
      },
      {
        description: "Staff training and documentation",
        unitCost: 500000,
        qty: 1,
        price: 500000,
      },
    ],
    subtotal: 2200000,
  },
];

export default function UnpaidInvoice() {
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleView = (invoice: InvoiceData) => {
    setSelectedInvoice(invoice);
    setDialogOpen(true);
  };

  return (
    <div className="my-8 backdrop-blur-[32px] bg-white/20 border border-white/80 shadow-2xl shadow-white/30 ring-1 ring-white/40 rounded-[2rem] w-full max-w-[1600px] p-0 flex flex-col overflow-hidden relative transition-all duration-300 ease-in-out ml-0 before:content-[''] before:absolute before:inset-0 before:rounded-[2rem] before:pointer-events-none before:shadow-[inset_0_4px_64px_0_rgba(255,255,255,0.45)] mx-auto min-h-[400px]">
      <main className="flex-1 p-4 sm:p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Unpaid Invoices</h1>
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
              {unpaidInvoices.map((inv, idx) => (
                <tr key={idx} className="hover:bg-white/10">
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
              ))}
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
  )
}
