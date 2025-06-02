"use client";
import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import interceptor from "@/app/utils/admin.interceptor.js";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast, Toaster } from "react-hot-toast";
import Tabs from "../../Tab/Tab.jsx";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function SendIncentives() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [tab, setTab] = useState("incentives");
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const handleSend = async () => {
  
    if (!amount || !description) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const res = await interceptor.post("/admin/add-incentives", {
        userId: id,
        incentiveAmount: amount,
        desc: description,
      });
      console.log("in handlesend");
      console.log(res.data);
      toast.success(res.data.message);
      setAmount("");
      setDescription("");
    } catch (err) {
      toast.error("Failed to send incentive");
      console.error(err);
    } finally {
      setOpen(false);
    }
  };

  return (
    <div className="p-4 h-screen">
      <Tabs selected={tab} onChange={setTab} router={router} id={id} />

      <div className="flex justify-center items-start mt-12">
        <Toaster />
        <Card className="p-6 shadow-sm w-full max-w-md">
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Send Incentive
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
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">Send Incentive</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Incentive</DialogTitle>
                  </DialogHeader>
                  <p>
                    Are you sure you want to send ₹{amount} for `{description}`?
                  </p>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSend}>Confirm</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
