"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { toast, Toaster } from "react-hot-toast";
import interceptor from "@/app/utils/admin.interceptor";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState(null);
  const [eventDescription, setEventDescription] = useState("");
  const [eventImage, setEventImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchNotifications = async () => {
    try {
      const res = await interceptor.get("/admin/get-notifications");
      setNotifications(res.data.notifications);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch notifications");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleSubmit = async () => {
    if (
      !eventName ||
      !eventDate ||
      !eventDescription ||
      (!eventImage && !editId)
    ) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("event_name", eventName);
    formData.append("event_date", format(eventDate, "dd-MM-yyyy"));
    formData.append("event_description", eventDescription);
    if (eventImage) formData.append("event_image", eventImage);

    try {
      await interceptor.post("/admin/send-notification", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Notification saved");
      setOpen(false);
      setEventName("");
      setEventDate(null);
      setEventDescription("");
      setEventImage(null);
      setEditId(null);
      fetchNotifications();
    } catch (err) {
      console.error(err, "test");

      err.response.data.message
        ? toast.error(err.response.data.message)
        : toast.error("Failed to save notification");
    }
  };

  const handleEdit = (notif) => {
    setEventName(notif.event_name);
    setEventDate(new Date(notif.event_date));
    setEventDescription(notif.event_description);
    setEditId(notif._id);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await interceptor.post("/admin/delete-notification", {
        notification_id: id,
      });
      toast.success("Notification deleted");
      fetchNotifications();
    } catch (err) {
      toast.error("Failed to delete notification");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <Toaster />
      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Create New Notification</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editId ? "Edit" : "Create"} Notification
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <Label>Event Name</Label>
              <Input
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
              <Label>Event Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !eventDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {eventDate ? format(eventDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={eventDate}
                    onSelect={setEventDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Label>Event Description</Label>
              <Input
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
              />
              <Label>Event Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setEventImage(e.target.files[0])}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {notifications.map((notif) => (
        <Card key={notif._id} className="p-4">
          <CardContent className="space-y-1">
            <h3 className="font-semibold text-lg">{notif.event_name}</h3>
            <p className="text-sm text-gray-600">{notif.event_date}</p>
            <p className="text-sm">{notif.event_description}</p>
            <div className="flex gap-2 mt-2">
              <Button size="sm" onClick={() => handleEdit(notif)}>
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(notif._id)}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
