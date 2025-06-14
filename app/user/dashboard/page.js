"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import interceptor from "@/app/utils/interceptor.js";
import { useRouter } from "next/navigation";



export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef();
  const router = useRouter();

  useEffect(() => {
    setReferrals([]);
    setPage(1);
    setHasMore(true);
    fetchUserData();
  }, []);

  useEffect(() => {
    fetchReferrals(page);
  }, [page]);

  const fetchUserData = async () => {
    try {
      const res = await interceptor.get("/user/dashboard/user");
      setUserData(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Failed to fetch user data", err);
    }
  };

  const fetchReferrals = async (pageNum = 1) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await interceptor.get(
        `/user/dashboard/referrals?page=${pageNum}&limit=10`
      );
      const data = res.data.referrals || [];
      console.log(data, 'data')
      if (data.length > 0) {
        if (pageNum === 1) {
          setReferrals(data);
        } else {
          const existingIds = new Set(referrals.map((ref) => ref._id));
          const uniqueNewReferrals = data.filter(
            (ref) => !existingIds.has(ref._id)
          );
          setReferrals((prev) => [...prev, ...uniqueNewReferrals]);
        }
        setHasMore(data.length === 10);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Failed to fetch referrals", err);
    } finally {
      setLoading(false);
    }
  };

  const lastReferralRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, loading]
  );

  const handleCardClick = (id) => {
    router.push(`/user/dashboard?id=${id}`);
  };

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#141414]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  const isAdmin = userData.role === "admin";

  return (
    <div
      className="relative flex flex-col min-h-screen bg-[#141414] text-white"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center p-4 pb-2 justify-center">
        <h2 className="text-lg font-bold text-center">Happymom</h2>
      </div>

      {/* Profile Card */}
      {/* <div className="p-4">
        <div className="flex items-stretch justify-between gap-4 rounded-xl bg-[#212121] p-4 shadow">
          <div className="flex flex-col gap-1 flex-[2_2_0px]">
            <p className="text-white text-base font-bold">
              {userData.name}
            </p>
            <p className="text-[#ababab] text-sm">
              {userData.phone} | {userData.designation}
            </p>
          </div>
        </div>
      </div> */}

    
    <div className="p-4">
      <div className="flex items-center justify-between gap-4 rounded-lg bg-[#212121] p-4 shadow">
        {/* Left side: Name and Phone */}
        <div className="flex flex-col gap-1">
          <p className="text-white text-base font-bold">{userData.name}</p>
          <p className="text-[#ababab] text-sm">{userData.phone}</p>
        </div>

        {/* Right side: Role and Status */}
        <div className="flex flex-col items-end gap-1">
          <span className="px-2 py-1 text-xs font-medium  text-white ">
            {userData.designation}
          </span>
          <span className="text-xs text-green-400 bg-green-900/30 rounded-lg px-3 py-1 h-fit whitespace-nowrap">
           {userData.status?.slice(0, 1)?.toUpperCase() + userData.status?.slice(1)}
          </span>
        </div>
      </div>
    </div>
 


      {/* Action Buttons */}
      {/* <div className="flex justify-stretch">
        <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-between">
          <button className="rounded-full h-10 px-4 bg-[#303030] text-white text-sm font-bold">
            Password Reset
          </button>
          {isAdmin && (
            <button className="rounded-full h-10 px-4 bg-[#303030] text-white text-sm font-bold">
              Incentives
            </button>
          )}
          <button className="rounded-full h-10 px-4 bg-[#303030] text-white text-sm font-bold">
            Wallet
          </button>
        </div>
      </div> */}

      {/* Referrals Section */}
      <h2 className="text-white text-[22px] font-bold px-4 pb-3 pt-2 mt-7">
        Your Referrals
      </h2>

      <div className="px-2 pb-32 overflow-y-auto scrollbar-none h-[calc(100vh-270px)]">
        {referrals.length === 0 && !loading ? (
          <div className="text-center py-8 text-[#ababab]">
            No referrals found. Start referring to earn rewards!
          </div>
        ) : (
          referrals.map((ref, idx) => {
            const isLast = referrals.length === idx + 1;
            return (
              <div className="p-2 " key={`${ref._id}-${idx}`}>
                <div
                  ref={isLast ? lastReferralRef : null}
                  onClick={() => handleCardClick(ref._id)}
                  className="flex items-stretch justify-between gap-4 rounded-xl bg-[#212121]  p-4 shadow cursor-pointer hover:bg-[#2a2a2a] transition-colors"
                >
                  {/* <div className="flex flex-col gap-1 flex-[2_2_0px] ">
                    <p className="text-white text-base font-bold leading-tight">
                      {ref.full_name}
                    </p>
                    <p className="text-[#ababab] text-sm">
                      {ref.phone} 
                    </p>
                  <p className="text-[#ababab] text-sm">
                      {ref.email || "N/A"}
                    </p>
                  </div> */}
               
   
      <div className="flex flex-col gap-1 flex-[2_2_0px]">
        <p className="text-white text-base font-bold leading-tight">
          {ref.full_name}
        </p>
        <p className="text-[#ababab] text-sm"> {ref.phone} </p>
        <p className="text-[#ababab] text-sm">  {ref.email || "N/A"}</p>
      </div>
      <span className={`text-xs  ${ref.status === "active" ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}  rounded-full px-3 py-1 h-fit whitespace-nowrap`}>
      {ref.status?.slice(0, 1)?.toUpperCase() + ref.status?.slice(1)}
      </span>
    </div>
 

                </div>
             
            );
          })
        )}

        {loading && (
          <div className="flex justify-center py-4">
            <div className="animate-spin h-6 w-6 border-t-2 border-white rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
}
