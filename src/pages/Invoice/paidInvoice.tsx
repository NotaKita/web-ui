import React, { useState } from 'react';
import { Eye, X, Search, Funnel, Settings2, Download } from "lucide-react";
import InvoiceCard from '@/components/InvoiceCard';
import { CalendarDropDown } from '@/components/calendarDropDown';

interface PaidInvoiceItem {
  description: string;
  unitCost: string;
  qty: number;
  price: string;
}

interface PaidInvoiceData {
  invoiceNumber: string;
  date: string;
  paymentDate: string;
  client: string;
  publisher: string;
  amountPaid: string;
  total: string;
  items: PaidInvoiceItem[];
  clientAddress: string;
  publisherDesc: string;
  status: string;
  balance: string;
  subtotal: string;
}

const paidInvoices: PaidInvoiceData[] = [
  {
    invoiceNumber: "INV-2024-010",
    date: "2024-05-10",
    paymentDate: "2024-05-15",
    client: "Telkom Indonesia",
    publisher: "DGM Group",
    amountPaid: "Rp 15.000.000",
    total: "Rp 15.000.000",
    items: [
      { description: "Jasa Internet", unitCost: "Rp 10.000.000", qty: 1, price: "Rp 10.000.000" },
      { description: "Maintenance", unitCost: "Rp 5.000.000", qty: 1, price: "Rp 5.000.000" },
    ],
    clientAddress: "Jl. Gatot Subroto No. 1, Jakarta",
    publisherDesc: "IT Solution Provider",
    status: "Paid",
    balance: "Rp 0",
    subtotal: "Rp 15.000.000",
  },
  {
    invoiceNumber: "INV-2024-011",
    date: "2024-05-12",
    paymentDate: "2024-05-18",
    client: "Bank Mandiri",
    publisher: "MegaCorp",
    amountPaid: "Rp 20.000.000",
    total: "Rp 20.000.000",
    items: [
      { description: "Software License", unitCost: "Rp 20.000.000", qty: 1, price: "Rp 20.000.000" },
    ],
    clientAddress: "Jl. Jend. Sudirman No. 2, Jakarta",
    publisherDesc: "Finance",
    status: "Paid",
    balance: "Rp 0",
    subtotal: "Rp 20.000.000",
  },
  {
    invoiceNumber: "INV-2024-012",
    date: "2024-05-20",
    paymentDate: "2024-05-25",
    client: "Gojek",
    publisher: "LogiTech",
    amountPaid: "Rp 17.500.000",
    total: "Rp 17.500.000",
    items: [
      { description: "Cloud Service", unitCost: "Rp 10.000.000", qty: 1, price: "Rp 10.000.000" },
      { description: "Integration", unitCost: "Rp 7.500.000", qty: 1, price: "Rp 7.500.000" },
    ],
    clientAddress: "Jl. Kemang Raya No. 3, Jakarta",
    publisherDesc: "Transportasi",
    status: "Paid",
    balance: "Rp 0",
    subtotal: "Rp 17.500.000",
  },
];

export default function PaidInvoice() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<PaidInvoiceData | null>(null);
  const [search, setSearch] = useState("");

  const handleView = (invoice: PaidInvoiceData) => {
    setSelectedInvoice(invoice);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedInvoice(null);
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
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/40 backdrop-blur-xl border border-white/30 rounded-lg shadow-md text-gray-700 hover:bg-white/60 transition-colors w-full md:w-auto cursor-pointer">
              <Download className="w-4 h-4" />
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
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-green-700 font-semibold text-center">{inv.amountPaid}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-purple-700 font-semibold text-center">{inv.total}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-center">
                    <button className="inline-flex items-center justify-center p-1 rounded hover:bg-blue-100" title="View" onClick={() => handleView(inv)}><Eye className="w-4 h-4 text-blue-600"/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Modal Pop Up */}
        {modalOpen && selectedInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="relative max-w-full w-[95vw] max-h-[95vh] flex items-center justify-center">
              <button
                onClick={handleClose}
                className="absolute -top-4 -right-4 bg-white/80 rounded-full p-2 shadow hover:bg-white z-10"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
              <div className="overflow-auto max-h-[90vh] p-2">
                <InvoiceCard
                  client={selectedInvoice.client}
                  clientAddress={selectedInvoice.clientAddress}
                  publisher={selectedInvoice.publisher}
                  publisherDesc={selectedInvoice.publisherDesc}
                  invoiceDate={selectedInvoice.date}
                  dueDate={selectedInvoice.paymentDate}
                  status={selectedInvoice.status}
                  balance={selectedInvoice.balance}
                  items={selectedInvoice.items}
                  subtotal={selectedInvoice.subtotal}
                  total={selectedInvoice.total}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}