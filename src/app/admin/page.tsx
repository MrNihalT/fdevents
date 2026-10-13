import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { Ornament } from "@/components/ornament";
import { adminConfigured, isAdmin } from "@/lib/auth";
import { content, usingSupabase } from "@/lib/content";
import { galleryCategories } from "@/lib/content/types";
import { deletePhotoAction, deleteReviewAction, deleteVideoAction, logoutAction } from "./actions";
import { AddPhotoForm, AddReviewForm, AddVideoForm, DeleteButton, LoginForm } from "./forms";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 pt-36 sm:px-8">
      <header className="mb-12 text-center">
        <p className="tag">Dashboard</p>
        <h1 className="display mt-4 text-5xl">
          Manage albums, films <em>&amp;</em> reviews
        </h1>
        <Ornament className="mt-6" />
      </header>
      <Suspense fallback={<p className="text-center text-muted">Loading…</p>}>
        <AdminContent />
      </Suspense>
    </section>
  );
}

async function AdminContent() {
  if (!adminConfigured()) {
    return (
      <p className="card-retro mx-auto max-w-lg p-8 text-center text-muted">
        Admin is disabled. Set <code className="text-wine">ADMIN_PASSWORD</code> in <code>.env.local</code> and restart
        the server.
      </p>
    );
  }
  if (!(await isAdmin())) return <LoginForm />;

  const [photos, videos, reviews] = await Promise.all([
    content.listGallery(),
    content.listVideos(),
    content.listReviews(),
  ]);

  return (
    <div className="space-y-16">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-4 text-sm text-muted">
        <span>
          Storage: <strong className="text-ink">{usingSupabase ? "Supabase" : "Local files (content/)"}</strong> ·{" "}
          {photos.length} photos · {videos.length} films · {reviews.length} reviews
        </span>
        <form action={logoutAction}>
          <button className="btn btn-outline px-5! py-2.5!">Sign out</button>
        </form>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <AddPhotoForm categories={[...galleryCategories]} />
        <AddVideoForm />
      </div>
      <AddReviewForm />

      <div>
        <h2 className="display mb-6 text-3xl">Album photos ({photos.length})</h2>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {photos.map((p) => (
            <li key={p.id} className="bg-parchment p-2">
              <Image src={p.imageUrl} alt={p.title} width={300} height={220} className="aspect-[4/3] w-full object-cover" />
              <p className="mt-2 truncate text-sm">{p.title}</p>
              <p className="text-[0.6rem] font-medium uppercase tracking-[0.25em] text-mustard">{p.category}</p>
              <DeleteButton action={deletePhotoAction.bind(null, p.id)} label={p.title} />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="display mb-6 text-3xl">Event films ({videos.length})</h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => (
            <li key={v.id} className="flex gap-3 bg-parchment p-2">
              <Image
                src={`https://i.ytimg.com/vi/${v.youtubeId}/mqdefault.jpg`}
                alt=""
                width={160}
                height={90}
                className="h-[68px] w-[120px] shrink-0 object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{v.title}</p>
                <a
                  href={`https://youtu.be/${v.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-wine underline"
                >
                  youtu.be/{v.youtubeId}
                </a>
                <DeleteButton action={deleteVideoAction.bind(null, v.id)} label={v.title} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="display mb-6 text-3xl">Reviews ({reviews.length})</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <li key={r.id} className="bg-parchment p-4">
              <p className="text-mustard">{"★".repeat(r.rating)}</p>
              <p className="mt-1 line-clamp-3 text-sm italic">“{r.quote}”</p>
              <p className="mt-2 text-sm font-medium">{r.name}</p>
              <p className="text-xs text-muted">{r.event}</p>
              <DeleteButton action={deleteReviewAction.bind(null, r.id)} label={`review by ${r.name}`} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
