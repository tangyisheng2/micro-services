import axios from "axios";
import { useState } from "react";
import {ENDPOINT} from '../../constant/Backend'

function PostCreate() {
  const [title, setTitle] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    axios.post(`${ENDPOINT}/posts/create`, {
      title,
    });
    setTitle("");
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label>
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
            />
          </label>
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}
export default PostCreate;
