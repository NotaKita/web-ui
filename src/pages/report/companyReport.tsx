"use client"

import { useState } from "react"
import { CalendarIcon, Download, TrendingDown, TrendingUp } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Mock data for the report
const reportData = {
  summary: {
    totalRevenue: 125430.5,
    paidInvoices: 89250.75,
    unpaidInvoices: 36179.75,
    overdueInvoices: 12450.25,
    totalInvoices: 156,
    paidCount: 112,
    unpaidCount: 44,
    overdueCount: 18,
  },
  monthlyTrends: [
    { month: "Jan", paid: 15200, unpaid: 3400, overdue: 1200 },
    { month: "Feb", paid: 18500, unpaid: 4200, overdue: 1800 },
    { month: "Mar", paid: 22100, unpaid: 5100, overdue: 2100 },
    { month: "Apr", paid: 19800, unpaid: 4800, overdue: 1900 },
    { month: "May", paid: 21600, unpaid: 5200, overdue: 2200 },
    { month: "Jun", paid: 24050, unpaid: 6100, overdue: 2450 },
  ],
  topClients: [
    { name: "Acme Corporation", totalAmount: 25400.0, invoiceCount: 12, status: "Good" },
    { name: "TechStart Inc.", totalAmount: 18750.5, invoiceCount: 8, status: "Good" },
    { name: "Global Solutions", totalAmount: 15200.25, invoiceCount: 15, status: "Warning" },
    { name: "Innovation Labs", totalAmount: 12800.0, invoiceCount: 6, status: "Good" },
    { name: "Digital Dynamics", totalAmount: 9650.75, invoiceCount: 9, status: "Overdue" },
  ],
  recentInvoices: [
    { id: "INV-001", client: "Acme Corporation", amount: 2500.0, dueDate: "2024-01-15", status: "Paid" },
    { id: "INV-002", client: "TechStart Inc.", amount: 1800.5, dueDate: "2024-01-20", status: "Unpaid" },
    { id: "INV-003", client: "Global Solutions", amount: 3200.25, dueDate: "2024-01-10", status: "Overdue" },
    { id: "INV-004", client: "Innovation Labs", amount: 1950.0, dueDate: "2024-01-25", status: "Paid" },
    { id: "INV-005", client: "Digital Dynamics", amount: 2750.75, dueDate: "2024-01-12", status: "Overdue" },
  ],
}

