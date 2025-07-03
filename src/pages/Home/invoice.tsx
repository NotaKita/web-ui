'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Search, Mic, Send, Lightbulb, Image as ImageIcon, Music, CalendarDays, Calendar, HandCoins, History, Settings, Sparkles, Bell, FileText, FilePenLine, ClipboardCheck, BookOpen, LayoutTemplate, Plus, ChevronDown, BanknoteArrowUp, BanknoteArrowDown, Download, Share } from "lucide-react";
import logo from "../../assets/notakita2.png"
import InvoiceTable from '@/components/invoiceTable';

export default function NotaKitaDashboard() {
    const [isExpanded, setIsExpanded] = useState(true);
    const [selectedMenuItem, setSelectedMenuItem] = useState('gettingStarted');

    const invoiceItems = [
        {
          description: "Biaya buka cabang + domain + hosting + maintenance (1 tahun)",
          unitCost: "Rp 3.000.000",
          qty: 1,
          price: "Rp 3.000.000",
        },
        {
          description: "Daily report + API migration",
          unitCost: "Rp 200.000",
          qty: 1,
          price: "Rp 200.000",
        },
        {
          description: "Gold weight conversion (24k)",
          unitCost: "Rp 100.000",
          qty: 1,
          price: "Rp 100.000",
        },
        {
          description: "Minimum purchase price config",
          unitCost: "Rp 200.000",
          qty: 1,
          price: "Rp 200.000",
        },
        {
          description: "Ringkasan laporan bulanan",
          unitCost: "Rp 175.000",
          qty: 1,
          price: "Rp 175.000",
        },
        {
          description: "Filter barang terjual / lebur",
          unitCost: "Rp 175.000",
          qty: 1,
          price: "Rp 175.000",
        },
      ];

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #b3c6e6 0%, #e6e6fa 60%, #f8d6e6 100%)"
      }}
    >
      {/* Efek gelombang atas */}
      <svg
        className="absolute top-0 left-0 w-full h-[180px] z-0"
        viewBox="0 0 1440 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0,80 C360,180 1080,0 1440,100 L1440,0 L0,0 Z"
          fill="#4f8edc"
          fillOpacity="0.18"
        />
        <path
          d="M0,120 C400,60 1040,200 1440,80 L1440,0 L0,0 Z"
          fill="#4f8edc"
          fillOpacity="0.12"
        />
      </svg>

      {/* Efek gelombang bawah */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[200px] z-0"
        viewBox="0 0 1440 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0,100 C400,200 1040,0 1440,120 L1440,200 L0,200 Z"
          fill="#4f8edc"
          fillOpacity="0.18"
        />
        <path
          d="M0,160 C360,60 1080,200 1440,100 L1440,200 L0,200 Z"
          fill="#4f8edc"
          fillOpacity="0.12"
        />
      </svg>

      {/* Gradient warna biru tengah*/}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, #4f8edcbb 0%, #e3f0ff00 80%)",
          filter: "blur(70px)",
          opacity: 0.7,
        }}
      />
      {/* Gradient warna biru muda di kanan */}
      <div
        className="absolute right-0 top-1/3 w-[400px] h-[250px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, #7ecbff88 0%, #e3f0ff00 80%)",
          filter: "blur(60px)",
          opacity: 0.5,
        }}
      />
      {/* Gradient warna merah muda di kiri bawah */}
      <div
        className="absolute left-0 bottom-0 w-[350px] h-[200px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, #ffb6c1aa 0%, #e3f0ff00 80%)",
          filter: "blur(70px)",
          opacity: 0.6,
        }}
      />
      {/* Gradient warna ungu soft di atas */}
      <div
        className="absolute left-1/4 top-0 w-[300px] h-[180px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, #c7b6ff88 0%, #e3f0ff00 80%)",
          filter: "blur(60px)",
          opacity: 0.5,
        }}
      />

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-white/30 backdrop-blur-xl border-r border-white/40 flex flex-col py-6 shadow-lg z-10 transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-64 items-start px-4' : 'w-20 items-center px-2'
      }`}>
        {isExpanded ? (
          <div className="flex items-center p-2 mb-6 rounded-lg bg-gray-100 w-full cursor-pointer" onClick={() => setIsExpanded(false)}>
            <img src={logo} alt="Manage" className="w-10 h-10 object-contain rounded-lg" />
            <div className="ml-3 flex-1">
              <p className="font-semibold text-gray-800">admin2</p>
              <p className="text-sm text-gray-600">admin@mail.com</p>
            </div>
            <ChevronDown className="w-5 h-5 text-gray-600" />
          </div>
        ) : (
          <div className="mb-10 cursor-pointer flex items-center justify-center w-full" onClick={() => setIsExpanded(true)}>
            <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
          </div>
        )}

        {isExpanded && (
          <div className="w-full">
            {/* Main Menu Section */}
            <div className="flex justify-between items-center px-2 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              <span>MAIN MENU</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <nav className="flex flex-col space-y-1 mb-6">
              <button className={`flex items-center px-2 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors w-full text-left ${selectedMenuItem === 'search' ? 'bg-gray-100' : 'bg-transparent'}`} onClick={() => setSelectedMenuItem('search')}>
                <Search className="w-5 h-5" />
                <span className="ml-3">Company List</span>
              </button>
              <button className={`flex items-center px-2 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors w-full text-left ${selectedMenuItem === 'notification' ? 'bg-gray-100' : 'bg-transparent'}`} onClick={() => setSelectedMenuItem('notification')}>
                <Bell className="w-5 h-5" />
                <span className="ml-3">Notification</span>
              </button> 
              <button className={`flex items-center px-2 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors w-full text-left ${selectedMenuItem === 'settings' ? 'bg-gray-100' : 'bg-transparent'}`} onClick={() => setSelectedMenuItem('settings')}>
                <Settings className="w-5 h-5" />
                <span className="ml-3">Settings</span>
              </button>
            </nav>

            {/* Onboarding Section */}
            <div className="flex justify-between items-center px-2 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              <span>ONBOARDING</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <nav className="flex flex-col space-y-1 mb-6">
              <button className={`flex items-center px-2 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors w-full text-left ${selectedMenuItem === 'gettingStarted' ? 'bg-gray-100' : 'bg-transparent'}`} onClick={() => setSelectedMenuItem('gettingStarted')}>
                <BanknoteArrowUp className="w-5 h-5" />
                <span className="ml-3">Paid</span>
              </button>
              <button className={`flex items-center px-2 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors w-full text-left ${selectedMenuItem === 'quickNotes' ? 'bg-gray-100' : 'bg-transparent'}`} onClick={() => setSelectedMenuItem('quickNotes')}>
                <BanknoteArrowDown className="w-5 h-5" />
                <span className="ml-3">Unpaid</span>
              </button>
              <button className={`flex items-center px-2 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors w-full text-left ${selectedMenuItem === 'myTasks' ? 'bg-gray-100' : 'bg-transparent'}`} onClick={() => setSelectedMenuItem('myTasks')}>
                <HandCoins className="w-5 h-5" />
                <span className="ml-3">Transactions</span>
              </button>
              <button className={`flex items-center px-2 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors w-full text-left ${selectedMenuItem === 'readingList' ? 'bg-gray-100' : 'bg-transparent'}`} onClick={() => setSelectedMenuItem('readingList')}>
                <History className="w-5 h-5" />
                <span className="ml-3">History</span>
              </button>
            </nav>

            {/* Create New button */}
            <Button 
              className="flex items-center justify-center w-full px-4 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-800 transition-colors"
              onClick={() => setSelectedMenuItem('createNew')}
            >
              <Plus className="w-5 h-5 mr-2" />
              <span>Create New</span>
            </Button>
          </div>
        )}

        {/* Collapsed State Icons */}
        {!isExpanded && (
          <nav className="flex flex-col space-y-4 w-full">
            <button className="w-12 h-12 rounded-full flex items-center justify-center bg-white/50 text-gray-700 shadow-sm hover:bg-gray-700 transition-colors">
              <Search className="w-6 h-6" />
            </button>
            <button className="w-12 h-12 rounded-full flex items-center justify-center bg-white/50 text-gray-700 shadow-sm hover:bg-gray-700 transition-colors">
              <Bell className="w-6 h-6" />
            </button>
            <button className="w-12 h-12 rounded-full flex items-center justify-center bg-white/50 text-gray-700 shadow-sm hover:bg-gray-700 transition-colors">
              <Calendar className="w-6 h-6" />
            </button>
            <button className="w-12 h-12 rounded-full flex items-center justify-center bg-white/50 text-gray-700 shadow-sm hover:bg-gray-700 transition-colors">
              <Settings className="w-6 h-6" />
            </button>
            <Button className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-2xl mb-6 shadow-md hover:bg-gray-800 transition-colors">
              <Plus className="w-6 h-6" />
            </Button>
          </nav>
        )}
      </aside>

      {/* Glassmorphism Card */}
      <div className={`my-8 backdrop-blur-[32px] bg-white/20 border border-white/80 shadow-2xl shadow-white/30 ring-1 ring-white/40 rounded-[2rem] w-full max-w-[1200px] p-0 flex flex-col overflow-hidden relative transition-all duration-300 ease-in-out ${
        isExpanded ? 'ml-64' : 'ml-20'
      } before:content-[''] before:absolute before:inset-0 before:rounded-[2rem] before:pointer-events-none before:shadow-[inset_0_4px_64px_0_rgba(255,255,255,0.45)]`}>
        {/* Main Content */}
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
                  <span>Date of Invoice: 13/6/2025</span>
                </div>
                <div className="flex items-center justify-end space-x-1">
                  <CalendarDays className='w-4 h-4'/>
                  <span>Due Date: 19/6/2025</span>
                </div>
              </div>
            </div>
          </CardHeader>

          {/* Three Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
            <div className="bg-white/40 backdrop-blur-xl p-6 rounded-xl shadow-md border border-white/30 text-left flex flex-col items-start">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">To:</h3>
              <p className="text-medium text-gray-600 ">Toko Emas Sabar Jaya 1</p>
              <p className="text-medium text-gray-600">Pasar Tumpang, Kabupaten Malang</p>
              <p className="text-medium text-gray-600">Jawa Timur</p>
            </div>
            <div className="bg-white/40 backdrop-blur-xl p-6 rounded-xl shadow-md border border-white/30 text-left flex flex-col items-start">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">From :</h3>
              <p className="text-medium text-gray-600 ">Rofiq - DSS Staff</p>
              <p className="text-medium text-gray-600">Software Development Services</p>
              <p className="text-medium text-gray-600">System Integration & Consulting</p>
            </div>
            {/* <div className="bg-white/40 backdrop-blur-xl p-6 rounded-xl shadow-md border border-white/30 text-center flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Organize your time efficiently, set clear priorities, and stay focused</h3>
              <p className="text-sm text-gray-600">Planning</p>
            </div> */}
          </div>

          {/* Bottom Input Section */}
          <div className="bg-white/40 backdrop-blur-xl p-4 rounded-xl shadow-md border border-white/30 flex items-center space-x-4 flex-col">
          <div className="bg-red-100 backdrop-blur-xl p-4 rounded-xl shadow-md border border-red-400 flex items-center space-x-4 mb-6 w-full">
                <p className='text-[20px] text-black'>Status :</p>
                <div className='bg-red-200 backdrop-blur-xl p-4 rounded-xl shadow-md border border-red-400 flex items-center space-x-4'>
                    <p className='text-[20px] text-red-600'>Unpaid</p>
                </div>
                <p className='ml-auto text-[20px]'>Balance :</p>
                <div className='items-end'>
                    <p className='text-red-600 text-[20px]'>Rp 3.850.000,00</p>
                </div>
          </div>
          {/*   Invoice Table*/}
          <div className="bg-white/40 backdrop-blur-xl p-4 rounded-xl shadow-md border border-white/30 w-full h-full flex flex-col">
          <InvoiceTable
            items={invoiceItems}
            subtotal="Rp 3.850.000"
            total="Rp 3.850.000"
            />
          {/* Payment Terms */}
          <div className="bg-white/40 backdrop-blur-xl p-4 rounded-xl shadow-md border-t border-white/30 w-full text-gray-700 pt-6">
            <p>
              <span className="font-semibold">Payment Terms:</span> Payment is due within 6 days of invoice date. Late payments may incur additional charges. Please contact us for any payment inquiries.
            </p>
          </div>
          </div>
            <div className="flex space-x-2 mt-5">
              <button className="flex items-center justify-center space-x-2 px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-full w-[180px]">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              <button className="flex items-center justify-center space-x-2 px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-full w-[180px]">
                <Share className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
          <div>
            <h2 className='text-center text-ml text-black mt-5 font-semibold'>Thank you For Choosing NotaKita for your Development Service.</h2>
          </div>
        </main>
      </div>
    </div>
  )
}
