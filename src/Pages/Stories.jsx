import { useEffect, useState } from "react";
import StoryCard from "../components/StoryCard";
import { stories as fallback } from "../data/stories";
import { client } from "../utils/sanityClient";

export default function Stories(){
  const [stories, setStories] = useState(fallback);

  useEffect(()=>{
    if(!client) return;
    client.fetch(`*[_type == "story"] | order(_createdAt desc){ title, content }`)
      .then(setStories).catch(()=>{});
  },[]);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {stories.map((s,i)=> <StoryCard key={i} story={s}/>)}
    </div>
  );
}
