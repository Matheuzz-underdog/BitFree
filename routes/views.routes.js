const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.render("landing"));
router.get("/que-es-linux", (req, res) => res.render("que-es-linux"));
router.get("/encuesta", (req, res) => res.render("encuesta"));
router.get("/timeline", (req, res) => res.render("timeline"));

module.exports = router;
