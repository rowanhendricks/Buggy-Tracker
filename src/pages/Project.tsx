import { useParams } from "react-router-dom";

const Project = () => {
  const {project_id} = useParams()
  return (
    <div>
      <h1>{`Project, ${project_id}`}</h1>
      <p>This is the Specific project</p>
    </div>
  );
}

export default Project;