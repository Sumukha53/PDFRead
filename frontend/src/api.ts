import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

export const uploadPdf = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_BASE}/upload`, formData, {
      timeout: 600000,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || error.message);
    }

    throw error;
  }
};

export const askQuestion = async (question: string) => {
  try {
    const response = await axios.post(
      `${API_BASE}/ask`,
      { question },
      { timeout: 600000 }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || error.message);
    }

    throw error;
  }
};