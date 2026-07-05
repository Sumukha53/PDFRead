import ChatBubble from "./ChatBubble";
import Typing from "./Typing";
import type { Message } from "../types";

interface Props {
  messages: Message[];
  loading: boolean;
}

export default function Chat({
  messages,
  loading,
}: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-8 bg-gray-100">

      {messages.length === 0 && (
        <div className="h-full flex items-center justify-center">

          <div className="text-center">

            <h2 className="text-4xl font-bold mb-4">
              Chat with your PDF
            </h2>

            <p className="text-gray-500">
              Upload a PDF and start asking questions.
            </p>

          </div>

        </div>
      )}

      {messages.map((msg, index) => (
        <ChatBubble
          key={index}
          message={msg}
        />
      ))}

      {loading && <Typing />}

    </div>
  );
}