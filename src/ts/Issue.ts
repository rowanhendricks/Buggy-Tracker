import { Issue } from "types";
import { invoke } from "../../node_modules/@tauri-apps/api/tauri";
import { appWindow } from "../../node_modules/@tauri-apps/api/window";

import "../style/issue.css";

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




