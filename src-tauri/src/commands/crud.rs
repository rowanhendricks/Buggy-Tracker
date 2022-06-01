use std::fs;

use serde::{Deserialize, Serialize};
use serde_json;

#[derive(Serialize, Deserialize)]
pub struct Project {
  name: String,
  issues: Vec<Issue>,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Issue {
  title: String,
  description: String,
}

#[tauri::command]
pub async fn create_project(name: String) {
  let mut projects = read_project().await;

  projects.push(Project {
    name,
    issues: Vec::new(),
  });

  let projects_json = serde_json::to_string(&projects).unwrap();

  fs::write("data.json", projects_json)
    .ok()
    .expect("Unable to write file");
}

#[tauri::command]
pub async fn read_project() -> Vec<Project> {
  let mut file = fs::read_to_string("data.json")
    .ok()
    .expect("Unable to read file");
  
  let data: Vec<Project> = serde_json::from_str(&mut file)
    .ok()
    .expect("error while parsing json");

  return data;
}

#[tauri::command]
pub async fn update_project(name: String, id: i32) {
  let mut projects = read_project().await;

  let issues = read_issue(id).await;

  projects[id as usize] = Project {
    name,
    issues
  };

  let projects_json = serde_json::to_string(&projects).unwrap();

  fs::write("data.json", projects_json)
    .ok()
    .expect("Unable to write file");
}

#[tauri::command]
pub async fn delete_project(id: i32) {
  let mut projects = read_project().await;

  projects.remove(id as usize);
  
  let projects_json = serde_json::to_string(&projects).unwrap();

  fs::write("data.json", projects_json)
    .ok()
    .expect("Unable to write file");
}    

#[tauri::command]
pub async fn create_issue(title: String, description: String, project_id: i32) {
  let mut projects = read_project().await;
  
  let mut issue = read_issue(project_id).await;

  issue.push(Issue {
    title,
    description,
  });
  
  projects[project_id as usize].issues = issue;

  let projects_json = serde_json::to_string(&projects).unwrap();

  fs::write("data.json", projects_json)
    .ok()
    .expect("Unable to write file");
}

#[tauri::command]
pub async fn read_issue(project_id: i32) -> Vec<Issue> {
  let projects = read_project().await;

  let issues: Vec<Issue> = projects[project_id as usize].issues.clone();
  
  return issues;
}

#[tauri::command]
pub async fn update_issue(title: String, description: String, project_id: i32, id: i32) {
  let mut projects = read_project().await;
  
  let mut issue = read_issue(project_id).await;

  issue[id as usize] = Issue {
    title,
    description,
  };

  projects[project_id as usize].issues = issue;

  let projects_json = serde_json::to_string(&projects).unwrap();

  fs::write("data.json", projects_json)
    .ok()
    .expect("Unable to write file");
}

#[tauri::command]
pub async fn delete_issue(id: i32, project_id: i32) {
  let mut projects = read_project().await;
  
  let mut issue = read_issue(project_id).await;

  issue.remove(id as usize);
  
  projects[project_id as usize].issues = issue;

  let projects_json = serde_json::to_string(&projects).unwrap();

  fs::write("data.json", projects_json)
    .ok()
    .expect("Unable to write file");
}    