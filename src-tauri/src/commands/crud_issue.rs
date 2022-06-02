use std::collections::HashMap;
use std::fs;

use serde::{Deserialize, Serialize};

use super::crud_project::{read_project, Project};
use super::util::generate_id;


#[derive(Serialize, Deserialize, Clone)]
pub struct Issue {
  pub title: String,
  pub description: String,
}

#[tauri::command]
pub fn create_issue(title: String, description: String, project_id: String) {
  let mut projects = read_project();
  
  let mut issues = read_issue(project_id.clone());
  
  issues.insert(
    generate_id(issues.len() as u64),
    Issue {
      title,
      description,
  });
  
  match projects.get_mut(&project_id) {
    Some(p) => {
      *p = Project {
        name: p.name.clone(),
        issues,
      };
    },
    None => todo!(),
  }

  let projects_json = serde_json::to_string(&projects)
    .ok()
    .expect("Unable to write file");

  fs::write("data.json", projects_json)
    .ok()
    .expect("Unable to write file");
}

#[tauri::command]
pub fn read_issue(project_id: String) -> HashMap<String, Issue> {
  let projects = read_project();

  let issues: HashMap<String, Issue> = projects[&project_id].issues.clone();
  
  return issues;
}

#[tauri::command]
pub fn update_issue(title: String, description: String, issue_id: String, project_id: String) {
  let mut projects = read_project();

  let mut issues = read_issue(project_id.clone());

  match issues.get_mut(&issue_id) {
    Some(i) => {
      *i = Issue {
        title,
        description,
      };
    },
    None => todo!(),
  }

  match projects.get_mut(&project_id) {
    Some(p) => {
      *p = Project {
        name: p.name.clone(),
        issues,
      };
    },
    None => todo!(),
  }

  let projects_json = serde_json::to_string(&projects)
    .ok()
    .expect("Unable to write file");

  fs::write("data.json", projects_json)
    .ok()
    .expect("Unable to write file");
}

#[tauri::command]
pub fn delete_issue(issue_id: String, project_id: String) {
  let mut projects = read_project();
  
  let mut issues = read_issue(project_id.clone());

  issues.remove(&issue_id);
  
  match projects.get_mut(&project_id) {
    Some(p) => {
      *p = Project {
        name: p.name.clone(),
        issues,
      };
    },
    None => todo!(),
  }

  let projects_json = serde_json::to_string(&projects)
    .ok()
    .expect("Unable to write file");

  fs::write("data.json", projects_json)
    .ok()
    .expect("Unable to write file");
}    
