"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowDown, ArrowUp, Edit, Plus, Trash2, Users } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { HttpError } from "@/lib/http/api-client"
import {
  createCommunity,
  deleteCommunity,
  listCommunities,
  updateCommunity
} from "@/lib/http/communities"
import {
  type CommunityMemberRecord,
  type CommunityWithMembers
} from "@/lib/types/communities"

const memberFormSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().min(1, "Member name is required"),
  title: z.string().trim().max(200, "Title must be 200 characters or fewer").optional(),
  role: z.string().trim().max(200, "Role must be 200 characters or fewer").optional(),
  year: z.string().trim().max(50, "Year must be 50 characters or fewer").optional(),
  rank: z.number().int().min(0).max(100000).optional(),
  imageUrl: z.union([
    z.string().trim().url("Enter a valid URL").max(2048),
    z.literal("")
  ]).optional(),
  bio: z.string().trim().max(2000, "Bio must be 2000 characters or fewer").optional()
})

const communityFormSchema = z.object({
  name: z.string().min(3, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().trim().max(2000, "Description must be 2000 characters or fewer").optional(),
  coverImageUrl: z.union([
    z.string().trim().url("Enter a valid URL").max(2048),
    z.literal("")
  ]).optional(),
  members: z.array(memberFormSchema).optional()
})

type CommunityFormValues = z.infer<typeof communityFormSchema>

type DialogMode = "create" | "edit"

type MemberFormValues = z.infer<typeof memberFormSchema>

const defaultFormValues: CommunityFormValues = {
  name: "",
  slug: "",
  description: "",
  coverImageUrl: "",
  members: []
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

function toNullable(value: string | undefined) {
  if (value === undefined) {
    return null
  }

  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

function formatTimestamp(value: string) {
  try {
    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
      return "—"
    }

    return date.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short"
    })
  } catch (error) {
    return "—"
  }
}

function toFormMembers(members: CommunityMemberRecord[]): MemberFormValues[] {
  return members
    .slice()
    .sort((a, b) => {
      const rankA = a.rank ?? Number.MAX_SAFE_INTEGER
      const rankB = b.rank ?? Number.MAX_SAFE_INTEGER

      if (rankA !== rankB) {
        return rankA - rankB
      }

      return a.name.localeCompare(b.name)
    })
    .map(member => ({
      id: member.id,
      name: member.name,
      title: member.title ?? "",
      role: member.role ?? "",
      year: member.year ?? "",
      rank: member.rank ?? undefined,
      imageUrl: member.imageUrl ?? "",
      bio: member.bio ?? ""
    }))
}

function toFormValues(record: CommunityWithMembers): CommunityFormValues {
  return {
    name: record.name,
    slug: record.slug,
    description: record.description ?? "",
    coverImageUrl: record.coverImageUrl ?? "",
    members: toFormMembers(record.members)
  }
}

