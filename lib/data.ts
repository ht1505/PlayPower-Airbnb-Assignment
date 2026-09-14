import type {
  Amenity,
  BookingInfo,
  NearbyStay,
  Photo,
  Property,
  Review,
  ReviewCategory,
} from "./types";

/* ------------------------------------------------------------------ */
/*  Property                                                           */
/* ------------------------------------------------------------------ */

export const property: Property = {
  title: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG18",
  location: "Candolim, India",
  propertyType: "Entire serviced apartment",
  rating: 4.95,
  reviewCount: 19,
  guestFavourite: true,

  host: {
    name: "Mirashya Homes",
    reviewCount: 1463,
    rating: 4.68,
    hostingDuration: "2 years",
    responseRate: "100%",
    responseTime: "within an hour",
    coHostCount: 8,
    bornIn: "the 80s",
    education: "NICMAR GOA",
  },

  guests: 3,
  bedrooms: 1,
  beds: 2,
  bathrooms: 1,

  highlights: [
    "Outdoor entertainment",
    "Designed for staying cool",
    "Self check-in",
  ],

  description:
    "Enjoy a comfortable stay in this romantic 1BHK serviced apartment in Candolim, designed for a relaxing getaway with convenient access to the best of Goa.\n\nThis fully furnished apartment features a spacious living room, a well-equipped kitchen, and a private jacuzzi. The bedroom is tastefully decorated with modern amenities to ensure a pleasant stay. You'll have access to a shared pool, gym, and beautifully maintained garden areas.\n\nLocated just minutes from Candolim Beach, this property offers the perfect blend of comfort and convenience. The neighbourhood is known for its vibrant restaurants, cafes, and nightlife, making it an ideal base for exploring North Goa.\n\nWhether you're looking for a romantic getaway or a relaxing vacation, this apartment provides everything you need for an unforgettable stay in Goa.",

  sleepingArrangements: [
    { room: "Bedroom", bed: "1 double bed" },
    { room: "Living room", bed: "1 sofa" },
  ],

  amenitiesCount: 50,
};

/* ------------------------------------------------------------------ */
/*  Booking                                                            */
/* ------------------------------------------------------------------ */

export const bookingInfo: BookingInfo = {
  pricePerNight: 5700,
  totalPrice: 28499,
  nights: 5,
  checkIn: "10/18/2026",
  checkOut: "10/23/2026",
  guests: 2,
};

/* ------------------------------------------------------------------ */
/*  Photos                                                             */
/* ------------------------------------------------------------------ */

const photoCategories: {
  category: Photo["category"];
  count: number;
}[] = [
  { category: "Living room 1", count: 3 },
  { category: "Living room 2", count: 7 },
  { category: "Full kitchen", count: 2 },
  { category: "Bedroom", count: 6 },
  { category: "Full bathroom", count: 1 },
  { category: "Gym", count: 5 },
  { category: "Exterior", count: 6 },
  { category: "Pool", count: 3 },
  { category: "Additional photos", count: 10 },
];

