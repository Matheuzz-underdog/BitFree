const fs = require("fs");
const path = require("path");
const mysql = require("mysql");

const DB_NAME = "encuesta";

const validarEstructura = () => {
  return new Promise((resolve, reject) => {
    const conn = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
    });

    conn.connect((err) => {
      if (err) {
        return reject(new Error("No se pudo conectar a MySQL. Asegurate de que XAMPP esté corriendo."));
      }

      conn.query("SHOW DATABASES", (err, results) => {
        conn.end();
        if (err) return reject(err);

        const existe = results.map((r) => Object.values(r)[0]).includes(DB_NAME);

        if (existe) {
          return reject(new Error(
            `La base de datos "${DB_NAME}" ya existe.\n` +
            `Para continuar:\n` +
            `  1. Abri phpMyAdmin en http://localhost/phpmyadmin\n` +
            `  2. Elimina la base de datos "${DB_NAME}"\n` +
            `  3. Volve a ejecutar la migracion`
          ));
        }

        resolve();
      });
    });
  });
};

const migrar = () => {
  return new Promise((resolve, reject) => {
    const conn = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      multipleStatements: true,
    });

    conn.connect((err) => {
      if (err) return reject(err);

      const sql = fs.readFileSync(path.join(__dirname, "encuesta-estructura.sql"), "utf-8");

      conn.query(sql, (err) => {
        conn.end();
        if (err) return reject(err);
        resolve();
      });
    });
  });
};

console.log("\nEjecutando migracion: Estructura vacia\n");

validarEstructura()
  .then(() => migrar())
  .then(() => {
    console.log("¡Estructura creada exitosamente!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  });
