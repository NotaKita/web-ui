import React from 'react';
import { BarChart2, Users, DollarSign, Activity, CreditCard, ArrowDownLeft, ArrowUpRight, Shield, Newspaper, BanknoteX, BanknoteArrowUp } from 'lucide-react';
import Logo from "./../../assets/notakita2.png";
import Office from "./../../assets/office.png";

export default function Dasboard() {
  return (
    <div className="my-8 backdrop-blur-[32px] bg-white/20 border border-white/80 shadow-2xl shadow-white/30 ring-1 ring-white/40 rounded-[2rem] w-full max-w-[1600px] p-0 flex flex-col overflow-hidden relative transition-all duration-300 ease-in-out ml-0 before:content-[''] before:absolute before:inset-0 before:rounded-[2rem] before:pointer-events-none before:shadow-[inset_0_4px_64px_0_rgba(255,255,255,0.45)] mx-auto min-h-[400px]">
      <main className="flex-1 p-4 sm:p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Card kecil */}
          <div className="bg-white/40 backdrop-blur-xl p-4 rounded-xl shadow-md border border-white/30 flex flex-col items-start">
            <span className="text-xs text-gray-500 mb-1">Total Unpaid Invoice</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-red-500">Rp 15.000.000</span>
              <BarChart2 className="w-6 h-6 text-blue-700" />
            </div>
          </div>
          <div className="bg-white/40 backdrop-blur-xl p-4 rounded-xl shadow-md border border-white/30 flex flex-col items-start">
            <span className="text-xs text-gray-500 mb-1">Company</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">4</span>
              <Users className="w-6 h-6 text-blue-700" />
            </div>
          </div>
          <div className="bg-white/40 backdrop-blur-xl p-4 rounded-xl shadow-md border border-white/30 flex flex-col items-start">
            <span className="text-xs text-gray-500 mb-1">Paid Invoice</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">10</span>
              <BanknoteArrowUp className="w-6 h-6 text-blue-700" />
            </div>
          </div>
          <div className="bg-white/40 backdrop-blur-xl p-4 rounded-xl shadow-md border border-white/30 flex flex-col items-start">
            <span className="text-xs text-gray-500 mb-1">Unpaid Invoice</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">15</span>
              <BanknoteX className="w-6 h-6 text-blue-700" />
            </div>
          </div>

          {/* Balance Card (col-span-2) */}
          <div className="bg-white/40 backdrop-blur-xl p-6 rounded-xl shadow-md border border-white/30 flex flex-col col-span-1 md:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-700">Payment</span>
              <span className="text-xs text-blue-700 font-semibold ml-2">Invoice</span>
              <span className="text-xs text-gray-400 ml-auto">Monthly</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-blue-700">Paid Payment 70%</span>
                  <span className="text-xs bg-blue-100 text-blue-700 rounded px-2 py-0.5">+2.45%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-800">Total Payment Rp 35.000.000</span>
                  <span className="text-xs bg-red-100 text-red-700 rounded px-2 py-0.5">-4.75%</span>
                </div>
              </div>
              {/* Dummy chart */}
              <div className="flex-1">
                <svg width="100%" height="60" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 50 Q 20 10 40 30 T 80 25 T 120 40 T 160 20 T 200 35" stroke="#3b82f6" strokeWidth="3" fill="none" />
                </svg>
              </div>
            </div>
          </div>

          {/* Earnings Card */}
          <div className="bg-white/40 backdrop-blur-xl p-6 rounded-xl shadow-md border border-white/30 flex flex-col col-span-1">
            <span className="font-semibold text-gray-700 mb-2">Total Paid Payment</span>
            <div className="text-2xl font-bold text-black">Rp 20.000.000</div>
            <div className="text-xs text-gray-500 mb-2">This is your total paid payment in this month</div>
            <div className="flex items-center gap-2">
              <svg width="60" height="60" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="26" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <circle cx="30" cy="30" r="26" stroke="#3b82f6" strokeWidth="8" fill="none" strokeDasharray="163.36" strokeDashoffset="32.67" strokeLinecap="round" />
                <text x="30" y="36" textAnchor="middle" fontSize="18" fill="#374151">70%</text>
              </svg>
              <span className="text-xs text-gray-500">Total Payment</span>
            </div>
          </div>

          {/* Profile Card */}
          <div className="bg-white/40 backdrop-blur-xl p-6 rounded-xl shadow-md border border-white/30 flex flex-col items-center col-span-1">
            <img src={Logo} alt="avatar" className="w-20 h-20  rounded-full mb-2" />
            <div className="font-bold text-lg text-gray-800">admin2</div>
            <div className="text-xs text-gray-500 mb-2">admin2@mail.com</div>
            
          </div>

          {/* Credit Card */}
          <div className="bg-white/40 backdrop-blur-xl p-6 rounded-xl shadow-md border border-white/30 flex flex-col col-span-1 md:col-span-2">
            <span className="font-semibold text-gray-700 mb-2">You Can Add More Company</span>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-2">Lorem ipsum dolor sit amet consectetur. Facilisis tincidunt purus in hendrerit cras massa sollicitudin adipiscing. Sit egestas risus sed sit auctor.</div>
                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-700 transition">Add New Company +</button>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="relative w-40 h-28">
                  <img src={Office} className=' ml-10 w-30 h-30' />
                </div>
              </div>
            </div>
          </div>

          {/* Transfers */}
          <div className="bg-white/40 backdrop-blur-xl p-6 rounded-xl shadow-md border border-white/30 flex flex-col col-span-1">
            <span className="font-semibold text-gray-700 mb-2">Your Payment</span>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span>From Ainur Rofiq</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg shadow text-xs font-semibold backdrop-blur-xl border border-blue-200">Paid</span>
              </div>
              <div className="flex items-center justify-between">
                <span>From Mellino N</span>
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-lg shadow text-xs font-semibold backdrop-blur-xl border border-red-200">Unpaid</span>
              </div>
              <div className="flex items-center justify-between">
                <span>From Faffa Alif</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg shadow text-xs font-semibold backdrop-blur-xl border border-blue-200">Paid</span>
              </div>
            </div>
          </div>

          {/* Security Card */}
          <div className="bg-white/40 backdrop-blur-xl p-6 rounded-xl shadow-md border border-white/30 flex flex-col items-center col-span-1">
            <Shield className="w-12 h-12 text-blue-700 mb-2" />
            <div className="font-bold text-lg text-gray-800 mb-1">Keep you safe!</div>
            <div className="text-xs text-gray-500 mb-2 text-center">Update your security password</div>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">Update Your Security</button>
          </div>
        </div>
      </main>
    </div>
  );
}