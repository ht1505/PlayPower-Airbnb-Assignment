import { bookingInfo } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import styles from "./BookingCard.module.css";

interface BookingCardProps {
  onReserve?: () => void;
  onClaim?: () => void;
}

export default function BookingCard({ onReserve, onClaim }: BookingCardProps) {
  return (
    <div className={styles.card}>
      {/* Promo banner */}
      <div className={styles.promo}>
        <div className={styles.promoText}>
          <h3>Get 10% off your next stay</h3>
          <p>Terms apply</p>
        </div>
        <button type="button" className={styles.promoClaim} onClick={onClaim}>
          Claim
        </button>
      </div>

      {/* Price */}
      <div className={styles.priceRow}>
        <span className={styles.price}>
          {formatCurrency(bookingInfo.totalPrice)}
        </span>
        <span className={styles.priceNights}>
          for {bookingInfo.nights} nights
        </span>
      </div>

      {/* Date and guest inputs */}
      <div className={styles.inputGroup}>
        <div className={styles.inputRow}>
          <div className={styles.inputField}>
            <span className={styles.inputLabel}>Check-in</span>
            <span className={styles.inputValue}>{bookingInfo.checkIn}</span>
          </div>
          <div className={styles.inputField}>
            <span className={styles.inputLabel}>Checkout</span>
            <span className={styles.inputValue}>{bookingInfo.checkOut}</span>
          </div>
        </div>
        <div className={styles.guestField}>
          <div>
            <span className={styles.inputLabel}>Guests</span>
            <span className={styles.inputValue}>
              {bookingInfo.guests} guests
            </span>
          </div>
          <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Reserve button */}
      <button type="button" className={styles.reserveButton} onClick={onReserve}>
        Reserve
      </button>

      <p className={styles.note}>You won&apos;t be charged yet</p>

      {/* Cancellation */}
      <div className={styles.cancellation}>
        <span className={styles.cancellationIcon}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4l3 3" strokeLinecap="round" />
          </svg>
        </span>
        <span>
          Free cancellation before 17 October
        </span>
      </div>
    </div>
  );
}
