import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function AdminPage() {
  const token = localStorage.getItem("token");

  const [pendingPoems, setPendingPoems] = useState([]);
  const [approvedPoems, setApprovedPoems] = useState([]);
  const [featuredPoems, setFeaturedPoems] = useState([]);

  const [pendingStories, setPendingStories] = useState([]);
  const [approvedStories, setApprovedStories] = useState([]);
  const [featuredStories, setFeaturedStories] = useState([]);

  const headers = { Authorization: `Bearer ${token}` };

  const fetchAll = async () => {
    try {
      const [
        pp, ap, fp,
        ps, as, fs
      ] = await Promise.all([
        fetch(`${API}/poems/pending`, { headers }),
        fetch(`${API}/poems`, { headers }),
        fetch(`${API}/poems/featured`, { headers }),
        fetch(`${API}/stories/pending`, { headers }),
        fetch(`${API}/stories`, { headers }),
        fetch(`${API}/stories/featured`, { headers }),
      ]);

      const approvedPoemsData = await ap.json();
      const approvedStoriesData = await as.json();

      setPendingPoems(await pp.json());
      setFeaturedPoems(await fp.json());
      setApprovedPoems(approvedPoemsData.filter(p => !p.featured));

      setPendingStories(await ps.json());
      setFeaturedStories(await fs.json());
      setApprovedStories(approvedStoriesData.filter(s => !s.featured));
    } catch (err) {
      console.error("Admin fetch failed", err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const approve = async (type, id) => {
    await fetch(`${API}/${type}/approve/${id}`, {
      method: "PUT",
      headers,
    });
    fetchAll();
  };

  const toggleFeature = async (type, id, featured) => {
    await fetch(`${API}/${type}/feature/${id}`, {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ featured }),
    });
    fetchAll();
  };

  const remove = async (type, id) => {
    await fetch(`${API}/${type}/${id}`, {
      method: "DELETE",
      headers,
    });
    fetchAll();
  };

  const Card = ({ item, children }) => (
    <div className="bg-white rounded-xl shadow p-5 space-y-3">
      <h3 className="text-xl font-semibold text-teal-800">
        {item.title || item.mood}
      </h3>
      <p className="whitespace-pre-line text-gray-700 line-clamp-5">
        {item.content}
      </p>
      <div className="flex gap-3 flex-wrap pt-3">{children}</div>
    </div>
  );

  const Section = ({ title, children }) => (
    <section className="mb-14">
      <h2 className="text-2xl font-semibold text-teal-700 mb-4">{title}</h2>
      {children}
    </section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white p-8">
      <h1 className="text-3xl font-bold text-center text-teal-900 mb-12">
        YugenVerse Admin Panel
      </h1>

      {/* PENDING */}
      <Section title="🕒 Pending Poems">
        <div className="grid md:grid-cols-2 gap-6">
          {pendingPoems.map(p => (
            <Card key={p._id} item={p}>
              <button onClick={() => approve("poems", p._id)} className="btn bg-teal-600 text-white">Approve</button>
              <button onClick={() => remove("poems", p._id)} className="btn bg-red-500 text-white">Delete</button>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="🕒 Pending Stories">
        <div className="grid md:grid-cols-2 gap-6">
          {pendingStories.map(s => (
            <Card key={s._id} item={s}>
              <button onClick={() => approve("stories", s._id)} className="btn bg-teal-600 text-white">Approve</button>
              <button onClick={() => remove("stories", s._id)} className="btn bg-red-500 text-white">Delete</button>
            </Card>
          ))}
        </div>
      </Section>

      {/* APPROVED */}
      <Section title="✅ Approved Poems">
        <div className="grid md:grid-cols-2 gap-6">
          {approvedPoems.map(p => (
            <Card key={p._id} item={p}>
              <button onClick={() => toggleFeature("poems", p._id, true)} className="btn bg-yellow-500 text-white">
                ⭐ Feature
              </button>
              <button onClick={() => remove("poems", p._id)} className="btn bg-red-500 text-white">
                Delete
              </button>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="⭐ Featured Poems">
        <div className="grid md:grid-cols-2 gap-6">
          {featuredPoems.map(p => (
            <Card key={p._id} item={p}>
              <button onClick={() => toggleFeature("poems", p._id, false)} className="btn bg-gray-500 text-white">
                ❌ Unfeature
              </button>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="⭐ Featured Stories">
        <div className="grid md:grid-cols-2 gap-6">
          {featuredStories.map(s => (
            <Card key={s._id} item={s}>
              <button onClick={() => toggleFeature("stories", s._id, false)} className="btn bg-gray-500 text-white">
                ❌ Unfeature
              </button>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
