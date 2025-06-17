// import Link from "next/link";

// export default function WalletPage() {
//   return (
//     <div className="relative flex min-h-screen flex-col justify-between bg-[#141414] overflow-x-hidden font-sans">
//       <div>
//         {/* Top Navigation Bar */}
//         <div className="flex items-center bg-[#141414] p-4 pb-2 justify-between">
//           <div className="text-white flex size-12 shrink-0 items-center">
//             <Link href="/" className="inline-flex">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24px"
//                 height="24px"
//                 fill="currentColor"
//                 viewBox="0 0 256 256"
//               >
//                 <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
//               </svg>
//             </Link>
//           </div>
//           <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
//             Wallet
//           </h2>
//         </div>

//         {/* Wallet Card */}
//         <div className="p-4">
//           <div
//             className="bg-cover bg-center flex flex-col items-stretch justify-end rounded-xl pt-[132px]"
//             style={{
//               backgroundImage:
//                 'linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0,0,0,0)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCSr-7TmiSIoeCxg67wOvkEdnqB_rjSEAU_pWnb1HZnLkwf7IkXenVlVLfNQ_gsmkcWktCa0vHDilhLEr1rlqyHm6Ze-sjVYBeG3J-qQBeN3o-JLroRGZjQp-8rVDnaPVqHKF9jvAPBKTGqyHXTd3W7xfnBrFEM0nX73DGbmU_ROuSYsyU9UBkfGhNI1KcHTMPbzPRKG7srC25Q1pr0MLFRd4ToMysmRfoTY2rCIb27R-LicYFf1XpO2xbNleRs8Gr3RVAjoWisNFc")',
//             }}
//           >
//             <div className="flex w-full items-end justify-between gap-4 p-4">
//               <div className="flex max-w-[440px] flex-1 flex-col gap-1">
//                 <p className="text-white text-2xl font-bold leading-tight">
//                   Gross Balance
//                 </p>
//                 <p className="text-white text-base font-medium">$1,250</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Balance Cards Grid */}
//         <div className="grid grid-cols-2 gap-4 px-4 py-3">
//           {/* Balance Card */}
//           <div className="flex flex-col justify-between rounded-xl bg-[#303030] p-4 min-h-[80px]">
//             <p className="text-white text-sm font-bold mb-1">Balance</p>
//             <p className="text-white text-lg font-semibold">$1,000</p>
//           </div>

//           {/* Withdrawable Balance Card */}
//           <div className="flex flex-col justify-between rounded-xl bg-[#303030] p-4 min-h-[80px]">
//             <p className="text-white text-sm font-bold mb-1">
//               Withdrawable Balance
//             </p>
//             <p className="text-white text-lg font-semibold">$800</p>
//           </div>
//         </div>

//         {/* Transactions Title */}
//         <h2 className="text-white text-[22px] font-bold tracking-[-0.015em] px-4 pb-3 pt-5">
//           Transactions
//         </h2>

//         {/* Transaction List */}
//         {[
//           { amount: "+$500", label: "Referral Bonus" },
//           { amount: "+$500", label: "Referral Bonus" },
//           { amount: "+$250", label: "Referral Bonus" },
//         ].map((txn, i) => (
//           <div
//             key={i}
//             className="flex items-center gap-4 bg-[#141414] px-4 min-h-[72px] py-2 justify-between"
//           >
//             <div className="flex flex-col justify-center">
//               <p className="text-white text-base font-medium">
//                 Course Referral
//               </p>
//               <p className="text-[#ababab] text-sm">{txn.label}</p>
//             </div>
//             <div className="shrink-0">
//               <p className="text-white text-base font-normal">{txn.amount}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Withdraw Button */}
//       <div>
//         <div className="flex px-4 py-3">
//           <button className="flex flex-1 h-12 px-5 items-center justify-center rounded-full bg-black text-white text-base font-bold">
//             <span className="truncate">Withdraw</span>
//           </button>
//         </div>
//         <div className="h-5 bg-[#141414]" />
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState, useRef, useCallback } from "react";
// import Link from "next/link";
// import { FaShareAlt } from "react-icons/fa";
// import interceptor from "@/app/utils/interceptor";
// import toast, { Toaster } from "react-hot-toast";

// export default function WalletPage() {
//   const [wallet, setWallet] = useState({ wallet_balance: 0 });
//   const [incentives, setIncentives] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [withdrawPopup, setWithdrawPopup] = useState(false);
//   const [withdrawAmount, setWithdrawAmount] = useState("");
//   const [withdrawLoading, setWithdrawLoading] = useState(false);
//   const observer = useRef();

