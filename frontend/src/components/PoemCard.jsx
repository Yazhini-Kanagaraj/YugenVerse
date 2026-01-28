import { useState } from "react";

export default function PoemCard({ poem }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="card p-5 group transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{poem.title}</h3>
        <span className="text-xs px-2 py-1 rounded-full bg-turquoise-100 text-turquoise-800">
          {poem.language || "English"}
        </span>
      </div>
    {/* Author */}
      <p className="text-sm italic text-gray-500 mt-1">
        — {poem.anonymous ? "Anonymous" : poem.author}
      </p>
      <p
        className={`mt-3 font-poem leading-relaxed text-slate-700 group-hover:text-slate-900 transition-colors whitespace-pre-line
        ${!expanded ? "line-clamp-2" : ""}`}
      >
        {poem.content}
      </p>

      {poem.content.length > 120 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-sm font-medium text-turquoise-700 hover:underline focus:outline-none"
        >
          {expanded ? "Show Less ▲" : "Read More ▼"}
        </button>
      )}
    </article>
  );
}
