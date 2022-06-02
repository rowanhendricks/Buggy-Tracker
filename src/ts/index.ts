import { Project } from "types";
import "../style/index.css";
import { appWindow } from "../../node_modules/@tauri-apps/api/window";
import { invoke } from "../../node_modules/@tauri-apps/api/tauri";

const projectForm = document.getElementById("project-form") as HTMLFormElement;
const name = document.getElementById("name") as HTMLInputElement;
const list = document.getElementById("project-list") as HTMLUListElement;
const baseEl = document.getElementById("base-el") as HTMLElement;

projectForm.addEventListener('submit', async e => {
  try {
    await invoke('create_project', {
      name: name.value
    })
    location.reload()
  } catch (error) {
    console.error(error)
  }
})

async function index() {
  try {
    appWindow.setTitle('Buggy Tracker')
    
    let projects: Map<string, Project> = new Map(Object.entries(await invoke('read_project')));
    let index = 0;

    projects.forEach((project, id) => {
      const clone = baseEl.cloneNode(true) as HTMLDivElement
      clone.id = index.toString()

      list.append(clone);

      const projectName = document.getElementsByClassName("name")[index] as HTMLElement;
      const link = document.getElementsByClassName("link")[index] as HTMLAnchorElement;
      const deleteButton = document.getElementsByClassName("delete-button")[index] as HTMLButtonElement
      const editButton = document.getElementsByClassName("edit-button")[index] as HTMLButtonElement
      const editForm = document.getElementsByClassName("edit-form")[index] as HTMLFormElement
      const editName = document.getElementsByClassName("edit-name")[index] as HTMLInputElement

      projectName.innerText = project.name;

      link.setAttribute("href", `./project.html?id=${id}`);

      deleteButton.addEventListener("click", async e => {
        try {
          await invoke("delete_project", { 
            id,
          })
          location.reload();
        } catch (error) {
          console.error(error)
        }
      })
  

      editButton.addEventListener("click", e => {
        editForm.hidden = false
  
        editForm.addEventListener("submit", async e => {
          try {
            await invoke('update_project', {
              name: editName.value, 
              id,
            })
            location.reload();
          } catch (error) {
            console.error(error)
          }
        })
      })

      clone.hidden = false
      index++;
    })
  } catch (error) {
    console.error(error)
  }
}

index()