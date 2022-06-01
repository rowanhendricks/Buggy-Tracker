use std::collections::HashMap;

#[tauri::command]
pub fn test() -> HashMap<String, String> {
  let mut map: HashMap<String, String> = HashMap::new();
  map.insert("key".to_string(), "value".to_string());
  map.insert("yes".to_string(), "no".to_string());
  map.insert("cringe".to_string(), "bruv".to_string());

  map
}