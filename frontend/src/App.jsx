import { useState } from "react";

const Logo = () => (
  <div className="flex justify-center mb-6">
    <svg
      width="72"
      height="72"
      viewBox="0 0 100 100"
      className="transition-transform duration-300 hover:scale-105"
    >
      <circle cx="50" cy="50" r="48" fill="#6366f1" />
      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        fontSize="32"
        fontWeight="700"
        fill="#fff"
        fontFamily="sans-serif"
      >
        GP
      </text>
    </svg>
  </div>
);

const BACKEND_URL = "https://gp-project-zeta.vercel.app/";

export default function App() {
  const [businessName, setBusinessName] = useState("");
  const [location, setLocation] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [headlineLoading, setHeadlineLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!businessName.trim() || !location.trim()) {
      setError("Both fields are required");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/businessData`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessName, location }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Request failed");
      setData(json);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const regenerateHeadline = async () => {
    setHeadlineLoading(true);
    try {
      const params = new URLSearchParams({ businessName, location });
      const res = await fetch(
        `${BACKEND_URL}/seoHeadlineRegenerate?${params.toString()}`
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Request failed");
      setData((prev) => ({ ...prev, headline: json.headline }));
    } catch (err) {
      setError(err.message);
    }
    setHeadlineLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800 rounded-xl shadow-lg p-8">
        <Logo />
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          GrowthPro<span className="text-indigo-400">AI</span>
        </h1>
        <p className="text-center text-slate-300 mb-8">
          Generate instant business insights
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Business name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full rounded-md bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-400 outline-none"
            disabled={loading}
            autoFocus
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-md bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-400 outline-none"
            disabled={loading}
          />

          {error && (
            <p className="text-red-400 text-sm font-medium text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-500 hover:bg-indigo-600 transition-colors text-white py-3 rounded-md font-semibold"
          >
            {loading ? "Processing..." : "Unlock insights"}
          </button>
        </form>

        {data && (
          <section className="mt-8 space-y-4">
            <div className="flex justify-between text-slate-200">
              <span>Google rating</span>
              <span className="font-semibold text-lg text-yellow-300">
                {data.rating} ★
              </span>
            </div>
            <div className="flex justify-between text-slate-200">
              <span>Reviews</span>
              <span className="font-semibold text-lg text-indigo-300">
                {data.reviews}
              </span>
            </div>
            <div>
              <p className="text-slate-300 mb-1">AI‑generated headline</p>
              <blockquote className="bg-slate-700/60 text-white italic p-4 rounded-md">
                “{data.headline}”
              </blockquote>
            </div>
            <button
              onClick={regenerateHeadline}
              disabled={headlineLoading}
              className="w-full bg-slate-700 hover:bg-slate-600 transition-colors text-white py-2 rounded-md font-medium"
            >
              {headlineLoading ? "Regenerating..." : "New headline"}
            </button>
          </section>
        )}

        <footer className="pt-10 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} GrowthProAI
        </footer>
      </div>
    </div>
  );
}
