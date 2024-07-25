import * as SQLite from "expo-sqlite";

const initializeDatabase = async () => {
  try {
    let db = await SQLite.openDatabaseAsync("mainDBs.db");
    await db.execAsync("PRAGMA foreign_keys = OFF;");
    return db;
  } catch (error) {
    console.log("Error while opening database");
    alert(error);
    return null;
  }
};

const db = initializeDatabase();
export default db;
