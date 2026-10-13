"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useTransition } from "react";
import { addPhotoAction, addReviewAction, addVideoAction, loginAction, type FormState } from "./actions";

function Status({ state }: { state: FormState }) {
  if (!state.message) return null;
  return (
    <p role="status" className={`text-sm ${state.ok ? "text-wine" : "text-red-700"}`}>
      {state.message}
    </p>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="label">{children}</span>;
}

export function LoginForm() {
  const router = useRouter();
  const [state, action, pending] = useActionState(loginAction, {});
  useEffect(() => {
    if (state.ok) router.refresh();
  }, [state.ok, router]);

  return (
    <form action={action} className="card-retro mx-auto max-w-sm space-y-6 bg-cream p-8">
      <label className="block">
        <Label>Admin password</Label>
        <input type="password" name="password" required autoComplete="current-password" className="field" />
      </label>
      <Status state={state} />
      <button disabled={pending} className="btn btn-wine w-full disabled:opacity-60">
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

/** Resets the form after a successful submit. */
function useResetOnSuccess(state: FormState) {
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.ok) ref.current?.reset();
  }, [state]);
  return ref;
}

export function AddPhotoForm({ categories }: { categories: string[] }) {
  const [state, action, pending] = useActionState(addPhotoAction, {});
  const ref = useResetOnSuccess(state);

  return (
    <form ref={ref} action={action} className="card-retro space-y-6 bg-cream p-8">
      <h2 className="display text-3xl">Add a work photo</h2>
      <label className="block">
        <Label>Title *</Label>
        <input name="title" required className="field" placeholder="e.g. Reception stage at Kalpetta" />
      </label>
      <label className="block">
        <Label>Category *</Label>
        <select name="category" required className="field" defaultValue="">
          <option value="" disabled>
            Choose…
          </option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <Label>Upload photo (JPG / PNG / WEBP, max 8 MB)</Label>
        <input name="file" type="file" required accept="image/jpeg,image/png,image/webp,image/avif" className="field" />
      </label>
      <Status state={state} />
      <button disabled={pending} className="btn btn-wine w-full disabled:opacity-60">
        {pending ? "Uploading…" : "Add photo"}
      </button>
    </form>
  );
}

export function AddVideoForm() {
  const [state, action, pending] = useActionState(addVideoAction, {});
  const ref = useResetOnSuccess(state);

  return (
    <form ref={ref} action={action} className="card-retro space-y-6 bg-cream p-8">
      <h2 className="display text-3xl">Add a YouTube video</h2>
      <label className="block">
        <Label>YouTube link *</Label>
        <input name="url" required className="field" placeholder="https://youtu.be/… or https://www.youtube.com/watch?v=…" />
      </label>
      <label className="block">
        <Label>Title *</Label>
        <input name="title" required className="field" placeholder="e.g. Afrah & Aslam — Wedding Highlights" />
      </label>
      <label className="block">
        <Label>Short description</Label>
        <textarea name="description" rows={3} className="field" />
      </label>
      <Status state={state} />
      <button disabled={pending} className="btn btn-wine w-full disabled:opacity-60">
        {pending ? "Saving…" : "Add video"}
      </button>
    </form>
  );
}

export function AddReviewForm() {
  const [state, action, pending] = useActionState(addReviewAction, {});
  const ref = useResetOnSuccess(state);

  return (
    <form ref={ref} action={action} className="card-retro space-y-6 bg-cream p-8">
      <h2 className="display text-3xl">Add a client review</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <Label>Client name *</Label>
          <input name="name" required className="field" placeholder="e.g. Afrah & Aslam" />
        </label>
        <label className="block">
          <Label>Event</Label>
          <input name="event" className="field" placeholder="e.g. Wedding · Sulthan Bathery" />
        </label>
      </div>
      <label className="block">
        <Label>Rating *</Label>
        <select name="rating" defaultValue="5" className="field">
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {"★".repeat(n)} ({n})
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <Label>Review *</Label>
        <textarea name="quote" required rows={4} className="field resize-none" />
      </label>
      <Status state={state} />
      <button disabled={pending} className="btn btn-wine w-full disabled:opacity-60">
        {pending ? "Saving…" : "Add review"}
      </button>
    </form>
  );
}

export function DeleteButton({ action, label }: { action: () => Promise<void>; label: string }) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (confirm(`Delete “${label}”?`)) start(() => action());
      }}
      className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-red-700 hover:underline disabled:opacity-50"
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
