import { Project, Issue } from "types";
import "../style/project.css";
import { appWindow } from "../../node_modules/@tauri-apps/api/window";
import { invoke } from "../../node_modules/@tauri-apps/api/tauri";

const searchBar = document.getElementById("search-bar") as HTMLInputElement
const list = document.getElementById("list")
const baseItem = document.getElementById("base-item")
const createIssue = document.getElementById("create-issue") as HTMLAnchorElement
const legend = document.getElementById("legend-title") as HTMLLegendElement

const id = location.hash.replace('#', '')

async function project() {
  try {
    const project: Map<string, Project> = await invoke("read_project")
    const issues: Map<string, Issue> = await invoke('read_issue', { projectId: id });
    
    appWindow.setTitle(project[id].name)
    legend.innerText = project[id].name

    createIssue.setAttribute('href', `/createIssue.html/#${id}`)

    Object.keys(issues).forEach((key, index) => {
      const clone = baseItem.cloneNode(true) as HTMLDivElement
      clone.id = index.toString()
  
      list.appendChild(clone)
  
      const title = document.getElementsByClassName("title")[index] as HTMLElement
      const link = document.getElementsByClassName("link")[index] as HTMLElement
      const deleteButton = document.getElementsByClassName("delete-button")[index] as HTMLButtonElement
      const editButton = document.getElementsByClassName("edit-button")[index] as HTMLButtonElement
  
      title.innerText = issues[key].title
  
      link.setAttribute("href", `/issue.html/#${key}/${id}`)
  
      deleteButton.addEventListener("click", async e => {
        try {
          await invoke("delete_issue", { 
            issueId: key, 
            projectId: id,
          })
          location.reload();
        } catch (error) {
          console.error(error)
        }
      })
  
      editButton.addEventListener("click", e => {
        const editForm = document.getElementsByClassName("edit-form")[index] as HTMLFormElement
        editForm.hidden = false
  
        const editTitle = document.getElementsByClassName("edit-title")[index] as HTMLInputElement
        const editDesc = document.getElementsByClassName("edit-desc")[index] as HTMLInputElement
  
        editForm.addEventListener("submit", async e => {
          e.preventDefault()
          try {
            await invoke('update_issue', {
              title: editTitle.value, 
              description: editDesc.value,
              issueId: key,
              projectId: id,
            })
            location.reload();
          } catch (error) {
            console.error(error)
          }
        })
      })
  
      clone.hidden = false
    });
  } catch (error) {
    console.error(error)
  }  
}

project()
