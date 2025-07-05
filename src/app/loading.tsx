function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-orange-600 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-orange-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-4 h-4 bg-orange-600 rounded-full animate-bounce [animation-delay:-0.6s]"></div>
      </div>
    </div>
  );
}
export default Loading