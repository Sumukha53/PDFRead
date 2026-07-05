import { useState } from "react";
import Sidebar from "./components/Sidebar";
import UploadBox from "./components/UploadBox";
import Chat from "./components/Chat";
import InputBox from "./components/InputBox";
import { uploadPdf, askQuestion } from "./api";
import type { Message } from "./types";

export default function App() {
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpload(file: File) {
    try {
      await uploadPdf(file);
      setUploaded(true);
      setFileName(file.name);

      setMessages([
        {
          role: "assistant",
          text: `✅ ${file.name} uploaded successfully. You can now ask questions.`,
        },
      ]);
    } catch (error) {
      console.error("Upload failed", error);
      setUploaded(false);
      setFileName("");
      setMessages([
        {
          role: "assistant",
          text: "Upload failed. Please make sure the backend is running and the file is a valid PDF.",
        },
      ]);
    }
  }

  async function handleAsk() {
    if (!question.trim()) return;

    const userQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const res = await askQuestion(userQuestion);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: res.answer,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Something went wrong.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <div className="flex h-screen">

      <Sidebar
        uploaded={uploaded}
        fileName={fileName}
      />

      <div className="flex flex-col flex-1">

        <div className="p-6 bg-gray-100">
          <UploadBox onUpload={handleUpload} />
        </div>

        <Chat
          messages={messages}
          loading={loading}
        />

        <InputBox
          question={question}
          setQuestion={setQuestion}
          onSend={handleAsk}
          disabled={!uploaded}
        />

      </div>

    </div>
  );
}