const photoDetails: Record<number, { src: string; alt: string }> = {
  1: { src: "/images/property/living_room_wide.jpg", alt: "Sunlit spacious living room with rustic teak coffee table, oatmeal sectional, and open balcony" },
  2: { src: "/images/property/living_room_balcony.jpg", alt: "Living room viewing out across the private balcony towards lush tropical palms" },
  3: { src: "/images/property/living_room_jacuzzi_view.jpg", alt: "Living room with open transition towards the private terrace jacuzzi deck" },
  4: { src: "/images/property/living_room_sofa_angle.jpg", alt: "Comfortable L-shaped oatmeal sectional sofa with textured bouclé and indigo accent cushions" },
  5: { src: "/images/property/living_room_media_wall.jpg", alt: "Teak media credenza, wall-mounted smart TV, botanical art prints, and potted plants" },
  6: { src: "/images/property/living_room_coffee_table_detail.jpg", alt: "Rustic teak coffee table vignette with blue GOA hardcover book, terracotta vase, and brass tray" },
  7: { src: "/images/property/living_room_reading_nook.jpg", alt: "Cozy reading corner with natural cane armchair, oatmeal throw, and potted monstera" },
  8: { src: "/images/property/living_room_balcony_threshold.jpg", alt: "Sliding glass door threshold leading out to the private balcony with wicker armchairs" },
  9: { src: "/images/property/living_room_evening_ambience.jpg", alt: "Living room at twilight illuminated by warm ambient sconces and lamps" },
  10: { src: "/images/property/architectural_ceiling_detail.jpg", alt: "High ceiling featuring exposed dark oak structural timber beam and white minimalist ceiling fan" },
  11: { src: "/images/property/kitchen_full_view.jpg", alt: "Contemporary open modular kitchen with rich American walnut cabinetry and dark granite counters" },
  12: { src: "/images/property/kitchen_island_detail.jpg", alt: "Walnut waterfall breakfast island with dark granite top, designer pendant lights, and tractor barstools" },
  13: { src: "/images/property/bedroom_bed_straight_on.jpg", alt: "Double teak platform bed with crisp white linens, caramel lumbar pillow, and oak-slatted headboard" },
  14: { src: "/images/property/bedroom_angled_balcony.jpg", alt: "Bedroom view towards the teak nightstand and sliding glass balcony door with sheer curtains" },
  15: { src: "/images/property/bedroom_bedding_detail.jpg", alt: "Tactile detail of crisp white cotton duvet, chunky camel-knit throw, and linen accent pillows" },
  16: { src: "/images/property/bedroom_nightstand_vignette.jpg", alt: "Teak bedside table with ceramic stone lamp, water carafe, and vertical oak wall paneling" },
  17: { src: "/images/property/bedroom_bench_foot.jpg", alt: "Teak foot bench with Turkish towel, woven straw tote bag, and blue GOA book on polished microcement" },
  18: { src: "/images/property/bedroom_private_balcony.jpg", alt: "Private bedroom balcony with wicker armchair and lush tropical garden foliage" },
  19: { src: "/images/property/bathroom_ensuite.jpg", alt: "Spa-grade ensuite bathroom with modern vanity, dark counter, backlit mirror, and glass rainfall shower" },
  20: { src: "/images/property/gym_cardio_overview.jpg", alt: "Air-conditioned resident fitness center with modern cardio equipment facing tropical garden glass walls" },
  21: { src: "/images/property/gym_weights_zone.jpg", alt: "Strength training zone with tiered chrome dumbbell rack, workout bench, and mirrored wall" },
  22: { src: "/images/property/gym_wellness_corner.jpg", alt: "Yoga and stretching corner with exercise mats, fitness ball, and rubber athletic flooring" },
  23: { src: "/images/property/gym_towel_hydration_station.jpg", alt: "Resident gym hospitality station with stacked fresh white towels and chilled water dispenser" },
  24: { src: "/images/property/gym_treadmill_view.jpg", alt: "Perspective from treadmill running deck looking out through glass wall onto tropical palm trees" },
  25: { src: "/images/property/exterior_building_facade.jpg", alt: "Architectural facade of the Mirashya apartment building with terracotta roof and private verandas" },
  26: { src: "/images/property/exterior_entrance_portico.jpg", alt: "Covered resort entrance portico with stone paving and tropical landscaping planter boxes" },
  27: { src: "/images/property/exterior_garden_pathway.jpg", alt: "Curving stone pathway winding through lush frangipani trees and coconut palms" },
  28: { src: "/images/property/exterior_courtyard_perspective.jpg", alt: "Ground-level courtyard view of the Portuguese-modern architecture and verandas" },
  29: { src: "/images/property/exterior_twilight_lighting.jpg", alt: "Evening twilight exterior with warm architectural uplighting illuminating the building facade" },
  30: { src: "/images/property/exterior_aerial_surroundings.jpg", alt: "Elevated scenic perspective of the Mirashya enclave nestled amidst Candolim palm groves" },
  31: { src: "/images/property/pool_water_feature.jpg", alt: "Raised stone waterfall weir with decorative terracotta urns spilling water into the swimming pool" },
  32: { src: "/images/property/poolside_loungers_row.jpg", alt: "Golden sandstone pool deck with rows of teak sun loungers and blue-and-white striped umbrellas" },
  33: { src: "/images/property/pool_aerial_wide.jpg", alt: "Wide resort swimming pool with shimmering turquoise water, palm reflections, and green lawns" },
  34: { src: "/images/property/terrace_jacuzzi_water_detail.jpg", alt: "Close-up of bubbling jacuzzi hydrotherapy jets, smooth stone coping border, and folded white towel" },
  35: { src: "/images/property/terrace_sun_loungers.jpg", alt: "Private terrace with twin teak sun loungers, side table, chilled drinks, and potted monsteras" },
  36: { src: "/images/property/terrace_sunset_golden_hour.jpg", alt: "Golden-hour sunset light across the terrace deck, illuminating the jacuzzi and palm silhouettes" },
  37: { src: "/images/property/terrace_breakfast_table.jpg", alt: "Morning breakfast setup on the private terrace with fresh tropical fruits and ocean breeze" },
  38: { src: "/images/property/kitchen_sink_fruit_prep.jpg", alt: "Dark granite kitchen counter, gooseneck faucet, teak cutting board with fresh limes and mangoes" },
  39: { src: "/images/property/living_room_evening_ambience_detail.jpg", alt: "Intimate evening vignette of the living room coffee table with warm ambient glow" },
  40: { src: "/images/property/architectural_ceiling_detail_detail.jpg", alt: "Architectural close-up of the exposed dark natural oak ceiling timber beam and pin spotlight" },
  41: { src: "/images/property/coastal_palm_view_balcony.jpg", alt: "Scenic coastal view looking over swaying coconut palms towards the Arabian Sea horizon" },
  42: { src: "/images/property/enclave_reception_lobby.jpg", alt: "Open-air resident reception lounge with cane seating, potted palms, and coastal resort ambience" },
  43: { src: "/images/property/terrace_night_stargazing.jpg", alt: "Nighttime photograph of the illuminated terrace with glowing jacuzzi under the starry Goan sky" },
};

