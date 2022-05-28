#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::fs;
use serde::{Deserialize, Serialize};
use serde_json;

#[derive(Serialize, Deserialize)]
struct Issue {
  title: String,
  description: String,
}

fn main() {  
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      create_issue,
      read_issue,
      update_issue,
      delete_issue
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
  
  #[tauri::command]
  fn create_issue(title: String, description: String) {
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
  fn read_issue() -> Vec<Issue> {
    let mut file = fs::read_to_string("data.json")
      .ok()
      .expect("Unable to read file");
    
    let data: Vec<Issue> = serde_json::from_str(&mut file)
      .ok()
      .expect("error while parsing json");
    
    return data;
  }
  
  #[tauri::command]
  fn update_issue(title: String, description: String, id: i32) {
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
  fn delete_issue(id: i32) {
    let mut issue = read_issue();
  
    issue.remove(id as usize);
    
    let issue_json = serde_json::to_string(&issue).unwrap();
  
    fs::write("data.json", issue_json)
      .ok()
      .expect("Unable to write file");
  }    
}

