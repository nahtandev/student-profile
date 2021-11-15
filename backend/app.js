// Déclaration des dépandances requis
const express = require('express'); /*Server Express*/
const path = require('path'); /* Gestion des Chemins*/
const bodyParser = require('body-parser');
const app = express(); /*Initialisation du serveur express*/
const mysql = require('mysql');

// Déclaration d'une varible d'initialisation de la Base de donnée SQL
var initConnectDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
})

// Create SQL Database 
initConnectDB.connect(function (err) {
  if (err){ //If error
    console.log(err.sqlMessage)
  }
  // Query to create database
  initConnectDB.query("CREATE DATABASE IF NOT EXISTS student_profile CHARACTER SET 'utf8';", function (err) {
    if (err) console.log(err.sqlMessage); // If error to create database
    else {//Otherwise
      console.log("Database Create Succeful"); 
      // Active Table created
      initConnectDB.query("USE student_profile", function (err) {
        if (err) console.log(err.sqlMessage); //If error to active table.
        else { //Otherwise
          // Query to Create Table
          initConnectDB.query(" CREATE TABLE IF NOT EXISTS info (\
            id INT NOT NULL AUTO_INCREMENT,\
            first_name VARCHAR(100),\
            last_name VARCHAR(100),\
            email VARCHAR(100),\
            age INT,\
            university VARCHAR(150),\
            phone VARCHAR(30),\
            PRIMARY KEY (id)\
          );\
        ", function (err) {
          if (err) console.log(err.sqlMessage); //If error to create table.
          else console.log("Table Create Suceful"); //Otherwise
        })
        }
      })  
    }
  })
})


// Déclaration des routes globales
app.use("/assets", express.static(path.resolve(__dirname, "../frontend", "assets")));
app.use("/html", express.static(path.resolve(__dirname, "../frontend", "html")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => { /*Routes pour corriger les erreurs CORS*/
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Déclaration de routes GET
app.get("/save-succeful", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/html", "save-succeful.html"));
})
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend", "index.html"));
});

// POST Request to save profile in database
app.post("/save", (req, res) => { /*Routes pour enrégistrer les information dans la BDD*/
  // Initialisation de la connexion à la base de donnée
  initConnectDB.connect(function (err) {
    if (err) {
      console.log(err.sqlMessage); /* Si erreur, afficher l'erreur */
    }
    // Script Requête SQL D'insertion dans la base de donnée
    var insertQuery = "INSERT INTO info(first_name, last_name, email, age, university, phone) VALUES ('" + req.body.firstName + "', '" + req.body.lastName + "', '" + req.body.email + "', '" + req.body.age + "', '" + req.body.university + "', '" + req.body.phone + "')";
    // Exécution de la requête SQL
    initConnectDB.query(insertQuery, function (err, result) {
      if (err) {
        console.log(err.sqlMessage); /* Si errerur Afficher l'erreur */
      }
      // Sinon
      else {
        return res.redirect('/save-succeful'); /* Rediriger vers la page d'enregistrement effectué avec succès */
        return res.end(); /* Fin de la requête */
      }
    })
  })
})

// POST Request to load all Profile from database
app.post('/all-profile', (req, res) => {
  // Initialisation de la connexion à la base de donnée
  initConnectDB.connect(function (err) {
    if (err) {
      console.log(err.sqlMessage); /* Si erreur, afficher l'erreur */
    }

    initConnectDB.query("SELECT * FROM info ORDER BY id DESC", function (err, result) {
      if (err) {
        console.log(err.sqlMessage);
      }
      else{
          res.send(result);
          return res.end();
      }
    })

  })
})


module.exports = app;