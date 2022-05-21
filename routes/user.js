const express = require('express');
const user = express.Router();
const db = require('../config/database');

user.post("/",async(req, res) => {
    const { user_name, user_mail, user_password } = req.body;
    if (user_name && user_mail && user_password) {
        let query = "INSERT INTO user (user_name, user_mail, user_password)";
        query += `VALUES ('${user_name}', '${user_mail}', '${user_password}');`;
        const rows = await db.query(query);
    
        if(rows.affectedRows) {
            return res.status(201).json({code:201, message: "Usuario registrado correctamente"});
        }
    
        return res.status(500).json({code:500, message:"Ocurrio un error"}); 
        
    }

    return res.status(500).json({code:500, message:"Campos incompletos"}); 

});

module.exports = user;