const CreateIssue = () => {
  return (
    <form>
      <label htmlFor="title">Title: </label>
      <input type="text" id="title" required/><br/>
      <label htmlFor="description">Description: </label>
      <input type="text" id="description" required/><br/>
      <button type="submit">Create</button>
    </form>
  );
}

export default CreateIssue;