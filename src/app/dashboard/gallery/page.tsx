"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, Trash2 } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { HttpError } from "@/lib/http/api-client";
import {
  createGalleryImage,
  deleteGalleryImage,
  listGalleryImages
} from "@/lib/http/gallery-images";
import { type GalleryImageRecord } from "@/lib/types/gallery-images";

const galleryFormSchema = z.object({
  imageUrl: z
    .string()
    .trim()
    .url("Enter a valid image URL")
    .max(2048, "Image URL must be 2048 characters or fewer")
});

type GalleryFormValues = z.infer<typeof galleryFormSchema>;

function formatTimestamp(value: string) {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return "Added recently";
  }

  return parsed.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

export default function GalleryDashboard() {
  const [images, setImages] = useState<GalleryImageRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const form = useForm<GalleryFormValues>({
    resolver: zodResolver(galleryFormSchema),
    defaultValues: {
      imageUrl: ""
    }
  });

  const loadImages = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await listGalleryImages({ limit: 48 });
      setImages(data);
      setError(null);
    } catch (err) {
      const message = err instanceof HttpError ? err.message : "Failed to load gallery";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadImages();
  }, [loadImages]);

  const onSubmit = async (values: GalleryFormValues) => {
    setIsSubmitting(true);
    setFormError(null);

    try {
      await createGalleryImage({ imageUrl: values.imageUrl.trim() });
      form.reset({ imageUrl: "" });
      await loadImages();
    } catch (err) {
      const message = err instanceof HttpError ? err.message : "Unable to add image";
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (record: GalleryImageRecord) => {
    const allowDelete = window.confirm("Remove this gallery image?");

    if (!allowDelete) {
      return;
    }

    setDeletingId(record.id);

    try {
      await deleteGalleryImage(record.id);
      await loadImages();
    } catch (err) {
      const message = err instanceof HttpError ? err.message : "Unable to remove image";
      setError(message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="w-full space-y-8 p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gallery</h2>
          <p className="text-muted-foreground">Upload and curate the homepage image gallery.</p>
        </div>
      </div>

      <Separator />

      <Card className="border border-border">
        <CardHeader>
          <CardTitle>Add image</CardTitle>
          <CardDescription>Paste an image URL to feature it in the gallery grid.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="flex flex-col gap-4 md:flex-row md:items-end" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem className="w-full md:max-w-xl">
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://cdn.example.com/gallery/photo.jpg" type="url" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                <PlusCircle className="mr-2 h-4 w-4" />
                {isSubmitting ? "Adding..." : "Add image"}
              </Button>
            </form>
          </Form>

          {formError && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>Unable to add image</AlertTitle>
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card className="border border-border">
        <CardHeader>
          <CardTitle>Gallery images</CardTitle>
          <CardDescription>Reorder coming soon. For now you can remove entries and re-add them.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Unable to load gallery</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isLoading ? (
            <div className="flex min-h-[200px] items-center justify-center text-muted-foreground">
              <Spinner className="mr-2 h-4 w-4" />
              Loading images...
            </div>
          ) : images.length === 0 ? (
            <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground">
              <p className="text-lg font-medium">No gallery images yet</p>
              <p className="max-w-sm text-sm">
                Add a few image URLs to jumpstart the gallery section on the public site.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {images.map((item) => (
                <div key={item.id} className="group relative overflow-hidden rounded-lg border border-border">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={item.imageUrl}
                      alt="Gallery item"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 25vw"
                    />
                  </div>
                  <div className="flex items-center justify-between border-t border-border bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
                    <span>{formatTimestamp(item.createdAt)}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => handleDelete(item)}
                      disabled={deletingId === item.id}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
