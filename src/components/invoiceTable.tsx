type Item = {
    description: string
    unitCost: string
    qty: number
    price: string
  }
  
  type Props = {
    items: Item[]
    subtotal: string
    total: string
  }
  
  export default function InvoiceTable({ items, subtotal, total }: Props) {
    return (
      <div className="h-full w-full">
        <table className="w-full table-auto border border-collapse text-sm mb-6">
          <thead className="bg-gray-100/30 border-b text-gray-700">
          <thead className="bg-gray-100/30 border-b text-gray-700">
            <tr>
                <th className="text-left p-3 font-semibold text-base">Description</th>
                <th className="text-right p-3 font-semibold text-base">Unit Cost</th>
                <th className="text-center p-3 font-semibold text-base">Qty</th>
                <th className="text-right p-3 font-semibold text-base">Price</th>
            </tr>
            </thead>
          </thead>
            <tbody>
            {items.map((item, idx) => (
                <tr key={idx} className="border-b text-gray-800 text-base">
                <td className="p-3">{item.description}</td>
                <td className="text-right p-3">{item.unitCost}</td>
                <td className="text-center p-3">{item.qty}</td>
                <td className="text-right p-3 font-bold">{item.price}</td>
                </tr>
            ))}
            </tbody>
        </table>
  
        <div className="text-right text-gray-700 mt-4">
            <div className="mb-1 text-base">
                <span className="font-semibold">Subtotal:</span> {subtotal}
            </div>
            <div className="text-xl font-bold">
                Total: <span className="text-black">{total}</span>
            </div>
        </div>

      </div>
    )
  }
  