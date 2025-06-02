"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import interceptor from "@/app/utils/admin.interceptor.js";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Tabs from "../Tab/Tab.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function UserDashboard() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [tab, setTab] = useState("users");
  const [referralData, setReferralData] = useState(null);
  const [nodes, setNodes] = useState("top");
  const searchParams = useSearchParams();
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const fetchData = async (yearParam, nodeType) => {
    try {
      console.log(yearParam, nodeType, "qwerty");
      const res = await interceptor.get(
        `/admin/userdashboard?id=${id}&nodes=${nodeType}&referral_query=${yearParam}`
      );
      setReferralData(res.data);
    } catch (err) {
      console.error("API error", err);
    }
  };

  useEffect(() => {
    console.log("qwer", id);

    if (id) fetchData(year, nodes);
  }, [id, year, nodes]);

  const chartData = referralData
    ? Object.entries(referralData.referral_query_data || {})
        .filter(([key]) => key !== "year")
        .map(([month, value]) => ({ month, value }))
    : [];

  return (
    <div className="space-y-4 p-4 h-screen flex flex-col">
      <Tabs selected={tab} onChange={setTab} router={router} id={id} />

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Referrals by Month ({year})</h2>
        <Select
          value={year.toString()}
          onValueChange={(val) => setYear(Number(val))}
        >
          <SelectTrigger className="w-28">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {[2023, 2024, 2025, 2026].map((yr) => (
              <SelectItem key={yr} value={yr.toString()}>
                {yr}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full h-72 bg-white p-4 rounded-xl border">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex gap-2 mt-2">
        <Button
          variant={nodes === "top" ? "default" : "outline"}
          onClick={() => setNodes("top")}
        >
          Top
        </Button>
        <Button
          variant={nodes === "under" ? "default" : "outline"}
          onClick={() => setNodes("under")}
        >
          Under
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {referralData?.users?.map((user) => (
            <Card
              key={user._id}
              className="p-4 bg-white border rounded-xl shadow-sm"
            >
              <CardContent className="space-y-2">
                <h3 className="text-lg font-medium">{user.full_name}</h3>
                <p className="text-sm text-gray-600">📞 {user.phone}</p>
                <p className="text-sm text-gray-600">📧 {user.email}</p>
                <p className="text-sm text-gray-600">
                  Referred by: {user.referred_by?.full_name || "N/A"}
                </p>
                <p className="text-sm text-gray-600">Status: {user.status}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
