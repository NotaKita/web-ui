import { Calendar, FileText } from "lucide-react"

const InvoiceDetail = () => {

  const invoiceItems = [
    {
      description: "Sales note menu that records all tables from every sales agent, covering credit notes (bon), payments, and CT.",
      unitCost: 600000,
      qty: 1,
      price: 600000,
    },
    {
      description: "Sales note accumulation report that consolidates the reports of all sales agents into a single centralized report.",
      unitCost: 200000,
      qty: 1,
      price: 200000,
    },
  ]

  const subtotal = invoiceItems.reduce((sum, item) => sum + item.price, 0)
  const total = subtotal

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div id="invoice-content" className="max-w-4xl mx-auto p-8 bg-white">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex flex-col">
          <span className="text-2xl text-slate-800 tracking-wide font-medium">DSS</span>
          <span className="text-md text-slate-500 font-light">Software Solutions</span>
        </div>
        <div className="text-right">
          <h1 className="text-md font-bold text-gray-800 mb-2">INV-20260819-0013J8R5</h1>
          <div className="text-xs text-gray-600 space-y-1">
            <div className="flex items-center justify-end space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Date of Invoice: 19/08/2026</span>
            </div>
            <div className="flex items-center justify-end space-x-2">
              <FileText className="w-4 h-4" />
              <span>Due Date: 26/08/2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* To */}
        <div>
          <h3 className="text-md font-semibold text-gray-800 mb-3">To:</h3>
          <div className="text-gray-600 space-y-1 text-xs">
            <p className="font-medium">Toko Emas Sabar Jaya 2</p>
            <p>Pasar Tumpang</p>
            <p>Kabupaten Malang, Jawa Timur</p>
            <p>Indonesia</p>
          </div>
        </div>

        {/* From */}
        <div>
          <h3 className="text-md font-semibold text-gray-800 mb-3">From:</h3>
          <div className="text-gray-600 space-y-1 text-xs">
            <p className="font-medium">Rofiq - DSS Staff</p>
            <p>Software Development Services</p>
            <p>System Integration & Consulting</p>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="flex justify-between items-center mb-6 p-3 bg-red-50 rounded-lg border border-red-200">
        <div>
          <span className="text-xs font-medium text-gray-600">Status: </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-red-800">
            Unpaid
          </span>
        </div>
        <div>
          <span className="text-xs font-medium text-gray-600">Balance: </span>
          <span className="text-md font-bold text-red-600">{formatCurrency(total)}</span>
        </div>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-xs ">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-150 px-4 py-3 text-left font-semibold text-gray-800">Description</th>
              <th className="border border-gray-150 px-4 py-3 text-right font-semibold text-gray-800">Unit Cost</th>
              <th className="border border-gray-150 px-4 py-3 text-center font-semibold text-gray-800">Qty</th>
              <th className="border border-gray-150 px-4 py-3 text-right font-semibold text-gray-800">Price</th>
            </tr>
          </thead>
          <tbody>
            {invoiceItems.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 text-xs">
                <td className="border border-gray-150 px-4 py-3 text-gray-700">{item.description}</td>
                <td className="border border-gray-150 px-4 py-3 text-right text-gray-700">
                  {formatCurrency(item.unitCost)}
                </td>
                <td className="border border-gray-150 px-4 py-3 text-center text-gray-700">{item.qty}</td>
                <td className="border border-gray-150 px-4 py-3 text-right font-medium text-gray-800">
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
          <div className="flex justify-between py-2 border-b border-gray-100 text-xs">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-md font-bold text-gray-800">Total:</span>
            <span className="text-md font-bold text-gray-800">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 pt-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-xs text-gray-700">
            <strong>Payment Terms:</strong> Payment is due within 7 days of invoice date. Late payments may incur
            additional charges. Please contact us for any payment inquiries.
          </p>
        </div>
        <div className="mt-4 text-center text-xs text-gray-500">
          <p>Thank you for choosing DSS for your software development needs!</p>
        </div>
      </div>
    </div>
  )
}

export default InvoiceDetail
