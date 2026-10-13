import { WhatsAppIcon } from "@/components/icons";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Ornament, SectionHeading } from "@/components/ornament";
import { PageHero } from "@/components/page-hero";
import { ReviewCard } from "@/components/reviews";
import { getReviews } from "@/lib/content";
import { whatsappLink } from "@/lib/whatsapp";
import { photo } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Client Reviews — Weddings & Events in Wayanad",
  description:
    "Read what couples and families say about their weddings, receptions, mehandi nights and corporate events planned by FD Events in Wayanad, Kerala.",
  path: "/reviews",
  image: photo("photo-1511285560929-80b456fea0bc"),
  imageAlt: "Couple releasing balloons at their wedding",
  keywords: ["FD Events reviews", "best event management Wayanad", "wedding planner reviews Kerala"],
});

export default async function ReviewsPage() {
  const reviews = await getReviews();
  return (
    <>
      <PageHero
        tag="Kind words"
        title={
          <>
            Loved by <em>families</em> across Wayanad
          </>
        }
        image={photo("photo-1511285560929-80b456fea0bc")}
        imageAlt="Couple releasing balloons at their wedding"
        crumbs={[{ name: "Reviews", path: "/reviews" }]}
      />
      <section className="paper-section py-28">
        <div className="mx-auto max-w-[90rem] px-6 sm:px-8">
          <Reveal>
            <SectionHeading tag="Client reviews" title={<>Their words, <em>our pride</em></>} />
          </Reveal>
          {reviews.length ? (
            <Stagger className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {reviews.map((r) => (
                <StaggerItem key={r.id}>
                  <ReviewCard review={r} />
                </StaggerItem>
              ))}
            </Stagger>
          ) : (
            <p className="text-center text-muted">Reviews are coming soon.</p>
          )}
        </div>
      </section>
      <section className="py-24 text-center">
        <Reveal className="mx-auto max-w-xl px-6">
          <p className="font-accent text-4xl italic text-wine">Celebrated with us?</p>
          <h2 className="display mt-3 text-4xl">We&apos;d love to hear from you</h2>
          <Ornament className="mt-6" />
          <a
            href={whatsappLink("Hello FD Events! I'd like to share a review of my event.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp mt-8"
          >
            <WhatsAppIcon className="h-4 w-4" /> Share your review
          </a>
        </Reveal>
      </section>
    </>
  );
}
