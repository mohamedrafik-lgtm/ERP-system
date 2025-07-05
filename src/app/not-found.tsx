import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-100">
      <div className="text-center space-y-4">
        {/* عنصر بصري حديث */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-20 w-20 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 9v2m0 4h.01M12 5C7.589 5 4 8.589 4 13s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8z"
          />
        </svg>

        <h1 className="text-5xl font-bold text-gray-800">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700">
          Page Not Found
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 rounded-md bg-orange-600 text-white font-semibold hover:bg-orange-700 transition duration-300"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
