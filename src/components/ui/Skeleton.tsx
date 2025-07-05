
export const RowCardSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(5)].map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl shadow p-4 space-y-2 border border-gray-200"
        >
          {/* عنصر العنوان داخل الكارت */}
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>

          {/* تفاصيل صغيرة */}
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );
};
