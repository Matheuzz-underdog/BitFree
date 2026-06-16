const fs = require("fs");
const path = require("path");
const mysql = require("mysql");

const DB_NAME = "encuesta";

const validarSeed = () => {
  return new Promise((resolve, reject) => {
    const conn = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: DB_NAME,
    });

    conn.connect((err) => {
      if (err) {
        return reject(new Error(`Error al conectar con "${DB_NAME}". Asegurate de haber ejecutado primero "node base-estructura"`));
      }

      conn.query("SELECT COUNT(*) AS total FROM encuesta_linux", (err, results) => {
        conn.end();
        if (err) return reject(err);

        const total = results[0].total;

        if (total > 1) {
          return reject(new Error(
            "La seed de datos de ejemplo ya fue cargada anteriormente.\n" +
            "Se recomienda que limpie la base de datos para no duplicar datos."
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
      database: DB_NAME,
      multipleStatements: true,
    });

    conn.connect((err) => {
      if (err) return reject(err);

      const sql = fs.readFileSync(path.join(__dirname, "encuesta-prueba.sql"), "utf-8");

      conn.query(sql, (err) => {
        conn.end();
        if (err) return reject(err);
        resolve();
      });
    });
  });
};

console.log("\nEjecutando migracion: Datos de ejemplo\n");

validarSeed()
  .then(() => migrar())
  .then(() => {
    console.log("¡Datos de ejemplo ingresados correctamente!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  });
