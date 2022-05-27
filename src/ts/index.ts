import { invoke } from "../../node_modules/@tauri-apps/api/tauri";
import { Issue } from "types";
import "../style/index.css";
invoke('say_hi')

const searchBar = document.getElementById("search-bar") as HTMLInputElement
const list = document.getElementById("list")
const baseItem = document.getElementById("base-item")

const issues: Issue[] = JSON.parse(localStorage.getItem("Issues")) ?? []

issues.forEach((issue, index) => {
  const clone = baseItem.cloneNode(true) as HTMLDivElement
  clone.id = index.toString()

  list.appendChild(clone)

  const title = document.getElementsByClassName("title")[index] as HTMLElement
  const description = document.getElementsByClassName("description")[index] as HTMLElement
  const deleteButton = document.getElementsByClassName("delete-button")[index] as HTMLButtonElement
  const editButton = document.getElementsByClassName("edit-button")[index] as HTMLButtonElement

  title.innerText = issue.title
  
  description.innerText = issue.description

  deleteButton.addEventListener("click", e => {
    issues.splice(index, 1)
    localStorage.setItem("Issues", JSON.stringify(issues))
    location.reload();
  })

  editButton.addEventListener("click", e => {
    const editForm = document.getElementsByClassName("edit-form")[index] as HTMLFormElement
    editForm.hidden = false

    const editTitle = document.getElementsByClassName("edit-title")[index] as HTMLInputElement
    const editDesc = document.getElementsByClassName("edit-desc")[index] as HTMLInputElement

    editForm.addEventListener("submit", e => {
      issues[index] = {
        title: editTitle.value,
        description: editDesc.value
      }
      localStorage.setItem("Issues", JSON.stringify(issues))
    })
  })

  clone.hidden = false
});

