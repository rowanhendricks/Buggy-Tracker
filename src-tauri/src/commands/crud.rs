use std::fs;

use serde::{Deserialize, Serialize};
use serde_json;

#[derive(Serialize, Deserialize)]
pub struct Issue {
  title: String,
  description: String,
}

#[tauri::command]
pub fn create_issue(title: String, description: String) {
  let mut issue = read_issue();

  issue.push(Issue {
    title,
    description,
  });

  let issue_json = serde_json::to_string(&issue).unwrap();

  fs::write("data.json", issue_json)
    .ok()
    .expect("Unable to write file");
}

#[tauri::command]
pub fn read_issue() -> Vec<Issue> {
  let mut file = fs::read_to_string("data.json")
    .ok()
    .expect("Unable to read file");
  
  let data: Vec<Issue> = serde_json::from_str(&mut file)
    .ok()
    .expect("error while parsing json");
  
  return data;
}

#[tauri::command]
pub fn update_issue(title: String, description: String, id: i32) {
  let mut issue = read_issue();

  issue[id as usize] = Issue {
    title,
    description,
  };

  let issue_json = serde_json::to_string(&issue).unwrap();

  fs::write("data.json", issue_json)
    .ok()
    .expect("Unable to write file");
}

#[tauri::command]
pub fn delete_issue(id: i32) {
  let mut issue = read_issue();

  issue.remove(id as usize);
  
  let issue_json = serde_json::to_string(&issue).unwrap();

  fs::write("data.json", issue_json)
    .ok()
    .expect("Unable to write file");
}    