"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useCallback, useRef } from "react";

import Header from "@/components/layout/Header";
import StickyNavigation from "@/components/layout/StickyNavigation";
import HeroGallery from "@/components/listing/HeroGallery";
import ListingContent from "@/components/listing/ListingContent";
import BookingCard from "@/components/listing/BookingCard";
import AvailabilityCalendar from "@/components/listing/AvailabilityCalendar";
import ReviewsSection from "@/components/reviews/ReviewsSection";
import LocationSection from "@/components/listing/LocationSection";
import HostSection from "@/components/listing/HostSection";
import ThingsToKnow from "@/components/listing/ThingsToKnow";
import NearbyStays from "@/components/listing/NearbyStays";
import AmenitiesDialog from "@/components/amenities/AmenitiesDialog";
import ReviewsDialog from "@/components/reviews/ReviewsDialog";
import PhotoTour from "@/components/photo-tour/PhotoTour";
import Lightbox from "@/components/lightbox/Lightbox";
import Toast from "@/components/common/Toast";

import {
  property,
  photos,
  amenities,
  reviews,
  reviewCategories,
  nearbyStays,
  bookingInfo,
} from "@/lib/data";

export default function ListingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const modal = searchParams.get("modal");
  const photoParam = searchParams.get("photo");
  const photoIndex = photoParam !== null ? parseInt(photoParam, 10) : null;

  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const galleryRef = useRef<HTMLDivElement>(null);

  /* ---- Navigation helpers ---- */

  const openPhotoTour = useCallback(() => {
    router.push("/?modal=photo-tour", { scroll: false });
  }, [router]);

  const openLightbox = useCallback(
    (index: number) => {
      router.push(`/?modal=photo-tour&photo=${index}`, { scroll: false });
    },
    [router],
  );

  const closeLightbox = useCallback(() => {
    router.push("/?modal=photo-tour", { scroll: false });
  }, [router]);

  const closeModal = useCallback(() => {
    router.push("/", { scroll: false });
  }, [router]);

  const openAmenities = useCallback(() => {
    router.push("/?modal=amenities", { scroll: false });
  }, [router]);

  const openReviews = useCallback(() => {
    router.push("/?modal=reviews", { scroll: false });
  }, [router]);

  /* ---- Actions ---- */

  const handleShare = useCallback(() => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin).catch(() => {});
    }
    setToast("Link copied to clipboard");
  }, []);

  const handleSaveToggle = useCallback(() => {
    setSaved((prev) => {
      const next = !prev;
      setToast(next ? "Listing saved" : "Listing removed from saved");
      return next;
    });
  }, []);

  return (
    <>
      <Header />
      <StickyNavigation
        galleryRef={galleryRef}
        rating={property.rating}
        pricePerNight={bookingInfo.pricePerNight}
      />

      <main>
        <div className="page-container">
          {/* Title section */}
          <section className="listing-heading">
            <div className="listing-title-row">
              <h1>{property.title}</h1>
              <div className="listing-actions">
                <button
                  type="button"
                  className="action-button"
                  onClick={handleShare}
                >
                  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 10v4h12v-4" />
                    <path d="M8 2v8" />
                    <path d="M4 5l4-3 4 3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Share
                </button>
                <button
                  type="button"
                  className="action-button"
                  onClick={handleSaveToggle}
                >
                  <svg viewBox="0 0 16 16" width="16" height="16" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
                    <path d="M8 14S1 9 1 5.5a3.5 3.5 0 017 0 3.5 3.5 0 017 0C15 9 8 14 8 14z" />
                  </svg>
                  {saved ? "Saved" : "Save"}
                </button>
              </div>
            </div>
          </section>

          {/* Hero Gallery */}
          <div ref={galleryRef} id="section-gallery">
            <HeroGallery
              photos={photos}
              onShowAllPhotos={openPhotoTour}
              onPhotoClick={openLightbox}
            />
          </div>

          {/* Two-column layout */}
          <div className="listing-layout">
            <div className="listing-main">
              <ListingContent
                property={property}
                amenities={amenities}
                onShowAllAmenities={openAmenities}
              />
            </div>
            <aside className="listing-sidebar">
              <BookingCard
                onReserve={() => setToast("Reservation request submitted for 5 nights!")}
                onClaim={() => setToast("10% promotional discount applied to your stay!")}
              />
            </aside>
          </div>

          {/* Full-width sections */}
          <AvailabilityCalendar />

          <ReviewsSection
            reviews={reviews}
            rating={property.rating}
            reviewCount={property.reviewCount}
            categories={reviewCategories}
            guestFavourite={property.guestFavourite}
            onShowAllReviews={openReviews}
          />

          <LocationSection location={property.location} />

          <HostSection host={property.host} />

          <ThingsToKnow />

          <NearbyStays stays={nearbyStays} />
        </div>
      </main>

      {/* Modals */}
      {modal === "photo-tour" && photoIndex === null && (
        <PhotoTour
          photos={photos}
          onPhotoClick={openLightbox}
          onClose={closeModal}
          onShare={handleShare}
          onSave={handleSaveToggle}
          saved={saved}
        />
      )}

      {modal === "photo-tour" && photoIndex !== null && !isNaN(photoIndex) && (
        <Lightbox
          photos={photos}
          currentIndex={Math.max(0, Math.min(photoIndex, photos.length - 1))}
          onClose={closeLightbox}
          onChange={(index) => {
            router.replace(`/?modal=photo-tour&photo=${index}`, { scroll: false });
          }}
        />
      )}

      {modal === "amenities" && (
        <AmenitiesDialog amenities={amenities} onClose={closeModal} />
      )}

      {modal === "reviews" && (
        <ReviewsDialog
          reviews={reviews}
          rating={property.rating}
          reviewCount={property.reviewCount}
          categories={reviewCategories}
          guestFavourite={property.guestFavourite}
          onClose={closeModal}
        />
      )}

      <Toast message={toast} onClose={() => setToast(null)} />
    </>
  );
}