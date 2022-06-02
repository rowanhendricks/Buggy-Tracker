import { invoke } from "../../node_modules/@tauri-apps/api/tauri";
import "../style/createIssue.css";

const issueForm = document.getElementById("issue-form") as HTMLFormElement
const title = document.getElementById("title") as HTMLInputElement
const description = document.getElementById("description") as HTMLInputElement

const id = window.location.hash.replace('#', '')

issueForm.action = `/project.html/#${id}`

issueForm.addEventListener("submit", async e => {
  try {
    await invoke('create_issue', {
      title: title.value, 
      description: description.value,
      projectId: id
    })
  } catch (error) {
    console.error(error)
  }
})