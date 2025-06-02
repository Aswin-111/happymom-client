// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { FiDownload } from "react-icons/fi";
// import interceptor from "@/app/utils/admin.interceptor";

// export default function WalletExportPage() {
//   const [loading, setLoading] = useState(false);

//   const handleExport = async () => {
//     try {
//       setLoading(true);
//       const response = await interceptor.get(`/admin/exportwallet`, {
//         responseType: "blob", // Important for file download
//       });

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "wallets_pending.xlsx");
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (error) {
//       alert("Failed to export wallet records");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center  p-4">
//       <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
//         <h1 className="text-xl font-semibold mb-4">Export Wallet Records</h1>
//         <p className="mb-6 text-gray-600">
//           Download a list of users with pending wallet payouts.
//         </p>
//         <Button
//           onClick={handleExport}
//           disabled={loading}
//           className="w-full flex items-center justify-center gap-2"
//         >
//           <FiDownload className="text-lg" />
//           {loading ? "Downloading..." : "Download XLSX"}
//         </Button>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import interceptor from "@/app/utils/admin.interceptor";
import { FiDownload, FiDollarSign } from "react-icons/fi";

export default function WalletExportPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [approving, setApproving] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionType, setActionType] = useState(null); // "download", "approve", or "redeem"

  const fetchProcessingWallets = async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "5",
      });
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const res = await interceptor.get(
        `/admin/getprocessingwallets?${params.toString()}`
      );
      setData(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching processing wallets", err);
    }
  };

  useEffect(() => {
    fetchProcessingWallets();
  }, [page]);

  const handleFilter = () => {
    setPage(1);
    fetchProcessingWallets();
  };

  const handleDownload = async () => {
    try {
      setLoading(true);
      const res = await interceptor.get(`/admin/exportprocessingwallets`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "wallets_processing.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Download failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveAll = async () => {
    try {
      setApproving(true);
      const res = await interceptor.put(`/admin/approveallwallets`);
      alert(res.data.message);
      fetchProcessingWallets();
    } catch (err) {
      console.error("Approve failed", err);
    } finally {
      setApproving(false);
    }
  };
  const handleExport = async () => {
    try {
      setLoading(true);
      const response = await interceptor.get(`/admin/exportwallet`, {
        responseType: "blob", // Important for file download
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "wallets_pending.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert("Failed to export wallet records");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "approve" && "Approve All Wallets"}
              {actionType === "download" && "Download Wallets"}
              {actionType === "redeem" && "Redeem Pending Wallets"}
            </DialogTitle>
          </DialogHeader>

          <p className="text-sm text-gray-600 mt-2">
            {actionType === "approve" &&
              "This will mark all processing wallets as paid. Do you want to continue?"}
            {actionType === "download" &&
              "This will download all processing wallet records as Excel. Continue?"}
            {actionType === "redeem" &&
              "This will export and mark all pending wallets as processing. Continue?"}
          </p>

          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={async () => {
                setDialogOpen(false);
                if (actionType === "approve") await handleApproveAll();
                if (actionType === "download") await handleDownload();
                if (actionType === "redeem") await handleExport();
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-xl font-bold">Processing Wallets</h2>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => {
                setActionType("approve");
                setDialogOpen(true);
              }}
              disabled={approving}
            >
              {approving ? "Approving..." : "Approve All"}
            </Button>
            <Button
              onClick={() => {
                setActionType("download");
                setDialogOpen(true);
              }}
              disabled={loading}
            >
              <FiDownload className="mr-2" />
              {loading ? "Downloading..." : "Download"}
            </Button>
            <Button
              onClick={() => {
                setActionType("redeem");
                setDialogOpen(true);
              }}
              disabled={loading}
            >
              <FiDollarSign className="mr-2" />
              {loading ? "Redeeming..." : "Redeem All"}
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="block text-sm text-gray-600">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border px-2 py-1 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border px-2 py-1 rounded-md"
            />
          </div>
          <Button onClick={handleFilter}>Filter</Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Bank</TableHead>
              <TableHead>Account</TableHead>
              <TableHead>IFSC</TableHead>
              <TableHead>PAN</TableHead>
              <TableHead>Redeem Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((wallet) => (
              <TableRow key={wallet.id}>
                <TableCell>{wallet.full_name}</TableCell>
                <TableCell>{wallet.phone}</TableCell>
                <TableCell>{wallet.status}</TableCell>
                <TableCell>{wallet.amount}</TableCell>
                <TableCell>{wallet.bank_name}</TableCell>
                <TableCell>{wallet.bank_account_num}</TableCell>
                <TableCell>{wallet.bank_ifsc_code}</TableCell>
                <TableCell>{wallet.pan_num}</TableCell>
                <TableCell>{wallet.redeem_date?.slice(0, 10)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-center gap-4 items-center pt-4">
          <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Prev
          </Button>
          <span className="text-sm text-gray-700">
            Page {page} of {totalPages}
          </span>
          <Button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
