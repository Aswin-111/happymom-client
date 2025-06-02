"use client";

import React, { useEffect, useState } from "react";
import interceptor from "@/app/utils/interceptor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-hot-toast";

export default function Share() {
  const [referralLink, setReferralLink] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await interceptor.get("/user/getreferrallink");
        const link = response.data.referral_link;
        setReferralLink(link);

        // Optional: Copy to clipboard initially
        await navigator.clipboard.writeText(link);
      } catch (err) {
        console.error("Failed to fetch referral link", err);
      }
    })();
  }, []);

  const handleShare = async () => {
    try {
      const shareData = {
        title: "HappyMom Referral",
        text: "Join HappyMom using my referral link!",
        url: referralLink,
      };
      await navigator.share(shareData);
    } catch (error) {
      console.error("Sharing failed", error);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-8">
      <Card className="w-full max-w-md shadow-lg rounded-2xl border-0">
        <CardHeader>
          <CardTitle className="text-xl text-center font-bold text-gray-800">
            🎉 Invite Friends & Earn Rewards!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-sm text-gray-600">
            Hello there! Here’s your unique referral link. Share it with friends
            and family and get exclusive rewards when they join 💫
          </p>
          <div className="p-3 bg-white rounded-lg border border-gray-300 text-sm text-gray-800 break-all">
            {referralLink || "Loading..."}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={handleCopy} className="w-full sm:w-auto">
              Copy Link
            </Button>
            <Button
              onClick={handleShare}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Share Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
