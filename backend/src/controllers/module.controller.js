const pool = require("../db");

// Get all modules (with optional filters: class_group, type)
exports.getModules = async (req, res) => {
  try {
    const { class_group, type } = req.query;
    let query = "SELECT * FROM modules WHERE 1=1";
    const params = [];

    if (class_group) {
      query += " AND class_group = ?";
      params.push(class_group);
    }

    if (type) {
      query += " AND type = ?";
      params.push(type);
    }

    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single module by ID
exports.getModuleById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM modules WHERE id = ?", [id]);

    if (rows.length === 0)
      return res.status(404).json({ message: "Module not found" });

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new module (teacher only)
exports.createModule = async (req, res) => {
  try {
    const { title, type, url, class_group, description } = req.body;
    const created_by = req.user.id; // from auth middleware

    if (!title || !type || !url || !class_group) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    const [result] = await pool.query(
      "INSERT INTO modules (title, type, url, class_group, description, created_by) VALUES (?, ?, ?, ?, ?, ?)",
      [title, type, url, class_group, description || null, created_by]
    );

    res
      .status(201)
      .json({ message: "Module created successfully", id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a module (teacher only)
exports.updateModule = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, type, url, class_group, description } = req.body;

    const [result] = await pool.query(
      "UPDATE modules SET title = ?, type = ?, url = ?, class_group = ?, description = ? WHERE id = ?",
      [title, type, url, class_group, description || null, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Module not found" });

    res.json({ message: "Module updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a module (teacher only)
exports.deleteModule = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query("DELETE FROM modules WHERE id = ?", [id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Module not found" });

    res.json({ message: "Module deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
