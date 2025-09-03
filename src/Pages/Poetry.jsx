import { useEffect, useState } from "react";
import PoemCard from "../components/PoemCard";
import { poems as fallback } from "../data/poems";
import { client } from "../utils/sanityClient";

export default function Poetry(){
  const [tab, setTab] = useState("all");
  const [poems, setPoems] = useState(fallback);

  useEffect(()=>{
    if(!client) return;
    client.fetch(`*[_type == "poem"] | order(_createdAt desc){
      title, content, language
    }`).then(setPoems).catch(()=>{});
  },[]);

  const filtered = poems.filter(p => tab==="all" ? true : (p.language||"English").toLowerCase() === tab);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {["all","english","tamil"].map(t=>(
          <button key={t}
            onClick={()=>setTab(t)}
            className={`btn ${tab===t ? "btn-primary" : "bg-slate-100 hover:bg-slate-200"}`}>
            {t[0].toUpperCase()+t.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p,i)=> <PoemCard key={i} poem={p}/>)}
      </div>
    </div>
  );
}
