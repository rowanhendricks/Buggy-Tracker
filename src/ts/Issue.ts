import { invoke } from "../../node_modules/@tauri-apps/api/tauri";

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const id = params.id

invoke('read_issue')
  .then(issues => {
    const issue = issues[id]
    const title = document.getElementById('title')
    const description = document.getElementById('description')

    title.innerText = issue.title
    description.innerText = issue.description
  })