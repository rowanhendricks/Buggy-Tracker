import "../style/index.css";

const searchBar = document.getElementById("search-bar") as HTMLInputElement
const list = document.getElementById("list")
const baseItem = document.getElementById("base-item")

const issues = JSON.parse(localStorage.getItem("Issues")) || []

issues.forEach((issue, index) => {
  const clone = baseItem.cloneNode(true) as HTMLDivElement
  const title = clone.childNodes[1] as HTMLElement
  const description = clone.childNodes[3] as HTMLElement
  const deleteButton = clone.childNodes[5] as HTMLButtonElement
  const editButton = clone.childNodes[7] as HTMLButtonElement

  title.innerText = issue.title
  
  description.innerText = issue.description

  deleteButton.addEventListener("click", async e => {
    issues.splice(index, 1)
    localStorage.setItem("Issues", JSON.stringify(issues))
    location.reload();
  })

  editButton.addEventListener("click", async e => {
    const editingIssues = JSON.parse(localStorage.getItem('Issues')) || []
    const editForm = clone.childNodes[9] as HTMLFormElement
    editForm.hidden = false

    const editTitle = editForm.childNodes[1] as HTMLInputElement
    const editDesc = editForm.childNodes[3] as HTMLInputElement

    editForm.addEventListener("submit", e => {
      editingIssues[index] = {
        title: editTitle.value,
        description: editDesc.value
      }
      localStorage.setItem("Issues", JSON.stringify(editingIssues))
    })
  })

  clone.hidden = false

  console.log(clone.childNodes)
  list.appendChild(clone)
});

