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
    const id = Number((e.target as HTMLElement).id)
    issues.splice(id, 1)

    localStorage.setItem("Issues", JSON.stringify(issues))
    location.reload();
  })
  
  issueElement.appendChild(title)
  issueElement.appendChild(description)
  issueElement.appendChild(deleteButton)

  return issueElement
}

issues.forEach((issue, index) => {
  const issueElement = createIssue(issue, String(index))
  list.appendChild(issueElement)
});

