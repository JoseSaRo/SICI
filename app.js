const equipment = [
  {
    type: "Laptop",
    name: "Dell Latitude 5440",
    serial: "DL-5440-8291",
    user: "Laura Mendez",
    front: "Tren Mex-Qro F1",
    status: "Asignado",
    warranty: "12 mayo 2029",
    cpu: "Intel Core i7",
    ram: "16 GB",
    storage: "512 GB SSD",
    os: "Windows 11 Pro",
    notes: "Incluye cargador, mochila y mouse inalambrico."
  },
  {
    type: "Impresora",
    name: "HP LaserJet Pro M404",
    serial: "HP-M404-2217",
    user: "Mesa TIC",
    front: "Mesa TIC",
    status: "Mantenimiento",
    warranty: "03 febrero 2027",
    cpu: "No aplica",
    ram: "256 MB",
    storage: "No aplica",
    os: "Firmware HP",
    notes: "Atasco recurrente en bandeja principal."
  },
  {
    type: "Monitor",
    name: "Samsung 24 pulgadas",
    serial: "SM-24-6620",
    user: "Carlos Ruiz",
    front: "Tren AIFA-Pachuca F2",
    status: "Asignado",
    warranty: "18 agosto 2028",
    cpu: "No aplica",
    ram: "No aplica",
    storage: "No aplica",
    os: "No aplica",
    notes: "Con cable HDMI y base original."
  },
  {
    type: "Teclado",
    name: "Logitech K120",
    serial: "LG-K120-1044",
    user: "Sin asignar",
    front: "Mesa TIC",
    status: "Disponible",
    warranty: "20 enero 2027",
    cpu: "No aplica",
    ram: "No aplica",
    storage: "No aplica",
    os: "No aplica",
    notes: "Disponible para reposicion."
  },
  {
    type: "Desktop",
    name: "HP ProDesk 400",
    serial: "HP-PD400-9840",
    user: "Paola Vega",
    front: "Terminal de Carga Palenque",
    status: "Asignado",
    warranty: "11 noviembre 2028",
    cpu: "Intel Core i5",
    ram: "8 GB",
    storage: "1 TB HDD",
    os: "Windows 10 Pro",
    notes: "Equipo fijo para administracion de obra."
  },
  {
    type: "Mouse",
    name: "Microsoft Basic Optical",
    serial: "MS-MO-3077",
    user: "Sin asignar",
    front: "Mesa de Transportes",
    status: "Disponible",
    warranty: "09 septiembre 2026",
    cpu: "No aplica",
    ram: "No aplica",
    storage: "No aplica",
    os: "No aplica",
    notes: "Stock de reemplazo."
  },
  {
    type: "Laptop",
    name: "Lenovo ThinkPad T470",
    serial: "LN-T470-1182",
    user: "Sin asignar",
    front: "Mesa TIC",
    status: "Dado de baja",
    warranty: "Vencida",
    cpu: "Intel Core i5",
    ram: "8 GB",
    storage: "256 GB SSD",
    os: "Windows 10 Pro",
    notes: "Baja registrada por falla en tarjeta madre. Fecha de baja: 14 mayo 2026."
  },
  {
    type: "Impresora",
    name: "Epson EcoTank L3150",
    serial: "EP-L3150-4409",
    user: "Sin asignar",
    front: "Tren AIFA-Pachuca F2",
    status: "Dado de baja",
    warranty: "Vencida",
    cpu: "No aplica",
    ram: "No aplica",
    storage: "No aplica",
    os: "Firmware Epson",
    notes: "Baja por costo de reparacion mayor al valor de reposicion."
  },
  {
    type: "Monitor",
    name: "Acer V226HQL",
    serial: "AC-V22-7315",
    user: "Sin asignar",
    front: "Mesa de Transportes",
    status: "Dado de baja",
    warranty: "Vencida",
    cpu: "No aplica",
    ram: "No aplica",
    storage: "No aplica",
    os: "No aplica",
    notes: "Panel con lineas permanentes. Pendiente de resguardo para disposicion final."
  }
];

