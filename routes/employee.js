const express = require('express');
const employee = express.Router();
const db = require('../config/database');

employee.post("/", async (req, res, next) => {
    const { nombre, apellido, telefono, correo, direccion } = req.body;
  
    if (nombre && apellido && telefono && correo) {
      let query =
        "INSERT INTO employee (nombre, apellido, telefono, correo, direccion)";
      query += `VALUES('${nombre}', '${apellido}', ${telefono}, '${correo})', '${direccion}')`;
      const rows = await db.query(query);
      console.log(rows);
  
      if (rows.affectedRows == 1) {
        return res.status(201).json({ code: 201, message: "Empleado insertado correctamente" });
      }
      return res.status(500).json({ code: 500, message: "Ocurrió un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
  });
  
employee.get("/:name([A-Za-z]+)", async (req, res, next) => {
    const name = req.params.name;
    const employeeName = await db.query(
      `SELECT * FROM employee WHERE nombre = "${name}"`
    );
  
    employeeName.length > 0
      ? res.status(200).json({ code: 200, message: employeeName })
      : res.status(404).json({ code: 404, message: "Empleado no encontrado" });
  });

 
  




//Exportamos
module.exports =employee;