"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast, Toaster } from "react-hot-toast";
import interceptor from "@/app/utils/admin.interceptor.js"


import Tabs from "../../Tab/Tab.jsx";

export default function CreditPointsPage() {
  const params = useParams();
  const userId = params?.id;
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [tab, setTab] = useState("credit points");
  const router = useRouter();
  const handleSend = async () => {
    if (!amount || !description || !userId) {
      toast.error("All fields including userId are required");
      return;
    }

    try {
      const res = await interceptor.post("/admin/add-credit-points", {
        userId,
        creditAmount: Number(amount),
        description,
      });

      if (res.data?.success) {
        toast.success(res.data.message || "Credit points added successfully");
        setAmount("");
        setDescription("");
      } else {
        toast.error("Unexpected response");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add credit points");
    }
  };

  return (
    <div className="p-4 h-screen">
      <Tabs selected={tab} onChange={setTab} router={router} id={userId} />
      <Toaster />
      <div className="flex justify-center items-start mt-12">
        <Card className="p-6 shadow-sm w-full max-w-md">
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Add Credit Points
            </h2>
            <div className="space-y-2">
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button className="w-full" onClick={handleSend}>
                Add Credit Points
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
