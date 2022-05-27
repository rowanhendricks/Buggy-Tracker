import "../style/issue.css";
import { Issue } from "types";
import { writeFile, readTextFile } from "../../node_modules/@tauri-apps/api/fs"

const issueForm = document.getElementById("issue-form")
const title = document.getElementById("title") as HTMLInputElement
const description = document.getElementById("description") as HTMLInputElement

issueForm.addEventListener("submit", e => {
  const existingIssues: Issue[] = JSON.parse(localStorage.getItem('Issues')) ?? []
  const data = [
    ...existingIssues,
    {
      title: title.value,
      description: description.value
    } as Issue
  ]
  localStorage.setItem("Issues", JSON.stringify(data))
})