//   useEffect(() => {
//     async function fetchWallet() {
//       try {
//         const res = await interceptor.get("/wallet/getwallet");
//         setWallet(res.data);
//       } catch (err) {
//         toast("Failed to fetch wallet balance");
//       }
//     }
//     fetchWallet();
//   }, []);

//   const fetchIncentives = async (pageNum = 1) => {
//     if (loading || !hasMore) return;
//     setLoading(true);
//     try {
//       const res = await interceptor.get(
//         `/wallet/getincentives?page=${pageNum}&limit=10`
//       );
//       const data = res.data.incentives || [];
//       setIncentives((prev) =>
//         pageNum === 1
//           ? data
//           : [...prev, ...data.filter((i) => !prev.some((p) => p._id === i._id))]
//       );
//       setHasMore(res.data.hasMore);
//     } catch (err) {}
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchIncentives(page);
//   }, [page]);

//   const lastIncentiveRef = useCallback(
//     (node) => {
//       if (loading) return;
//       if (observer.current) observer.current.disconnect();
//       observer.current = new window.IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting && hasMore) {
//           setPage((prev) => prev + 1);
//         }
//       });
//       if (node) observer.current.observe(node);
//     },
//     [loading, hasMore]
//   );

//   const handleWithdraw = async () => {
//     if (!withdrawAmount || isNaN(withdrawAmount) || Number(withdrawAmount) <= 0)
//       return;
//     setWithdrawLoading(true);
//     try {
//       await interceptor.put("/wallet/redeem", {
//         amount: Number(withdrawAmount),
//       });
//       setWithdrawPopup(false);
//       setWithdrawAmount("");
//       const res = await interceptor.get("/wallet/getwallet");
//       setWallet(res.data);
//     } catch (err) {
//       toast.error(err.response.data.message);
//     }
//     setWithdrawLoading(false);
//   };

//   return (
//     <div className="relative flex min-h-screen flex-col justify-between bg-[#141414] overflow-x-hidden font-sans">
//       <Toaster />
//       <div>
//         <div className="flex items-center bg-[#141414] p-4 pb-2 justify-between">
//           <div className="text-white flex size-12 shrink-0 items-center">
//             <Link href="/" className="inline-flex">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 fill="currentColor"
//                 viewBox="0 0 256 256"
//               >
//                 <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
//               </svg>
//             </Link>
//           </div>
//           <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
//             Wallet
//           </h2>
//         </div>

//         <div className="p-4">
//           <div
//             className="bg-cover bg-center flex flex-col items-stretch justify-end rounded-xl pt-[132px]"
//             style={{
//               backgroundImage:
//                 'linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0,0,0,0)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCSr-7TmiSIoeCxg67wOvkEdnqB_rjSEAU_pWnb1HZnLkwf7IkXenVlVLfNQ_gsmkcWktCa0vHDilhLEr1rlqyHm6Ze-sjVYBeG3J-qQBeN3o-JLroRGZjQp-8rVDnaPVqHKF9jvAPBKTGqyHXTd3W7xfnBrFEM0nX73DGbmU_ROuSYsyU9UBkfGhNI1KcHTMPbzPRKG7srC25Q1pr0MLFRd4ToMysmRfoTY2rCIb27R-LicYFf1XpO2xbNleRs8Gr3RVAjoWisNFc")',
//             }}
//           >
//             <div className="flex w-full items-end justify-between gap-4 p-4">
//               <div className="flex max-w-[440px] flex-1 flex-col gap-1">
//                 <p className="text-white text-2xl font-bold leading-tight">
//                   Gross Balance
//                 </p>
//                 <p className="text-white text-base font-medium">
//                   ₹{wallet.wallet_balance?.toLocaleString("en-IN") ?? "0.00"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4 px-4 py-3">
//           <div className="flex flex-col justify-between rounded-xl bg-[#303030] p-4 min-h-[80px]">
//             <p className="text-white text-sm font-bold mb-1">Balance</p>
//             <p className="text-white text-lg font-semibold">
//               ₹{wallet.wallet_balance?.toLocaleString("en-IN") ?? "0.00"}
//             </p>
//           </div>
//           <div className="flex flex-col justify-between rounded-xl bg-[#303030] p-4 min-h-[80px]">
//             <p className="text-white text-sm font-bold mb-1">
//               Withdrawable Balance
//             </p>
//             <p className="text-white text-lg font-semibold">
//               ₹{wallet.wallet_balance?.toLocaleString("en-IN") ?? "0.00"}
//             </p>
//           </div>
//         </div>

//         <h2 className="text-white text-[22px] font-bold tracking-[-0.015em] px-4 pb-3 pt-5">
//           Transactions
//         </h2>

