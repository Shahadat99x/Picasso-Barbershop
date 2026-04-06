"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateLeadNote, updateLeadStatus } from "@/app/admin/actions/leads";
import type { Database } from "@/lib/supabase/types";
import type { LeadStatus } from "@/lib/supabase/types";

type Lead = Database["public"]["Tables"]["leads"]["Row"];

const STATUS_OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: "new", label: "Naujas" },
  { value: "in_progress", label: "Vykdomas" },
  { value: "answered", label: "Atsakyta" },
  { value: "closed", label: "Uždarytas" },
];

export function LeadForm({ initialData }: { initialData: Lead }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<LeadStatus>(initialData.status);
  const [note, setNote] = useState(initialData.internal_note || "");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleStatusChange = async (newStatus: any) => {
    if (!newStatus) return;
    setStatus(newStatus as LeadStatus);
    setError(null);

    startTransition(async () => {
      try {
        const res = await updateLeadStatus(initialData.id, newStatus as LeadStatus);
        if (res.error) throw new Error(res.error);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while updating status.");
      }
    });
  };

  const handleNoteSave = async () => {
    setError(null);

    startTransition(async () => {
      try {
        const res = await updateLeadNote(initialData.id, note);
        if (res.error) throw new Error(res.error);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while saving note.");
      }
    });
  };

  return (
    <div className="space-y-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-slate-500">Full Name</Label>
          <div className="font-medium text-slate-900">{initialData.full_name}</div>
        </div>

        <div className="space-y-2">
          <Label className="text-slate-500">Email</Label>
          <div className="font-medium text-slate-900">{initialData.email || "-"}</div>
        </div>

        <div className="space-y-2">
          <Label className="text-slate-500">Phone</Label>
          <div className="font-medium text-slate-900">{initialData.phone || "-"}</div>
        </div>

        <div className="space-y-2">
          <Label className="text-slate-500">Source Page</Label>
          <div className="font-medium text-slate-900">{initialData.source_page || "-"}</div>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label className="text-slate-500">Message</Label>
          <div className="rounded-lg bg-slate-50 p-4 text-slate-700">
            {initialData.message}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={status} onValueChange={handleStatusChange} disabled={isPending}>
            <SelectTrigger id="status" className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-slate-500">Created</Label>
          <div className="font-medium text-slate-900">
            {new Date(initialData.created_at).toLocaleString("lt-LT")}
          </div>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="internal_note">Internal Note</Label>
          <Textarea
            id="internal_note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            placeholder="Add internal notes about this lead..."
          />
          <Button
            type="button"
            onClick={handleNoteSave}
            disabled={isPending}
            className="mt-2 bg-slate-900 text-white"
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Note
          </Button>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
        <Button variant="outline" onClick={() => router.push("/admin/leads")}>
          Back to Leads
        </Button>
      </div>
    </div>
  );
}
