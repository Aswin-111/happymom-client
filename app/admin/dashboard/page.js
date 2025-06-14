"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Phone, ShieldCheck } from "lucide-react";
import interceptor from "@/app/utils/admin.interceptor"
import { set } from "date-fns";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [totalusers, setTotalUsers] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const router = useRouter();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await interceptor.get("/admin/dashusers");
        setUsers(res.data.users);
        setTotalUsers(res.data.totalusers);
      } catch (err) {
        console.error("Failed to load users", err);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.full_name.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search);
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="h-screen flex flex-col">
      <h1 className="mt-5 ">Total users : {totalusers}</h1>

      <div className="p-4 bg-white border-b sticky top-0 z-10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Select
            onValueChange={(val) => setRoleFilter(val)}
            defaultValue="all"
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Search by name or phone"
            className="flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <Card
              key={user._id}
              className="p-4 bg-white border rounded-2xl shadow-md hover:shadow-lg transition"
              onClick={() => {
                router.push(`/admin/users/${user._id}`);
              }}
            >
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="text-blue-600" />
                  <h3 className="text-base font-semibold">{user.full_name}</h3>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">{user.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-sm capitalize">{user.role}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