//         <div className="bg-[#141414] rounded-xl">
//           <div className="h-72 overflow-y-auto">
//             {incentives.length === 0 && !loading && (
//               <div className="text-center text-[#ababab] py-6">
//                 No incentives found.
//               </div>
//             )}
//             {incentives.map((inc, idx) => {
//               const isLast = incentives.length === idx + 1;
//               return (
//                 <div
//                   key={inc._id ?? idx}
//                   ref={isLast ? lastIncentiveRef : null}
//                   className="flex items-center gap-4 px-4 min-h-[72px] py-2 justify-between hover:bg-[#1f1f1f] text-white text-sm"
//                 >
//                   <div className="flex flex-col justify-center">
//                     <p className="font-medium">
//                       {inc.description ||
//                         inc.type ||
//                         (inc.user?.full_name ? `PM.${inc.user.full_name}` : "")}
//                     </p>
//                     <p className="text-[#ababab] text-xs">
//                       {inc.date ? inc.date.slice(0, 10) : ""}
//                     </p>
//                   </div>
//                   <div className="shrink-0">₹{inc.amount}</div>
//                 </div>
//               );
//             })}
//             {loading && (
//               <div className="text-center text-[#ababab] py-4">Loading...</div>
//             )}
//           </div>
//         </div>

//         <div className="flex px-4 py-3">
//           <button
//             onClick={() => setWithdrawPopup(true)}
//             className="flex flex-1 h-12 px-5 items-center justify-center rounded-full bg-black text-white text-base font-bold"
//           >
//             <span className="truncate">Withdraw</span>
//           </button>
//         </div>
//       </div>

//       {withdrawPopup && (
//         <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
//           <div className="bg-[#1e1e1e] rounded-xl shadow-lg p-6 w-80 max-w-full">
//             <h2 className="font-semibold text-white text-lg mb-4">
//               Withdraw Amount
//             </h2>
//             <input
//               type="number"
//               min="1"
//               value={withdrawAmount}
//               onChange={(e) => setWithdrawAmount(e.target.value)}
//               className="w-full border border-gray-600 bg-[#141414] text-white rounded px-3 py-2 mb-4 focus:outline-none focus:ring"
//               placeholder="Enter amount"
//             />
//             <div className="flex justify-end gap-2">
//               <button
//                 className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600"
//                 onClick={() => setWithdrawPopup(false)}
//                 disabled={withdrawLoading}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 rounded bg-gradient-to-r from-blue-500 to-green-400 text-white font-semibold shadow hover:scale-105 transition"
//                 onClick={handleWithdraw}
//                 disabled={withdrawLoading || !withdrawAmount}
//               >
//                 {withdrawLoading ? "Withdrawing..." : "Withdraw"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { FaShareAlt } from "react-icons/fa";
import interceptor from "@/app/utils/interceptor";
import toast, { Toaster } from "react-hot-toast";

