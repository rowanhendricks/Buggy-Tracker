import { useParams } from "react-router-dom";

const Issue = () => {
  const {projectId, issueId} = useParams()
  return (
    <div id="issue">
      <h1 id="title"></h1>
      <p id="description"></p>
    </div>
  );
}

export default Issue;