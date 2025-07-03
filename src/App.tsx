import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Home, Calendar, Inbox, ChevronDown, Plus, History, LayoutDashboard } from "lucide-react";
import CompanyList from "./pages/Home/companyList";
import PaidInvoice from "./pages/Invoice/paidInvoice";
import UnpaidInvoice from "./pages/Invoice/unpaidInvoice";
import Dasboard from "./pages/Home/dasboard";
import UserReport from "./pages/report/userReport";
import CompanyReport from "./pages/report/companyReport";
import { Link } from "react-router-dom";
import logo from "@/assets/notakita2.png"; // ganti path jika perlu


const dasboard = [
  { title: "Dasboard", url: "/dasboard", icon: LayoutDashboard}
];

const companyList = [
  { title: "Company List", url: "/companyList", icon: Home },
];

const Invoice = [
  { title: "Unpaid Invoice", url: "/unpaidInvoice", icon: Calendar },
  { title: "Paid Invoice", url: "/paidInvoice", icon: Inbox },
  { title: "History", url: "/history", icon: History },
];

const Report = [
  { title: "Company Report", url: "/companyReport", icon: Calendar },
  { title: "User Report", url: "/userReport", icon: Inbox },
];

function App() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <BrowserRouter>
      <SidebarProvider>
        {/* Background Layer */}
        <div className="fixed inset-0 -z-10 min-h-screen w-full">
          {/* Gradient background */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              background: "linear-gradient(180deg, #b3c6e6 0%, #e6e6fa 60%, #f8d6e6 100%)"
            }}
          />
          {/* Efek gelombang atas */}
          <svg
            className="absolute top-0 left-0 w-full h-[180px]"
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
            className="absolute bottom-0 left-0 w-full h-[200px]"
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
        </div>
        {/* Main Layout */}
        <div className="min-h-screen flex relative overflow-hidden">
          <Sidebar>
            <SidebarContent
              className={`bg-gradient-to-r from-white/30 to-white/0 backdrop-blur border-r border-white/30 flex flex-col py-6 shadow-lg z-10 transition-all duration-300 ease-in-out ${
                isExpanded ? 'w-64 items-start px-4' : 'w-20 items-center px-2'
              }`}
            >
              {/* Avatar & Collapse/Expand */}
              <div
                className={`flex items-center p-2 mb-6 rounded-lg bg-gray-100 w-full cursor-pointer`}
                onClick={() => setIsExpanded((v) => !v)}
              >
                <img src={logo} alt="Logo" className="w-10 h-10 object-contain rounded-lg" />
                {isExpanded && (
                  <div className="ml-3 flex-1">
                    <p className="font-semibold text-gray-800">admin2</p>
                    <p className="text-sm text-gray-600">admin@mail.com</p>
                  </div>
                )}
                <ChevronDown className="w-5 h-5 text-gray-600" />
              </div>

              {/* Main Menu */}
              <SidebarGroup>
              <SidebarGroupContent>
                  <SidebarMenu>
                    {dasboard
                      .filter((item) => isExpanded || item.title === "Dasboard")
                      .map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <Link to={item.url}>
                              <item.icon className="w-5 h-5" />
                              {isExpanded && <span className="ml-3">{item.title}</span>}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                  </SidebarMenu>
                </SidebarGroupContent>
                {isExpanded && <SidebarGroupLabel>Company</SidebarGroupLabel>}
                <SidebarGroupContent>
                  <SidebarMenu>
                    {companyList
                      .filter((item) => isExpanded || item.title === "Company List")
                      .map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <Link to={item.url}>
                              <item.icon className="w-5 h-5" />
                              {isExpanded && <span className="ml-3">{item.title}</span>}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                  </SidebarMenu>
                </SidebarGroupContent>
                {isExpanded && <SidebarGroupLabel>Invoice</SidebarGroupLabel>}
                <SidebarGroupContent>
                  <SidebarMenu>
                    {Invoice
                      .filter((item) =>
                        isExpanded || ["Paid Invoice", "Unpaid Invoice"].includes(item.title)
                      )
                      .map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <Link to={item.url}>
                              <item.icon className="w-5 h-5" />
                              {isExpanded && <span className="ml-3">{item.title}</span>}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                  </SidebarMenu>
                </SidebarGroupContent>
                {isExpanded && <SidebarGroupLabel>Report</SidebarGroupLabel>}
                <SidebarGroupContent>
                  <SidebarMenu>
                    {Report
                      .filter((item) =>
                        isExpanded || ["Company Report", "User Report"].includes(item.title)
                      )
                      .map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <Link to={item.url}>
                              <item.icon className="w-5 h-5" />
                              {isExpanded && <span className="ml-3">{item.title}</span>}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              {/* Tombol Create New */}
              <div className="mt-6 w-full">
                <button className="flex items-center justify-center w-full px-4 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-800 transition-colors">
                  <Plus className="w-5 h-5 mr-2" />
                  {isExpanded && <span>Create New</span>}
                </button>
              </div>
            </SidebarContent>
          </Sidebar>

          {/* Main Content */}
          <div className={`flex-1 p-10 z-10 transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-20'}`}>
            <Routes>
              <Route path="/dasboard" element={<Dasboard />} />
              <Route path="/companyList" element={<CompanyList />} />
              <Route path="/unpaidInvoice" element={<UnpaidInvoice />} />
              <Route path="/paidInvoice" element={<PaidInvoice />} />
              <Route path="/companyReport" element={<CompanyReport />} />
              <Route path="/userReport" element={<UserReport />} />
              {/* <Route path="/paidPayment" element={<PaidPayment />} />
              <Route path="/unpaidPayment" element={<UnpaidPayment />} /> */}
            </Routes>
          </div>
        </div>
      </SidebarProvider>
    </BrowserRouter>
  );
}

export default App;