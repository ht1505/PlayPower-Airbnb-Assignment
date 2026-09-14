import { Suspense } from "react";
import ListingPage from "@/components/listing/ListingPage";

export default function Home() {
  return (
    <Suspense>
      <ListingPage />
    </Suspense>
  );
}