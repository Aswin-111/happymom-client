"use client";
import React, { useEffect, useState } from "react";
import interceptor from "@/app/utils/admin.interceptor.js";

import { Card, CardContent } from "@/components/ui/card";
import Tabs from "../../Tab/Tab.jsx";
import { useRouter, useParams } from "next/navigation";

export default function WalletPage() {
  const [walletData, setWalletData] = useState(null);
  const [tab, setTab] = useState("wallet");
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await interceptor.get(
          `/admin/getuserwallet?id=${id}`
        );
        setWalletData(res.data);
      } catch (err) {
        console.error("Failed to fetch wallet data", err);
      }
    };
    fetchWallet();
  }, []);

  return (
    <div className="space-y-4 p-4 h-screen flex flex-col">
      <Tabs selected={tab} onChange={setTab} router={router} id={id} />

      {walletData && (
        <Card className="bg-white border shadow-sm p-4">
          <CardContent className="space-y-1">
            <h3 className="text-lg font-semibold">
              Wallet Balance: ₹{walletData.wallet_balance}
            </h3>
            <p className="text-sm text-gray-600">
              Withdrawable: ₹{Math.floor(walletData.wallet_balance)}
            </p>
          </CardContent>
        </Card>
      )}

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {walletData?.incentive_desc?.map((entry) => (
            <Card
              key={entry._id}
              className="p-4 bg-white border rounded-xl shadow-sm"
            >
              <CardContent className="space-y-2">
                <h3 className="text-base font-medium">₹{entry.amount}</h3>
                <p className="text-sm text-gray-600">{entry.desc}</p>
                <p className="text-sm text-gray-500">
                  {new Date(entry.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
