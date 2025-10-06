"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  Download, 
  CheckCircle, 
  Clock, 
  Shield, 
  Zap, 
  HelpCircle,
  ChevronRight,
  Crown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type BillingHistory = {
  id: string;
  date: string;
  amount: string;
  status: "Paid" | "Pending";
  invoiceUrl?: string;
};

const billingHistory: BillingHistory[] = [
  {
    id: "INV-003",
    date: "Oct 15, 2025",
    amount: "$29.00",
    status: "Pending",
  },
  {
    id: "INV-002",
    date: "Sep 15, 2025",
    amount: "$29.00",
    status: "Paid",
    invoiceUrl: "#",
  },
  {
    id: "INV-001",
    date: "Aug 15, 2025",
    amount: "$29.00",
    status: "Paid",
    invoiceUrl: "#",
  },
];

const planFeatures = [
  "10 team members",
  "50GB storage",
  "Advanced analytics",
  "Priority support",
  "Custom domains"
];

export default function BillingPage() {
  const [plan] = useState({
    name: "Pro Plan",
    price: "$29/mo",
    renewalDate: "Nov 15, 2025",
    nextBilling: "$29.00",
  });

  const [activeTab, setActiveTab] = useState<"overview" | "history" | "payment">("overview");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-8 mt-[80px]"
    >
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
            >
              Billing & Subscription
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground mt-2"
            >
              Manage your subscription, payment methods, and billing history
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-0 shadow-lg">
              <CreditCard className="w-4 h-4" />
              Update Payment Method
            </Button>
          </motion.div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 rounded-lg bg-muted p-1 w-fit">
          {[
            { id: "overview", label: "Overview" },
            { id: "history", label: "Billing History" },
            { id: "payment", label: "Payment Method" }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              className={`relative rounded-md px-4 py-2 text-sm font-medium transition-all ${
                activeTab === tab.id ? "shadow-sm" : "hover:bg-transparent"
              }`}
              onClick={() => setActiveTab(tab.id as any)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Current Plan Card */}
            <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-slate-50 to-blue-50">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -translate-y-16 translate-x-16"></div>
              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Crown className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Current Plan</CardTitle>
                      <CardDescription>Active subscription details</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className="px-3 py-1 bg-green-100 text-green-700 border-0">
                    Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="relative space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Plan Name</p>
                    <p className="text-xl font-semibold">{plan.name}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Monthly Price</p>
                    <p className="text-xl font-semibold">{plan.price}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Next Billing</p>
                    <p className="text-xl font-semibold">{plan.nextBilling}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <p className="font-medium text-sm text-muted-foreground">Renewal Date</p>
                    <p className="text-lg">{plan.renewalDate}</p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
                      Cancel Subscription
                    </Button>
                    <Button variant="default" className="gap-2">
                      Upgrade Plan
                      <Zap className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Plan Features */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  Plan Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {planFeatures.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold group-hover:text-blue-600 transition-colors">Billing History</p>
                      <p className="text-sm text-muted-foreground mt-1">View past invoices and payments</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold group-hover:text-blue-600 transition-colors">Payment Methods</p>
                      <p className="text-sm text-muted-foreground mt-1">Update your payment details</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold group-hover:text-blue-600 transition-colors">Get Help</p>
                      <p className="text-sm text-muted-foreground mt-1">Contact support</p>
                    </div>
                    <HelpCircle className="w-5 h-5 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {activeTab === "history" && (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle>Billing History</CardTitle>
                <CardDescription>View and download your past invoices</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-hidden rounded-lg">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50 border-b">
                        <th className="py-4 px-6 text-left font-semibold text-muted-foreground">Invoice ID</th>
                        <th className="py-4 px-6 text-left font-semibold text-muted-foreground">Date</th>
                        <th className="py-4 px-6 text-left font-semibold text-muted-foreground">Amount</th>
                        <th className="py-4 px-6 text-left font-semibold text-muted-foreground">Status</th>
                        <th className="py-4 px-6 text-right font-semibold text-muted-foreground">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {billingHistory.map((item, index) => (
                        <motion.tr
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-b hover:bg-muted/30 transition-colors group"
                        >
                          <td className="py-4 px-6 font-medium group-hover:text-blue-600 transition-colors">
                            {item.id}
                          </td>
                          <td className="py-4 px-6">{item.date}</td>
                          <td className="py-4 px-6 font-medium">{item.amount}</td>
                          <td className="py-4 px-6">
                            {item.status === "Paid" ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Paid
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                <Clock className="w-3 h-3 mr-1" />
                                Pending
                              </Badge>
                            )}
                          </td>
                          <td className="py-4 px-6 text-right">
                            {item.invoiceUrl ? (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                asChild
                              >
                                <a href={item.invoiceUrl}>
                                  <Download className="w-4 h-4" />
                                  Download
                                </a>
                              </Button>
                            ) : (
                              <span className="text-muted-foreground text-sm">Available after payment</span>
                            )}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === "payment" && (
          <motion.div
            key="payment"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </CardTitle>
                <CardDescription>Manage your payment details and billing information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-lg shadow-sm border">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Visa ending in 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 04/27</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      Remove
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}