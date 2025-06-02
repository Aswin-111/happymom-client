"use client";

import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast, Toaster } from "react-hot-toast";
import { UploadIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import interceptor from "@/app/utils/admin.interceptor";
import { useRouter } from "next/navigation";

export default function AuthorizeUsers() {
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await interceptor.post("/admin/authorizeusers", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      toast.success(res.data.message);
      setFile(null);
      setTimeout(() => location.reload(), 2000);
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setOpen(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Card className="p-6 shadow-sm">
        <CardContent className="space-y-4">
          <h2 className="text-lg font-semibold">Authorize Users via Excel</h2>
          <Input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />

          {file && (
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-700">
              <UploadIcon className="w-4 h-4" />
              <span>{file.name}</span>
            </div>
          )}

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button disabled={!file} className="mt-4 w-full">
                Upload
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Upload</DialogTitle>
              </DialogHeader>
              <p>Are you sure you want to authorize users from this file?</p>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpload}>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <Toaster />
    </div>
  );
}
