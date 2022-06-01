use std::fs;
use std::time::SystemTime;
use std::collections::HashMap;

use block_id::{Alphabet, BlockId};

use serde::{Deserialize, Serialize};
use serde_json;

#[derive(Serialize, Deserialize)]
pub struct Project {
  name: String,
  issues: HashMap<String, Issue>,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Issue {
  title: String,
  description: String,
}

fn generate_id(index: u64) -> String {
  let alphabet = Alphabet::alphanumeric();

  let seed = SystemTime::now().duration_since(SystemTime::UNIX_EPOCH).unwrap().as_millis();

  let length = 8;

  let generator = BlockId::new(alphabet, seed, length);

  generator.encode_string(index)
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

  fs::write("data.json", projects_json)
    .ok()
    .expect("Unable to write file");
}

#[tauri::command]
pub fn read_project() -> HashMap<String, Project> {
  let mut file = fs::read_to_string("data.json")
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
pub fn delete_project(id: String) {
  let mut projects = read_project();

  projects.remove(&id);
  
  let projects_json = serde_json::to_string(&projects)
    .ok()
    .expect("Unable to write file");

  fs::write("data.json", projects_json)
    .ok()
    .expect("Unable to write file");
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