export const photos: Photo[] = photoCategories.flatMap(
  ({ category, count }) =>
    Array.from({ length: count }, (_, index) => {
      const id = photosPlaceholderStart(category, index);
      const detail = photoDetails[id];

      return {
        id,
        category,
        src: detail.src,
        alt: detail.alt,
        categoryIndex: index + 1,
      };
    }),
);

function photosPlaceholderStart(
  category: Photo["category"],
  index: number,
): number {
  const categoryStart: Record<Photo["category"], number> = {
    "Living room 1": 1,
    "Living room 2": 4,
    "Full kitchen": 11,
    Bedroom: 13,
    "Full bathroom": 19,
    Gym: 20,
    Exterior: 25,
    Pool: 31,
    "Additional photos": 34,
  };
  return categoryStart[category] + index;
}

/* ------------------------------------------------------------------ */
/*  Amenities                                                          */
/* ------------------------------------------------------------------ */

export const amenities: Amenity[] = [
  // Internet and office
  { id: "wifi", name: "Wifi", category: "Internet and office", available: true },
  { id: "workspace", name: "Dedicated workspace", category: "Internet and office", available: true },

  // Kitchen and dining
  { id: "kitchen", name: "Kitchen", category: "Kitchen and dining", available: true },
  { id: "refrigerator", name: "Refrigerator", category: "Kitchen and dining", available: true },
  { id: "microwave", name: "Microwave", category: "Kitchen and dining", available: true },
  { id: "cooking-basics", name: "Cooking basics", category: "Kitchen and dining", available: true },
  { id: "dishes", name: "Dishes and silverware", category: "Kitchen and dining", available: true },
  { id: "dishwasher", name: "Dishwasher", category: "Kitchen and dining", available: true },
  { id: "stove", name: "Stove", category: "Kitchen and dining", available: true },
  { id: "oven", name: "Oven", category: "Kitchen and dining", available: true },
  { id: "coffee-maker", name: "Coffee maker", category: "Kitchen and dining", available: true },
  { id: "toaster", name: "Toaster", category: "Kitchen and dining", available: true },
  { id: "dining-table", name: "Dining table", category: "Kitchen and dining", available: true },

  // Parking and facilities
  { id: "parking", name: "Free parking on premises", category: "Parking and facilities", available: true },
  { id: "pool", name: "Pool", category: "Parking and facilities", available: true },
  { id: "gym", name: "Gym", category: "Parking and facilities", available: true },
  { id: "hot-tub", name: "Hot tub", category: "Parking and facilities", available: true },
  { id: "elevator", name: "Elevator", category: "Parking and facilities", available: true },

  // Heating and cooling
  { id: "air-conditioning", name: "Air conditioning", category: "Heating and cooling", available: true },
  { id: "ceiling-fan", name: "Ceiling fan", category: "Heating and cooling", available: true },
  { id: "portable-fans", name: "Portable fans", category: "Heating and cooling", available: true },

  // Entertainment
  { id: "tv", name: "TV", category: "Entertainment", available: true },
  { id: "books", name: "Books and reading material", category: "Entertainment", available: true },

  // Bathroom
  { id: "hot-water", name: "Hot water", category: "Bathroom", available: true },
  { id: "shampoo", name: "Shampoo", category: "Bathroom", available: true },
  { id: "conditioner", name: "Conditioner", category: "Bathroom", available: true },
  { id: "body-soap", name: "Body soap", category: "Bathroom", available: true },
  { id: "hair-dryer", name: "Hair dryer", category: "Bathroom", available: true },

  // Bedroom and laundry
  { id: "washer", name: "Washer", category: "Bedroom and laundry", available: true },
  { id: "essentials", name: "Essentials", category: "Bedroom and laundry", available: true },
  { id: "hangers", name: "Hangers", category: "Bedroom and laundry", available: true },
  { id: "iron", name: "Iron", category: "Bedroom and laundry", available: true },
  { id: "extra-pillows", name: "Extra pillows and blankets", category: "Bedroom and laundry", available: true },

  // Home safety
  { id: "carbon-monoxide-alarm", name: "Carbon monoxide alarm", category: "Home safety", available: false },
  { id: "smoke-alarm", name: "Smoke alarm", category: "Home safety", available: false },
  { id: "fire-extinguisher", name: "Fire extinguisher", category: "Home safety", available: true },
  { id: "first-aid", name: "First aid kit", category: "Home safety", available: true },
  { id: "security-cameras", name: "Security cameras on property", category: "Home safety", available: true },

  // Outdoor
  { id: "patio", name: "Patio or balcony", category: "Outdoor", available: true },
  { id: "outdoor-furniture", name: "Outdoor furniture", category: "Outdoor", available: true },
  { id: "bbq-grill", name: "BBQ grill", category: "Outdoor", available: true },
  { id: "outdoor-dining", name: "Outdoor dining area", category: "Outdoor", available: true },
  { id: "garden", name: "Garden or backyard", category: "Outdoor", available: true },

  // Location features
  { id: "beach-access", name: "Beach access", category: "Location features", available: true },
  { id: "resort-access", name: "Resort access", category: "Location features", available: true },

  // Services
  { id: "self-checkin", name: "Self check-in", category: "Services", available: true },
  { id: "luggage-dropoff", name: "Luggage dropoff allowed", category: "Services", available: true },
  { id: "long-term", name: "Long-term stays allowed", category: "Services", available: true },
  { id: "cleaning", name: "Cleaning available during stay", category: "Services", available: true },

  // Family
  { id: "childrens-dinnerware", name: "Children's dinnerware", category: "Family", available: true },
];