export default function CommunitiesDashboard() {
  const [communitiesList, setCommunitiesList] = useState<CommunityWithMembers[]>([])
  const [searchInput, setSearchInput] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<DialogMode>("create")
  const [activeCommunity, setActiveCommunity] = useState<CommunityWithMembers | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const form = useForm<CommunityFormValues>({
    resolver: zodResolver(communityFormSchema),
    defaultValues: defaultFormValues
  })

  const membersArray = useFieldArray({
    control: form.control,
    name: "members"
  })

  const loadCommunities = useCallback(async () => {
    setIsLoading(true)

    try {
      const data = await listCommunities()
      setCommunitiesList(data)
      setError(null)
    } catch (err) {
      const message = err instanceof HttpError ? err.message : "Failed to load communities"
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadCommunities()
  }, [loadCommunities])

  const filteredCommunities = useMemo(() => {
    const term = searchValue.trim().toLowerCase()

    if (!term) {
      return communitiesList
    }

    return communitiesList.filter(item => {
      const inName = item.name.toLowerCase().includes(term)
      const inSlug = item.slug.toLowerCase().includes(term)
      const inMember = item.members.some(member => member.name.toLowerCase().includes(term))
      return inName || inSlug || inMember
    })
  }, [communitiesList, searchValue])

  const watchedName = form.watch("name")
  const slugDirty = form.formState.dirtyFields.slug

  useEffect(() => {
    if (!dialogOpen) {
      return
    }

    if (dialogMode !== "create" || activeCommunity !== null) {
      return
    }

    if (!watchedName) {
      form.setValue("slug", "", { shouldDirty: false })
      return
    }

    if (slugDirty) {
      return
    }

    const nextSlug = slugify(watchedName)
    form.setValue("slug", nextSlug, { shouldDirty: false })
  }, [watchedName, slugDirty, dialogMode, activeCommunity, dialogOpen, form])

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSearchValue(searchInput.trim())
  }

  const handleResetFilters = () => {
    setSearchInput("")
    setSearchValue("")
  }

  const openCreateDialog = () => {
    setDialogMode("create")
    setActiveCommunity(null)
    setFormError(null)
    form.reset(defaultFormValues)
    membersArray.replace([])
    setDialogOpen(true)
  }

  const openEditDialog = (record: CommunityWithMembers) => {
    setDialogMode("edit")
    setActiveCommunity(record)
    setFormError(null)

    const values = toFormValues(record)
    form.reset(values)
    membersArray.replace(values.members ?? [])
    setDialogOpen(true)
  }

  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open)

    if (!open) {
      setActiveCommunity(null)
      setFormError(null)
      form.reset(defaultFormValues)
      membersArray.replace([])
    }
  }

  const handleDelete = async (record: CommunityWithMembers) => {
    const confirmed = window.confirm(`Delete community "${record.name}"?`)

    if (!confirmed) {
      return
    }

    setDeletingId(record.id)

    try {
      await deleteCommunity(record.id)
      await loadCommunities()
    } catch (err) {
      const message = err instanceof HttpError ? err.message : "Failed to delete community"
      setError(message)
    } finally {
      setDeletingId(null)
    }
  }

  const addMember = () => {
    membersArray.append({
      name: "",
      title: "",
      role: "",
      year: "",
      rank: undefined,
      imageUrl: "",
      bio: ""
    })
  }

  const moveMember = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index > 0) {
      membersArray.swap(index, index - 1)
    }

    if (direction === "down" && index < membersArray.fields.length - 1) {
      membersArray.swap(index, index + 1)
    }
  }

  const removeMember = (index: number) => {
    membersArray.remove(index)
  }

  const onSubmit = async (values: CommunityFormValues) => {
    setIsSubmitting(true)
    setFormError(null)

    const members = (values.members ?? []).map((member, index) => ({
      ...(member.id ? { id: member.id } : {}),
      name: member.name.trim(),
      title: toNullable(member.title),
      role: toNullable(member.role),
      year: toNullable(member.year),
      rank: member.rank ?? index,
      imageUrl: toNullable(member.imageUrl),
      bio: toNullable(member.bio)
    }))

    const payload = {
      name: values.name.trim(),
      slug: values.slug.trim().toLowerCase(),
      description: toNullable(values.description),
      coverImageUrl: toNullable(values.coverImageUrl),
      members
    }

    try {
      if (dialogMode === "create") {
        await createCommunity(payload)
      } else if (activeCommunity) {
        await updateCommunity(activeCommunity.id, payload)
      }

      await loadCommunities()
      handleDialogOpenChange(false)
    } catch (err) {
      const message = err instanceof HttpError ? err.message : "Unable to save community"
      setFormError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="w-full space-y-8 p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Communities</h2>
          <p className="text-muted-foreground">Organize Innovation Lab communities and their members.</p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          New Community
        </Button>
      </div>

      <Separator />

      <Card className="border border-border !w-[80vw] max-w-full">
        <CardHeader className="gap-6 md:flex md:flex-row md:items-end md:justify-between">
          <div>
            <CardTitle>Community Directory</CardTitle>
            <CardDescription>Search by name, slug, or member to find the right group.</CardDescription>
          </div>
          <form onSubmit={handleSearchSubmit} className="flex w-full gap-2 md:w-auto">
            <Input
              value={searchInput}
              onChange={event => setSearchInput(event.target.value)}
              placeholder="Search communities"
              className="md:w-72"
              type="search"
            />
            <Button type="submit" variant="outline">
              Apply
            </Button>
            <Button type="button" variant="ghost" onClick={handleResetFilters}>
              Reset
            </Button>
          </form>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Unable to load communities</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <CommunitiesTable
            data={filteredCommunities}
            isLoading={isLoading}
            deletingId={deletingId}
            onEdit={openEditDialog}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>{dialogMode === "create" ? "Create Community" : "Edit Community"}</DialogTitle>
            <DialogDescription>
              {dialogMode === "create"
                ? "Define a new community and add members to highlight on the site."
                : `Update details for "${activeCommunity?.name ?? ""}".`}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6 md:grid-cols-[minmax(0,320px)_1fr]">
                <div className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Frontend Guild" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="frontend" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={4}
                            placeholder="Describe this community and its purpose"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="coverImageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cover image URL</FormLabel>
                        <FormControl>
                          <Input {...field} type="url" placeholder="https://cdn.example.com/community.jpg" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">Members</Label>
                    <Button type="button" size="sm" variant="outline" onClick={addMember}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add member
                    </Button>
                  </div>

                  {membersArray.fields.length === 0 ? (
                    <p className="rounded-md border border-dashed border-border p-4 text-sm text-muted-foreground">
                      No members added yet. Use "Add member" to include contributors.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {membersArray.fields.map((field, index) => (
                        <div key={field.id} className="rounded-lg border border-border p-4">
                          <div className="mb-3 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm font-medium">
                              <Users className="h-4 w-4" />
                              Member {index + 1}
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => moveMember(index, "up")}
                                disabled={index === 0}
                              >
                                <ArrowUp className="h-4 w-4" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => moveMember(index, "down")}
                                disabled={index === membersArray.fields.length - 1}
                              >
                                <ArrowDown className="h-4 w-4" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() => removeMember(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2 md:gap-4">
                            <FormField
                              control={form.control}
                              name={`members.${index}.name` as const}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="Jane Doe" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`members.${index}.role` as const}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Role</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="Lead Developer" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`members.${index}.title` as const}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Title</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="B.Tech 3rd Year" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`members.${index}.year` as const}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Year</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="2025" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`members.${index}.rank` as const}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Rank</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      min={0}
                                      value={field.value ?? ""}
                                      onChange={event => {
                                        const { value } = event.target
                                        if (value === "") {
                                          field.onChange(undefined)
                                          return
                                        }

                                        const parsed = Number.parseInt(value, 10)
                                        field.onChange(Number.isNaN(parsed) ? undefined : parsed)
                                      }}
                                      placeholder="0"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`members.${index}.imageUrl` as const}
                              render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                  <FormLabel>Image URL</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="url" placeholder="https://cdn.example.com/avatar.jpg" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`members.${index}.bio` as const}
                              render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                  <FormLabel>Bio</FormLabel>
                                  <FormControl>
                                    <Textarea {...field} rows={3} placeholder="Short bio or achievements" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {formError && (
                <Alert variant="destructive">
                  <AlertTitle>Unable to save community</AlertTitle>
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              )}

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => handleDialogOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save changes"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </section>
  )
}