const roleConfig = {
  admin: {
    title: "Administrador",
    hint: "Acceso completo a inventario, usuarios, frentes y reportes."
  },
  tic: {
    title: "Mesa TIC",
    hint: "Puede ver todos los equipos y dar seguimiento operativo al inventario."
  },
  transport: {
    title: "Mesa de Transportes",
    hint: "Visualiza y registra equipos solo para Mesa de Transportes."
  },
  front: {
    title: "Frente de obra",
    hint: "Visualiza y registra equipos solo para Tren Mex-Qro F1."
  }
};

const roleViews = {
  admin: ["dashboard", "inventory", "scan", "equipment", "users", "fronts", "reports"],
  tic: ["dashboard", "inventory", "scan", "equipment", "reports"],
  transport: ["dashboard", "inventory", "scan", "equipment", "reports"],
  front: ["dashboard", "inventory", "scan", "equipment", "reports"]
};

const pageTitles = {
  dashboard: "Panel general",
  inventory: "Inventario de equipos",
  scan: "Escaneo QR",
  equipment: "Alta de equipo",
  users: "Usuarios y roles",
  fronts: "Frentes de Obra y Mesas de Trabajo",
  reports: "Reportes"
};

const rows = document.querySelector("#inventoryRows");
const roleSelect = document.querySelector("#roleSelect");
const roleHint = document.querySelector("#roleHint");
const frontFilter = document.querySelector("#frontFilter");
const statusFilter = document.querySelector("#statusFilter");
const searchInput = document.querySelector("#globalSearch");
const drawer = document.querySelector("#detailDrawer");
const drawerTitle = document.querySelector("#drawerTitle");
const drawerBody = document.querySelector("#drawerBody");
const assignmentFront = document.querySelector("#assignmentFront");
const assignmentUser = document.querySelector("#assignmentUser");
const excelInput = document.querySelector("#excelInput");
const importStatus = document.querySelector("#importStatus");
const scannerVideo = document.querySelector("#scannerVideo");
const scannerCanvas = document.querySelector("#scannerCanvas");
const scannerPlaceholder = document.querySelector("#scannerPlaceholder");
const scanStatus = document.querySelector("#scanStatus");
const scanMessage = document.querySelector("#scanMessage");
const scanItem = document.querySelector("#scanItem");
let scannerStream = null;
let scannerTimer = null;

function qrPayload(item) {
  return `SICI|${item.serial}`;
}

