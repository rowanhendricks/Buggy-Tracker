#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

pub mod crud;
use crud::{create_issue, read_issue, update_issue, delete_issue};

pub mod menu;
use menu::{generate_menu, menu_handler};

fn main() {  
  tauri::Builder::default()
    .menu(generate_menu())
    .on_menu_event(menu_handler)
    .invoke_handler(tauri::generate_handler![
      create_issue,
      read_issue,
      update_issue,
      delete_issue,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

