"use client";

import { useEffect, useRef, useCallback } from "react";
import styles from "./Toast.module.css";

interface ToastProps {
  message: string | null;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, onClose, duration = 2500 }: ToastProps) {
  const toastRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<{ leave?: ReturnType<typeof setTimeout>; close?: ReturnType<typeof setTimeout> }>({});

  const clearTimers = useCallback(() => {
    if (timersRef.current.leave) clearTimeout(timersRef.current.leave);
    if (timersRef.current.close) clearTimeout(timersRef.current.close);
  }, []);

  useEffect(() => {
    if (!message) return;

    // Reset the leaving attribute synchronously via ref (not setState)
    if (toastRef.current) {
      toastRef.current.setAttribute("data-leaving", "false");
    }

    clearTimers();

    timersRef.current.leave = setTimeout(() => {
      if (toastRef.current) {
        toastRef.current.setAttribute("data-leaving", "true");
      }
    }, duration);

    timersRef.current.close = setTimeout(onClose, duration + 200);

    return clearTimers;
  }, [message, duration, onClose, clearTimers]);

  if (!message) return null;

  return (
    <div
      ref={toastRef}
      className={styles.toast}
      data-leaving="false"
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
