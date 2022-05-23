const list = document.getElementById("list")

const issues = JSON.parse(localStorage.getItem("Issues"))

function createIssue(issue: any) {
  const issueElement = document.createElement("div")

  const title = document.createElement("h1")
  title.innerText = issue.title

  const description = document.createElement("p")
  description.innerText = issue.description

  
  issueElement.appendChild(title)
  issueElement.appendChild(description)

  return issueElement
}

issues.forEach(issue => {
  const issueElement = createIssue(issue)
  list.appendChild(issueElement)
});