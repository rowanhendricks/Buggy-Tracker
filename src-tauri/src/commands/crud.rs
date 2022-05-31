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
pub fn create_project(name: String) {
  let mut projects = read_project();

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
pub fn read_project() -> Vec<Project> {
  let mut file = fs::read_to_string("data.json")
    .ok()
    .expect("Unable to read file");
  
  let data: Vec<Project> = serde_json::from_str(&mut file)
    .ok()
    .expect("error while parsing json");

  return data;
}

#[tauri::command]
pub fn update_project(name: String, issues:Vec<Issue> , id: i32) {
  let mut projects = read_project();

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
pub fn delete_project(id: i32) {
  let mut projects = read_project();

  projects.remove(id as usize);
  
  let projects_json = serde_json::to_string(&projects).unwrap();

  fs::write("data.json", projects_json)
    .ok()
    .expect("Unable to write file");
}    

#[tauri::command]
pub fn create_issue(title: String, description: String, project: String) {
  let mut projects = read_project();

  let index = projects.iter().position(|r| r.name == project).unwrap();
  
  let mut issue = read_issue(project);

  issue.push(Issue {
    title,
    description,
  });
  
  projects[index].issues = issue;

  let projects_json = serde_json::to_string(&projects).unwrap();

  fs::write("data.json", projects_json)
    .ok()
    .expect("Unable to write file");
}

#[tauri::command]
pub fn read_issue(project: String) -> Vec<Issue> {
  let projects = read_project();

  let issues: Vec<Issue> = projects
    .iter()
    .find(|p| p.name == project)
    .unwrap()
    .issues
    .clone();
  
  return issues;
}

#[tauri::command]
pub fn update_issue(title: String, description: String, project: String, id: i32) {
  let mut projects = read_project();

  let index = projects.iter().position(|r| r.name == project).unwrap();
  
  let mut issue = read_issue(project);

  issue[id as usize] = Issue {
    title,
    description,
  };

  projects[index].issues = issue;

  let projects_json = serde_json::to_string(&projects).unwrap();

  fs::write("data.json", projects_json)
    .ok()
    .expect("Unable to write file");
}

#[tauri::command]
pub fn delete_issue(id: i32, project: String) {
  let mut projects = read_project();

  let index = projects.iter().position(|r| r.name == project).unwrap();
  
  let mut issue = read_issue(project);

  issue.remove(id as usize);
  
  projects[index].issues = issue;

  let projects_json = serde_json::to_string(&projects).unwrap();

  fs::write("data.json", projects_json)
    .ok()
    .expect("Unable to write file");
}    