import { Issue } from "types";
import "../style/index.css";
import { invoke } from "../../node_modules/@tauri-apps/api/tauri";

const searchBar = document.getElementById("search-bar") as HTMLInputElement
const list = document.getElementById("list")
const baseItem = document.getElementById("base-item")

invoke('read_issue')
  .then((issues: Issue[]) => {
    issues.forEach((issue, index) => {
      const clone = baseItem.cloneNode(true) as HTMLDivElement
      clone.id = index.toString()
    
      list.appendChild(clone)
    
      const title = document.getElementsByClassName("title")[index] as HTMLElement
      const link = document.getElementsByClassName("link")[index] as HTMLElement
      const deleteButton = document.getElementsByClassName("delete-button")[index] as HTMLButtonElement
      const editButton = document.getElementsByClassName("edit-button")[index] as HTMLButtonElement
    
      title.innerText = issue.title

      link.setAttribute("href", "./issue.html?id=" + index)
    
      deleteButton.addEventListener("click", e => {
        invoke("delete_issue", { id: index })
        location.reload();
      })
    
      editButton.addEventListener("click", e => {
        const editForm = document.getElementsByClassName("edit-form")[index] as HTMLFormElement
        editForm.hidden = false
    
        const editTitle = document.getElementsByClassName("edit-title")[index] as HTMLInputElement
        const editDesc = document.getElementsByClassName("edit-desc")[index] as HTMLInputElement
    
        editForm.addEventListener("submit", e => {
          invoke('update_issue', {
            title: editTitle.value, 
            description: editDesc.value,
            id: index
          })
          location.reload();
        })
      })
    
      clone.hidden = false
    });
  })
  .catch(err => {
    console.log(err)
  })


