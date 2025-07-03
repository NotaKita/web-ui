import React from 'react';
import { CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { CalendarDays, Calendar } from "lucide-react";

interface InvoiceItem {
  description: string;
  unitCost: string;
  qty: number;
  price: string;
}

interface InvoiceCardProps {
  client: string;
  clientAddress: string;
  publisher: string;
  publisherDesc: string;
  invoiceDate: string;
  dueDate: string;
  status: string;
  balance: string;
  items: InvoiceItem[];
  subtotal: string;
  total: string;
}

export default function InvoiceCard({
  client,
  clientAddress,
  publisher,
  publisherDesc,
  invoiceDate,
  dueDate,
  status,
  balance,
  items,
  subtotal,
  total,
}: InvoiceCardProps) {
  return (
    <div className="backdrop-blur-[32px] bg-white/20 border border-white/80 shadow-2xl shadow-white/30 ring-1 ring-white/40 rounded-[2rem] w-full max-w-[1600px] p-0 flex flex-col overflow-hidden relative transition-all duration-300 ease-in-out before:content-[''] before:absolute before:inset-0 before:rounded-[2rem] before:pointer-events-none before:shadow-[inset_0_4px_64px_0_rgba(255,255,255,0.45)] mx-auto min-h-[400px]">
      <main className="flex-1 p-10">
        <CardHeader className="flex justify-between items-start mb-10">
          <div className="flex items-center space-x-2 text-gray-700">
            <CardTitle className="text-5xl font-semibold text-black">DSS</CardTitle>
            <CardDescription className="text-black text-base ml-2">Software Solution</CardDescription>
          </div>
          <div className="flex flex-col items-end text-gray-700">
            <CardTitle className='text-2xl font-semibold text-black text-right'>INVOICE</CardTitle>
            <div className='text-black text-base'>
              <div className="flex items-center justify-end space-x-1">
                <Calendar className='w-4 h-4'/>
                <span>Date of Invoice: {invoiceDate}</span>
              </div>
              <div className="flex items-center justify-end space-x-1">
                <CalendarDays className='w-4 h-4'/>
                <span>Due Date: {dueDate}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
          <div className="bg-white/40 backdrop-blur-xl p-6 rounded-xl shadow-md border border-white/30 text-left flex flex-col items-start">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">To:</h3>
            <p className="text-medium text-gray-600 ">{client}</p>
            <p className="text-medium text-gray-600">{clientAddress}</p>
          </div>
          <div className="bg-white/40 backdrop-blur-xl p-6 rounded-xl shadow-md border border-white/30 text-left flex flex-col items-start">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">From :</h3>
            <p className="text-medium text-gray-600 ">{publisher}</p>
            <p className="text-medium text-gray-600">{publisherDesc}</p>
          </div>
        </div>
        <div className="bg-red-100 backdrop-blur-xl p-4 rounded-xl shadow-md border border-red-400 flex items-center space-x-4 mb-6 w-full">
          <p className='text-[20px] text-black'>Status :</p>
          <div className='bg-red-200 backdrop-blur-xl p-4 rounded-xl shadow-md border border-red-400 flex items-center space-x-4'>
            <p className='text-[20px] text-red-600'>{status}</p>
          </div>
          <p className='ml-auto text-[20px]'>Balance :</p>
          <div className='items-end'>
            <p className='text-red-600 text-[20px]'>{balance}</p>
          </div>
        </div>
        <div className="bg-white/40 backdrop-blur-xl p-4 rounded-xl shadow-md border border-white/30 w-full h-full flex flex-col">
          <table className="w-full table-fixed divide-y divide-gray-200 mb-4">
            <thead>
              <tr>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Cost</th>
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              </tr>
            </thead>
            <tbody className="bg-white/30 divide-y divide-gray-200">
              {items.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/10">
                  <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">{item.description}</td>
                  <td className="px-2 py-2 whitespace-nowrap text-sm text-center text-gray-700">{item.unitCost}</td>
                  <td className="px-2 py-2 whitespace-nowrap text-sm text-center text-gray-700">{item.qty}</td>
                  <td className="px-2 py-2 whitespace-nowrap text-sm text-right text-gray-700">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-col items-end w-full">
            <div className="flex space-x-4 mb-2">
              <span className="font-semibold text-gray-700">Subtotal:</span>
              <span className="text-gray-700">{subtotal}</span>
            </div>
            <div className="flex space-x-4">
              <span className="font-semibold text-black">Total:</span>
              <span className="text-black">{total}</span>
            </div>
          </div>
          <div className="bg-white/40 backdrop-blur-xl p-4 rounded-xl shadow-md border-t border-white/30 w-full text-gray-700 pt-6 mt-4">
            <p>
              <span className="font-semibold">Payment Terms:</span> Payment is due within 6 days of invoice date. Late payments may incur additional charges. Please contact us for any payment inquiries.
            </p>
          </div>
        </div>
        <div>
          <h2 className='text-center text-ml text-black mt-5 font-semibold'>Thank you For Choosing NotaKita for your Development Service.</h2>
        </div>
      </main>
    </div>
  );
} 