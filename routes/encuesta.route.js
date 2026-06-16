const express = require("express");
const router = express.Router();
const control = require("../controllers/encuesta.controller");

router.get("/", async (req, res) => {
  try {
    const datos = await control.obtenerTodas();
    
    res.status(200).json({
         message: "Encuestas obtenidas correctamente", 
         data: datos 
    });
  } catch (err) {
    if (err.status)
        return res.status(err.status).json({
            error: err.error, 
            detalle: err.detalle });

        res.status(500).json({
            error: "Error al obtener encuestas", 
            detalle: err.message
        });
    }
});

router.get("/distros", async (req, res) => {
  try {
    const distros = await control.obtenerDistros();

    res.status(200).json({ 
        message: "Distribuciones obtenidas correctamente",
        data: distros 
    });
  } catch (err) {
    if (err.status) 
        return res.status(err.status).json({
            error: err.error,
            detalle: err.detalle 
        });

        res.status(500).json({
            error: "Error al obtener distribuciones",
            detalle: err.message 
        });
    }
});

router.post("/", async (req, res) => {
  try {
    const creado = await control.enviar(req.body);
    res.status(201).json({ message: "Encuesta enviada correctamente", data: creado });
  } catch (err) {
    if (err.status) return res.status(err.status).json({ error: err.error, detalle: err.detalle });
    res.status(500).json({ error: "Error al enviar encuesta", detalle: err.message });
  }
});

module.exports = router;
