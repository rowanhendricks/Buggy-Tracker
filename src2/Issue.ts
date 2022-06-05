import { Issue } from "./types";
import { appWindow } from "@tauri-apps/api/window";
import { invoke } from "@tauri-apps/api/tauri";

const id = location.hash.replace('#', '').split('/')

async function issue() {
  try {
    const issues: Map<string, Issue> = await invoke('read_issue', { projectId: id[1] });
    
    const issue = issues[id[0]]

    const title = document.getElementById('title')
    const description = document.getElementById('description')

    title.innerText = issue.title
    description.innerText = issue.description

    appWindow.setTitle(title.innerText)

  } catch (error) {
    console.error(error)
  }
}

issue()




