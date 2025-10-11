"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Download, 
  CheckCircle, 
  Clock,
  CreditCard,
  Search,
  Filter,
  ArrowUpDown,
  FileText,
  Receipt,
  Calendar,
  IndianRupee,
  Eye,
  RefreshCw,
  AlertCircle,
  MoreVertical
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetPaymentsByUserIdQuery } from "@/Redux/api/billingApi";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";

type Payment = {
  id: string;
  userId: string;
  enrollmentId: string;
  amount: string;
  status: "pending" | "paid" | "failed";
  razorpay_order_id: string;
  razorpay_payment_id: string | null;
  razorpay_signature: string | null;
  paymentDate: string | null;
  createdAt: string;
  updatedAt: string;
};

type BillingHistoryItem = {
  id: string;
  date: string;
  amount: string;
  status: "Paid" | "Pending" | "Failed";
  invoiceUrl?: string;
  razorpay_order_id: string;
  timestamp: string;
  numericAmount: number;
};

type SortOption = "newest" | "oldest" | "amount-high" | "amount-low";

export default function PaymentHistoryPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id;
  const { data: payments, error, isLoading, refetch } = useGetPaymentsByUserIdQuery(userId);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  // Format payment data for billing history
  const formatBillingHistory = (payments: Payment[]): BillingHistoryItem[] => {
    if (!payments) return [];

    return payments.map(payment => ({
      id: payment.id,
      date: new Date(payment.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      timestamp: payment.createdAt,
      amount: `₹${parseFloat(payment.amount).toLocaleString('en-IN')}`,
      numericAmount: parseFloat(payment.amount),
      status: payment.status === "paid" ? "Paid" : 
              payment.status === "failed" ? "Failed" : "Pending",
      razorpay_order_id: payment.razorpay_order_id,
      invoiceUrl: payment.status === "paid" ? "#" : undefined
    }));
  };

  // Filter and sort payments
  const filteredAndSortedPayments = (payments: BillingHistoryItem[]) => {
    let filtered = payments.filter(payment => {
      const matchesSearch = payment.razorpay_order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          payment.amount.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || payment.status.toLowerCase() === statusFilter;
      return matchesSearch && matchesStatus;
    });

    // Sort payments
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        break;
      case "amount-high":
        filtered.sort((a, b) => b.numericAmount - a.numericAmount);
        break;
      case "amount-low":
        filtered.sort((a, b) => a.numericAmount - b.numericAmount);
        break;
    }

    return filtered;
  };

  const billingHistory = payments ? formatBillingHistory(payments) : [];
  const displayPayments = filteredAndSortedPayments(billingHistory);

  // Statistics
  const totalPaid = billingHistory.filter(p => p.status === "Paid").reduce((sum, p) => sum + p.numericAmount, 0);
  const pendingCount = billingHistory.filter(p => p.status === "Pending").length;
  const failedCount = billingHistory.filter(p => p.status === "Failed").length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CreditCard className="w-8 h-8 text-white" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4"
            >
              Payment History
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="border-destructive/50 bg-white/80 backdrop-blur-sm max-w-2xl mx-auto">
            <CardContent className="pt-6 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <AlertCircle className="w-8 h-8 text-destructive" />
              </motion.div>
              <h3 className="text-lg font-semibold text-destructive mb-2">Unable to Load Payments</h3>
              <p className="text-muted-foreground mb-4">There was an error loading your payment history.</p>
              <Button onClick={refetch} className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-40 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
          >
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
              >
                Payment History
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground mt-2"
              >
                Track and manage all your payment transactions
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <Button 
                variant="outline" 
                onClick={refetch}
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-800">Total Paid</p>
                  <p className="text-2xl font-bold text-green-900 mt-1">
                    ₹{totalPaid.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-amber-800">Pending Payments</p>
                  <p className="text-2xl font-bold text-amber-900 mt-1">{pendingCount}</p>
                </div>
                <div className="p-3 bg-amber-100 rounded-full">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100/50 border-red-200/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-800">Failed Payments</p>
                  <p className="text-2xl font-bold text-red-900 mt-1">{failedCount}</p>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search by Order ID or amount..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/50"
                  />
                </div>

                {/* Filters */}
                <div className="flex gap-3">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px] bg-white/50">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                    <SelectTrigger className="w-[160px] bg-white/50">
                      <ArrowUpDown className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="amount-high">Amount: High to Low</SelectItem>
                      <SelectItem value="amount-low">Amount: Low to High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment History Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Receipt className="w-5 h-5" />
                Transaction History
                <Badge variant="secondary" className="ml-2">
                  {displayPayments.length} payment{displayPayments.length !== 1 ? 's' : ''}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {displayPayments.length === 0 ? (
                <div className="text-center py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CreditCard className="w-8 h-8 text-muted-foreground" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                    {searchTerm || statusFilter !== "all" ? "No matching payments" : "No payments yet"}
                  </h3>
                  <p className="text-muted-foreground">
                    {searchTerm || statusFilter !== "all" 
                      ? "Try adjusting your search or filters" 
                      : "Your payment transactions will appear here once you make a payment."}
                  </p>
                </div>
              ) : (
                <div className="overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/30">
                          <th className="text-left py-4 px-6 font-semibold text-muted-foreground">Order Details</th>
                          <th className="text-left py-4 px-6 font-semibold text-muted-foreground">Date & Time</th>
                          <th className="text-left py-4 px-6 font-semibold text-muted-foreground">Amount</th>
                          <th className="text-left py-4 px-6 font-semibold text-muted-foreground">Status</th>
                          <th className="text-right py-4 px-6 font-semibold text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <AnimatePresence>
                          {displayPayments.map((payment, index) => (
                            <motion.tr
                              key={payment.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ delay: index * 0.05 }}
                              className="border-b hover:bg-muted/20 transition-colors group"
                            >
                              <td className="py-4 px-6">
                                <div>
                                  <p className="font-medium group-hover:text-blue-600 transition-colors">
                                    {payment.razorpay_order_id}
                                  </p>
                                  <p className="text-sm text-muted-foreground mt-1">Order ID</p>
                                </div>
                              </td>
                              <td className="py-4 px-6">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-muted-foreground" />
                                  <span>{payment.date}</span>
                                </div>
                              </td>
                              <td className="py-4 px-6">
                                <div className="flex items-center gap-2">
                                  <IndianRupee className="w-4 h-4 text-green-600" />
                                  <span className="font-semibold text-green-700">{payment.amount}</span>
                                </div>
                              </td>
                              <td className="py-4 px-6">
                                {payment.status === "Paid" ? (
                                  <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Paid
                                  </Badge>
                                ) : payment.status === "Failed" ? (
                                  <Badge className="bg-red-100 text-red-700 border-red-200 hover:bg-red-100">
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                    Failed
                                  </Badge>
                                ) : (
                                  <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">
                                    <Clock className="w-3 h-3 mr-1" />
                                    Pending
                                  </Badge>
                                )}
                              </td>
                              <td className="py-4 px-6 text-right">
                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  {payment.invoiceUrl && (
                                    <Button variant="outline" size="sm" className="gap-1 h-8">
                                      <Download className="w-3 h-3" />
                                      Invoice
                                    </Button>
                                  )}
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <Eye className="w-3 h-3" />
                                  </Button>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Empty state illustration when no data */}
        {billingHistory.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto mb-8 flex items-center justify-center">
              <CreditCard className="w-16 h-16 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Payments Yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Start your learning journey by enrolling in courses. Your payment history will appear here once you make your first payment.
            </p>
            <Button className="gap-2">
              <FileText className="w-4 h-4" />
              Browse Courses
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}