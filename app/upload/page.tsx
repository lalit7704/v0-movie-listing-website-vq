"use client";
import { useState } from "react";

export default function UploadPage() {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [result, setResult] = useState("");

  const uploadMovie = async () => {
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, videoUrl }),
    });

    const data = await res.json();

    if (data.success) {
      setResult("✅ " + data.telegramLink);
    } else {
      setResult("❌ " + data.error);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Upload Movie</h1>

      <input
        type="text"
        placeholder="Movie Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />
      <br /><br />

      <button onClick={uploadMovie}>Upload</button>

      <p>{result}</p>
    </div>
  );
}