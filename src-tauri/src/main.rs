#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

pub mod commands;
use std::path::PathBuf;

use commands::crud_issue::{create_issue, read_issue, update_issue, delete_issue};
use commands::crud_project::{create_project, read_project, update_project, delete_project};

pub mod menu;
use menu::{generate_menu, menu_handler};

pub mod test;
use tauri::Manager;
use test::{test};

#[derive(Debug)]
pub struct AppState {
  pub app_dir: PathBuf,
}

fn main() {
  tauri::Builder::default()
    .menu(generate_menu())
    .on_menu_event(menu_handler)
    .invoke_handler(tauri::generate_handler![
      create_issue,
      read_issue,
      update_issue,
      delete_issue,
      create_project,
      read_project,
      update_project,
      delete_project,
      test
    ])
    .setup(|app|{
      let state = AppState {
        app_dir: app.path_resolver().app_dir().unwrap(),
      };
      app.manage(state);

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
