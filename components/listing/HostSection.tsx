import type { Property } from "@/lib/types";
import styles from "./HostSection.module.css";

interface HostSectionProps {
  host: Property["host"];
}

export default function HostSection({ host }: HostSectionProps) {
  return (
    <section className={styles.host} id="section-host">
      <h2>Meet your host</h2>

      <div className={styles.hostCard}>
        <div className={styles.hostLeft}>
          <div className={styles.hostAvatarLarge}>
            {host.name.charAt(0)}
          </div>
          <h3 className={styles.hostName}>{host.name}</h3>
          <span className={styles.hostLabel}>Host</span>
        </div>

        <div className={styles.hostRight}>
          <div className={styles.hostStats}>
            <div className={styles.hostStat}>
              <span className={styles.hostStatIcon}>
                <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                  <path d="M8 1l2 4.1 4.5.6-3.3 3.2.8 4.5L8 11.3 3.9 13.4l.8-4.5L1.5 5.7 6 5.1 8 1z" />
                </svg>
              </span>
              {host.rating} rating
            </div>
            <div className={styles.hostStat}>
              <span className={styles.hostStatIcon}>
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 13V5l6-3 6 3v8" />
                  <rect x="5" y="8" width="6" height="5" />
                </svg>
              </span>
              {host.reviewCount.toLocaleString()} reviews
            </div>
            <div className={styles.hostStat}>
              <span className={styles.hostStatIcon}>
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="8" cy="8" r="6" />
                  <path d="M8 5v3l2 2" strokeLinecap="round" />
                </svg>
              </span>
              {host.hostingDuration} hosting
            </div>
          </div>

          <div className={styles.hostDetails}>
            <div className={styles.hostDetailItem}>
              <span className={styles.hostDetailIcon}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                </svg>
              </span>
              Born in {host.bornIn}
            </div>
            <div className={styles.hostDetailItem}>
              <span className={styles.hostDetailIcon}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </span>
              Where I went to school: {host.education}
            </div>
          </div>

          <div className={styles.hostResponse}>
            <p>Response rate: {host.responseRate}</p>
            <p>Responds {host.responseTime}</p>
          </div>

          <div className={styles.hostCoHosts}>
            <div className={styles.coHostAvatars}>
              {Array.from({ length: Math.min(host.coHostCount, 4) }, (_, i) => (
                <div key={i} className={styles.coHostAvatar}>
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span className={styles.coHostText}>
              {host.coHostCount} co-hosts
            </span>
          </div>

          <button type="button" className={styles.messageButton}>
            Message host
          </button>
        </div>
      </div>
    </section>
  );
}
