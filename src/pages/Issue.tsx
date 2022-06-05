import { useParams } from "react-router-dom";

const Issue = () => {
  const {issue_id} = useParams()
  return (
    <div>
      <h1>{`Project, ${issue_id}`}</h1>
      <p>This is the Specific project</p>
    </div>
  );
}

export default Issue;