"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  DollarSign,
  Clock,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Plus,
  Edit,
  Eye,
  Download,
  Filter,
} from "lucide-react"

export default function UserPerformanceDashboard() {
  const [timeRange, setTimeRange] = useState("30d")

  // Mock user data
  const userData = {
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "Invoice Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "Jan 2023",
  }

  // Mock performance metrics
  const metrics = {
    totalInvoices: 156,
    totalRevenue: 245680,
    paidInvoices: 142,
    unpaidInvoices: 14,
    overdueInvoices: 8,
    averageProcessingTime: 2.4,
    collectionRate: 91.2,
    monthlyTarget: 180,
  }

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      action: "Created Invoice",
      invoice: "INV-2024-001",
      client: "Acme Corp",
      amount: 5420,
      timestamp: "2 hours ago",
      status: "sent",
    },
    {
      id: 2,
      action: "Updated Status",
      invoice: "INV-2024-002",
      client: "TechStart Inc",
      amount: 3200,
      timestamp: "4 hours ago",
      status: "paid",
    },
    {
      id: 3,
      action: "Sent Reminder",
      invoice: "INV-2024-003",
      client: "Global Solutions",
      amount: 7800,
      timestamp: "1 day ago",
      status: "overdue",
    },
    {
      id: 4,
      action: "Created Invoice",
      invoice: "INV-2024-004",
      client: "StartupXYZ",
      amount: 2100,
      timestamp: "2 days ago",
      status: "draft",
    },
    {
      id: 5,
      action: "Processed Payment",
      invoice: "INV-2024-005",
      client: "Enterprise Ltd",
      amount: 12500,
      timestamp: "3 days ago",
      status: "paid",
    },
  ]

  // Mock top clients
  const topClients = [
    { name: "Enterprise Ltd", invoices: 24, revenue: 125000, status: "excellent" },
    { name: "Global Solutions", invoices: 18, revenue: 89400, status: "good" },
    { name: "TechStart Inc", invoices: 15, revenue: 67200, status: "good" },
    { name: "Acme Corp", invoices: 12, revenue: 54200, status: "average" },
    { name: "StartupXYZ", invoices: 8, revenue: 32100, status: "average" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "sent":
        return "bg-blue-100 text-blue-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getClientStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "average":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="my-8 backdrop-blur-[32px] bg-white/20 border border-white/80 shadow-2xl shadow-white/30 ring-1 ring-white/40 rounded-[2rem] w-[1440px] p-0 flex flex-col overflow-visible relative transition-all duration-300 ease-in-out ml-0 before:content-[''] before:absolute before:inset-0 before:rounded-[2rem] before:pointer-events-none before:shadow-[inset_0_4px_64px_0_rgba(255,255,255,0.45)] min-h-[400px] mx-2 md:mx-8">
      <main className="flex-1 p-4 sm:p-6 md:p-10">
        <div className="space-y-6 w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                <AvatarFallback>
                  {userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
                <p className="text-gray-600">
                  {userData.role} • Member since {userData.joinDate}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Invoice
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.totalInvoices}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  +12% from last month
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Rp{metrics.totalRevenue.toLocaleString()}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  +8.2% from last month
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.collectionRate}%</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                  -2.1% from last month
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Processing Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.averageProcessingTime} days</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingDown className="h-3 w-3 mr-1 text-green-500" />
                  -0.3 days improved
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Invoice Status Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 bg-white/40 backdrop-blur-xl border border-white/30 shadow-md">
              <CardHeader>
                <CardTitle>Invoice Status Overview</CardTitle>
                <CardDescription>Current status of your invoices</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Paid Invoices</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{metrics.paidInvoices}</div>
                    <div className="text-xs text-muted-foreground">91.0%</div>
                  </div>
                </div>
                <Progress value={91} className="h-2" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Unpaid Invoices</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{metrics.unpaidInvoices}</div>
                    <div className="text-xs text-muted-foreground">9.0%</div>
                  </div>
                </div>
                <Progress value={9} className="h-2" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm">Overdue Invoices</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{metrics.overdueInvoices}</div>
                    <div className="text-xs text-muted-foreground">5.1%</div>
                  </div>
                </div>
                <Progress value={5.1} className="h-2" />
              </CardContent>
            </Card>

            <Card className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-md">
              <CardHeader>
                <CardTitle>Monthly Target</CardTitle>
                <CardDescription>Progress towards monthly goal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">{metrics.totalInvoices}</div>
                  <div className="text-sm text-muted-foreground">of {metrics.monthlyTarget} invoices</div>
                </div>
                <Progress value={(metrics.totalInvoices / metrics.monthlyTarget) * 100} className="h-3" />
                <div className="text-center text-sm text-muted-foreground">
                  {Math.round((metrics.totalInvoices / metrics.monthlyTarget) * 100)}% completed
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analytics */}
          <Tabs defaultValue="activity" className="space-y-4">
            <TabsList>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="clients">Top Clients</TabsTrigger>
              <TabsTrigger value="performance">Performance Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="activity">
              <Card className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest invoice actions and updates</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Action</TableHead>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentActivities.map((activity) => (
                        <TableRow key={activity.id}>
                          <TableCell className="font-medium">{activity.action}</TableCell>
                          <TableCell>{activity.invoice}</TableCell>
                          <TableCell>{activity.client}</TableCell>
                          <TableCell>Rp{activity.amount.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{activity.timestamp}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Invoice
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Invoice
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download PDF
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="clients">
              <Card className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-md">
                <CardHeader>
                  <CardTitle>Top Clients</CardTitle>
                  <CardDescription>Your most valuable clients by revenue and invoice count</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Client Name</TableHead>
                        <TableHead>Total Invoices</TableHead>
                        <TableHead>Total Revenue</TableHead>
                        <TableHead>Relationship Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topClients.map((client, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{client.name}</TableCell>
                          <TableCell>{client.invoices}</TableCell>
                          <TableCell>Rp{client.revenue.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge className={getClientStatusColor(client.status)}>{client.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-md">
                  <CardHeader>
                    <CardTitle>Monthly Performance</CardTitle>
                    <CardDescription>Invoice creation and payment trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Invoices Created</span>
                        <span className="font-semibold">156 this month</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Average Invoice Value</span>
                        <span className="font-semibold">Rp1.575.000</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Fastest Payment</span>
                        <span className="font-semibold">Same day</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Client Satisfaction</span>
                        <span className="font-semibold">4.8/5.0</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-md">
                  <CardHeader>
                    <CardTitle>Efficiency Metrics</CardTitle>
                    <CardDescription>Your productivity and efficiency scores</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm">Invoice Processing Speed</span>
                          <span className="text-sm font-semibold">85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm">Payment Follow-up Rate</span>
                          <span className="text-sm font-semibold">92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm">Error Rate</span>
                          <span className="text-sm font-semibold">3%</span>
                        </div>
                        <Progress value={3} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm">Client Response Rate</span>
                          <span className="text-sm font-semibold">78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
