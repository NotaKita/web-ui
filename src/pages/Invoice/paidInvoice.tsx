import React, { useState } from 'react';
import { Eye, Search, Funnel, Settings2, ExternalLink } from "lucide-react";
import InvoiceTemplate from '@/components/InvoiceTemplate';
import { CalendarDropDown } from '@/components/calendarDropDown';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PaidInvoiceItem {
  description: string;
  unitCost: number;
  qty: number;
  price: number;
}

interface PaidInvoiceData {
  invoiceNumber: string;
  date: string;
  paymentDate: string;
  client: string;
  publisher: string;
  amountPaid: number;
  total: number;
  items: PaidInvoiceItem[];
  clientAddress: string;
  publisherDesc: string;
  status: string;
  balance: number;
  subtotal: number;
}

const paidInvoices: PaidInvoiceData[] = [
  {
    invoiceNumber: "000101",
    date: "5/10/2025",
    paymentDate: "15/10/2025",
    client: "Toko Emas Berkah Makmur",
    publisher: "Rofiq - SUDS Staff",
    amountPaid: 1500000,
    total: 1500000,
    items: [
      {
        description: "POS system development with inventory management",
        unitCost: 800000,
        qty: 1,
        price: 800000,
      },
      {
        description: "Customer management system integration",
        unitCost: 400000,
        qty: 1,
        price: 400000,
      },
      {
        description: "Staff training and system documentation",
        unitCost: 300000,
        qty: 1,
        price: 300000,
      },
    ],
    clientAddress: "Pasar Besar, Kota Malang, Jawa Timur, Indonesia",
    publisherDesc: "Software Development Services, System Integration & Consulting",
    status: "Paid",
    balance: 0,
    subtotal: 1500000,
  },
  {
    invoiceNumber: "000102",
    date: "12/10/2025",
    paymentDate: "18/10/2025",
    client: "CV. Teknologi Maju",
    publisher: "Ahmad - SUDS Staff",
    amountPaid: 2000000,
    total: 2000000,
    items: [
      {
        description: "Web application development with user authentication",
        unitCost: 1200000,
        qty: 1,
        price: 1200000,
      },
      {
        description: "Database design and optimization",
        unitCost: 500000,
        qty: 1,
        price: 500000,
      },
      {
        description: "API development and testing",
        unitCost: 300000,
        qty: 1,
        price: 300000,
      },
    ],
    clientAddress: "Jl. Soekarno Hatta No. 88, Surabaya, Jawa Timur, Indonesia",
    publisherDesc: "Software Development Services, System Integration & Consulting",
    status: "Paid",
    balance: 0,
    subtotal: 2000000,
  },
  {
    invoiceNumber: "000103",
    date: "20/10/2025",
    paymentDate: "25/10/2025",
    client: "PT. Digital Solusi",
    publisher: "Sari - SUDS Staff",
    amountPaid: 1750000,
    total: 1750000,
    items: [
      {
        description: "Mobile app development for delivery service",
        unitCost: 1000000,
        qty: 1,
        price: 1000000,
      },
      {
        description: "Admin dashboard development",
        unitCost: 500000,
        qty: 1,
        price: 500000,
      },
      {
        description: "Real-time tracking system implementation",
        unitCost: 250000,
        qty: 1,
        price: 250000,
      },
    ],
    clientAddress: "Jl. Gatot Subroto No. 234, Bandung, Jawa Barat, Indonesia",
    publisherDesc: "Software Development Services, System Integration & Consulting",
    status: "Paid",
    balance: 0,
    subtotal: 1750000,
  },
];

export default function PaidInvoice() {
  const [selectedInvoice, setSelectedInvoice] = useState<PaidInvoiceData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleView = (invoice: PaidInvoiceData) => {
    setSelectedInvoice(invoice);
    setDialogOpen(true);
  };

  // Filter invoices by search
  const filteredInvoices = paidInvoices.filter(inv =>
    inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
    inv.client.toLowerCase().includes(search.toLowerCase()) ||
    inv.publisher.toLowerCase().includes(search.toLowerCase())
  );

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
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Publisher at</th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Paid</th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white/30 divide-y divide-gray-200">
              {filteredInvoices.map((inv, idx) => (
                <tr key={idx} className="hover:bg-white/10">
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{inv.invoiceNumber}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{inv.date}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{inv.paymentDate}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{inv.client}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{inv.publisher}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-green-700 font-semibold text-center">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(inv.amountPaid)}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-purple-700 font-semibold text-center">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(inv.total)}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-center">
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
                  dueDate={selectedInvoice.paymentDate}
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
