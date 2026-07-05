interface Props {
  question: string;
  setQuestion: (value: string) => void;
  onSend: () => void;
  disabled: boolean;
}

export default function InputBox({
  question,
  setQuestion,
  onSend,
  disabled,
}: Props) {
  return (
    <div className="flex gap-3 p-4 border-t bg-white">
      <input
        type="text"
        placeholder="Ask anything about the PDF..."
        value={question}
        disabled={disabled}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSend();
          }
        }}
        className="flex-1 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={onSend}
        disabled={disabled}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg disabled:bg-gray-400"
      >
        Send
      </button>
    </div>
  );
}