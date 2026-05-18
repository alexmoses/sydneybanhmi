import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="container py-24 text-center">
      <h1 className="text-4xl font-bold mb-4">Page not found</h1>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        The page you are looking for doesn&apos;t exist or has been moved. Check the
        URL or browse to one of our categories.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2"
      >
        Go home
      </Link>
    </div>
  );
}
