const pool = require("./src/db");
const modules = require("./src/data/modulesData.json");

async function seed() {
  try {
    // Optional: clear previous data
    await pool.query("TRUNCATE TABLE modules");

    for (const m of modules) {
      await pool.query(
        "INSERT INTO modules (title, type, url, class_group, description, created_by) VALUES (?, ?, ?, ?, ?, ?)",
        [m.title, m.type, m.url, m.class_group, m.description, m.created_by]
      );
    }
    console.log("Modules seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding modules:", err);
    process.exit(1);
  }
}

seed();
