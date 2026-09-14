"use client";

import { useEffect, useRef, useCallback } from "react";
import styles from "./ModalShell.module.css";

interface ModalShellProps {
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
  variant?: "fullscreen" | "dialog";
}

export default function ModalShell({
  onClose,
  children,
  title,
  headerLeft,
  headerRight,
  variant = "fullscreen",
}: ModalShellProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Focus close button on mount
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  // Escape to close
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Focus trap
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const container = containerRef.current;
      if (!container) return;

      const focusable = container.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [],
  );

  const closeIcon = (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
    </svg>
  );

  if (variant === "dialog") {
    return (
      <div
        className={styles.dialogOverlay}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        ref={containerRef}
        onKeyDown={handleKeyDown}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className={styles.dialog}>
          <div className={styles.dialogHeader}>
            <button
              ref={closeRef}
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close"
              type="button"
            >
              {closeIcon}
            </button>
            {title && <h2 className={styles.dialogTitle}>{title}</h2>}
          </div>
          <div className={styles.dialogContent}>{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      ref={containerRef}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button
            ref={closeRef}
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close"
            type="button"
          >
            {closeIcon}
          </button>
          {headerLeft}
        </div>
        {title && <h2 className={styles.headerTitle}>{title}</h2>}
        <div className={styles.headerRight}>{headerRight}</div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
