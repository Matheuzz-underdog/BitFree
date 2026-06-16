document.addEventListener("DOMContentLoaded", () => {

  cargarTop3();

  document.getElementById("form-encuesta").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      nombre_completo: document.getElementById("nombre").value.trim(),
      edad: parseInt(document.getElementById("edad").value, 10),
      sexo: document.getElementById("sexo").value,
      correo: document.getElementById("email").value.trim(),
      distro: document.getElementById("distro").value.trim()
    };

    try {
      const res = await fetch("/api/encuesta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const json = await res.json();

      if (res.ok) {
        alert("Formulario enviado correctamente");
        document.getElementById("form-encuesta").reset();
        cargarTop3();
      } else {
        alert("Error: " + (json.detalle || json.error || "Error desconocido"));
      }
    } catch (err) {
      alert("Error de conexión: " + err.message);
    }
  });

});

async function cargarTop3() {
  try {
    const res = await fetch("/api/encuesta/distros");
    if (!res.ok) return;
    const json = await res.json();
    const distros = json.data;

    const conteo = {};
    distros.forEach(d => { conteo[d] = (conteo[d] || 0) + 1; });

    const top3 = Object.entries(conteo)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    document.getElementById("rank-1").textContent = top3[0] ? top3[0][0] : "—";
    document.getElementById("rank-2").textContent = top3[1] ? top3[1][0] : "—";
    document.getElementById("rank-3").textContent = top3[2] ? top3[2][0] : "—";
  } catch {

  }
}