/* ------------------------------------------------------------------ */
/*  Review categories                                                  */
/* ------------------------------------------------------------------ */

export const reviewCategories: ReviewCategory[] = [
  { name: "Cleanliness", score: 5.0 },
  { name: "Accuracy", score: 4.9 },
  { name: "Communication", score: 5.0 },
  { name: "Location", score: 4.9 },
  { name: "Check-in", score: 5.0 },
  { name: "Value", score: 4.8 },
];

/* ------------------------------------------------------------------ */
/*  Reviews                                                            */
/* ------------------------------------------------------------------ */

export const reviews: Review[] = [
  {
    id: 1,
    guestName: "Arjun",
    guestLocation: "Mumbai, India",
    date: "September 2026",
    rating: 5,
    text: "A comfortable and relaxing stay with everything needed for a pleasant visit. The apartment was spotless, and the jacuzzi was a wonderful addition. The location is perfect — close to the beach and several great restaurants. The host was very responsive and helpful throughout our stay.",
    avatar: "/images/reviews/avatar-placeholder.svg",
  },
  {
    id: 2,
    guestName: "Priya",
    guestLocation: "Bengaluru, India",
    date: "August 2026",
    rating: 5,
    text: "Great location and a lovely apartment. The space was clean and comfortable. We really appreciated the well-equipped kitchen and the private jacuzzi. Would definitely recommend this place for a weekend getaway.",
    avatar: "/images/reviews/avatar-placeholder.svg",
  },
  {
    id: 3,
    guestName: "Rohit",
    guestLocation: "Delhi, India",
    date: "August 2026",
    rating: 5,
    text: "Really enjoyed the stay. The apartment was well maintained and convenient. The pool area was clean and the gym facilities were adequate. The self check-in process was smooth and hassle-free.",
    avatar: "/images/reviews/avatar-placeholder.svg",
  },
  {
    id: 4,
    guestName: "Sneha",
    guestLocation: "Pune, India",
    date: "July 2026",
    rating: 5,
    text: "A very pleasant experience with a comfortable room and helpful hosting. The neighbourhood is quiet yet close to all the major attractions. The apartment had all the amenities we needed, including excellent air conditioning which was a lifesaver in the Goa heat.",
    avatar: "/images/reviews/avatar-placeholder.svg",
  },
  {
    id: 5,
    guestName: "Vikram",
    guestLocation: "Hyderabad, India",
    date: "July 2026",
    rating: 5,
    text: "Everything was as expected and the property made for a relaxing trip. The outdoor areas are beautifully maintained. The host's communication was excellent from booking to checkout.",
    avatar: "/images/reviews/avatar-placeholder.svg",
  },
  {
    id: 6,
    guestName: "Ananya",
    guestLocation: "Chennai, India",
    date: "June 2026",
    rating: 5,
    text: "Lovely stay and a good base for exploring Candolim and the surrounding area. The apartment is tastefully decorated and well-equipped. We particularly enjoyed the private jacuzzi in the evenings. Would love to visit again.",
    avatar: "/images/reviews/avatar-placeholder.svg",
  },
];

