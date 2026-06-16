const Encuesta = require("../models/encuesta.model");

// Utilidades -------------------------------------------------
const validar = {
  email(str) {
    if (!str || typeof str !== "string") return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
  },

  nombreCompleto(str) {
    if (!str || typeof str !== "string") return false;
    return str.trim().split(/\s+/).length >= 2;
  },

  sexo(str) {
    return ["Masculino", "Femenino", "Otro"].includes(str);
  },

  edad(val) {
    const num = Number(val);
    return Number.isInteger(num) && num >= 0 && num <= 120;
  },

  sanitizar(str) {
    if (!str || typeof str !== "string") return "";
    return str.replace(/['"]/g, "").trim();
  }
};

// Controller -------------------------------------------------
class EncuestaController {

  static async enviar(data) {
    if (!data || Object.keys(data).length === 0) {    // si esta vacio
      throw { status: 400,
        error: "Datos requeridos",
        detalle: "Envíe los datos en formato JSON" };
    }

    const nombre_completo = validar.sanitizar(data.nombre_completo);
    const correo = validar.sanitizar(data.correo);
    const distro = validar.sanitizar(data.distro);

    if (!validar.nombreCompleto(nombre_completo)) {
      throw { 
        status: 400, 
        error: "Nombre inválido", 
        detalle: "Debe incluir nombre y apellido separados por un espacio" };
    }

    if (!validar.sexo(data.sexo)) {
      throw { 
        status: 400, 
        error: "Sexo inválido", 
        detalle: "Use: Masculino, Femenino u Otro" };
    }

    if (data.edad !== undefined && !validar.edad(data.edad)) {
      throw { 
        status: 400,
         error: "Edad inválida",
          detalle: "Número entre 0 y 120" };
    }

    if (!validar.email(correo)) {
      throw { 
        status: 400,
        error: "Correo inválido",
        detalle: "Formato: usuario@dominio.com" };
    }

    const existe = await Encuesta.buscarPorCorreo(correo);
    if (existe) {
      throw { 
        status: 409,
        error: "Correo duplicado",
        detalle: `El correo ${correo} ya está registrado` };
    }

    return await Encuesta.crear({
      nombre_completo,
      edad: data.edad ?? null,
      sexo: data.sexo,
      correo,
      distro
    });
  }

  static async obtenerTodas() {
    return await Encuesta.obtenerTodas();
  }

  static async obtenerDistros() {
    return await Encuesta.obtenerDistros();
  }
}

module.exports = EncuestaController;
