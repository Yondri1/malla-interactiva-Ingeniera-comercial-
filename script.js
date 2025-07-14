const ramos = [
  // I Semestre
  { id: "entorno-legal", nombre: "Entorno legal de los negocios", abre: ["contabilidad-financiera"] },
  { id: "admin-empresas", nombre: "Administración de empresas", abre: ["direccion-empresas", "tecnologias-1", "contabilidad-financiera"] },
  { id: "intro-economia", nombre: "Introducción a la economía", abre: ["microeconomia-1"] },
  { id: "expresion-1", nombre: "Taller expresión oral y escrita 1", abre: ["habilidades-sociales", "expresion-2"] },
  { id: "tecnicas-estudio", nombre: "Taller técnicas de estudio 1", abre: ["habilidades-sociales"] },
  { id: "mate-1", nombre: "Matemáticas p/ dirección empresas 1", abre: ["microeconomia-1", "analisis-cuanti-1", "mate-2"] },

  // II Semestre
  { id: "direccion-empresas", nombre: "Dirección de empresas", prereqs: ["admin-empresas"], abre: ["admin-negocios", "metodologia", "creatividad"] },
  { id: "microeconomia-1", nombre: "Microeconomía 1", prereqs: ["intro-economia", "mate-1"], abre: ["macroeconomia-1", "microeconomia-2"] },
  { id: "analisis-cuanti-1", nombre: "Análisis cuantitativo 1", prereqs: ["mate-1"], abre: ["analisis-cuanti-2"] },
  { id: "habilidades-sociales", nombre: "Taller habilidades sociales", prereqs: ["tecnicas-estudio", "expresion-1"], abre: ["pensamiento-critico"] },
  { id: "mate-2", nombre: "Matemáticas p/ dirección empresas 2", prereqs: ["mate-1"], abre: ["analisis-cuanti-2"] },

  // Puedes continuar añadiendo los siguientes semestres en el mismo formato...

  // Ejemplo final
  { id: "alta-direccion", nombre: "Alta dirección", prereqs: ["control-gestion", "iniciativa-empresarial", "entorno-legal-2", "planeacion-negocios", "intrapreneurship"] }
];

const container = document.getElementById("malla-container");

const estado = {};

function crearRamo(ramo) {
  const div = document.createElement("div");
  div.className = "ramo bloqueado";
  div.id = ramo.id;
  div.innerText = ramo.nombre;
  container.appendChild(div);

  if (!ramo.prereqs || ramo.prereqs.length === 0) {
    div.classList.remove("bloqueado");
  }

  div.addEventListener("click", () => {
    if (div.classList.contains("bloqueado")) return;

    if (div.classList.contains("aprobado")) {
      div.classList.remove("aprobado");
      estado[ramo.id] = false;
      actualizarDesbloqueos();
    } else {
      div.classList.add("aprobado");
      estado[ramo.id] = true;
      desbloquearRamos(ramo.abre);
    }
  });
}

function desbloquearRamos(lista) {
  if (!lista) return;
  lista.forEach(id => {
    const ramo = ramos.find(r => r.id === id);
    if (!ramo) return;

    const requisitos = ramo.prereqs || [];
    const cumplidos = requisitos.every(pr => estado[pr]);
    if (cumplidos) {
      document.getElementById(ramo.id)?.classList.remove("bloqueado");
    }
  });
}

function actualizarDesbloqueos() {
  ramos.forEach(ramo => {
    if (ramo.prereqs) {
      const todos = ramo.prereqs.every(p => estado[p]);
      const el = document.getElementById(ramo.id);
      if (el && !estado[ramo.id]) {
        if (todos) {
          el.classList.remove("bloqueado");
        } else {
          el.classList.add("bloqueado");
        }
      }
    }
  });
}

ramos.forEach(ramo => {
  estado[ramo.id] = false;
  crearRamo(ramo);
});

