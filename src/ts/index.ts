const searchBar = document.getElementById("search-bar") as HTMLInputElement
const list = document.getElementById("list")

const issues = JSON.parse(localStorage.getItem("Issues")) || []

function createIssue(issue: any, id: string) {
  const issueElement = document.createElement("div")
  issueElement.id = id

  const title = document.createElement("h1")
  title.innerText = issue.title

  const description = document.createElement("p")
  description.innerText = issue.description

  const deleteButton = document.createElement("button")
  deleteButton.id = id
  deleteButton.innerText = "Delete"

  deleteButton.addEventListener("click", async e => {
    issues.splice(id, 1)
    localStorage.setItem("Issues", JSON.stringify(issues))
    location.reload();
  })

  const editButton = document.createElement("button")
  editButton.id = id
  editButton.innerText = "Edit"

  editButton.addEventListener("click", async e => {
    const editingIssues = JSON.parse(localStorage.getItem('Issues')) || []
    issueElement.innerHTML = ''
    
    const editForm = document.createElement("form") 
    const editTitle = document.createElement("input")
    const editDesc = document.createElement("input")
    const editSubmit = document.createElement("button")
    editButton.type = "submit"
    editButton.hidden = true
    
    editForm.addEventListener("submit", e => {
      editingIssues[id] = {
        title: editTitle.value,
        description: editDesc.value
      }
      localStorage.setItem("Issues", JSON.stringify(editingIssues))
    })

    editForm.appendChild(editTitle)
    editForm.appendChild(editDesc)
    editForm.appendChild(editSubmit)
    issueElement.appendChild(editForm)
  })

  
  issueElement.appendChild(title)
  issueElement.appendChild(description)
  issueElement.appendChild(deleteButton)
  issueElement.appendChild(editButton)

  return issueElement
}

issues.forEach((issue, index) => {
  const issueElement = createIssue(issue, String(index))
  list.appendChild(issueElement)
});

