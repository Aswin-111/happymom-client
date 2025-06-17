"use client";

import { useEffect, useState } from "react";
import interceptor from "@/app/utils/admin.interceptor";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "react-hot-toast";

export default function AdminListPage() {
  const [admins, setAdmins] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  const fetchAdmins = async () => {
    try {
      const res = await interceptor.get("/admin/getadmins");
      setAdmins(res.data.admins || []);
    } catch (err) {
      toast.error("Failed to fetch admins");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, password, confirmPassword } = formData;

    if (!name || !phone || !password) return toast.error("All fields are required");
    if (!/^\d{10}$/.test(phone)) return toast.error("Phone must be 10 digits");
    if (password.length < 6) return toast.error("Password must be at least 6 characters");
    if (password !== confirmPassword) return toast.error("Passwords do not match");

    try {
      setLoading(true);
      await interceptor.post("/admin/create-admin", { name, phone, password });
      toast.success("Admin created successfully");
      setFormData({ name: "", phone: "", password: "", confirmPassword: "" });
      setOpen(false);
      fetchAdmins();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-background">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admins</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Create Admin</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Admin</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" name="password" value={formData.password} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {admins.map((admin) => (
          <Card key={admin._id}>
            <CardContent className="p-4 space-y-1">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{admin.name}</p>
                  <p className="text-muted-foreground text-sm">{admin.phone}</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    {admin.role === "superadmin" ? null : <Button variant="destructive" size="sm">Delete</Button>}
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Delete</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to delete this admin?</p>
                    <DialogFooter>
                      <Button variant="ghost">Cancel</Button>
                      <Button
                        variant="destructive"
                        onClick={async () => {
                          try {
                            await interceptor.delete(`/admin/delete-admin/${admin._id}`);
                            toast.success("Admin deleted successfully");
                            fetchAdmins();
                          } catch (err) {
                            toast.error(err.response?.data?.message || "Failed to delete");
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

        ))}
      </div>
    </div>
  );
}
