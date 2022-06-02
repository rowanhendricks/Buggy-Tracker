use std::collections::HashMap;
use std::fs::{write};
use tauri::api::file::read_string;

use serde::{Deserialize, Serialize};

use super::crud_issue::{read_issue, Issue};
use super::util::generate_id;

#[derive(Serialize, Deserialize)]
pub struct Project {
  pub name: String,
  pub issues: HashMap<String, Issue>,
}

#[tauri::command]
pub fn create_project(name: String) {
  let mut projects = read_project();

  projects.insert(
    generate_id(projects.len() as u64), 
    Project {
      name,
      issues: HashMap::new(),
  });

  let projects_json = serde_json::to_string(&projects)
    .ok()
    .expect("Unable to write file");

  write("data.json", projects_json)
    .ok()
    .expect("Unable to write file");
}

#[tauri::command]
pub fn read_project() -> HashMap<String, Project> {
  let mut file = read_string("data.json")
    .ok()
    .expect("Unable to read file");
  
  let data: HashMap<String, Project> = serde_json::from_str(&mut file)
    .ok()
    .expect("error while parsing json");
  
  data
}

#[tauri::command]
pub fn update_project(name: String, id: String) {
  let mut projects = read_project();

  match projects.get_mut(&id) {
    Some(p) => {
      *p = Project {
        name,
        issues: read_issue(id),
      };
    },
    None => {
      println!("Project not found");
    },
  }

  let projects_json = serde_json::to_string(&projects)
    .ok()
    .expect("Unable to write file");

  write("data.json", projects_json)
    .ok()
    .expect("Unable to write file");
}

#[tauri::command]
pub fn delete_project(id: String) {
  let mut projects = read_project();

  projects.remove(&id);
  
  let projects_json = serde_json::to_string(&projects)
    .ok()
    .expect("Unable to write file");

  write("data.json", projects_json)
    .ok()
    .expect("Unable to write file");
}   