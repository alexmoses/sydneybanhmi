"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="container py-24 text-center">
      <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        We encountered an unexpected error while loading this page. Please try
        refreshing or come back later.
      </p>
      <button
        onClick={() => reset()}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2"
      >
        Try again
      </button>
    </div>
  );
}