/* ------------------------------------------------------------------ */
/*  Nearby stays                                                       */
/* ------------------------------------------------------------------ */

export const nearbyStays: NearbyStay[] = [
  { id: 1, title: "Cozy stay in Candolim", image: "/images/nearby/nearby_1.jpg", price: 12500, rating: 4.8 },
  { id: 2, title: "Modern apartment near the beach", image: "/images/nearby/nearby_2.jpg", price: 14800, rating: 4.9 },
  { id: 3, title: "Relaxing Goa getaway", image: "/images/nearby/nearby_3.jpg", price: 13200, rating: 4.7 },
  { id: 4, title: "Stylish Candolim apartment", image: "/images/nearby/nearby_4.jpg", price: 15900, rating: 4.85 },
  { id: 5, title: "Peaceful holiday home", image: "/images/nearby/nearby_5.jpg", price: 11700, rating: 4.75 },
  { id: 6, title: "Beachside stay", image: "/images/nearby/nearby_6.jpg", price: 17100, rating: 4.9 },
  { id: 7, title: "Comfortable Goa retreat", image: "/images/nearby/nearby_7.jpg", price: 13900, rating: 4.8 },
  { id: 8, title: "Charming stay in North Goa", image: "/images/nearby/nearby_8.jpg", price: 15200, rating: 4.82 },
];