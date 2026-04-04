export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
      {/* Header skeleton */}
      <div className="mb-10">
        <div className="h-9 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg mb-3" />
        <div className="h-5 w-72 bg-slate-100 dark:bg-slate-800/60 rounded" />
      </div>

      {/* Filter pill skeletons */}
      <div className="flex flex-wrap gap-2 mb-10">
        {[80, 60, 120, 100, 90, 110].map((w, i) => (
          <div
            key={i}
            className="h-8 rounded-full bg-slate-100 dark:bg-slate-800"
            style={{ width: `${w}px` }}
          />
        ))}
      </div>

      {/* Card grid skeletons */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-28 bg-slate-100 dark:bg-slate-800 rounded" />
              <div className="h-5 w-16 bg-slate-100 dark:bg-slate-800 rounded-full" />
            </div>
            <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="space-y-1.5">
              <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded" />
              <div className="h-4 w-2/3 bg-slate-100 dark:bg-slate-800 rounded" />
            </div>
            <div className="h-px bg-slate-100 dark:bg-slate-800 mt-2" />
            <div className="flex justify-between">
              <div className="h-3 w-20 bg-slate-100 dark:bg-slate-800 rounded" />
              <div className="h-3 w-16 bg-slate-100 dark:bg-slate-800 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
