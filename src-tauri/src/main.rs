// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;

fn main() {
  tauri::Builder::default()
  .invoke_handler(tauri::generate_handler![get_devices])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}


#[tauri::command]
fn get_devices(adb: &str) -> String {

  let output = Command::new("cmd")
  .args(["/C", &adb, "devices"])
  .output()
  .expect("Error could not run command");
let out_str = String::from_utf8_lossy(&output.stdout);
return out_str.to_string();
}
