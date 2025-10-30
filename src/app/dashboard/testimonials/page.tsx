"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Testimonials {
  title: string;
  quote: string;
  author: string;
  role: string;
  image: string;
}

const mockTestimonials: Testimonials[] = [
  {
    title: "Amazing Service",
    quote: "This platform transformed the way I learn maths. Truly incredible!",
    author: "Sarah Johnson",
    role: "A-Level Student",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    title: "Highly Recommend",
    quote: "Amrit’s teaching style is unmatched. My confidence has skyrocketed.",
    author: "James Carter",
    role: "Student",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    title: "Engaging and Insightful",
    quote: "Every session feels like a revelation. Worth every minute.",
    author: "Priya Sharma",
    role: "Math Enthusiast",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

export default function TestimonialsDashboard() {
  const [testimonials, setTestimonials] = useState(mockTestimonials);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonials | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleEditClick = (testimonial: Testimonials) => {
    setSelectedTestimonial(testimonial);
    setIsOpen(true);
  };

  const handleSave = () => {
    if (selectedTestimonial) {
      setTestimonials((prev) =>
        prev.map((t) => (t.author === selectedTestimonial.author ? selectedTestimonial : t))
      );
      setIsOpen(false);
    }
  };

  const handleDelete = (author: string) => {
    setTestimonials((prev) => prev.filter((t) => t.author !== author));
  };

  return (
    <section className="w-full space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Testimonials</h2>
          <p className="text-muted-foreground">
            Manage and review all testimonials from users.
          </p>
        </div>
        <Button className="p-2" variant="outline" onClick={() => alert("Add new feature")}>
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      <Separator />

      <Card className="border border-border">
        <CardHeader>
          <CardTitle>All Testimonials</CardTitle>
          <CardDescription>Below is a list of submitted testimonials.</CardDescription>
        </CardHeader>
        <CardContent>
          <TestimonialsTable
            data={testimonials}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Testimonial</DialogTitle>
            <DialogDescription>Update testimonial information below.</DialogDescription>
          </DialogHeader>

          {selectedTestimonial && (
            <div className="space-y-4 mt-4">
              <div>
                <Label>Author</Label>
                <Input
                  value={selectedTestimonial.author}
                  onChange={(e) =>
                    setSelectedTestimonial({ ...selectedTestimonial, author: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Role</Label>
                <Input
                  value={selectedTestimonial.role}
                  onChange={(e) =>
                    setSelectedTestimonial({ ...selectedTestimonial, role: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Title</Label>
                <Input
                  value={selectedTestimonial.title}
                  onChange={(e) =>
                    setSelectedTestimonial({ ...selectedTestimonial, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Quote</Label>
                <Input
                  value={selectedTestimonial.quote}
                  onChange={(e) =>
                    setSelectedTestimonial({ ...selectedTestimonial, quote: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

interface TableProps {
  data: Testimonials[];
  onEdit: (testimonial: Testimonials) => void;
  onDelete: (author: string) => void;
}

function TestimonialsTable({ data, onEdit, onDelete }: TableProps) {
  return (
    <div className="w-full rounded-xl border border-border">
      <Table>
        <TableCaption>A list of recent testimonials.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Author</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Quote</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={item.image} alt={item.author} />
                  <AvatarFallback>
                    {item.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{item.author}</span>
                  <span className="text-xs text-muted-foreground">{item.role}</span>
                </div>
              </TableCell>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell className="max-w-[400px] text-muted-foreground truncate">
                “{item.quote}”
              </TableCell>
              <TableCell>{item.role}</TableCell>
              <TableCell className="flex justify-end gap-2">
                <Button size="sm" variant="outline" onClick={() => onEdit(item)} className="p-2">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(item.author)}
                  className="p-2"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
