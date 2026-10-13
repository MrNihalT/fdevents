import Link from "next/link";
import { Ornament } from "@/components/ornament";

export default function NotFound() {
  return (
    <section className="paper-section px-6 pb-32 pt-48 text-center">
      <p className="font-accent text-4xl italic text-wine">Oh dear</p>
      <h1 className="display mt-4 text-6xl">
        Page <em>not found</em>
      </h1>
      <Ornament className="mt-8" />
      <p className="mx-auto mt-6 max-w-md text-muted">
        The page you are looking for has wandered off. Let&apos;s get you back to the celebration.
      </p>
      <Link href="/" className="btn btn-wine mt-10">
        Back to home
      </Link>
    </section>
  );
}
