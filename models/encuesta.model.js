const util = require("util");
const db = require("../connections/connection");

const query = util.promisify(db.query).bind(db);

class Encuesta {
  static async crear(data) {
    try {
      const sql = "INSERT INTO encuesta_linux SET ?";
      const result = await query(sql, {
        nombre_completo: data.nombre_completo,
        edad: data.edad,
        sexo: data.sexo,
        correo: data.correo,
        distro: data.distro
      });
      return { id: result.insertId, ...data };
    } catch (error) {
      throw new Error(`Error al guardar encuesta: ${error.message}`);
    }
  }

  static async obtenerTodas() {
    try {
      const sql = "SELECT * FROM encuesta_linux ORDER BY id ASC";
      const rows = await query(sql);
      return rows;
    } catch (error) {
      throw new Error(`Error al obtener encuestas: ${error.message}`);
    }
  }

  static async buscarPorCorreo(correo) {
    try {
      const sql = "SELECT * FROM encuesta_linux WHERE correo = ?";
      const rows = await query(sql, [correo]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw new Error(`Error al buscar por correo: ${error.message}`);
    }
  }

  static async obtenerDistros() {
    try {
      const sql = "SELECT distro FROM encuesta_linux";
      const rows = await query(sql);
      return rows.map(r => r.distro);
    } catch (error) {
      throw new Error(`Error al obtener distros: ${error.message}`);
    }
  }
}

module.exports = Encuesta;
