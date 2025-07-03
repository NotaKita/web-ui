import React from 'react'
import { Button } from '@/components/ui/button';
import { CalendarDropDown } from '@/components/calendarDropDown';
import { Search, CalendarDays, ChevronDown, Download, Plus, Settings2, Funnel } from "lucide-react";
import AddClientModal from '@/components/addNewCompany';


const companyData = [
  {
    name: "KBR E SPORT",
    companyID: "COMP-1001",
    joined: "2022-03-01",
    lastUpdate: "2023-12-20",
    source: "LinkedIn",
    provider: "DGM Group",
    services: ["Supply Chain", "Fleet Management", "Automation"],
    amount: 12500,
    phoneNumber: "+62 21 1234 5678",
    email: "info@astra.co.id",
    paidInvoice: 8,
    unpaidInvoice: 2,
  },
  {
    name: "KBR E SPORT",
    companyID: "COMP-1002",
    joined: "2021-06-15",
    lastUpdate: "2023-11-02",
    source: "Google",
    provider: "Nusantara Solutions",
    services: ["Network", "Support", "Consulting"],
    amount: 8900,
    phoneNumber: "+62 21 5555 8888",
    email: "contact@telkom.co.id",
    paidInvoice: 12,
    unpaidInvoice: 1,
  },
  {
    name: "KBR E SPORT",
    companyID: "COMP-1003",
    joined: "2023-01-10",
    lastUpdate: "2024-04-12",
    source: "Referral",
    provider: "CC/DGM",
    services: ["Logistics", "Driver Support", "Payments"],
    amount: 14200,
    phoneNumber: "+62 21 9999 0000",
    email: "hello@gojek.com",
    paidInvoice: 15,
    unpaidInvoice: 3,
  },
  {
    name: "KBR E SPORT",
    companyID: "COMP-1004",
    joined: "2022-07-25",
    lastUpdate: "2024-02-01",
    source: "Facebook Ads",
    provider: "LogiTech",
    services: ["E-commerce", "Delivery", "Cloud"],
    amount: 17800,
    phoneNumber: "+62 21 2222 3333",
    email: "support@shopee.co.id",
    paidInvoice: 10,
    unpaidInvoice: 0,
  },
  {
    name: "Pertamina",
    companyID: "COMP-1005",
    joined: "2020-10-10",
    lastUpdate: "2023-09-18",
    source: "Government",
    provider: "MegaCorp",
    services: ["Oil", "Distribution", "IT Support"],
    amount: 21000,
    phoneNumber: "+62 21 4444 7777",
    email: "info@pertamina.com",
    paidInvoice: 20,
    unpaidInvoice: 5,
  }
];

export default function CompanyList() {
  const [showAddClient, setShowAddClient] = React.useState(false);

  return (
    <div className="my-8 backdrop-blur-[32px] bg-white/20 border border-white/80 shadow-2xl shadow-white/30 ring-1 ring-white/40 rounded-[2rem] w-full max-w-[1600px] p-0 flex flex-col overflow-visible relative transition-all duration-300 ease-in-out ml-0 before:content-[''] before:absolute before:inset-0 before:rounded-[2rem] before:pointer-events-none before:shadow-[inset_0_4px_64px_0_rgba(255,255,255,0.45)] mx-auto min-h-[400px]">
      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 w-full">
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Company List</h1>
            <p className="text-base md:text-lg text-gray-600">View all of your Client information.</p>
          </div>
          <button
            className="flex items-center space-x-2 px-6 py-3 bg-white/70 backdrop-blur-xl border border-white/30 rounded-xl shadow-lg text-gray-700 font-semibold hover:bg-white/90 transition-colors cursor-pointer"
            onClick={() => setShowAddClient(true)}
          >
            <Plus className="w-5 h-5" />
            <span>Add New Client</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-2 md:space-y-0 md:space-x-4 mb-6 w-full">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for Clients"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
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
          {/* <button className="flex items-center  bg-white/40 backdrop-blur-xl border border-white/30 rounded-lg shadow-md text-gray-700 hover:bg-white/60 transition-colors w-full md:w-auto">
            <CalendarDropDown />
            <span>Jan 6, 2022 - Jan 13, 2022</span>
            <ChevronDown className="w-4 h-4" />
          </button> */}
        </div>

        {/* Company List Table (Glassmorph) */}
        <div className="bg-white/40 backdrop-blur-xl p-4 sm:p-8 rounded-xl shadow-md border border-white/30 w-full mb-8">
          <table className="w-full table-fixed divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-8 py-2 w-1/5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                <th className="px-8 py-2 w-1/5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                <th className="px-8 py-2 w-1/5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-8 py-2 w-1/5 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Paid Invoice</th>
                <th className="px-8 py-2 w-1/5 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Unpaid Invoice</th>
              </tr>
            </thead>
            <tbody className="bg-white/30 divide-y divide-gray-200">
              {companyData.map((company, idx) => (
                <tr key={idx} className="hover:bg-white/10">
                  <td className="px-8 py-2 whitespace-nowrap text-sm font-medium text-gray-900 w-1/5">{company.name}</td>
                  <td className="px-8 py-2 whitespace-nowrap text-sm text-gray-700 w-1/5">{company.phoneNumber}</td>
                  <td className="px-8 py-2 whitespace-nowrap text-sm text-gray-700 w-1/5">{company.email}</td>
                  <td className="px-8 py-2 whitespace-nowrap text-sm text-green-700 font-semibold w-1/5 text-center">{company.paidInvoice}</td>
                  <td className="px-8 py-2 whitespace-nowrap text-sm text-red-700 font-semibold w-1/5 text-center">{company.unpaidInvoice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      {showAddClient && (
        <AddClientModal
          onClose={() => setShowAddClient(false)}
          onSubmit={(data) => {
            // Lakukan sesuatu dengan data, misal push ke companyData atau API
            setShowAddClient(false);
          }}
        />
      )}
    </div>
  )
}