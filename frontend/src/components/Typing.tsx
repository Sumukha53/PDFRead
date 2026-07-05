export default function Typing() {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-gray-200 rounded-xl px-4 py-3 shadow">
        <div className="flex gap-2">
          <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></span>
          <span
            className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></span>
          <span
            className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></span>
        </div>
      </div>
    </div>
  );
}