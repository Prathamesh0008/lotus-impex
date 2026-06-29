"use client";

import { useEffect } from "react";

export default function CompanyScrollMotion() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".company-motion [data-reveal]"),
    );

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const target = entry.target as HTMLElement;
          target.classList.add("reveal-visible");
          observer.unobserve(target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    elements.forEach((element) => {
      const delay = element.dataset.delay;

      if (delay) {
        element.style.transitionDelay = `${delay}ms`;
      }

      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
