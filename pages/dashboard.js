import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitPost = async () => {
    if (!title || !content) return alert("Fill all fields!");
    await axios.post("/api/posts", { title, content, authorEmail: session.user.email });
    alert("Post created!");
    setTitle("");
    setContent("");
  };

  if (!session) return <p>Please login first.</p>;

  return (
    <div>
      <h1>Write a Blog Post</h1>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
      <button onClick={submitPost}>Submit</button>
    </div>
  );
}
