import { invoke } from "../../node_modules/@tauri-apps/api/tauri";
import "../style/createIssue.css";

const issueForm = document.getElementById("issue-form") as HTMLFormElement
const title = document.getElementById("title") as HTMLInputElement
const description = document.getElementById("description") as HTMLInputElement

const id = location.hash.replace('#', '')

issueForm.addEventListener("submit", async e => {
  e.preventDefault()
  try {
    await invoke('create_issue', {
      title: title.value, 
      description: description.value,
      projectId: id
    })
    location.href = `/project.html/#${id}`
  } catch (error) {
    console.error(error)
  }
})