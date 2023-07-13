import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogsReducer";
import { setNotification } from "../reducers/notificationReducer";
import { setErrorMessage } from "../reducers/errorReducer";

const BlogForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    try {
      dispatch(
        createBlog({
          title,
          author,
          url,
        })
      );
      dispatch(setNotification(`${title} by ${author} added`, 3));
    } catch (exception) {
      console.error(exception);
      dispatch(setErrorMessage(exception, 3));
    }
    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <div>
      <form onSubmit={addBlog}>
        <h2>create new</h2>
        <div>
          title:
          <input
            id="input-title"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="input-author"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="input-url"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-blog-button" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
