#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::fs;
use serde::{Deserialize, Serialize};
use serde_json;
use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

#[derive(Serialize, Deserialize)]
struct Issue {
  title: String,
  description: String,
}

fn main() {  
  let quit = CustomMenuItem::new("quit".to_string(), "Quit");
  let close = CustomMenuItem::new("close".to_string(), "Close");
  let submenu = Submenu::new("File", Menu::new().add_item(quit).add_item(close));
  let menu = Menu::new()
    .add_native_item(MenuItem::Copy)
    .add_item(CustomMenuItem::new("hide", "Hide"))
    .add_submenu(submenu);

  tauri::Builder::default()
    .menu(menu)
    .on_menu_event(|event|{
      match event.menu_item_id() {
        "quit" => {
          std::process::exit(0);
        },
        "hide" => {
          event.window().close().unwrap();
        },
        _ => {}
      }
    })
    .invoke_handler(tauri::generate_handler![
      create_issue,
      read_issue,
      update_issue,
      delete_issue,
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

