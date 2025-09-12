"use client"

import { Calendar, FileText, Download } from "lucide-react"
import html2pdf from "html2pdf.js"

interface InvoiceItem {
  description: string;
  unitCost: number;
  qty: number;
  price: number;
}

interface InvoiceTemplateProps {
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

export default function InvoiceTemplate({
  invoiceNumber,
  date,
  dueDate,
  client,
  clientAddress,
  publisher,
  publisherDesc,
  total,
  status,
  balance,
  items,
  subtotal,
}: InvoiceTemplateProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const downloadPDF = () => {
    const element = document.getElementById("invoice-content")
    const opt = {
      margin: 0.5,
      filename: `SUDS-Invoice-${invoiceNumber}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    }

    // @ts-ignore
    html2pdf().set(opt).from(element).save()
  }

  return (
    <div id="invoice-content" className="max-w-4xl mx-auto p-8 bg-white">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-light text-slate-800 tracking-wide">SUDS</span>
          <span className="text-sm text-slate-500 font-light">Software Solutions</span>
        </div>
        <div className="text-right">
          <h1 className="text-xl font-bold text-gray-800 mb-2">Invoice {invoiceNumber}</h1>
          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex items-center justify-end space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Date of Invoice: {date}</span>
            </div>
            <div className="flex items-center justify-end space-x-2">
              <FileText className="w-4 h-4" />
              <span>Due Date: {dueDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={downloadPDF}
          className="inline-flex items-center px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors duration-200 font-medium text-sm"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </button>
      </div>

      {/* Invoice Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* To */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">To:</h3>
          <div className="text-gray-600 space-y-1">
            <p className="font-medium">{client}</p>
            <p>{clientAddress}</p>
          </div>
        </div>

        {/* From */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">From:</h3>
          <div className="text-gray-600 space-y-1">
            <p className="font-medium">{publisher}</p>
            <p>{publisherDesc}</p>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className={`flex justify-between items-center mb-6 p-4 rounded-lg border ${status === "Unpaid"
          ? "bg-red-50 border-red-200"
          : "bg-green-50 border-green-200"
        }`}>
        <div>
          <span className="text-sm font-medium text-gray-600">Status: </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${status === "Unpaid"
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
            }`}>
            {status}
          </span>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-600">Balance: </span>
          <span className={`text-lg font-bold ${status === "Unpaid" ? "text-red-600" : "text-green-600"
            }`}>
            {formatCurrency(balance)}
          </span>
        </div>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">Description</th>
              <th className="border border-gray-300 px-4 py-3 text-right font-semibold text-gray-800">Unit Cost</th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-800">Qty</th>
              <th className="border border-gray-300 px-4 py-3 text-right font-semibold text-gray-800">Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 text-gray-700">{item.description}</td>
                <td className="border border-gray-300 px-4 py-3 text-right text-gray-700">
                  {formatCurrency(item.unitCost)}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center text-gray-700">{item.qty}</td>
                <td className="border border-gray-300 px-4 py-3 text-right font-medium text-gray-800">
                  {formatCurrency(item.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-full max-w-sm space-y-2">
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between py-3 border-t-2 border-gray-800">
            <span className="text-lg font-bold text-gray-800">Total:</span>
            <span className="text-lg font-bold text-gray-800">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 pt-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Payment Terms:</strong> Payment is due within 6 days of invoice date. Late payments may incur
            additional charges. Please contact us for any payment inquiries.
          </p>
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Thank you for choosing SUDS for your software development needs!</p>
        </div>
      </div>
    </div>
  )
}
