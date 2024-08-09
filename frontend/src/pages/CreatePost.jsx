import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';
import Editor from "../components/Editor";
import axios from "axios";

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    ev.preventDefault(); // Prevent default form submission

    const data = new FormData();
    data.append('title', title);
    data.append('summary', summary);
    data.append('content', content);
    if (files) { // Check if files are selected
      data.append('image', files); // Use append to handle files
    }

    try {
      const response = await axios.post('http://localhost:5000/api/posts/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      if (response.status === 200) {
        setRedirect(true);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }

  if (redirect) {
    return <Navigate to='/' />;
  }

  return (
    <section className="create-post">
      <div className="container">
        <h2>Create Post</h2>
        <form onSubmit={createNewPost} className="form create-post__form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={ev => setTitle(ev.target.value)}
          />
          <input
            type="text"
            placeholder="Summary"
            value={summary}
            onChange={ev => setSummary(ev.target.value)}
          />
          <input
            type="file"
            name="image"
            onChange={ev => setFiles(ev.target.files[0])}
          />
          <Editor value={content} onChange={setContent} />
          <button style={{ marginTop: '5px' }} className="btn primary">Create post</button>
        </form>
      </div>
    </section>
  );
}
