"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-logo">
            <span className="site-logo__mark" aria-hidden="true">
            ◉
            </span>
            <span className="site-logo__text">airbnb</span>
        </Link>

        <button
          type="button"
          className={`search-pill ${searchOpen ? "search-pill--active" : ""}`}
          onClick={() => setSearchOpen((open) => !open)}
          aria-label="Search destinations, dates and guests"
        >
          <span className="search-pill__item">
            <span className="search-pill__label">Where</span>
            <span className="search-pill__value">Anywhere</span>
          </span>

          <span className="search-pill__divider" />

          <span className="search-pill__item">
            <span className="search-pill__label">When</span>
            <span className="search-pill__value">Anytime</span>
          </span>

          <span className="search-pill__divider" />

          <span className="search-pill__item search-pill__item--guests">
            <span className="search-pill__label">Who</span>
            <span className="search-pill__value">Add guests</span>
          </span>

          <span className="search-pill__search" aria-hidden="true">
            <svg
              viewBox="0 0 32 32"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              aria-hidden="true"
            >
              <circle cx="14" cy="14" r="8" />
              <path d="M20 20l7 7" strokeLinecap="round" />
            </svg>
          </span>
        </button>

        <div className="header-actions">
          <button type="button" className="host-button">
            Become a host
          </button>

          <button
            type="button"
            className="header-icon-button"
            aria-label="Choose language"
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18" />
              <path d="M12 3c3 3 4 6 4 9s-1 6-4 9c-3-3-4-6-4-9s1-6 4-9Z" />
            </svg>
          </button>

          <button
            type="button"
            className="profile-menu"
            aria-label="Open menu"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>

            <span className="profile-avatar" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <circle cx="12" cy="8" r="3.5" />
                <path d="M5 21c.8-4 3.1-6 7-6s6.2 2 7 6" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}