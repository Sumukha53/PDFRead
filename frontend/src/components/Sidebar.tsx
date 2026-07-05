interface Props {
  uploaded: boolean;
  fileName: string;
}

export default function Sidebar({
  uploaded,
  fileName,
}: Props) {
  return (
    <div className="w-72 bg-gray-900 text-white h-screen p-5">

      <h1 className="text-2xl font-bold mb-8">
        📄 Chat with PDF
      </h1>

      <button className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg mb-8">
        + New Chat
      </button>

      <div className="border-t border-gray-700 pt-5">

        <h2 className="font-semibold mb-3">
          Uploaded PDF
        </h2>

        {uploaded ? (
          <div className="bg-gray-800 rounded-lg p-3 break-all">
            📄 {fileName}
          </div>
        ) : (
          <p className="text-gray-400">
            No PDF uploaded
          </p>
        )}

      </div>

    </div>
  );
}