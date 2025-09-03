export default function Contact(){
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold">Contact</h1>
      <form className="mt-6 space-y-4">
        <input className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-turquoise-400"
               placeholder="Your name"/>
        <input className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-turquoise-400"
               placeholder="Your email"/>
        <textarea rows="5"
          className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-turquoise-400"
          placeholder="Your message"
        />
        <button className="btn btn-primary">Send</button>
      </form>
      <p className="mt-4 text-sm opacity-70">Or email: yazhini220206@gmail.com</p>
    </div>
  );
}
