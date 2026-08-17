export default function Loading() {
  return (
    <div
      className="flex min-h-[calc(100dvh-10rem)] w-full flex-1 items-center justify-center lg:min-h-[100dvh]"
      role="status"
      aria-label="Loading page"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="size-12 overflow-visible text-neutral-900 dark:text-neutral-100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="route-loader-path"
          d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}