interface CommunitiesTableProps {
  data: CommunityWithMembers[]
  isLoading: boolean
  deletingId: number | null
  onEdit: (record: CommunityWithMembers) => void
  onDelete: (record: CommunityWithMembers) => void
}

function CommunitiesTable({ data, isLoading, deletingId, onEdit, onDelete }: CommunitiesTableProps) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[240px]">Community</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Members</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <Spinner className="size-5" />
                  Loading communities...
                </div>
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                No communities match the current filters.
              </TableCell>
            </TableRow>
          ) : (
            data.map(item => {
              const memberPreview = item.members.slice(0, 2).map(member => member.name).join(", ")
              const moreCount = Math.max(0, item.members.length - 2)

              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium leading-tight">{item.name}</span>
                      {item.description && (
                        <span className="text-sm text-muted-foreground line-clamp-2">{item.description}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{item.slug}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">{item.members.length}</Badge>
                      {memberPreview && <span className="line-clamp-1 text-xs">{memberPreview}</span>}
                      {moreCount > 0 && <span className="text-xs text-muted-foreground">+{moreCount} more</span>}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{formatTimestamp(item.updatedAt)}</TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button size="sm" variant="outline" onClick={() => onEdit(item)} className="px-2">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete(item)}
                      className="px-2"
                      disabled={deletingId === item.id}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}
