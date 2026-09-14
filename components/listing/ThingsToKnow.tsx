"use client";

import { useState } from "react";
import styles from "./ThingsToKnow.module.css";

export default function ThingsToKnow() {
  const [showRules, setShowRules] = useState(false);
  const [showSafety, setShowSafety] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

  return (
    <section className={styles.thingsToKnow}>
      <h2>Things to know</h2>

      <div className={styles.columns}>
        {/* Cancellation policy */}
        <div className={styles.column}>
          <h3>Cancellation policy</h3>
          <div className={styles.ruleItem}>
            <span className={styles.ruleIcon}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </span>
            Free cancellation before 17 October.
          </div>
          <div className={styles.ruleItem}>
            <span className={styles.ruleIcon}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
              </svg>
            </span>
            Cancel before check-in on 18 October for a partial refund.
          </div>
          {showPolicy && (
            <div className={styles.ruleItem}>
              <span className={styles.ruleIcon}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </span>
              Review this host&apos;s full policy for details.
            </div>
          )}
          <button
            type="button"
            className={styles.showMoreLink}
            onClick={() => setShowPolicy((v) => !v)}
            aria-expanded={showPolicy}
          >
            {showPolicy ? "Show less" : "Learn more"}
            <svg
              viewBox="0 0 12 12"
              width="10"
              height="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ transform: showPolicy ? "rotate(180deg)" : undefined }}
            >
              <path d="M4 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* House rules */}
        <div className={styles.column}>
          <h3>House rules</h3>
          <div className={styles.ruleItem}>
            <span className={styles.ruleIcon}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" strokeLinecap="round" />
              </svg>
            </span>
            Check-in after 2:00 pm
          </div>
          <div className={styles.ruleItem}>
            <span className={styles.ruleIcon}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" strokeLinecap="round" />
              </svg>
            </span>
            Checkout before 11:00 am
          </div>
          <div className={styles.ruleItem}>
            <span className={styles.ruleIcon}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
            </span>
            3 guests maximum
          </div>
          {showRules && (
            <>
              <div className={styles.ruleItem}>
                <span className={styles.ruleIcon}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                  </svg>
                </span>
                No smoking inside the apartment
              </div>
              <div className={styles.ruleItem}>
                <span className={styles.ruleIcon}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                </span>
                No commercial parties or loud events
              </div>
            </>
          )}
          <button
            type="button"
            className={styles.showMoreLink}
            onClick={() => setShowRules((v) => !v)}
            aria-expanded={showRules}
          >
            {showRules ? "Show less" : "Learn more"}
            <svg
              viewBox="0 0 12 12"
              width="10"
              height="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ transform: showRules ? "rotate(180deg)" : undefined }}
            >
              <path d="M4 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Safety & property */}
        <div className={styles.column}>
          <h3>Safety &amp; property</h3>
          <div className={`${styles.ruleItem} ${styles.notReported}`}>
            <span className={styles.ruleIcon}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round" />
              </svg>
            </span>
            Carbon monoxide alarm not reported
          </div>
          <div className={`${styles.ruleItem} ${styles.notReported}`}>
            <span className={styles.ruleIcon}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round" />
              </svg>
            </span>
            Smoke alarm not reported
          </div>
          <div className={styles.ruleItem}>
            <span className={styles.ruleIcon}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </span>
            Exterior security cameras on property
          </div>
          {showSafety && (
            <>
              <div className={styles.ruleItem}>
                <span className={styles.ruleIcon}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                </span>
                First aid kit available on premises
              </div>
              <div className={styles.ruleItem}>
                <span className={styles.ruleIcon}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </span>
                Gated security with 24/7 guard
              </div>
            </>
          )}
          <button
            type="button"
            className={styles.showMoreLink}
            onClick={() => setShowSafety((v) => !v)}
            aria-expanded={showSafety}
          >
            {showSafety ? "Show less" : "Learn more"}
            <svg
              viewBox="0 0 12 12"
              width="10"
              height="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ transform: showSafety ? "rotate(180deg)" : undefined }}
            >
              <path d="M4 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
