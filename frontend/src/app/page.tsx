"use client";

import { useState } from "react";

export default function HomePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateBrand = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3001/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche: "eco-friendly travel pillow" })
      });

      const result = await res.json();
      setData(result);
    } catch (err) {
      setError("Failed to generate brand.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Dropshipping Brand Generator</h1>
      <button
        onClick={generateBrand}
        className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-500"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Brand"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {data && (
        <div className="mt-6 p-4 bg-gray-800 rounded">
          <h2 className="text-2xl font-semibold">{data.name}</h2>
          <p className="italic mb-2">{data.tagline}</p>
          <img
            src={`http://localhost:3001${data.imageUrl}`}
            alt="Brand Logo"
            className="w-64 h-64 object-contain"
          />
          <p className="mt-2 text-sm">Primary Color: <span style={{ color: data.primaryColor }}>{data.primaryColor}</span></p>
          <p className="mt-1 text-sm">Font: {data.font}</p>
        </div>
      )}
    </main>
  );
}