export default function InvoiceReport() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(2024, 0, 1),
    to: new Date(2024, 5, 30),
  })
  const [selectedCompany, setSelectedCompany] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>
      case "Unpaid":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Unpaid</Badge>
      case "Overdue":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Overdue</Badge>
      case "Good":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Good</Badge>
      case "Warning":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Warning</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="my-8 backdrop-blur-[32px] bg-white/20 border border-white/80 shadow-2xl shadow-white/30 ring-1 ring-white/40 rounded-[2rem] w-[1440px] max-w-[1600px] p-0 flex flex-col overflow-visible relative transition-all duration-300 ease-in-out ml-0 before:content-[''] before:absolute before:inset-0 before:rounded-[2rem] before:pointer-events-none before:shadow-[inset_0_4px_64px_0_rgba(255,255,255,0.45)] mx-auto min-h-[400px]">
      <main className="flex-1 p-4 sm:p-6 md:p-10">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Invoice Reports</h1>
              <p className="text-gray-600 mt-1">Comprehensive overview of your invoice performance</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Select Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  <SelectItem value="acme">Acme Corporation</SelectItem>
                  <SelectItem value="techstart">TechStart Inc.</SelectItem>
                  <SelectItem value="global">Global Solutions</SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full sm:w-[280px] justify-start text-left font-normal bg-transparent"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar initialFocus mode="range" defaultMonth={dateRange?.from} numberOfMonths={2} />
                </PopoverContent>
              </Popover>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Export Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                  <DropdownMenuItem>Export as Excel</DropdownMenuItem>
                  <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/40 backdrop-blur-xl p-4 rounded-xl shadow-md border border-white/30">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${reportData.summary.totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+12.5% from last month</p>
              </CardContent>
            </Card>

            <Card className="bg-white/40 backdrop-blur-xl p-4 rounded-xl shadow-md border border-white/30">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${reportData.summary.paidInvoices.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">{reportData.summary.paidCount} invoices paid</p>
              </CardContent>
            </Card>

            <Card className="bg-white/40 backdrop-blur-xl p-4 rounded-xl shadow-md border border-white/30">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Outstanding Amount</CardTitle>
                <TrendingDown className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${reportData.summary.unpaidInvoices.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">{reportData.summary.unpaidCount} unpaid invoices</p>
              </CardContent>
            </Card>

            <Card className="bg-white/40 backdrop-blur-xl p-4 rounded-xl shadow-md border border-white/30">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
                <TrendingDown className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  ${reportData.summary.overdueInvoices.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">{reportData.summary.overdueCount} overdue invoices</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/40 backdrop-blur-xl p-6 rounded-xl shadow-md border border-white/30">
              <CardHeader>
                <CardTitle>Monthly Revenue Trends</CardTitle>
                <CardDescription>Revenue breakdown by payment status over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportData.monthlyTrends.map((month, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-12 text-sm font-medium">{month.month}</div>
                      <div className="flex-1 flex space-x-2">
                        <div
                          className="bg-green-500 h-6 rounded flex items-center justify-center text-white text-xs"
                          style={{ width: `${(month.paid / 25000) * 100}%`, minWidth: "60px" }}
                        >
                          ${(month.paid / 1000).toFixed(0)}k
                        </div>
                        <div
                          className="bg-yellow-500 h-6 rounded flex items-center justify-center text-white text-xs"
                          style={{ width: `${(month.unpaid / 25000) * 100}%`, minWidth: "40px" }}
                        >
                          ${(month.unpaid / 1000).toFixed(0)}k
                        </div>
                        <div
                          className="bg-red-500 h-6 rounded flex items-center justify-center text-white text-xs"
                          style={{ width: `${(month.overdue / 25000) * 100}%`, minWidth: "30px" }}
                        >
                          ${(month.overdue / 1000).toFixed(0)}k
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span>Paid</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                      <span>Unpaid</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded"></div>
                      <span>Overdue</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/40 backdrop-blur-xl p-6 rounded-xl shadow-md border border-white/30">
              <CardHeader>
                <CardTitle>Top Clients by Revenue</CardTitle>
                <CardDescription>Your highest value clients and their payment status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportData.topClients.map((client, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-gray-600">{client.invoiceCount} invoices</div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="font-bold">${client.totalAmount.toLocaleString()}</div>
                        {getStatusBadge(client.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Invoices Table */}
          <Card className="bg-white/40 backdrop-blur-xl p-6 rounded-xl shadow-md border border-white/30">
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
              <CardDescription>Latest invoice activity across all companies</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.recentInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.client}</TableCell>
                      <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/40 backdrop-blur-xl p-6 rounded-xl shadow-md border border-white/30">
              <CardHeader>
                <CardTitle className="text-lg">Payment Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>On-time payments:</span>
                    <span className="font-bold text-green-600">78%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Late payments:</span>
                    <span className="font-bold text-yellow-600">15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Overdue:</span>
                    <span className="font-bold text-red-600">7%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/40 backdrop-blur-xl p-6 rounded-xl shadow-md border border-white/30">
              <CardHeader>
                <CardTitle className="text-lg">Average Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Invoice value:</span>
                    <span className="font-bold">
                      ${(reportData.summary.totalRevenue / reportData.summary.totalInvoices).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment time:</span>
                    <span className="font-bold">18 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Collection rate:</span>
                    <span className="font-bold text-green-600">92%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/40 backdrop-blur-xl p-6 rounded-xl shadow-md border border-white/30">
              <CardHeader>
                <CardTitle className="text-lg">Aging Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>0-30 days:</span>
                    <span className="font-bold">$18,450</span>
                  </div>
                  <div className="flex justify-between">
                    <span>31-60 days:</span>
                    <span className="font-bold">$12,280</span>
                  </div>
                  <div className="flex justify-between">
                    <span>60+ days:</span>
                    <span className="font-bold text-red-600">$5,450</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
