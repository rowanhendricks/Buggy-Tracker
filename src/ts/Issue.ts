import { invoke } from "../../node_modules/@tauri-apps/api/tauri";
import { appWindow } from "../../node_modules/@tauri-apps/api/window";

import "../style/issue.css";

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const id = params.id

async function issue() {
  try {
    const issues = await invoke('read_issue');

    const issue = issues[id]

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




