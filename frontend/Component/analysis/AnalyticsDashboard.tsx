'use client'
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area
} from "recharts";
import { ShoppingCart, Users, Package, DollarSign } from "lucide-react";
import { useState } from "react";
import { AnalysisData} from "@/utils/types";
import { numConvert } from "@/utils/utils";



const orderStatus = [
    { name: "Shipped", value: 40, color: "#3b82f6" },
    { name: "Processing", value: 35, color: "#f59e0b" },
    { name: "Pending", value: 15, color: "#22c55e" },
    { name: "Cancelled", value: 10, color: "#ef4444" },
];

export default function AnalyticsDashboard({data2}:{data2?: AnalysisData}) {
    if(!data2){
        return(<>
            <h1>No Data</h1>
        </>)
    }
    const stats = [
      { title: "Total Sales", value: `₹${numConvert(data2.revenue)}`, icon: DollarSign, color: "bg-blue-100 text-blue-600" },
      { title: "Orders", value: `${data2.orders}`, icon: ShoppingCart, color: "bg-orange-100 text-orange-600" },
      { title: "New Customers", value: `${data2.totalUsers}`, icon: Users, color: "bg-purple-100 text-purple-600" },
      { title: "Product Sold", value: `${data2.productsTotal}`, icon: Package, color: "bg-indigo-100 text-indigo-600" },
    ];
    const pieData = data2.orderStatus.map((item, index) => ({
        name: item._id,
        value: item.total,
        color: orderStatus[index].color
    }));
    const [view, setView] = useState("monthly");

    const data = view === "monthly" ? data2.monthlySalesData : data2.weeklySalesData;
  return (
    <div className="p-6 bg-gray-50 h-full space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
        <span className="text-sm text-gray-500">Yearly Data</span>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-md/15 flex items-center gap-4 hover:scale-105 transition-all duration-300 ease-in-out">
            <div className={`p-3 rounded-lg ${item.color}`}>
              <item.icon size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">{item.title}</p>
              <h3 className="text-xl font-bold">{item.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* SALES REPORT */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold text-gray-700">Sales Report</h2>
          <select onChange={(e) => setView(e.target.value)} className="border rounded-md px-2 py-1 text-sm">
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              strokeWidth={3}
              fill="url(#blueGradient)"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* BOTTOM GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:h-80">

        {/* TOP PRODUCTS */}
        <div className="bg-white rounded-xl p-5 shadow-sm overflow-y-scroll">
          <h2 className="font-semibold mb-4">Top Products</h2>
          <ul className="space-y-3">
            {data2.bestProduct.map((p, i) => (
              <li key={i} className="flex justify-between hover:bg-zinc-400 p-1 text-sm">
                <span className="text-gray-600">{p.name}</span>
                <span className="font-semibold">{p.orders}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ORDER STATUS */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="font-semibold mb-4">Order Status</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={90}
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={pieData[index].color} />
                ))}
              </Pie>
              <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xl font-bold fill-gray-800"
                >
                    {data2.orders}
                </text>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* SALES BY CATEGORY */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="font-semibold mb-4">Sales by Category</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data2.productsByCategory}>
              <XAxis dataKey="productType" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
