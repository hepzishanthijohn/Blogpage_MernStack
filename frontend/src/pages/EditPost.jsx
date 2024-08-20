import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";
import axios from 'axios';

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    axios.get(`https://blogpage-mern-stack-gi6a.vercel.app/api/posts/post/${id}`)
      .then(response => {
        const postInfo = response.data;
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
  }, [id]);

  const updatePost = async (ev) => {
    ev.preventDefault();
    const data = new FormData();
    data.append('title', title);
    data.append('summary', summary);
    data.append('content', content);
    data.append('id', id);
    if (files) {
      data.append('image', files);
    }

    try {
      const response = await axios.put(`https://blogpage-mern-stack-gi6a.vercel.app/api/posts/update/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      if (response.status === 200) {
        setRedirect(true);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <section className="edit-post">
      <div className="container">
        <h2>Edit Post</h2>
        <form onSubmit={updatePost} className="form create-post__form">
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
          <Editor className='.ck-editor__editable_inline' onChange={setContent} value={content} />
          <button style={{ marginTop: '5px' }} className="btn primary">Update post</button>
        </form>
      </div>
    </section>
  );
}
