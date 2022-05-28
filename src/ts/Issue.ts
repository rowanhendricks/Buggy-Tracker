import "../style/issue.css";
import { invoke } from "../../node_modules/@tauri-apps/api/tauri";

const issueForm = document.getElementById("issue-form")
const title = document.getElementById("title") as HTMLInputElement
const description = document.getElementById("description") as HTMLInputElement

issueForm.addEventListener("submit", e => {
  invoke('create_issue', {
    title: title.value, 
    description: description.value
  })
})