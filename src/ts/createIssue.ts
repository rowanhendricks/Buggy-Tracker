import { invoke } from "../../node_modules/@tauri-apps/api/tauri";
import "../style/createIssue.css";

const issueForm = document.getElementById("issue-form")
const title = document.getElementById("title") as HTMLInputElement
const description = document.getElementById("description") as HTMLInputElement

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

issueForm.addEventListener("submit", async e => {
  e.preventDefault()
  try {
    await invoke('create_issue', {
      title: title.value, 
      description: description.value,
      project: params.name
    })
    location.href = `./project.html?name=${params.name}`
  } catch (error) {
    console.error(error)
  }
})