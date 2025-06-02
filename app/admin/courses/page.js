"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast, Toaster } from "react-hot-toast";
import interceptor from "@/app/utils/admin.interceptor";

export default function CoursePage() {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [courseName, setCourseName] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [courseLink, setCourseLink] = useState("");
  const [courseImage, setCourseImage] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await interceptor.get("/admin/courses");
      setCourses(res.data.courses || []);
    } catch (err) {
      toast.error("Failed to fetch courses");
    }
  };

  const handleCreate = async () => {
    if (!courseName.trim()) {
      toast.error("Course name is required");
      return;
    }

    if (!coursePrice.trim() || isNaN(coursePrice)) {
      toast.error("Valid course price is required");
      return;
    }

    if (!courseImage) {
      toast.error("Course image is required");
      return;
    }

    const formData = new FormData();
    formData.append("course_name", courseName);
    formData.append("course_price", coursePrice);
    if (courseLink) formData.append("course_link", courseLink);
    formData.append("course_image", courseImage);

    setLoading(true);
    try {
      await interceptor.post("/admin/course", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Course created");
      resetForm();
      fetchCourses();
    } catch (err) {
      toast.error("Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setOpen(false);
    setCourseName("");
    setCoursePrice("");
    setCourseLink("");
    setCourseImage(null);
  };

  const handleDelete = async (id) => {
    try {
      await interceptor.delete(`/admin/course/?id=${id}`);
      toast.success("Course deleted");
      fetchCourses();
    } catch (err) {
      toast.error("Failed to delete course");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-4">
      <Toaster />
      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Create New Course</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Course</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <Label>Course Name</Label>
              <Input
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
              <Label>Course Price</Label>
              <Input
                value={coursePrice}
                onChange={(e) => setCoursePrice(e.target.value)}
              />
              <Label>Course Link (optional)</Label>
              <Input
                value={courseLink}
                onChange={(e) => setCourseLink(e.target.value)}
              />
              <Label>Course Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setCourseImage(e.target.files[0])}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button onClick={handleCreate} disabled={loading}>
                {loading ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <Card key={course._id} className="p-4">
            <CardContent className="space-y-2">
              <h3 className="font-semibold text-lg">{course.course_name}</h3>
              <p className="text-sm">Price: ₹{course.course_price}</p>
              {course.course_link && (
                <a
                  href={course.course_link}
                  className="text-blue-500 text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Course
                </a>
              )}
              <div className="flex gap-2 mt-2">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(course._id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
