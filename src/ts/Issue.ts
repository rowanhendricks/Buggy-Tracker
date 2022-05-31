import { invoke } from "../../node_modules/@tauri-apps/api/tauri";
import { appWindow } from "../../node_modules/@tauri-apps/api/window";

import "../style/issue.css";

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

async function issue() {
  try {
    const issues = await invoke('read_issue', { project: params.name });

    const issue = issues[params.id]

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




