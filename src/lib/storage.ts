import Database from "@tauri-apps/plugin-sql";

export const storage = await Database.load("sqlite:priorities.db");

