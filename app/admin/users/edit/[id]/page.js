"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import interceptor from "@/app/utils/admin.interceptor";
import Tabs from "../../Tab/Tab.jsx";

export default function EditUserDetailsPage() {
  const [tab, setTab] = useState("edit details");

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const params = useParams();
  const userId = params?.id;

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await interceptor.get(`/admin/getedituser/?id=${userId}`);
      console.log(res.data);
      if (res.data?.success) {
        setPhone(res.data.user.phone);
      }
    })();
  }, []);
  const handleReset = async () => {
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
    }
    if (phone) {
      if (!/^\d{10}$/.test(phone)) {
        toast.error("Phone number must be 10 digits");
        return;
      }
    }
    if (!userId) {
      toast.error("Missing user ID");
      return;
    }

    try {
      const res = await interceptor.put("/admin/edituser", {
        id: userId,
        phone,
        password,
      });
      console.log(res.data);
      if (res.data?.success) {
        toast.success(res.data.message || "User details updated successfully");
        router.refresh();
        // setPhone("");
        setPassword("");
        setConfirmPassword("");
      } else {
        toast.error("Unexpected response from server");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user details");
    }
  };

  return (
    <div className="p-4 h-screen ">
      <Tabs selected={tab} onChange={setTab} router={router} id={userId} />

      <div className="flex justify-center items-start mt-12">
        <Card className="p-6 shadow-sm w-full max-w-md">
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Edit User Details
            </h2>
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="New Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button className="w-full" onClick={handleReset}>
                Reset Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