export default function WalletPage() {
  const [wallet, setWallet] = useState({ wallet_balance: 0 });
  const [incentives, setIncentives] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [withdrawPopup, setWithdrawPopup] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const observer = useRef();

  useEffect(() => {
    async function fetchWallet() {
      try {
        const res = await interceptor.get("/wallet/getwallet");
        console.log(res.data, "data");
        setWallet(res.data);
      } catch (err) {
        toast("Failed to fetch wallet balance");
      }
    }
    fetchWallet();
  }, []);

  const fetchIncentives = async (pageNum = 1) => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await interceptor.get(
        `/wallet/getincentives?page=${pageNum}&limit=10`
      );
      console.log(res.data, "data");

      const data = res.data.incentives || [];
      setIncentives((prev) =>
        pageNum === 1
          ? data
          : [...prev, ...data.filter((i) => !prev.some((p) => p._id === i._id))]
      );
      setHasMore(res.data.hasMore);
    } catch (err) { }
    setLoading(false);
  };

  useEffect(() => {
    fetchIncentives(page);
  }, [page]);

  const lastIncentiveRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new window.IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleWithdraw = async () => {
    if (!withdrawAmount || isNaN(withdrawAmount) || Number(withdrawAmount) <= 0)
      return;
    setWithdrawLoading(true);
    try {
      await interceptor.put("/wallet/redeem", {
        amount: Number(withdrawAmount),
      });
      setWithdrawPopup(false);
      setWithdrawAmount("");
      const res = await interceptor.get("/wallet/getwallet");
      setWallet(res.data);
    } catch (err) {
      toast.error(err.response.data.message);
    }
    setWithdrawLoading(false);
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-[#141414] overflow-x-hidden font-sans pb-24">
      <Toaster />
      <div>
        <div className="flex items-center bg-[#141414] p-4 pb-2 justify-between">
          <div className="text-white flex size-12 shrink-0 items-center">
            <Link href="/" className="inline-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
              </svg>
            </Link>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
            Wallet
          </h2>
        </div>

        <div className="p-4">
          <div
            className="bg-cover bg-center flex flex-col items-stretch justify-end rounded-xl pt-[132px]"
            style={{
              backgroundImage:
                'linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0,0,0,0)), url("/wallet-hero.png")',
            }}
          >
            <div className="flex w-full items-end justify-between gap-4 p-4">
              <div className="flex max-w-[440px] flex-1 flex-col gap-1">
                <p className="text-white text-2xl font-bold leading-tight">
                  Gross Balance
                </p>
                <p className="text-white text-base font-medium">
                  ₹{wallet.wallet_balance?.toLocaleString("en-IN") ?? "0.00"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 px-4 py-3">
          <div className="flex flex-col justify-between rounded-xl bg-[#303030] p-4 min-h-[80px]">
            <p className="text-white text-sm font-bold mb-1">Balance</p>
            <p className="text-white text-lg font-semibold">
              ₹{wallet.wallet_balance?.toLocaleString("en-IN") ?? "0.00"}
            </p>
          </div>
          <div className="flex flex-col justify-between rounded-xl bg-[#303030] p-4 min-h-[80px]">
            <p className="text-white text-sm font-bold mb-1">
              Withdrawable Balance
            </p>
            <p className="text-white text-lg font-semibold">
              ₹{wallet.withdrawable_amount?.toLocaleString("en-IN") ?? "0.00"}
            </p>
          </div>
        </div>

        <h2 className="text-white text-[22px] font-bold tracking-[-0.015em] px-4 pb-3 pt-5">
          Transactions
        </h2>

        <div className="bg-[#141414] rounded-xl">
          <div className="h-72 overflow-y-auto">
            {incentives.length === 0 && !loading && (
              <div className="text-center text-[#ababab] py-6">
                Incentives not found.
              </div>
            )}
            {incentives.map((inc, idx) => {
              const isLast = incentives.length === idx + 1;
              const isCredit = inc.type === "credit"; // optional, define based on your data
              return (
                <div
                  key={inc._id ?? idx}
                  ref={isLast ? lastIncentiveRef : null}
                  className="flex justify-between items-center gap-3 px-4 py-3 hover:bg-[#1f1f1f] border-b border-[#2a2a2a]"
                >
                  {/* LEFT: ICON + DETAILS */}
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {/* Replace with dynamic icon based on type */}
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#2a2a2a] text-white">
                        +
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold text-white leading-tight">
                        {inc.description || inc.type || inc.user?.full_name || "Incentive"}
                      </p>
                      <p className="text-xs text-[#ababab]">
                        {inc.date?.slice(0, 10) || "Date Unknown"}
                      </p>
                      {inc.user?.status && (
                        <span
                          className={`text-xs mt-1 px-2 py-0.5 rounded-full w-fit ${inc.user.status === "active"
                            ? "bg-green-900/30 text-green-400"
                            : "bg-red-900/30 text-red-400"
                            }`}
                        >
                          {inc.user.status[0].toUpperCase() + inc.user.status.slice(1)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* RIGHT: AMOUNT */}
                  <div
                    className={`text-sm font-semibold ${inc.user.status === "active" ? "text-green-400" : "text-red-400"
                      }`}
                  >
                    ₹{inc.amount?.toLocaleString("en-IN") ?? "0.00"}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="text-center text-[#ababab] py-4">Loading...</div>
            )}
          </div>
        </div>
      </div>

      <div className=" px-4">
        <button
          onClick={() => setWithdrawPopup(true)}
          className="w-full h-12 px-5 rounded-xl bg-black text-white text-base font-bold"
        >
          Withdraw
        </button>
      </div>

      {withdrawPopup && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-[#1e1e1e] rounded-xl shadow-lg p-6 w-80 max-w-full">
            <h2 className="font-semibold text-white text-lg mb-4">
              Withdraw Amount
            </h2>
            <input
              type="number"
              min="1"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="w-full border border-gray-600 bg-[#141414] text-white rounded px-3 py-2 mb-4 focus:outline-none focus:ring"
              placeholder="Enter amount"
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-700 text-white font-semibold hover:bg-gray-600"
                onClick={() => setWithdrawPopup(false)}
                disabled={withdrawLoading}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-black text-white font-semibold shadow hover:scale-105 transition"
                onClick={handleWithdraw}
                disabled={withdrawLoading || !withdrawAmount}
              >
                {withdrawLoading ? "Withdrawing..." : "Withdraw"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