function qrUrl(item) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrPayload(item))}`;
}

function findEquipmentFromQr(value) {
  const serial = value.startsWith("SICI|") ? value.replace("SICI|", "") : value;
  return equipment.find((item) => item.serial === serial);
}

function visibleEquipment() {
  const role = roleSelect.value;
  const frontValue = frontFilter.value;
  const statusValue = statusFilter.value;
  const query = searchInput.value.trim().toLowerCase();

  return equipment.filter((item) => {
    const roleMatch =
      (role !== "front" || item.front === "Tren Mex-Qro F1") &&
      (role !== "transport" || item.front === "Mesa de Transportes");
    const frontMatch = frontValue === "all" || item.front === frontValue;
    const statusMatch = statusValue === "all" || item.status === statusValue;
    const text = `${item.type} ${item.name} ${item.serial} ${item.user} ${item.front}`.toLowerCase();
    const searchMatch = query === "" || text.includes(query);
    return roleMatch && frontMatch && statusMatch && searchMatch;
  });
}

function renderInventory() {
  const items = visibleEquipment();
  rows.innerHTML = items
    .map(
      (item, index) => `
        <tr>
          <td data-label="Equipo">
            <div class="equipment-cell">
              <span class="asset-thumb">${item.type.slice(0, 2).toUpperCase()}</span>
              <div>
                <strong>${item.name}</strong><br />
                <span>${item.type}</span>
              </div>
            </div>
          </td>
          <td data-label="Serie">${item.serial}</td>
          <td data-label="Asignado a">${item.user}</td>
          <td data-label="Frente o mesa">${item.front}</td>
          <td data-label="Estado"><span class="status ${item.status}">${item.status}</span></td>
          <td data-label="Garantia">${item.warranty}</td>
          <td data-label="QR"><button class="qr-chip" data-qr="${index}">QR</button></td>
          <td data-label="Ficha"><button class="text-btn" data-detail="${index}">Ver</button></td>
        </tr>
      `
    )
    .join("");

  if (items.length === 0) {
    rows.innerHTML = `
      <tr>
        <td colspan="8">No hay equipos que coincidan con los filtros actuales.</td>
      </tr>
    `;
  }

  document.querySelector("#metricTotal").textContent = roleSelect.value === "front" ? items.length : "148";
}

function openDetail(item) {
  drawerTitle.textContent = item.name;
  drawerBody.innerHTML = `
    <div class="qr-card">
      <img src="${qrUrl(item)}" alt="Codigo QR de ${item.name}" />
      <div>
        <span>Codigo QR</span>
        <strong>${qrPayload(item)}</strong>
        <a href="${qrUrl(item)}" download="SICI-${item.serial}.png">Descargar QR</a>
      </div>
    </div>
    <div class="drawer-list">
      <div><span>Tipo</span><strong>${item.type}</strong></div>
      <div><span>Numero de serie</span><strong>${item.serial}</strong></div>
      <div><span>Responsable</span><strong>${item.user}</strong></div>
      <div><span>Frente o mesa</span><strong>${item.front}</strong></div>
      <div><span>Estado</span><strong>${item.status}</strong></div>
      <div><span>Procesador</span><strong>${item.cpu}</strong></div>
      <div><span>RAM</span><strong>${item.ram}</strong></div>
      <div><span>Almacenamiento</span><strong>${item.storage}</strong></div>
      <div><span>Sistema operativo</span><strong>${item.os}</strong></div>
      <div><span>Garantia</span><strong>${item.warranty}</strong></div>
      <div><span>Observaciones</span><strong>${item.notes}</strong></div>
    </div>
  `;
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
}

function renderScannedItem(item, rawValue) {
  if (!item) {
    scanStatus.textContent = "QR no encontrado";
    scanMessage.textContent = `Lectura: ${rawValue}`;
    scanItem.innerHTML = "";
    return;
  }

  scanStatus.textContent = "Articulo encontrado";
  scanMessage.textContent = qrPayload(item);
  scanItem.innerHTML = `
    <div class="scan-item-card">
      <span class="asset-thumb">${item.type.slice(0, 2).toUpperCase()}</span>
      <div>
        <strong>${item.name}</strong>
        <span>${item.serial}</span>
      </div>
      <p>${item.front}</p>
      <p><span class="status ${item.status}">${item.status}</span></p>
      <button class="primary-btn" id="scanOpenDetail">Ver ficha</button>
    </div>
  `;
  document.querySelector("#scanOpenDetail").addEventListener("click", () => openDetail(item));
}

async function decodeCanvasQr(source) {
  if (!("BarcodeDetector" in window)) {
    scanStatus.textContent = "Escaner no disponible";
    scanMessage.textContent = "Este navegador no soporta lectura QR nativa. La maqueta puede abrir camara y subir imagen, pero requiere BarcodeDetector para decodificar.";
    return;
  }

  try {
    const detector = new BarcodeDetector({ formats: ["qr_code"] });
    const codes = await detector.detect(source);
    if (!codes.length) {
      scanStatus.textContent = "Sin codigo detectado";
      scanMessage.textContent = "Intenta con una imagen mas clara o acerca el QR a la camara.";
      return;
    }

    const rawValue = codes[0].rawValue;
    renderScannedItem(findEquipmentFromQr(rawValue), rawValue);
  } catch (error) {
    scanStatus.textContent = "Error de lectura";
    scanMessage.textContent = "No fue posible procesar la imagen. Intenta de nuevo con mejor luz o una imagen mas nitida.";
  }
}

async function startCamera() {
  try {
    scannerStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
      audio: false
    });
    scannerVideo.srcObject = scannerStream;
    scannerPlaceholder.classList.add("hidden-by-role");
    scanStatus.textContent = "Escaneando";
    scanMessage.textContent = "Mantén el QR dentro del recuadro.";
    scannerTimer = window.setInterval(scanVideoFrame, 900);
  } catch (error) {
    scanStatus.textContent = "No se pudo abrir camara";
    scanMessage.textContent = "Revisa permisos del navegador o usa la opcion de subir imagen.";
  }
}

function stopCamera() {
  if (scannerTimer) {
    window.clearInterval(scannerTimer);
    scannerTimer = null;
  }

  if (scannerStream) {
    scannerStream.getTracks().forEach((track) => track.stop());
    scannerStream = null;
  }

  scannerVideo.srcObject = null;
  scannerPlaceholder.classList.remove("hidden-by-role");
}

async function scanVideoFrame() {
  if (!scannerVideo.videoWidth) return;
  scannerCanvas.width = scannerVideo.videoWidth;
  scannerCanvas.height = scannerVideo.videoHeight;
  scannerCanvas.getContext("2d").drawImage(scannerVideo, 0, 0);
  await decodeCanvasQr(scannerCanvas);
}

async function scanUploadedImage(file) {
  if (!file) return;
  const image = new Image();
  image.onload = async () => {
    scannerCanvas.width = image.naturalWidth;
    scannerCanvas.height = image.naturalHeight;
    scannerCanvas.getContext("2d").drawImage(image, 0, 0);
    await decodeCanvasQr(scannerCanvas);
    URL.revokeObjectURL(image.src);
  };
  image.src = URL.createObjectURL(file);
}

function switchView(viewId) {
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.id === viewId);
  });
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.view === viewId);
  });
  document.querySelector("#pageTitle").textContent = pageTitles[viewId];
}

function applyRole() {
  const role = roleSelect.value;
  const allowedViews = roleViews[role];
  roleHint.textContent = roleConfig[role].hint;
  if (role === "front") {
    frontFilter.value = "Tren Mex-Qro F1";
    assignmentFront.value = "Tren Mex-Qro F1";
    assignmentUser.value = "Laura Mendez";
  }

  if (role === "transport") {
    frontFilter.value = "Mesa de Transportes";
    assignmentFront.value = "Mesa de Transportes";
    assignmentUser.value = "Gabriela Torres";
  }

  frontFilter.disabled = role === "front" || role === "transport";
  assignmentFront.disabled = role === "front" || role === "transport";

  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("hidden-by-role", !allowedViews.includes(item.dataset.view));
  });

  const activeView = document.querySelector(".view.active")?.id;
  if (!allowedViews.includes(activeView)) {
    switchView("inventory");
  }

  document.querySelectorAll(".admin-only").forEach((item) => {
    item.classList.toggle("hidden-by-role", role !== "admin");
  });

  const createButton = document.querySelector("[data-view-target='equipment']");
  createButton.classList.remove("hidden-by-role");

  renderInventory();
}

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => switchView(button.dataset.view));
});

document.querySelectorAll("[data-view-target]").forEach((button) => {
  button.addEventListener("click", () => switchView(button.dataset.viewTarget));
});

rows.addEventListener("click", (event) => {
  const qrButton = event.target.closest("[data-qr]");
  if (qrButton) {
    openDetail(visibleEquipment()[Number(qrButton.dataset.qr)]);
    return;
  }

  const button = event.target.closest("[data-detail]");
  if (!button) return;
  openDetail(visibleEquipment()[Number(button.dataset.detail)]);
});

document.querySelector("#closeDrawer").addEventListener("click", () => {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
});

document.querySelector("#openCameraBtn").addEventListener("click", startCamera);
document.querySelector("#stopCameraBtn").addEventListener("click", stopCamera);
document.querySelector("#qrImageInput").addEventListener("change", (event) => {
  scanUploadedImage(event.target.files[0]);
});

document.querySelectorAll("[data-import-trigger]").forEach((button) => {
  button.addEventListener("click", () => {
    switchView("inventory");
    excelInput.click();
  });
});

excelInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const role = roleSelect.value;
  const fixedLocation =
    role === "front" ? "Tren Mex-Qro F1" : role === "transport" ? "Mesa de Transportes" : "ubicaciones del archivo";

  importStatus.textContent = `Archivo seleccionado: ${file.name}. La carga se aplicara a ${fixedLocation}.`;
});

[roleSelect, frontFilter, statusFilter, searchInput].forEach((control) => {
  control.addEventListener("input", applyRole);
});

applyRole();
