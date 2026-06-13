function readJsonData(elementId, fallback) {
  const element = document.querySelector(`#${elementId}`);
  if (!element) return fallback;

  try {
    return JSON.parse(element.textContent);
  } catch (error) {
    return fallback;
  }
}

let equipment = readJsonData("equipment-data", []);
let locations = readJsonData("location-data", []);
let physicalLocations = readJsonData("physical-location-data", []);
let responsibles = readJsonData("responsible-data", []);
let equipmentTypes = readJsonData("equipment-type-data", []);
let equipmentBrands = readJsonData("equipment-brand-data", []);
let equipmentTypeRequests = readJsonData("equipment-type-request-data", []);
let equipmentBrandRequests = readJsonData("equipment-brand-request-data", []);

const roleViews = {
  admin: ["dashboard", "inventory", "scan", "equipment", "users", "fronts", "reports"],
  tic: ["dashboard", "inventory", "scan", "equipment", "reports"],
  location: ["inventory", "scan", "equipment", "reports"]
};

const equipmentStatuses = ["Asignado", "Disponible", "Mantenimiento", "Dado de baja"];

const pageTitles = {
  dashboard: "Panel general",
  inventory: "Inventario de equipos",
  scan: "Escaneo QR",
  equipment: "Alta de equipo",
  users: "Responsables y roles",
  fronts: "Frentes de Obra y Mesas de Trabajo",
  reports: "Reportes"
};

const rows = document.querySelector("#inventoryRows");
const inventoryScrollTop = document.querySelector("#inventoryScrollTop");
const inventoryScrollTopInner = inventoryScrollTop?.firstElementChild;
const inventoryTableWrap = document.querySelector("#inventoryTableWrap");
const inventoryTable = document.querySelector("#inventoryTable");
const roleSelect = document.querySelector("#roleSelect");
const roleHint = document.querySelector("#roleHint");
const themeToggle = document.querySelector("#themeToggle");
const themeToggleIcon = document.querySelector("#themeToggleIcon");
const themeToggleLabel = document.querySelector("#themeToggleLabel");
const frontFilter = document.querySelector("#frontFilter");
const physicalLocationFilter = document.querySelector("#physicalLocationFilter");
const typeFilter = document.querySelector("#typeFilter");
const brandFilter = document.querySelector("#brandFilter");
const statusFilter = document.querySelector("#statusFilter");
const clearInventoryFilters = document.querySelector("#clearInventoryFilters");
const searchInput = document.querySelector("#globalSearch");
const inventorySearchBox = document.querySelector("#inventorySearchBox");
const drawer = document.querySelector("#detailDrawer");
const detailBackdrop = document.querySelector("#detailBackdrop");
const drawerTitle = document.querySelector("#drawerTitle");
const drawerBody = document.querySelector("#drawerBody");
const sessionUserButton = document.querySelector("#sessionUserButton");
const sessionUserMenu = document.querySelector("#sessionUserMenu");
const assignmentFront = document.querySelector("#assignmentFront");
const assignmentPhysicalLocation = document.querySelector("#assignmentPhysicalLocation");
const physicalLocationOptions = document.querySelector("#physicalLocationOptions");
const assignmentPerson = document.querySelector("#assignmentPerson");
const assignmentPersonHint = document.querySelector("#assignmentPersonHint");
const assignmentStatus = document.querySelector("#assignmentStatus");
const equipmentTypeInput = document.querySelector("#equipmentTypeInput");
const equipmentForm = document.querySelector("#equipmentForm");
const equipmentFormStatus = document.querySelector("#equipmentFormStatus");
const equipmentTypeMenu = document.querySelector("#equipmentTypeMenu");
const equipmentTypeToggle = document.querySelector("#equipmentTypeToggle");
const equipmentTypeForm = document.querySelector("#equipmentTypeForm");
const equipmentTypeSubmit = document.querySelector("#equipmentTypeSubmit");
const toggleTypeForm = document.querySelector("#toggleTypeForm");
const newEquipmentTypeName = document.querySelector("#newEquipmentTypeName");
const equipmentTypeStatus = document.querySelector("#equipmentTypeStatus");
const equipmentTypeRequestList = document.querySelector("#equipmentTypeRequestList");
const equipmentBrandInput = document.querySelector("#equipmentBrandInput");
const equipmentBrandMenu = document.querySelector("#equipmentBrandMenu");
const equipmentBrandToggle = document.querySelector("#equipmentBrandToggle");
const equipmentBrandForm = document.querySelector("#equipmentBrandForm");
const equipmentBrandSubmit = document.querySelector("#equipmentBrandSubmit");
const toggleBrandForm = document.querySelector("#toggleBrandForm");
const newEquipmentBrandName = document.querySelector("#newEquipmentBrandName");
const equipmentBrandStatus = document.querySelector("#equipmentBrandStatus");
const equipmentBrandRequestList = document.querySelector("#equipmentBrandRequestList");
const macEthernetInput = document.querySelector("#macEthernetInput");
const macWifiInput = document.querySelector("#macWifiInput");
const invoiceInput = document.querySelector("#invoiceInput");
const excelInput = document.querySelector("#excelInput");
const importStatus = document.querySelector("#importStatus");
const importPreviewDialog = document.querySelector("#importPreviewDialog");
const importPreviewFilename = document.querySelector("#importPreviewFilename");
const importPreviewTotal = document.querySelector("#importPreviewTotal");
const importPreviewValid = document.querySelector("#importPreviewValid");
const importPreviewRejected = document.querySelector("#importPreviewRejected");
const importTypeSummary = document.querySelector("#importTypeSummary");
const importErrorSection = document.querySelector("#importErrorSection");
const importErrorList = document.querySelector("#importErrorList");
const importPreviewStatus = document.querySelector("#importPreviewStatus");
const confirmImportPreview = document.querySelector("#confirmImportPreview");
const cancelImportPreview = document.querySelector("#cancelImportPreview");
const closeImportPreview = document.querySelector("#closeImportPreview");
const frontBars = document.querySelector(".front-bars");
const recentMovements = document.querySelector("#recentMovements");
const reportType = document.querySelector("#reportType");
const reportLocation = document.querySelector("#reportLocation");
const reportPhysicalLocation = document.querySelector("#reportPhysicalLocation");
const reportEquipmentType = document.querySelector("#reportEquipmentType");
const reportBrand = document.querySelector("#reportBrand");
const reportStatus = document.querySelector("#reportStatus");
const reportAssignment = document.querySelector("#reportAssignment");
const reportWarrantyDays = document.querySelector("#reportWarrantyDays");
const reportWarrantyDaysField = document.querySelector("#reportWarrantyDaysField");
const clearReportFilters = document.querySelector("#clearReportFilters");
const reportCount = document.querySelector("#reportCount");
const reportAssigned = document.querySelector("#reportAssigned");
const reportAvailable = document.querySelector("#reportAvailable");
const reportMaintenance = document.querySelector("#reportMaintenance");
const reportDown = document.querySelector("#reportDown");
const reportRows = document.querySelector("#reportRows");
const reportLastColumn = document.querySelector("#reportLastColumn");
const reportNote = document.querySelector("#reportNote");
const downloadReport = document.querySelector("#downloadReport");
const responsibleCards = document.querySelector("#responsibleCards");
const locationCards = document.querySelector("#locationCards");
const toggleResponsibleForm = document.querySelector("#toggleResponsibleForm");
const responsibleFormPanel = document.querySelector("#responsibleFormPanel");
const toggleLocationForm = document.querySelector("#toggleLocationForm");
const locationFormPanel = document.querySelector("#locationFormPanel");
const locationId = document.querySelector("#locationId");
const locationType = document.querySelector("#locationType");
const locationForm = document.querySelector("#locationForm");
const locationFormTitle = document.querySelector("#locationFormTitle");
const locationName = document.querySelector("#locationName");
const locationManager = document.querySelector("#locationManager");
const locationManagerRole = document.querySelector("#locationManagerRole");
const locationActive = document.querySelector("#locationActive");
const locationSubmit = document.querySelector("#locationSubmit");
const cancelLocationEdit = document.querySelector("#cancelLocationEdit");
const locationFormStatus = document.querySelector("#locationFormStatus");
const responsibleForm = document.querySelector("#responsibleForm");
const responsibleId = document.querySelector("#responsibleId");
const responsibleName = document.querySelector("#responsibleName");
const responsibleUsername = document.querySelector("#responsibleUsername");
const responsiblePassword = document.querySelector("#responsiblePassword");
const responsiblePasswordHint = document.querySelector("#responsiblePasswordHint");
const responsibleRole = document.querySelector("#responsibleRole");
const responsibleLocation = document.querySelector("#responsibleLocation");
const responsibleActive = document.querySelector("#responsibleActive");
const responsibleSubmit = document.querySelector("#responsibleSubmit");
const responsibleFormStatus = document.querySelector("#responsibleFormStatus");
const passwordChangeBtn = document.querySelector("#passwordChangeBtn");
const cancelResponsibleEdit = document.querySelector("#cancelResponsibleEdit");
const siciDialog = document.querySelector("#siciDialog");
const siciDialogTitle = document.querySelector("#siciDialogTitle");
const siciDialogMessage = document.querySelector("#siciDialogMessage");
const siciDialogField = document.querySelector("#siciDialogField");
const siciDialogInputLabel = document.querySelector("#siciDialogInputLabel");
const siciDialogInput = document.querySelector("#siciDialogInput");
const siciDialogStatus = document.querySelector("#siciDialogStatus");
const siciDialogCancel = document.querySelector("#siciDialogCancel");
const siciDialogConfirm = document.querySelector("#siciDialogConfirm");
const scannerVideo = document.querySelector("#scannerVideo");
const scannerCanvas = document.querySelector("#scannerCanvas");
const scannerPlaceholder = document.querySelector("#scannerPlaceholder");
const scanStatus = document.querySelector("#scanStatus");
const scanMessage = document.querySelector("#scanMessage");
const scanItem = document.querySelector("#scanItem");
let scannerStream = null;
let scannerTimer = null;
let scannerBusy = false;
let qrDetector = null;
let inventorySort = { key: "type", direction: "asc" };
let pendingImportFile = null;

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function displayLocationName(value) {
  return String(value ?? "").replace(
    /^Infraestructura Ferroviaria en el Norte del Pa[ií]s,\s*L[ií]nea F[eé]rrea\b/i,
    "... Línea Férrea"
  );
}

function normalizeSearchText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function applyTheme(theme, persist = false) {
  const darkMode = theme === "dark";
  document.documentElement.dataset.theme = darkMode ? "dark" : "light";
  themeToggle?.setAttribute("aria-pressed", String(darkMode));
  themeToggle?.setAttribute("title", darkMode ? "Activar modo claro" : "Activar modo oscuro");
  if (themeToggleIcon) themeToggleIcon.textContent = darkMode ? "☀" : "☾";
  if (themeToggleLabel) themeToggleLabel.textContent = darkMode ? "Modo claro" : "Modo oscuro";
  if (persist) localStorage.setItem("sici-theme", darkMode ? "dark" : "light");
}

function downloadBase64File(base64Data, filename, mimeType) {
  const binary = window.atob(base64Data);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  const url = URL.createObjectURL(new Blob([bytes], { type: mimeType }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function openSiciDialog({
  title,
  message,
  confirmLabel = "Aceptar",
  cancelLabel = "Cancelar",
  showCancel = true,
  input = false,
  inputLabel = "Valor",
  inputType = "text"
}) {
  return new Promise((resolve) => {
    siciDialogTitle.textContent = title;
    siciDialogMessage.textContent = message;
    siciDialogConfirm.textContent = confirmLabel;
    siciDialogCancel.textContent = cancelLabel;
    siciDialogCancel.classList.toggle("form-collapsed", !showCancel);
    siciDialogField.classList.toggle("form-collapsed", !input);
    siciDialogStatus.textContent = "";
    siciDialogInputLabel.textContent = inputLabel;
    siciDialogInput.type = inputType;
    siciDialogInput.value = "";
    const inputToggle = siciDialogInput.closest(".password-field").querySelector(".password-toggle");
    inputToggle.classList.remove("is-visible");
    inputToggle.classList.toggle("form-collapsed", inputType !== "password");
    inputToggle.setAttribute("aria-label", "Mostrar contrasena");
    inputToggle.setAttribute("title", "Mostrar contrasena");

    let settled = false;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      siciDialog.close();
      resolve(value);
    };
    const submit = (event) => {
      event.preventDefault();
      if (input && !siciDialogInput.value) {
        siciDialogStatus.textContent = `${inputLabel} es obligatorio.`;
        siciDialogInput.focus();
        return;
      }
      finish(input ? siciDialogInput.value : true);
    };
    const cancel = (event) => {
      event?.preventDefault();
      finish(input ? null : false);
    };
    const closed = () => {
      if (!settled) {
        settled = true;
        resolve(input ? null : false);
      }
      cleanup();
    };
    const cleanup = () => {
      siciDialog.querySelector("form").removeEventListener("submit", submit);
      siciDialogCancel.removeEventListener("click", cancel);
      siciDialog.removeEventListener("cancel", cancel);
      siciDialog.removeEventListener("close", closed);
    };

    siciDialog.querySelector("form").addEventListener("submit", submit);
    siciDialogCancel.addEventListener("click", cancel);
    siciDialog.addEventListener("cancel", cancel);
    siciDialog.addEventListener("close", closed);
    siciDialog.showModal();
    (input ? siciDialogInput : siciDialogConfirm).focus();
  });
}

function siciAlert(message, title = "Aviso") {
  return openSiciDialog({ title, message, showCancel: false });
}

function siciConfirm(message, title = "Confirmar", confirmLabel = "Continuar") {
  return openSiciDialog({ title, message, confirmLabel });
}

function siciPassword(message = "Escribe la nueva contrasena.") {
  return openSiciDialog({
    title: "Cambiar contrasena",
    message,
    confirmLabel: "Guardar contrasena",
    input: true,
    inputLabel: "Nueva contrasena",
    inputType: "password"
  });
}

function qrPayload(item) {
  return `SICI|${item.serial}`;
}

function qrUrl(item) {
  const baseUrl = window.SICI_QR_BASE_URL || "/equipos/";
  return `${baseUrl}${encodeURIComponent(item.serial)}/qr/`;
}

function normalizeSerial(value) {
  return String(value ?? "").trim().toUpperCase();
}

function serialFromQrValue(value) {
  const rawValue = String(value ?? "").trim();
  if (!rawValue) return "";

  const withoutPrefix = rawValue.replace(/^SICI\|/i, "").trim();
  if (withoutPrefix !== rawValue) {
    return withoutPrefix;
  }

  try {
    const url = new URL(rawValue, window.location.origin);
    const qrValue = url.searchParams.get("qr") || url.searchParams.get("serial") || "";
    if (qrValue) {
      return decodeURIComponent(qrValue).trim();
    }

    const shortQrMatch = url.pathname.match(/^\/q\/(.+?)\/?$/);
    if (shortQrMatch) {
      return decodeURIComponent(shortQrMatch[1]).trim();
    }
  } catch (error) {
    return withoutPrefix;
  }

  return withoutPrefix;
}

function findEquipmentFromQr(value) {
  const serial = normalizeSerial(serialFromQrValue(value));
  return equipment.find((item) => normalizeSerial(item.serial) === serial);
}

function openEquipmentFromQrParam() {
  const params = new URLSearchParams(window.location.search);
  const qrValue = params.get("qr") || params.get("serial");
  if (!qrValue) return;

  const item = findEquipmentFromQr(qrValue);
  if (!item) return;

  switchView("inventory");
  openDetail(item);
}

function locationNames() {
  return locations.map((location) => location.name);
}

function locationByName(name) {
  return locations.find((location) => location.name === name) || null;
}

function canDeleteEquipment() {
  return ["admin", "tic"].includes(roleKind());
}

function isMesaTicLocation(location) {
  const normalizedName = location.name.trim().toLowerCase();
  return normalizedName === "tic" || normalizedName === "mesa tic";
}

function mesaTicLocation() {
  return locations.find(isMesaTicLocation) || null;
}

function roleValueForLocation(location) {
  return isMesaTicLocation(location) ? "tic" : `location:${location.id}`;
}

function selectedLocation() {
  const role = roleSelect.value;
  if (!role.startsWith("location:")) return null;
  const id = Number(role.replace("location:", ""));
  return locations.find((location) => location.id === id) || null;
}

function roleKind() {
  return roleSelect.value.startsWith("location:") ? "location" : roleSelect.value;
}

function populateRoleSelector() {
  if (!roleSelect || roleSelect.hidden) return;

  const selectedValue = roleSelect.dataset.currentRole || roleSelect.value || "admin";
  const validValues = locations.map(roleValueForLocation);
  roleSelect.innerHTML = [
    `<option value="admin">Todas las ubicaciones</option>`,
    ...locations.map((location) => `<option value="${roleValueForLocation(location)}">${escapeHtml(displayLocationName(location.name))}</option>`)
  ].join("");
  roleSelect.value = validValues.includes(selectedValue) ? selectedValue : "admin";
}

function optionList(selectedValue = "") {
  return locationNames()
    .map((name) => `<option ${selectedValue === name ? "selected" : ""}>${name}</option>`)
    .join("");
}

function locationOptionListById(selectedId = "") {
  return locations
    .map((location) => `<option value="${location.id}" ${String(selectedId) === String(location.id) ? "selected" : ""}>${escapeHtml(displayLocationName(location.name))}</option>`)
    .join("");
}

function physicalLocationsFor(locationId) {
  return physicalLocations.filter((item) => item.locationId === Number(locationId) && item.active);
}

function renderPhysicalLocationOptions(locationId, input = assignmentPhysicalLocation, datalist = physicalLocationOptions) {
  if (!input || !datalist) return;
  const options = physicalLocationsFor(locationId);
  datalist.innerHTML = options
    .map((item) => `<option value="${escapeHtml(item.name)}"></option>`)
    .join("");

  if (!input.value.trim() || !options.some((item) => item.name.toLowerCase() === input.value.trim().toLowerCase())) {
    input.value = options.find((item) => item.name.toLowerCase() === "santa lucía")?.name || "Santa Lucía";
  }
}

function statusOptionList(selectedValue = "") {
  return equipmentStatuses
    .map((status) => `<option ${selectedValue === status ? "selected" : ""}>${status}</option>`)
    .join("");
}

function csrfToken() {
  return document.querySelector("[name=csrfmiddlewaretoken]")?.value || "";
}

function formatMacAddress(value) {
  return value
    .replace(/[^0-9a-fA-F]/g, "")
    .slice(0, 12)
    .toUpperCase()
    .replace(/(.{2})(?=.)/g, "$1:");
}

function attachMacFormatter(input) {
  input?.addEventListener("input", () => {
    const formatted = formatMacAddress(input.value);
    input.value = formatted;
  });
}

function syncAssignmentPersonRequirement() {
  const status = assignmentStatus?.value || "";

  if (status === "Asignado") {
    assignmentPerson.disabled = false;
    assignmentPerson.required = true;
    assignmentPerson.placeholder = "Nombre de la persona";
    assignmentPersonHint.textContent = "Obligatorio para guardar como asignado.";
    return;
  }

  if (status === "Disponible") {
    assignmentPerson.value = "";
    assignmentPerson.disabled = true;
    assignmentPerson.required = false;
    assignmentPerson.placeholder = "No aplica para equipos disponibles";
    assignmentPersonHint.textContent = "Disponible no debe tener persona asignada.";
    return;
  }

  assignmentPerson.disabled = false;
  assignmentPerson.required = false;
  assignmentPerson.placeholder = "Nombre de la persona, si aplica";
  assignmentPersonHint.textContent = "Opcional para este estado.";
}

function resetEquipmentForm() {
  equipmentForm.reset();
  equipmentTypeInput.value = "";
  equipmentBrandInput.value = "";
  if (invoiceInput) {
    invoiceInput.value = "";
  }
  delete assignmentFront.dataset.ticDefaultApplied;
  applyRole();
  renderPhysicalLocationOptions(assignmentFront.value);
  syncAssignmentPersonRequirement();
}

function disableBrowserAutocomplete() {
  document.querySelectorAll("form, input:not([type='file']), textarea").forEach((element) => {
    element.setAttribute("autocomplete", "off");
    element.setAttribute("autocorrect", "off");
    element.setAttribute("autocapitalize", "off");
    element.setAttribute("spellcheck", "false");
  });
}

function populateLocationControls() {
  const names = locationNames();
  frontFilter.innerHTML = [
    `<option value="all">Todos los F.F.O.O. y Mesas</option>`,
    `<option value="type:mesa">Todas las Mesas</option>`,
    `<option value="type:frente">Todos los Frentes de Obra</option>`,
    ...locations.map((location) => `
      <option value="${escapeHtml(location.name)}">${escapeHtml(displayLocationName(location.name))}</option>
    `)
  ].join("");

  assignmentFront.innerHTML = names.length
    ? locations.map((location) => `<option value="${location.id}">${escapeHtml(displayLocationName(location.name))}</option>`).join("")
    : `<option value="">Sin ubicaciones registradas</option>`;

  if (responsibleLocation) {
    responsibleLocation.innerHTML = [
      `<option value="">Todas las ubicaciones</option>`,
      ...locations.map((location) => `<option value="${location.id}">${escapeHtml(displayLocationName(location.name))}</option>`)
    ].join("");
  }

  if (reportLocation) {
    reportLocation.innerHTML = [
      `<option value="">Todos los F.F.O.O. y Mesas</option>`,
      `<option value="type:frente">Todos los Frentes de Obra</option>`,
      `<option value="type:mesa">Todas las Mesas</option>`,
      ...locations.map((location) => `<option value="${location.id}">${escapeHtml(displayLocationName(location.name))}</option>`)
    ].join("");
  }

  populateRoleSelector();
  renderPhysicalLocationOptions(assignmentFront.value);
  populateReportPhysicalLocations();
  populateReportCatalogFilters();
  populateInventoryFilterOptions();
}

function multiFilterValues(filter) {
  return new Set(
    Array.from(filter?.querySelectorAll("input:checked") || []).map((input) => input.value)
  );
}

function updateMultiFilterLabel(filter, defaultLabel) {
  if (!filter) return;
  const count = multiFilterValues(filter).size;
  filter.querySelector("summary").textContent = count ? `${defaultLabel} (${count})` : defaultLabel;
}

function renderMultiFilter(filter, values, defaultLabel) {
  if (!filter) return;
  const selected = multiFilterValues(filter);
  const menu = filter.querySelector(".multi-filter-menu");
  menu.innerHTML = values.length
    ? values.map((value) => `
        <label>
          <input type="checkbox" value="${escapeHtml(value)}" ${selected.has(value) ? "checked" : ""} />
          <span>${escapeHtml(value)}</span>
        </label>
      `).join("")
    : `<span class="empty-state">Sin opciones.</span>`;
  updateMultiFilterLabel(filter, defaultLabel);
}

function populateInventoryPhysicalLocations() {
  if (!physicalLocationFilter) return;
  const scopedLocation = selectedLocation();
  const selectedFront = frontFilter.value;
  const allowedLocationIds = locations
    .filter((location) =>
      (!scopedLocation || location.id === scopedLocation.id) &&
      (
        selectedFront === "all" ||
        selectedFront === `type:${location.type}` ||
        location.name === selectedFront
      )
    )
    .map((location) => location.id);
  const currentValue = physicalLocationFilter.value;
  const options = physicalLocations
    .filter((item) => item.active && allowedLocationIds.includes(item.locationId))
    .sort((a, b) => a.name.localeCompare(b.name));
  physicalLocationFilter.innerHTML = [
    `<option value="all">Todas las ubicaciones f\u00edsicas</option>`,
    ...options.map((item) => {
      const location = locations.find((locationItem) => locationItem.id === item.locationId);
      const label = (selectedFront === "all" || selectedFront.startsWith("type:")) && location
        ? `${item.name} - ${displayLocationName(location.name)}`
        : item.name;
      return `<option value="${item.id}">${escapeHtml(label)}</option>`;
    })
  ].join("");
  physicalLocationFilter.value = options.some((item) => String(item.id) === currentValue)
    ? currentValue
    : "all";
}

function populateInventoryFilterOptions() {
  renderMultiFilter(
    typeFilter,
    [...new Set(equipment.map((item) => item.type))].sort((a, b) => a.localeCompare(b)),
    "Tipos de equipo"
  );
  renderMultiFilter(
    brandFilter,
    [...new Set(equipment.map((item) => item.brand || "Sin marca"))].sort((a, b) => a.localeCompare(b)),
    "Marcas"
  );
  renderMultiFilter(statusFilter, equipmentStatuses, "Estados");
  populateInventoryPhysicalLocations();
}

function populateEquipmentTypes() {
  const query = equipmentTypeInput.value.trim().toLowerCase();
  const matches = equipmentTypes.filter((type) => type.nombre.toLowerCase().includes(query));

  equipmentTypeMenu.innerHTML = matches.length
    ? matches.map((type) => `<button type="button" data-type-name="${type.nombre}">${type.nombre}</button>`).join("")
    : `<span>Sin tipos registrados</span>`;
}

function populateEquipmentBrands() {
  const query = equipmentBrandInput.value.trim().toLowerCase();
  const matches = equipmentBrands.filter((brand) => brand.nombre.toLowerCase().includes(query));

  equipmentBrandMenu.innerHTML = matches.length
    ? matches.map((brand) => `<button type="button" data-brand-name="${escapeHtml(brand.nombre)}">${escapeHtml(brand.nombre)}</button>`).join("")
    : `<span>Sin marcas registradas</span>`;
}

function openEquipmentBrandMenu() {
  populateEquipmentBrands();
  equipmentBrandMenu.classList.remove("form-collapsed");
  equipmentBrandInput.setAttribute("aria-expanded", "true");
}

function closeEquipmentBrandMenu() {
  equipmentBrandMenu.classList.add("form-collapsed");
  equipmentBrandInput.setAttribute("aria-expanded", "false");
}

function renderEquipmentTypeRequests() {
  if (!equipmentTypeRequestList) return;

  if (!equipmentTypeRequests.length) {
    equipmentTypeRequestList.innerHTML = `<p class="empty-state">Sin solicitudes pendientes.</p>`;
    return;
  }

  equipmentTypeRequestList.innerHTML = equipmentTypeRequests
    .map((request) => `
      <article>
        <div>
          <strong>${escapeHtml(request.nombre)}</strong>
          <span>Solicitado por ${escapeHtml(request.solicitante)}</span>
        </div>
        <div class="card-actions">
          <button class="text-btn" type="button" data-type-request-approve="${request.id}">Aprobar</button>
          <button class="text-btn danger" type="button" data-type-request-reject="${request.id}">Rechazar</button>
        </div>
      </article>
    `)
    .join("");
}

function renderEquipmentBrandRequests() {
  if (!equipmentBrandRequestList) return;

  if (!equipmentBrandRequests.length) {
    equipmentBrandRequestList.innerHTML = `<p class="empty-state">Sin solicitudes pendientes.</p>`;
    return;
  }

  equipmentBrandRequestList.innerHTML = equipmentBrandRequests
    .map((request) => `
      <article>
        <div>
          <strong>${escapeHtml(request.nombre)}</strong>
          <span>Solicitado por ${escapeHtml(request.solicitante)}</span>
        </div>
        <div class="card-actions">
          <button class="text-btn" type="button" data-brand-request-approve="${request.id}">Aprobar</button>
          <button class="text-btn danger" type="button" data-brand-request-reject="${request.id}">Rechazar</button>
        </div>
      </article>
    `)
    .join("");
}

function configureEquipmentTypeForm() {
  if (window.SICI_CAN_MANAGE_EQUIPMENT_TYPES) {
    equipmentTypeSubmit.textContent = "Agregar tipo";
    newEquipmentTypeName.placeholder = "Ej. Laptop, Impresora, Access Point";
    return;
  }

  equipmentTypeSubmit.textContent = "Solicitar tipo";
  newEquipmentTypeName.placeholder = "Tipo de equipo a solicitar";
}

function configureEquipmentBrandForm() {
  if (window.SICI_CAN_MANAGE_EQUIPMENT_TYPES) {
    equipmentBrandSubmit.textContent = "Agregar marca";
    newEquipmentBrandName.placeholder = "Ej. Dell, HP, Lenovo";
    return;
  }

  equipmentBrandSubmit.textContent = "Solicitar marca";
  newEquipmentBrandName.placeholder = "Marca a solicitar";
}

function openEquipmentTypeMenu() {
  populateEquipmentTypes();
  equipmentTypeMenu.classList.remove("form-collapsed");
  equipmentTypeInput.setAttribute("aria-expanded", "true");
}

function closeEquipmentTypeMenu() {
  equipmentTypeMenu.classList.add("form-collapsed");
  equipmentTypeInput.setAttribute("aria-expanded", "false");
}

function renderLocations() {
  if (!locations.length) {
    frontBars.innerHTML = `<p class="empty-state">Sin ubicaciones registradas.</p>`;
    locationCards.innerHTML = `<p class="empty-state">Sin frentes o mesas registradas.</p>`;
    renderResponsibles();
    return;
  }

  const maxCount = Math.max(...locations.map((location) => location.equipmentCount), 1);

  frontBars.innerHTML = [...locations]
    .sort((a, b) => b.equipmentCount - a.equipmentCount || a.name.localeCompare(b.name))
    .map(
      (location) => `
        <div>
          <span>${escapeHtml(displayLocationName(location.name))}</span>
          <meter min="0" max="${maxCount}" value="${location.equipmentCount}"></meter>
          <b>${location.equipmentCount}</b>
        </div>
      `
    )
    .join("");

  locationCards.innerHTML = locations
    .map((location) => {
      const managerLabel = location.type === "frente" ? "I.R.O." : "Jefe de Mesa";
      const manager = location.manager || "Sin responsable";
      return `
        <article>
          <strong>${escapeHtml(displayLocationName(location.name))}</strong>
          <span>${location.equipmentCount} equipos</span>
          <p>${managerLabel}: ${escapeHtml(manager)}</p>
          <div class="card-actions admin-only">
            <button class="text-btn" type="button" data-location-edit="${location.id}">Editar</button>
            <button class="text-btn danger" type="button" data-location-delete="${location.id}">Eliminar</button>
          </div>
        </article>
      `;
    })
    .join("");

  renderResponsibles();
}

function renderResponsibles() {
  if (!responsibles.length) {
    responsibleCards.innerHTML = `<p class="empty-state">Sin responsables registrados.</p>`;
    return;
  }

  responsibleCards.innerHTML = responsibles
    .map((responsible) => {
      const initials = responsible.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
      return `
        <article class="user-card">
          <div class="avatar">${escapeHtml(initials)}</div>
          <strong>${escapeHtml(responsible.name)}</strong>
          <span>${escapeHtml(responsible.roleLabel)}</span>
          <p>${escapeHtml(responsible.locationName)} - ${responsible.active ? "Activo" : "Inactivo"}</p>
          <div class="card-actions admin-only">
            <button class="text-btn" type="button" data-responsible-edit="${responsible.id}">Editar</button>
            <button class="text-btn" type="button" data-responsible-password="${responsible.id}">Contrasena</button>
            <button class="text-btn danger" type="button" data-responsible-delete="${responsible.id}">Eliminar</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderMetrics(items) {
  const now = new Date();
  const registeredThisMonth = items.filter((item) => {
    const createdAt = new Date(item.createdAt);
    return (
      !Number.isNaN(createdAt.getTime()) &&
      createdAt.getFullYear() === now.getFullYear() &&
      createdAt.getMonth() === now.getMonth()
    );
  }).length;

  document.querySelector("#metricTotal").textContent = items.length;
  document.querySelector("#metricRegisteredMonth").textContent =
    `${registeredThisMonth} registrado${registeredThisMonth === 1 ? "" : "s"} este mes`;
  document.querySelector("#metricAssigned").textContent = items.filter((item) => item.status === "Asignado").length;
  document.querySelector("#metricMaintenance").textContent = items.filter((item) => item.status === "Mantenimiento").length;
  document.querySelector("#metricAvailable").textContent = items.filter((item) => item.status === "Disponible").length;
  document.querySelector("#metricDown").textContent = items.filter((item) => item.status === "Dado de baja").length;
}

function populateReportCatalogFilters() {
  if (reportEquipmentType) {
    const selectedType = reportEquipmentType.value;
    reportEquipmentType.innerHTML = [
      `<option value="">Todos los tipos</option>`,
      ...equipmentTypes.map((item) => `<option value="${escapeHtml(item.nombre)}">${escapeHtml(item.nombre)}</option>`)
    ].join("");
    if (equipmentTypes.some((item) => item.nombre === selectedType)) reportEquipmentType.value = selectedType;
  }
  if (reportBrand) {
    const selectedBrand = reportBrand.value;
    reportBrand.innerHTML = [
      `<option value="">Todas las marcas</option>`,
      `<option value="Sin marca">Sin marca</option>`,
      ...equipmentBrands.map((item) => `<option value="${escapeHtml(item.nombre)}">${escapeHtml(item.nombre)}</option>`)
    ].join("");
    if (selectedBrand === "Sin marca" || equipmentBrands.some((item) => item.nombre === selectedBrand)) {
      reportBrand.value = selectedBrand;
    }
  }
}

function reportLocationMatches(locationId, selectedValue = reportLocation?.value || "") {
  if (!selectedValue) return true;
  const location = locations.find((item) => item.id === Number(locationId));
  if (selectedValue.startsWith("type:")) {
    return location?.type === selectedValue.replace("type:", "");
  }
  return Number(selectedValue) === Number(locationId);
}

function populateReportPhysicalLocations() {
  if (!reportPhysicalLocation) return;
  const uniqueNames = new Map();
  physicalLocations
    .filter((item) => item.active && reportLocationMatches(item.locationId))
    .forEach((item) => {
      const key = normalizeSearchText(item.name);
      if (!uniqueNames.has(key)) uniqueNames.set(key, item.name);
    });
  const options = Array.from(uniqueNames.values()).sort((a, b) => a.localeCompare(b));
  const currentValue = reportPhysicalLocation.value;
  reportPhysicalLocation.innerHTML = [
    `<option value="">Todas las ubicaciones fisicas</option>`,
    ...options.map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`)
  ].join("");
  if (options.includes(currentValue)) {
    reportPhysicalLocation.value = currentValue;
  }
}

function dateFromDisplay(value) {
  const match = String(value || "").match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return null;
  return new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]));
}

function reportEquipmentItems() {
  const scopedLocation = selectedLocation();
  const physicalLocationName = reportPhysicalLocation?.value || "";
  const equipmentType = reportEquipmentType?.value || "";
  const brand = reportBrand?.value || "";
  const status = reportStatus?.value || "";
  const assignment = reportAssignment?.value || "";
  const type = reportType?.value || "inventario";
  const warrantyOption = reportWarrantyDays?.value || "90";
  const warrantyLimit = new Date();
  warrantyLimit.setHours(23, 59, 59, 999);
  if (/^\d+$/.test(warrantyOption)) {
    warrantyLimit.setDate(warrantyLimit.getDate() + Number(warrantyOption));
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return equipment.filter((item) => {
    if (scopedLocation && item.locationId !== scopedLocation.id) return false;
    if (!reportLocationMatches(item.locationId)) return false;
    if (physicalLocationName && normalizeSearchText(item.physicalLocation) !== normalizeSearchText(physicalLocationName)) return false;
    if (equipmentType && item.type !== equipmentType) return false;
    if (brand && (item.brand || "Sin marca") !== brand) return false;
    if (status && item.status !== status) return false;
    if (assignment === "assigned" && (!item.user || item.user === "Sin asignar")) return false;
    if (assignment === "unassigned" && item.user && item.user !== "Sin asignar") return false;
    if (type === "mantenimiento" && item.status !== "Mantenimiento") return false;
    if (type === "bajas" && item.status !== "Dado de baja") return false;
    if (type === "garantias") {
      const warrantyDate = dateFromDisplay(item.warranty);
      if (warrantyOption === "none") return !warrantyDate;
      if (warrantyOption === "expired") return warrantyDate && warrantyDate < today;
      if (warrantyOption === "all") return Boolean(warrantyDate);
      return warrantyDate && warrantyDate >= today && warrantyDate <= warrantyLimit;
    }
    return true;
  });
}

function renderReports() {
  if (!reportRows) return;
  const items = reportEquipmentItems();
  const type = reportType.value;
  const isMovementReport = type === "movimientos";
  const movements = isMovementReport
    ? items
        .flatMap((item) =>
          (item.history || []).map((movement) => ({
            ...movement,
            equipmentName: item.name,
            serial: item.serial,
            front: item.front,
            physicalLocation: movement.physicalLocation || item.physicalLocation
          }))
        )
        .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")))
    : [];

  reportWarrantyDaysField.hidden = type !== "garantias";
  reportLastColumn.textContent = isMovementReport ? "Movimiento" : "Garantia";
  reportCount.textContent = isMovementReport ? movements.length : items.length;
  reportAssigned.textContent = items.filter((item) => item.status === "Asignado").length;
  reportAvailable.textContent = items.filter((item) => item.status === "Disponible").length;
  reportMaintenance.textContent = items.filter((item) => item.status === "Mantenimiento").length;
  reportDown.textContent = items.filter((item) => item.status === "Dado de baja").length;

  const rowsToRender = isMovementReport ? movements.slice(0, 100) : items.slice(0, 100);
  reportRows.innerHTML = rowsToRender.length
    ? rowsToRender
        .map((item) =>
          isMovementReport
            ? `
              <tr>
                <td data-label="Equipo">${escapeHtml(item.equipmentName)}</td>
                <td data-label="Serie">${escapeHtml(item.serial)}</td>
                <td data-label="F.F.O.O. o Mesa">${escapeHtml(displayLocationName(item.location || item.front))}</td>
                <td data-label="Ubicacion fisica">${escapeHtml(item.physicalLocation || "Sin registro")}</td>
                <td data-label="Estado">${escapeHtml(item.status)}</td>
                <td data-label="Realizado por">${escapeHtml(item.performedBy)}</td>
                <td data-label="Movimiento"><strong>${escapeHtml(item.type)}</strong><br><span>${escapeHtml(item.date)}</span></td>
              </tr>
            `
            : `
              <tr>
                <td data-label="Equipo">${escapeHtml(item.name)}</td>
                <td data-label="Serie">${escapeHtml(item.serial)}</td>
                <td data-label="F.F.O.O. o Mesa">${escapeHtml(displayLocationName(item.front))}</td>
                <td data-label="Ubicacion fisica">${escapeHtml(item.physicalLocation || "Sin registro")}</td>
                <td data-label="Estado"><span class="status ${escapeHtml(item.status)}">${escapeHtml(item.status)}</span></td>
                <td data-label="Asignado a">${escapeHtml(item.user)}</td>
                <td data-label="Garantia">${escapeHtml(item.warranty)}</td>
              </tr>
            `
        )
        .join("")
    : `<tr><td colspan="7">No hay registros para los filtros seleccionados.</td></tr>`;

  const totalRows = isMovementReport ? movements.length : items.length;
  reportNote.textContent =
    totalRows > 100
      ? `Vista previa de 100 de ${totalRows} registros. El Excel incluye todos los resultados permitidos.`
      : "La descarga respeta el alcance asignado a tu usuario.";
}

function renderRecentMovements() {
  if (!recentMovements) return;

  const scopedLocation = selectedLocation();
  const movements = equipment
    .filter((item) => !scopedLocation || item.locationId === scopedLocation.id)
    .flatMap((item) =>
      (item.history || []).map((movement) => ({
        ...movement,
        equipmentName: item.name,
        serial: item.serial
      }))
    )
    .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")))
    .slice(0, 6);

  if (!movements.length) {
    recentMovements.innerHTML = `
      <div class="timeline-item">
        <span class="dot ok"></span>
        <div>
          <strong>Sin movimientos recientes</strong>
          <p>Cuando registres altas, asignaciones o bajas apareceran aqui.</p>
        </div>
        <time>Ahora</time>
      </div>
    `;
    return;
  }

  recentMovements.innerHTML = movements
    .map((movement) => {
      const dotClass = movement.type === "Mantenimiento" ? "warn" : movement.type === "Baja" ? "" : "ok";
      return `
        <button class="timeline-item timeline-action" type="button" data-recent-equipment="${escapeHtml(movement.serial)}">
          <span class="dot ${dotClass}"></span>
          <span>
            <strong>${escapeHtml(movement.type)}: ${escapeHtml(movement.equipmentName)}</strong>
            <p>${escapeHtml(movement.description)} · ${escapeHtml(movement.location)} / ${escapeHtml(movement.physicalLocation || "Sin registro")} · Por: ${escapeHtml(movement.performedBy)}</p>
          </span>
          <time>${escapeHtml(movement.date)}</time>
        </button>
      `;
    })
    .join("");
}

function visibleEquipment() {
  const scopedLocation = selectedLocation();
  const frontValue = frontFilter.value;
  const physicalLocationValue = physicalLocationFilter.value;
  const selectedTypes = multiFilterValues(typeFilter);
  const selectedBrands = multiFilterValues(brandFilter);
  const selectedStatuses = multiFilterValues(statusFilter);
  const queryTerms = normalizeSearchText(searchInput.value).split(/\s+/).filter(Boolean);

  const filtered = equipment.filter((item) => {
    const itemLocation = locations.find((location) => location.id === item.locationId);
    const roleMatch = !scopedLocation || item.front === scopedLocation.name;
    const frontMatch =
      frontValue === "all" ||
      frontValue === `type:${itemLocation?.type}` ||
      item.front === frontValue;
    const physicalMatch =
      physicalLocationValue === "all" || item.physicalLocationId === Number(physicalLocationValue);
    const typeMatch = !selectedTypes.size || selectedTypes.has(item.type);
    const brandMatch = !selectedBrands.size || selectedBrands.has(item.brand || "Sin marca");
    const statusMatch = !selectedStatuses.size || selectedStatuses.has(item.status);
    const locationType = itemLocation?.type === "mesa"
      ? "Mesa"
      : itemLocation?.type === "frente"
        ? "Frente de Obra F.F.O.O."
        : "";
    const text = normalizeSearchText(
      `${item.type} ${item.brand || ""} ${item.name} ${item.serial} ${item.user} ` +
      `${item.front} ${displayLocationName(item.front)} ${locationType} ` +
      `${item.physicalLocation || ""} ${item.status} ${item.warranty || ""}`
    );
    const searchMatch = queryTerms.every((term) => text.includes(term));
    return (
      roleMatch &&
      frontMatch &&
      physicalMatch &&
      typeMatch &&
      brandMatch &&
      statusMatch &&
      searchMatch
    );
  });

  const direction = inventorySort.direction === "asc" ? 1 : -1;
  return filtered.sort((a, b) => {
    let left = a[inventorySort.key] ?? "";
    let right = b[inventorySort.key] ?? "";
    if (inventorySort.key === "warranty") {
      const leftDate = dateFromDisplay(left)?.getTime();
      const rightDate = dateFromDisplay(right)?.getTime();
      if (leftDate === undefined && rightDate === undefined) return 0;
      if (leftDate === undefined) return 1;
      if (rightDate === undefined) return -1;
      left = leftDate;
      right = rightDate;
      return (left - right) * direction;
    }
    return String(left).localeCompare(String(right), "es", { numeric: true, sensitivity: "base" }) * direction;
  });
}

function renderInventorySortState() {
  document.querySelectorAll(".sort-button").forEach((button) => {
    const active = button.dataset.sort === inventorySort.key;
    const header = button.closest("th");
    const icon = button.querySelector("span");
    header.setAttribute(
      "aria-sort",
      active ? (inventorySort.direction === "asc" ? "ascending" : "descending") : "none"
    );
    icon.textContent = active ? (inventorySort.direction === "asc" ? "↑" : "↓") : "↕";
    button.classList.toggle("active", active);
  });
}

function syncInventoryScrollWidth() {
  if (!inventoryScrollTopInner || !inventoryTable) return;
  inventoryScrollTopInner.style.width = `${inventoryTable.scrollWidth}px`;
  inventoryScrollTop.classList.toggle(
    "has-overflow",
    inventoryTable.scrollWidth > inventoryTableWrap.clientWidth
  );
}

function fitInventoryStatusLabels() {
  rows.querySelectorAll(".inventory-status").forEach((label) => {
    label.textContent = label.dataset.full;
    label.title = "";
  });

  rows.querySelectorAll(".inventory-status").forEach((label) => {
    if (label.scrollWidth <= label.clientWidth) return;
    label.textContent = label.dataset.short;
    label.title = label.dataset.full;
  });
}

function renderInventory() {
  const items = visibleEquipment();
  const deleteAllowed = canDeleteEquipment();
  rows.innerHTML = items
    .map(
      (item, index) => `
        <tr>
          <td data-label="Equipo">
            <div class="equipment-cell">
              <span class="asset-thumb">${item.type.slice(0, 2).toUpperCase()}</span>
              <div>
                <strong>${item.type}</strong><br />
                <span>${item.name}</span>
              </div>
            </div>
          </td>
          <td data-label="Serie">${item.serial}</td>
          <td data-label="Asignado a">${item.user}</td>
          <td data-label="F.F.O.O. o Mesa">${escapeHtml(displayLocationName(item.front))}</td>
          <td data-label="Estado">
            <button
              type="button"
              class="status inventory-status ${item.status}"
              data-status-detail="${index}"
              data-full="${escapeHtml(item.status)}"
              data-short="${escapeHtml({
                Asignado: "Asig.",
                Disponible: "Disp.",
                Mantenimiento: "Mantto.",
                "Dado de baja": "Baja"
              }[item.status] || item.status)}"
              title="Abrir estado del equipo"
            >${escapeHtml(item.status)}</button>
          </td>
          <td data-label="Garantia">${item.warranty}</td>
          <td data-label="QR"><button class="qr-chip" data-qr="${index}">QR</button></td>
          <td data-label="Acciones">
            ${deleteAllowed ? `<button class="text-btn danger" data-equipment-delete="${index}">Eliminar</button>` : ""}
          </td>
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

  renderMetrics(items);
  renderRecentMovements();
  renderReports();
  renderInventorySortState();
  requestAnimationFrame(() => {
    fitInventoryStatusLabels();
    syncInventoryScrollWidth();
  });
}

function closeDetail() {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  detailBackdrop.classList.remove("open");
  detailBackdrop.setAttribute("aria-hidden", "true");
}

function openDetail(item, section = "top") {
  const historyItems = item.history?.length
    ? item.history.map((movement) => `
        <div>
          <span>${escapeHtml(movement.date)} - ${escapeHtml(movement.type)}</span>
          <strong>${escapeHtml(movement.description)}</strong>
          <small>${escapeHtml(movement.location)} / ${escapeHtml(movement.physicalLocation || "Sin registro")} - ${escapeHtml(movement.status)} - ${escapeHtml(movement.assignedTo)} - Por: ${escapeHtml(movement.performedBy || "Sin registro")}</small>
        </div>
      `).join("")
    : `<p class="empty-state">Sin movimientos registrados.</p>`;

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
      <div><span>Asignado a</span><strong>${item.user}</strong></div>
      <div><span>F.F.O.O. o Mesa</span><strong>${escapeHtml(displayLocationName(item.front))}</strong></div>
      <div><span>Ubicaci\u00f3n f\u00edsica</span><strong>${escapeHtml(item.physicalLocation || "Santa Luc\u00eda")}</strong></div>
      <div><span>Estado</span><strong>${item.status}</strong></div>
      <div><span>Procesador</span><strong>${item.cpu}</strong></div>
      <div><span>RAM</span><strong>${item.ram}</strong></div>
      <div><span>Almacenamiento</span><strong>${item.storage}</strong></div>
      <div><span>Sistema operativo</span><strong>${item.os}</strong></div>
      <div><span>MAC Ethernet</span><strong>${item.macEthernet}</strong></div>
      <div><span>MAC WiFi</span><strong>${item.macWifi}</strong></div>
      <div><span>Garantia</span><strong>${item.warranty}</strong></div>
      <div><span>Observaciones</span><strong>${item.notes}</strong></div>
    </div>
    ${safekeepingBlock(item)}
    <div class="history-list">
      <span class="eyebrow">Trazabilidad</span>
      ${historyItems}
    </div>
    ${equipmentStatusBlock(item)}
  `;
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  detailBackdrop.classList.add("open");
  detailBackdrop.setAttribute("aria-hidden", "false");
  requestAnimationFrame(() => {
    if (section === "status") {
      drawerBody.querySelector("[data-equipment-status-form]")?.scrollIntoView({
        block: "start"
      });
      return;
    }
    drawer.scrollTop = 0;
  });
}

function safekeepingBlock(item) {
  const records = item.safekeeping || [];
  const hasPendingRecord = records.some((record) => !record.signed);
  const recordList = records.length
    ? records.map((record) => `
        <article class="safekeeping-record">
          <div>
            <strong>${escapeHtml(record.assignedTo)}</strong>
            <span>Asignacion: ${escapeHtml(record.assignmentDate)}</span>
            <small>Generado por ${escapeHtml(record.generatedBy)} el ${escapeHtml(record.generatedAt)}</small>
          </div>
          ${record.signed
            ? `<a class="text-btn" href="${record.downloadUrl}" target="_blank" rel="noopener">Ver firmado</a>`
            : `<span class="status Mantenimiento">Pendiente de firma</span>`}
        </article>
      `).join("")
    : `<p class="empty-state">Sin resguardos generados.</p>`;

  return `
    <section class="safekeeping-panel" data-safekeeping-panel="${escapeHtml(item.serial)}">
      <div>
        <span class="eyebrow">Resguardo</span>
        <h3>Documento de entrega</h3>
      </div>
      ${item.status === "Asignado"
        ? `<button class="ghost-btn" type="button" data-safekeeping-generate="${escapeHtml(item.serial)}">Generar PDF</button>`
        : `<p class="empty-state">El equipo debe estar asignado para generar el resguardo.</p>`}
      ${hasPendingRecord
        ? `
          <button class="primary-btn" type="button" data-safekeeping-select="${escapeHtml(item.serial)}">Seleccionar PDF firmado</button>
          <input class="safekeeping-file-input" type="file" accept="application/pdf,.pdf" data-safekeeping-upload="${escapeHtml(item.serial)}" />
          <small class="safekeeping-help">Selecciona el documento ya firmado. Se cargara automaticamente.</small>
        `
        : records.length
          ? `<p class="empty-state">Todos los resguardos generados ya tienen evidencia firmada.</p>`
          : `<p class="empty-state">Genera primero el PDF para habilitar la carga del documento firmado.</p>`}
      <p class="form-status" data-safekeeping-status></p>
      <div class="safekeeping-list">${recordList}</div>
    </section>
  `;
}

function equipmentStatusBlock(item) {
  const scopedLocation = selectedLocation();
  const lockedLocationId = scopedLocation ? scopedLocation.id : item.locationId;
  const assignedValue = item.user === "Sin asignar" ? "" : item.user;
  const physicalOptions = physicalLocationsFor(lockedLocationId);

  return `
    <div class="drawer-assignment" data-equipment-status-form="${escapeHtml(item.serial)}">
      <span class="eyebrow">Estado del equipo</span>
      <label>Asignado a<input name="asignado_a" type="text" value="${escapeHtml(assignedValue)}" placeholder="Nombre de la persona" /></label>
      <label>F.F.O.O. o Mesa
        <select name="ubicacion" ${scopedLocation ? "disabled" : ""}>
          ${locationOptionListById(lockedLocationId)}
        </select>
      </label>
      <label>Ubicaci\u00f3n f\u00edsica
        <input name="ubicacion_fisica" type="text" value="${escapeHtml(item.physicalLocation || "Santa Luc\u00eda")}" list="drawerPhysicalLocationOptions" required />
        <datalist id="drawerPhysicalLocationOptions">
          ${physicalOptions.map((location) => `<option value="${escapeHtml(location.name)}"></option>`).join("")}
        </datalist>
      </label>
      <label>Estado<select name="estado">${statusOptionList(item.status)}</select></label>
      <label data-status-reason class="${item.status === "Mantenimiento" ? "" : "hidden-by-role"}">
        Razon del mantenimiento
        <textarea name="motivo" placeholder="Describe la falla, diagnostico o trabajo requerido"></textarea>
      </label>
      <button class="primary-btn full" type="button" data-equipment-status-save="${escapeHtml(item.serial)}">Guardar estado</button>
      <p class="form-status"></p>
    </div>
  `;
}

function syncLocationEquipmentCounts() {
  locations.forEach((location) => {
    location.equipmentCount = equipment.filter((item) => item.locationId === location.id).length;
  });
}

function replaceEquipment(updatedEquipment) {
  rememberPhysicalLocation(updatedEquipment);
  equipment = equipment.map((item) => item.serial === updatedEquipment.serial ? updatedEquipment : item);
  syncLocationEquipmentCounts();
  renderLocations();
  renderInventory();
}

function rememberPhysicalLocation(item) {
  if (!item.physicalLocationId || !item.physicalLocation) return;
  if (physicalLocations.some((location) => location.id === item.physicalLocationId)) return;
  physicalLocations.push({
    id: item.physicalLocationId,
    locationId: item.locationId,
    name: item.physicalLocation,
    active: true
  });
}

async function saveEquipmentStatus(serial) {
  const form = Array.from(drawerBody.querySelectorAll("[data-equipment-status-form]"))
    .find((element) => element.dataset.equipmentStatusForm === serial);
  if (!form) return;

  const statusMessage = form.querySelector(".form-status");
  const selectedStatus = form.querySelector("[name='estado']").value;
  const reason = form.querySelector("[name='motivo']").value.trim();
  if (selectedStatus === "Mantenimiento" && !reason) {
    statusMessage.textContent = "Indica la razon por la que pasa a mantenimiento.";
    return;
  }

  const payload = new FormData();
  payload.append("estado", selectedStatus);
  payload.append("asignado_a", form.querySelector("[name='asignado_a']").value.trim());
  payload.append("ubicacion", form.querySelector("[name='ubicacion']").value);
  payload.append("ubicacion_fisica", form.querySelector("[name='ubicacion_fisica']").value.trim());
  payload.append("motivo", reason);
  statusMessage.textContent = "Guardando estado...";

  try {
    const response = await fetch(`/equipos/${encodeURIComponent(serial)}/estado/`, {
      method: "POST",
      headers: { "X-CSRFToken": csrfToken() },
      body: payload
    });
    const data = await response.json();
    if (!response.ok) {
      statusMessage.textContent = data.error || "No se pudo actualizar el estado.";
      return;
    }

    replaceEquipment(data.equipment);
    openDetail(data.equipment);
  } catch (error) {
    statusMessage.textContent = "Error de conexion al actualizar el estado.";
  }
}

async function deleteEquipment(item) {
  if (!canDeleteEquipment()) return;
  if (!await siciConfirm(
    `Se eliminara definitivamente el equipo ${item.serial}. Esta accion no es una baja y no se puede deshacer.`,
    "Eliminar equipo",
    "Eliminar"
  )) return;

  try {
    const response = await fetch(`/equipos/${encodeURIComponent(item.serial)}/eliminar/`, {
      method: "POST",
      headers: { "X-CSRFToken": csrfToken() }
    });
    const data = await response.json();
    if (!response.ok) {
      await siciAlert(data.error || "No se pudo eliminar el equipo.", "No se pudo eliminar");
      return;
    }

    equipment = equipment.filter((equipmentItem) => equipmentItem.serial !== item.serial);
    syncLocationEquipmentCounts();
    populateInventoryFilterOptions();
    renderLocations();
    renderInventory();
    closeDetail();
  } catch (error) {
    await siciAlert("Error de conexion al eliminar el equipo.", "Error de conexion");
  }
}

function updateSafekeepingRecord(serial, record, replacePending = false) {
  const item = equipment.find((equipmentItem) => equipmentItem.serial === serial);
  if (!item) return;

  item.safekeeping = item.safekeeping || [];
  if (replacePending) {
    item.safekeeping = item.safekeeping.filter((existing) => existing.signed);
  }
  const existingIndex = item.safekeeping.findIndex((existing) => existing.id === record.id);
  if (existingIndex >= 0) {
    item.safekeeping[existingIndex] = record;
  } else {
    item.safekeeping.unshift(record);
  }
  openDetail(item);
}

async function generateSafekeepingPdf(serial) {
  const status = drawerBody.querySelector("[data-safekeeping-status]");
  status.textContent = "Generando PDF...";

  try {
    let replacedPending = false;
    let response = await requestSafekeepingPdf(serial, false);
    if (response.status === 409) {
      const data = await response.json();
      const confirmed = await siciConfirm(
        `${data.error} Si generas otro, el pendiente anterior sera reemplazado.`,
        "Reemplazar resguardo",
        "Generar otro"
      );
      if (!confirmed) {
        status.textContent = "Se conservo el resguardo pendiente.";
        return;
      }
      status.textContent = "Reemplazando resguardo pendiente...";
      replacedPending = true;
      response = await requestSafekeepingPdf(serial, true);
    }

    if (!response.ok) {
      const contentType = response.headers.get("content-type") || "";
      const message = contentType.includes("application/json")
        ? (await response.json()).error
        : await response.text();
      status.textContent = message || "No se pudo generar el resguardo.";
      return;
    }

    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = downloadUrl;
    anchor.download = `Resguardo-${serial}.pdf`;
    anchor.click();
    URL.revokeObjectURL(downloadUrl);

    const item = equipment.find((equipmentItem) => equipmentItem.serial === serial);
    updateSafekeepingRecord(serial, {
      id: Number(response.headers.get("X-SICI-Resguardo-Id")),
      assignedTo: item.user,
      location: item.front,
      assignmentDate: response.headers.get("X-SICI-Resguardo-Fecha") || "",
      generatedAt: response.headers.get("X-SICI-Resguardo-Generado") || "",
      generatedBy: decodeURIComponent(response.headers.get("X-SICI-Resguardo-Usuario") || ""),
      signed: false,
      uploadedAt: "",
      uploadedBy: "",
      downloadUrl: ""
    }, replacedPending);
  } catch (error) {
    status.textContent = "Error de conexion al generar el resguardo.";
  }
}

function requestSafekeepingPdf(serial, replacePending) {
  const payload = new FormData();
  if (replacePending) {
    payload.append("reemplazar", "true");
  }
  return fetch(`/equipos/${encodeURIComponent(serial)}/resguardo/`, {
    method: "POST",
    headers: { "X-CSRFToken": csrfToken() },
    body: payload
  });
}

async function uploadSignedSafekeeping(serial, file) {
  if (!file) return;
  const status = drawerBody.querySelector("[data-safekeeping-status]");
  if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
    status.textContent = "El resguardo firmado debe ser un archivo PDF.";
    return;
  }
  if (file.size > 15 * 1024 * 1024) {
    status.textContent = "El PDF firmado no debe superar 15 MB.";
    return;
  }

  status.textContent = `Preparando ${file.name}...`;
  const payload = new FormData();
  payload.append("archivo", file);

  try {
    const result = await uploadWithProgress(
      `/equipos/${encodeURIComponent(serial)}/resguardo/firmado/`,
      payload,
      (percent) => {
        status.textContent = `Cargando ${file.name}: ${percent}%`;
      }
    );
    if (!result.ok) {
      const data = result.data;
      status.textContent = data.error || "No se pudo cargar el resguardo firmado.";
      return;
    }

    status.textContent = "PDF firmado cargado correctamente.";
    updateSafekeepingRecord(serial, result.data.safekeeping);
  } catch (error) {
    status.textContent = "Error de conexion al cargar el resguardo firmado.";
  }
}

function uploadWithProgress(url, payload, onProgress) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("X-CSRFToken", csrfToken());
    request.responseType = "json";

    request.upload.addEventListener("progress", (event) => {
      if (!event.lengthComputable) return;
      onProgress(Math.round((event.loaded / event.total) * 100));
    });

    request.addEventListener("load", () => {
      let data = request.response;
      if (!data) {
        try {
          data = JSON.parse(request.responseText || "{}");
        } catch (error) {
          data = {};
        }
      }
      resolve({ ok: request.status >= 200 && request.status < 300, data });
    });
    request.addEventListener("error", reject);
    request.addEventListener("abort", reject);
    request.send(payload);
  });
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
      <p>${escapeHtml(displayLocationName(item.front))}</p>
      <p><span class="status ${item.status}">${item.status}</span></p>
      <button class="primary-btn" id="scanOpenDetail">Ver ficha</button>
    </div>
  `;
  document.querySelector("#scanOpenDetail").addEventListener("click", () => openDetail(item));
}

async function decodeCanvasQr(source, options = {}) {
  try {
    let rawValue = "";

    if ("BarcodeDetector" in window) {
      qrDetector = qrDetector || new BarcodeDetector({ formats: ["qr_code"] });
      const codes = await qrDetector.detect(source);
      rawValue = codes[0]?.rawValue || "";
    }

    if (!rawValue && window.jsQR) {
      rawValue = decodeCanvasWithJsQr(source instanceof HTMLCanvasElement ? source : scannerCanvas, options);
    }

    if (!rawValue) {
      scanStatus.textContent = "Sin codigo detectado";
      scanMessage.textContent = "Intenta con una imagen mas clara o acerca el QR a la camara.";
      return;
    }

    renderScannedItem(findEquipmentFromQr(rawValue), rawValue);
  } catch (error) {
    scanStatus.textContent = "Error de lectura";
    scanMessage.textContent = "No fue posible procesar la imagen. Intenta de nuevo con mejor luz o una imagen mas nitida.";
  }
}

function decodeCanvasWithJsQr(canvas, options = {}) {
  const candidates = qrCanvasCandidates(canvas);
  const angles = options.rotate ? [0, 90, 270, 180] : [0];

  for (const candidate of candidates) {
    for (const angle of angles) {
      const workingCanvas = angle === 0 ? candidate : rotatedCanvas(candidate, angle);
      const value = readJsQrFromCanvas(workingCanvas);
      if (value) {
        return value;
      }
    }
  }

  return "";
}

function readJsQrFromCanvas(canvas) {
  const context = canvas.getContext("2d", { willReadFrequently: true });
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const code = window.jsQR(imageData.data, imageData.width, imageData.height, {
    inversionAttempts: "attemptBoth"
  });
  return code?.data || "";
}

function qrCanvasCandidates(canvas) {
  const candidates = [canvas];
  const largestSide = Math.max(canvas.width, canvas.height);

  if (largestSide > 1800) {
    candidates.push(fitCanvas(canvas, 1800));
  }

  const baseCanvas = candidates[candidates.length - 1];
  for (const ratio of [0.78, 0.58]) {
    const crop = centerCropCanvas(baseCanvas, ratio);
    candidates.push(crop);
    candidates.push(thresholdCanvas(crop, 150));
  }

  candidates.push(thresholdCanvas(baseCanvas, 150));
  return candidates.filter((item) => item.width > 0 && item.height > 0);
}

function fitCanvas(sourceCanvas, maxSide) {
  const scale = Math.min(1, maxSide / Math.max(sourceCanvas.width, sourceCanvas.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(sourceCanvas.width * scale));
  canvas.height = Math.max(1, Math.round(sourceCanvas.height * scale));
  canvas.getContext("2d", { willReadFrequently: true }).drawImage(sourceCanvas, 0, 0, canvas.width, canvas.height);
  return canvas;
}

function centerCropCanvas(sourceCanvas, ratio) {
  const width = Math.max(1, Math.round(sourceCanvas.width * ratio));
  const height = Math.max(1, Math.round(sourceCanvas.height * ratio));
  const left = Math.max(0, Math.round((sourceCanvas.width - width) / 2));
  const top = Math.max(0, Math.round((sourceCanvas.height - height) / 2));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d", { willReadFrequently: true }).drawImage(sourceCanvas, left, top, width, height, 0, 0, width, height);
  return canvas;
}

function rotatedCanvas(sourceCanvas, angle) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const swap = angle === 90 || angle === 270;
  canvas.width = swap ? sourceCanvas.height : sourceCanvas.width;
  canvas.height = swap ? sourceCanvas.width : sourceCanvas.height;
  context.translate(canvas.width / 2, canvas.height / 2);
  context.rotate((angle * Math.PI) / 180);
  context.drawImage(sourceCanvas, -sourceCanvas.width / 2, -sourceCanvas.height / 2);
  return canvas;
}

function thresholdCanvas(sourceCanvas, threshold) {
  const canvas = document.createElement("canvas");
  canvas.width = sourceCanvas.width;
  canvas.height = sourceCanvas.height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  context.drawImage(sourceCanvas, 0, 0);
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let index = 0; index < data.length; index += 4) {
    const luminance = data[index] * 0.299 + data[index + 1] * 0.587 + data[index + 2] * 0.114;
    const value = luminance < threshold ? 0 : 255;
    data[index] = value;
    data[index + 1] = value;
    data[index + 2] = value;
  }

  context.putImageData(imageData, 0, 0);
  return canvas;
}

function drawImageForQr(image) {
  const maxSide = 2200;
  const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight));
  scannerCanvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  scannerCanvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  const context = scannerCanvas.getContext("2d", { willReadFrequently: true });
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, scannerCanvas.width, scannerCanvas.height);
  context.drawImage(image, 0, 0, scannerCanvas.width, scannerCanvas.height);
}

function resetQrFileInputs() {
  document.querySelector("#qrCameraInput").value = "";
  document.querySelector("#qrImageInput").value = "";
}

function shouldRotateUploadedQr() {
  return /android/i.test(navigator.userAgent);
}

async function startCamera() {
  if (!window.isSecureContext && location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
    scanStatus.textContent = "Camara bloqueada por el navegador";
    scanMessage.textContent = "En iPhone y Android usa Tomar foto o subir imagen, o abre el sistema con HTTPS para camara en vivo.";
    return;
  }

  try {
    scannerStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
      audio: false
    });
    scannerVideo.srcObject = scannerStream;
    scannerPlaceholder.classList.add("hidden-by-role");
    scanStatus.textContent = "Escaneando";
    scanMessage.textContent = "Manten el QR dentro del recuadro.";
    scannerTimer = window.setInterval(scanVideoFrame, 900);
  } catch (error) {
    scanStatus.textContent = "No se pudo abrir camara";
    scanMessage.textContent = "Revisa permisos del navegador o usa Tomar foto o subir imagen.";
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
  if (!scannerVideo.videoWidth || scannerBusy) return;

  scannerBusy = true;
  try {
    scannerCanvas.width = scannerVideo.videoWidth;
    scannerCanvas.height = scannerVideo.videoHeight;
    scannerCanvas.getContext("2d").drawImage(scannerVideo, 0, 0);
    await decodeCanvasQr(scannerCanvas);
  } finally {
    scannerBusy = false;
  }
}

async function scanUploadedImage(file) {
  if (!file || scannerBusy) return;
  scannerBusy = true;
  scanStatus.textContent = "Procesando imagen";
  scanMessage.textContent = file.name;
  const image = new Image();
  image.onload = async () => {
    try {
      const rawValue = await decodeUploadedImageWithBarcodeDetector(file, image);
      if (rawValue) {
        renderScannedItem(findEquipmentFromQr(rawValue), rawValue);
        return;
      }

      drawImageForQr(image);
      await decodeCanvasQr(scannerCanvas, { rotate: shouldRotateUploadedQr() });
    } finally {
      URL.revokeObjectURL(image.src);
      resetQrFileInputs();
      scannerBusy = false;
    }
  };
  image.onerror = () => {
    scanStatus.textContent = "Imagen no valida";
    scanMessage.textContent = "No se pudo abrir el archivo seleccionado.";
    URL.revokeObjectURL(image.src);
    resetQrFileInputs();
    scannerBusy = false;
  };
  image.src = URL.createObjectURL(file);
}

async function decodeUploadedImageWithBarcodeDetector(file, image) {
  if (!("BarcodeDetector" in window)) {
    return "";
  }

  try {
    qrDetector = qrDetector || new BarcodeDetector({ formats: ["qr_code"] });
    const imageCodes = await qrDetector.detect(image);
    if (imageCodes[0]?.rawValue) {
      return imageCodes[0].rawValue;
    }

    if ("createImageBitmap" in window) {
      const bitmap = await createImageBitmap(file);
      const bitmapCodes = await qrDetector.detect(bitmap);
      bitmap.close?.();
      return bitmapCodes[0]?.rawValue || "";
    }
  } catch (error) {
    return "";
  }

  return "";
}

function switchView(viewId) {
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.id === viewId);
  });
  document.querySelectorAll(".nav-item[data-view]").forEach((item) => {
    item.classList.toggle("active", item.dataset.view === viewId);
  });
  document.querySelector("#pageTitle").textContent = pageTitles[viewId];
  inventorySearchBox.classList.toggle("form-collapsed", viewId !== "inventory");
}

function applyRole() {
  const role = roleKind();
  const scopedLocation = selectedLocation();
  const allowedViews = roleViews[role] || roleViews.location;
  roleHint.textContent =
    role === "tic"
      ? "Mesa TIC: inventario completo, panel general, altas, escaneo, reportes y tipos de equipo."
      : scopedLocation
        ? `Vista limitada a ${scopedLocation.name}.`
        : "Acceso completo a inventario, usuarios y frentes.";

  if (scopedLocation) {
    frontFilter.value = scopedLocation.name;
    assignmentFront.value = String(scopedLocation.id);
  } else if (role === "tic") {
    const ticLocation = mesaTicLocation();
    if (ticLocation && assignmentFront.dataset.ticDefaultApplied !== "true") {
      assignmentFront.value = String(ticLocation.id);
      assignmentFront.dataset.ticDefaultApplied = "true";
    }
  } else {
    delete assignmentFront.dataset.ticDefaultApplied;
  }

  frontFilter.disabled = Boolean(scopedLocation);
  assignmentFront.disabled = Boolean(scopedLocation);
  populateInventoryPhysicalLocations();
  if (reportLocation) {
    reportLocation.disabled = Boolean(scopedLocation);
    if (scopedLocation) {
      reportLocation.value = String(scopedLocation.id);
    }
    populateReportPhysicalLocations();
  }
  renderPhysicalLocationOptions(assignmentFront.value);

  document.querySelectorAll(".nav-item[data-view]").forEach((item) => {
    item.classList.toggle("hidden-by-role", !allowedViews.includes(item.dataset.view));
  });

  const activeView = document.querySelector(".view.active")?.id;
  if (!allowedViews.includes(activeView)) {
    switchView("inventory");
  }

  document.querySelectorAll(".admin-only").forEach((item) => {
    item.classList.toggle("hidden-by-role", role !== "admin");
  });

  document.querySelectorAll(".admin-tic-only").forEach((item) => {
    item.classList.toggle("hidden-by-role", role !== "admin" && role !== "tic");
  });

  const createButton = document.querySelector("[data-view-target='equipment']");
  createButton.classList.remove("hidden-by-role");

  syncAssignmentPersonRequirement();
  renderInventory();
}

document.querySelectorAll(".nav-item[data-view]").forEach((button) => {
  button.addEventListener("click", () => switchView(button.dataset.view));
});

document.querySelectorAll("[data-view-target]").forEach((button) => {
  button.addEventListener("click", () => switchView(button.dataset.viewTarget));
});

document.querySelectorAll(".sort-button").forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.sort;
    inventorySort = {
      key,
      direction: inventorySort.key === key && inventorySort.direction === "asc" ? "desc" : "asc"
    };
    renderInventory();
  });
});

[typeFilter, brandFilter, statusFilter].forEach((filter) => {
  filter?.addEventListener("change", () => {
    const labels = {
      typeFilter: "Tipos de equipo",
      brandFilter: "Marcas",
      statusFilter: "Estados"
    };
    updateMultiFilterLabel(filter, labels[filter.id]);
    renderInventory();
  });
});

frontFilter.addEventListener("change", () => {
  populateInventoryPhysicalLocations();
  renderInventory();
});

physicalLocationFilter?.addEventListener("change", renderInventory);

clearInventoryFilters?.addEventListener("click", () => {
  if (!selectedLocation()) frontFilter.value = "all";
  physicalLocationFilter.value = "all";
  [typeFilter, brandFilter, statusFilter].forEach((filter) => {
    filter.querySelectorAll("input:checked").forEach((input) => {
      input.checked = false;
    });
  });
  updateMultiFilterLabel(typeFilter, "Tipos de equipo");
  updateMultiFilterLabel(brandFilter, "Marcas");
  updateMultiFilterLabel(statusFilter, "Estados");
  searchInput.value = "";
  populateInventoryPhysicalLocations();
  renderInventory();
});

inventoryScrollTop?.addEventListener("scroll", () => {
  if (inventoryTableWrap.scrollLeft !== inventoryScrollTop.scrollLeft) {
    inventoryTableWrap.scrollLeft = inventoryScrollTop.scrollLeft;
  }
});

inventoryTableWrap?.addEventListener("scroll", () => {
  if (inventoryScrollTop.scrollLeft !== inventoryTableWrap.scrollLeft) {
    inventoryScrollTop.scrollLeft = inventoryTableWrap.scrollLeft;
  }
});

window.addEventListener("resize", () => {
  fitInventoryStatusLabels();
  syncInventoryScrollWidth();
});

themeToggle?.addEventListener("click", () => {
  applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark", true);
});

[reportType, reportPhysicalLocation, reportEquipmentType, reportBrand, reportStatus, reportAssignment, reportWarrantyDays].forEach((control) => {
  control?.addEventListener("change", renderReports);
});

reportLocation?.addEventListener("change", () => {
  populateReportPhysicalLocations();
  renderReports();
});

clearReportFilters?.addEventListener("click", () => {
  const scopedLocation = selectedLocation();
  reportType.value = "inventario";
  reportLocation.value = scopedLocation ? String(scopedLocation.id) : "";
  reportEquipmentType.value = "";
  reportBrand.value = "";
  reportStatus.value = "";
  reportAssignment.value = "";
  reportWarrantyDays.value = "90";
  populateReportPhysicalLocations();
  reportPhysicalLocation.value = "";
  renderReports();
});

downloadReport?.addEventListener("click", () => {
  const params = new URLSearchParams({ tipo: reportType.value });
  if (reportLocation.value) params.set("ubicacion", reportLocation.value);
  if (reportPhysicalLocation.value) params.set("ubicacion_fisica", reportPhysicalLocation.value);
  if (reportEquipmentType.value) params.set("tipo_equipo", reportEquipmentType.value);
  if (reportBrand.value) params.set("marca", reportBrand.value);
  if (reportStatus.value) params.set("estado", reportStatus.value);
  if (reportAssignment.value) params.set("asignacion", reportAssignment.value);
  if (reportType.value === "garantias") params.set("garantia", reportWarrantyDays.value);
  window.location.href = `/reportes/descargar/?${params.toString()}`;
});

recentMovements?.addEventListener("click", (event) => {
  const movementButton = event.target.closest("[data-recent-equipment]");
  if (!movementButton) return;
  const item = equipment.find((equipmentItem) => equipmentItem.serial === movementButton.dataset.recentEquipment);
  if (item) {
    openDetail(item);
  }
});

rows.addEventListener("click", (event) => {
  const qrButton = event.target.closest("[data-qr]");
  if (qrButton) {
    openDetail(visibleEquipment()[Number(qrButton.dataset.qr)]);
    return;
  }

  const statusButton = event.target.closest("[data-status-detail]");
  if (statusButton) {
    openDetail(visibleEquipment()[Number(statusButton.dataset.statusDetail)], "status");
    return;
  }

  const deleteButton = event.target.closest("[data-equipment-delete]");
  if (deleteButton) {
    deleteEquipment(visibleEquipment()[Number(deleteButton.dataset.equipmentDelete)]);
    return;
  }

});

document.querySelector("#closeDrawer").addEventListener("click", () => {
  closeDetail();
});

detailBackdrop.addEventListener("click", closeDetail);

drawerBody.addEventListener("click", (event) => {
  const statusButton = event.target.closest("[data-equipment-status-save]");
  if (statusButton) {
    saveEquipmentStatus(statusButton.dataset.equipmentStatusSave);
    return;
  }

  const generateButton = event.target.closest("[data-safekeeping-generate]");
  if (generateButton) {
    generateSafekeepingPdf(generateButton.dataset.safekeepingGenerate);
    return;
  }

  const selectButton = event.target.closest("[data-safekeeping-select]");
  if (selectButton) {
    const input = Array.from(drawerBody.querySelectorAll("[data-safekeeping-upload]"))
      .find((element) => element.dataset.safekeepingUpload === selectButton.dataset.safekeepingSelect);
    input?.click();
  }
});

drawerBody.addEventListener("change", (event) => {
  if (event.target.matches("[data-equipment-status-form] [name='estado']")) {
    const form = event.target.closest("[data-equipment-status-form]");
    const reasonField = form.querySelector("[data-status-reason]");
    reasonField.classList.toggle("hidden-by-role", event.target.value !== "Mantenimiento");
    return;
  }

  if (event.target.matches("[data-equipment-status-form] [name='ubicacion']")) {
    const form = event.target.closest("[data-equipment-status-form]");
    const input = form.querySelector("[name='ubicacion_fisica']");
    const datalist = form.querySelector("datalist");
    input.value = "";
    renderPhysicalLocationOptions(event.target.value, input, datalist);
    return;
  }

  if (event.target.matches("[data-safekeeping-upload]")) {
    uploadSignedSafekeeping(event.target.dataset.safekeepingUpload, event.target.files[0]);
  }
});

sessionUserButton?.addEventListener("click", () => {
  const isOpen = !sessionUserMenu.classList.contains("form-collapsed");
  sessionUserMenu.classList.toggle("form-collapsed", isOpen);
  sessionUserButton.setAttribute("aria-expanded", String(!isOpen));
});

document.querySelector("#openCameraBtn").addEventListener("click", startCamera);
document.querySelector("#stopCameraBtn").addEventListener("click", stopCamera);
document.querySelector("#qrCameraInput").addEventListener("change", (event) => {
  scanUploadedImage(event.target.files[0]);
});
document.querySelector("#qrImageInput").addEventListener("change", (event) => {
  scanUploadedImage(event.target.files[0]);
});

document.querySelectorAll("[data-import-trigger]").forEach((button) => {
  button.addEventListener("click", () => {
    switchView("inventory");
    excelInput.click();
  });
});

document.querySelector("#logoutForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const confirmed = await siciConfirm(
    "Tu sesion actual se cerrara.",
    "Cerrar sesion",
    "Salir"
  );
  if (confirmed) {
    event.currentTarget.submit();
  }
});

toggleLocationForm?.addEventListener("change", () => {
  locationFormPanel.classList.toggle("form-collapsed", !toggleLocationForm.checked);
});

toggleResponsibleForm?.addEventListener("change", () => {
  responsibleFormPanel.classList.toggle("form-collapsed", !toggleResponsibleForm.checked);
  if (toggleResponsibleForm.checked) {
    resetResponsibleForm();
  }
});

locationType?.addEventListener("change", () => {
  locationManagerRole.value = locationType.value === "mesa" ? "Jefe de Mesa" : "I.R.O.";
});

responsibleRole?.addEventListener("change", syncResponsibleLocationControl);
assignmentStatus?.addEventListener("change", syncAssignmentPersonRequirement);
assignmentFront?.addEventListener("change", () => {
  assignmentPhysicalLocation.value = "";
  renderPhysicalLocationOptions(assignmentFront.value);
});

function showLocationForm() {
  toggleLocationForm.checked = true;
  locationFormPanel.classList.remove("form-collapsed");
}

function resetLocationForm() {
  locationForm.reset();
  locationId.value = "";
  locationManagerRole.value = "I.R.O.";
  locationFormTitle.textContent = "Agregar frente o mesa";
  locationSubmit.textContent = "Guardar ubicacion";
  cancelLocationEdit.classList.add("form-collapsed");
  locationFormStatus.textContent = "";
}

function editLocation(id) {
  const location = locations.find((item) => item.id === id);
  if (!location) return;
  showLocationForm();
  locationId.value = location.id;
  locationType.value = location.type;
  locationName.value = location.name;
  locationManager.value = location.manager;
  locationManagerRole.value = location.type === "mesa" ? "Jefe de Mesa" : "I.R.O.";
  locationActive.value = String(location.active);
  locationFormTitle.textContent = "Editar frente o mesa";
  locationSubmit.textContent = "Actualizar ubicacion";
  cancelLocationEdit.classList.remove("form-collapsed");
  locationFormStatus.textContent = "";
  locationName.focus();
}

function resetResponsibleForm() {
  responsibleForm.reset();
  responsibleId.value = "";
  responsiblePassword.type = "password";
  responsiblePassword.disabled = false;
  const passwordToggle = responsiblePassword.closest(".password-field").querySelector(".password-toggle");
  passwordToggle.classList.remove("form-collapsed", "is-visible");
  passwordToggle.setAttribute("aria-label", "Mostrar contrasena");
  passwordToggle.setAttribute("title", "Mostrar contrasena");
  responsiblePassword.placeholder = "Contrasena inicial";
  responsiblePassword.required = true;
  responsiblePasswordHint.textContent = "Obligatoria al crear el usuario.";
  syncResponsibleLocationControl();
  responsibleSubmit.textContent = "Guardar responsable";
  passwordChangeBtn.classList.add("form-collapsed");
  cancelResponsibleEdit.classList.add("form-collapsed");
  responsibleFormStatus.textContent = "";
}

function cancelResponsibleEditing() {
  resetResponsibleForm();
  toggleResponsibleForm.checked = false;
  responsibleFormPanel.classList.add("form-collapsed");
}

function showResponsibleForm() {
  toggleResponsibleForm.checked = true;
  responsibleFormPanel.classList.remove("form-collapsed");
}

function editResponsible(id) {
  const responsible = responsibles.find((item) => item.id === id);
  if (!responsible) return;
  showResponsibleForm();
  responsibleId.value = responsible.id;
  responsibleName.value = responsible.name;
  responsibleUsername.value = responsible.username;
  responsiblePassword.value = "";
  responsiblePassword.type = "password";
  responsiblePassword.disabled = true;
  const passwordToggle = responsiblePassword.closest(".password-field").querySelector(".password-toggle");
  passwordToggle.classList.add("form-collapsed");
  passwordToggle.classList.remove("is-visible");
  passwordToggle.setAttribute("aria-label", "Mostrar contrasena");
  passwordToggle.setAttribute("title", "Mostrar contrasena");
  responsiblePassword.placeholder = "Usa el boton Cambiar contrasena";
  responsiblePassword.required = false;
  responsiblePasswordHint.textContent = "La contrasena se modifica desde el boton Cambiar contrasena.";
  responsibleRole.value = responsible.role;
  responsibleLocation.value = responsible.locationId || "";
  syncResponsibleLocationControl();
  responsibleActive.value = String(responsible.active);
  responsibleSubmit.textContent = "Actualizar responsable";
  passwordChangeBtn.classList.remove("form-collapsed");
  cancelResponsibleEdit.classList.remove("form-collapsed");
  responsibleFormStatus.textContent = "";
  responsibleName.focus();
}

async function changeResponsiblePassword(id) {
  const responsible = responsibles.find((item) => item.id === Number(id));
  const password = await siciPassword(
    `Define una nueva contrasena para ${responsible?.username || "el usuario"}.`
  );
  if (!password) return;

  const payload = new FormData();
  payload.append("password", password);
  responsibleFormStatus.textContent = "Actualizando contrasena...";
  try {
    const response = await fetch(`/responsables/${id}/password/`, {
      method: "POST",
      headers: { "X-CSRFToken": csrfToken() },
      body: payload
    });
    const data = await response.json();
    responsibleFormStatus.textContent = response.ok
      ? "Contrasena actualizada correctamente."
      : data.error || "No se pudo cambiar la contrasena.";
    if (response.ok) {
      await siciAlert("La contrasena se actualizo correctamente.", "Contrasena actualizada");
    }
  } catch (error) {
    responsibleFormStatus.textContent = "Error de conexion al cambiar la contrasena.";
    await siciAlert("No fue posible conectar con el servidor.", "Error de conexion");
  }
}

function syncResponsibleLocationControl() {
  const needsLocation = responsibleRole.value === "frente" || responsibleRole.value === "mesa";
  responsibleLocation.disabled = !needsLocation;
  if (!needsLocation) {
    responsibleLocation.value = "";
  }
}

toggleTypeForm?.addEventListener("click", () => {
  equipmentTypeForm.classList.toggle("form-collapsed");
  newEquipmentTypeName.focus();
});

toggleBrandForm?.addEventListener("click", () => {
  equipmentBrandForm.classList.toggle("form-collapsed");
  newEquipmentBrandName.focus();
});

equipmentTypeToggle?.addEventListener("click", () => {
  if (equipmentTypeMenu.classList.contains("form-collapsed")) {
    openEquipmentTypeMenu();
    equipmentTypeInput.focus();
    return;
  }

  closeEquipmentTypeMenu();
});

equipmentTypeInput?.addEventListener("input", openEquipmentTypeMenu);

equipmentTypeInput?.addEventListener("focus", () => {
  if (equipmentTypes.length) {
    openEquipmentTypeMenu();
  }
});

equipmentBrandToggle?.addEventListener("click", () => {
  if (equipmentBrandMenu.classList.contains("form-collapsed")) {
    openEquipmentBrandMenu();
    equipmentBrandInput.focus();
    return;
  }

  closeEquipmentBrandMenu();
});

equipmentBrandInput?.addEventListener("input", openEquipmentBrandMenu);

equipmentBrandInput?.addEventListener("focus", () => {
  if (equipmentBrands.length) {
    openEquipmentBrandMenu();
  }
});

equipmentBrandMenu?.addEventListener("click", (event) => {
  const option = event.target.closest("[data-brand-name]");
  if (!option) return;
  equipmentBrandInput.value = option.dataset.brandName;
  closeEquipmentBrandMenu();
});

equipmentTypeMenu?.addEventListener("click", (event) => {
  const option = event.target.closest("[data-type-name]");
  if (!option) return;
  equipmentTypeInput.value = option.dataset.typeName;
  closeEquipmentTypeMenu();
});

document.addEventListener("click", (event) => {
  if (!event.target.closest("#equipmentTypeCombo")) {
    closeEquipmentTypeMenu();
  }

  if (!event.target.closest("#equipmentBrandCombo")) {
    closeEquipmentBrandMenu();
  }

  if (!event.target.closest(".session-menu")) {
    sessionUserMenu?.classList.add("form-collapsed");
    sessionUserButton?.setAttribute("aria-expanded", "false");
  }

  if (!event.target.closest(".multi-filter")) {
    [typeFilter, brandFilter, statusFilter].forEach((filter) => {
      filter?.removeAttribute("open");
    });
  }
});

equipmentTypeForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const typeName = newEquipmentTypeName.value.trim();

  if (!window.SICI_CAN_MANAGE_EQUIPMENT_TYPES) {
    const confirmed = await siciConfirm(
      `Vas a solicitar el tipo de equipo "${typeName}". Revisa que este bien escrito antes de enviarlo.`,
      "Solicitar tipo de equipo",
      "Enviar solicitud"
    );
    if (!confirmed) return;
  }

  equipmentTypeStatus.textContent = window.SICI_CAN_MANAGE_EQUIPMENT_TYPES ? "Guardando tipo..." : "Enviando solicitud...";

  const payload = new FormData();
  payload.append("nombre", typeName);

  try {
    const response = await fetch(window.SICI_CAN_MANAGE_EQUIPMENT_TYPES ? "/tipos-equipo/crear/" : "/tipos-equipo/solicitar/", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrfToken()
      },
      body: payload
    });
    const data = await response.json();

    if (!response.ok) {
      equipmentTypeStatus.textContent = data.error || "No se pudo guardar el tipo.";
      return;
    }

    if (window.SICI_CAN_MANAGE_EQUIPMENT_TYPES) {
      equipmentTypes = [...equipmentTypes, data.type].sort((a, b) => a.nombre.localeCompare(b.nombre));
      equipmentTypeInput.value = data.type.nombre;
      populateEquipmentTypes();
      populateReportCatalogFilters();
      equipmentTypeStatus.textContent = "Tipo agregado correctamente.";
    } else {
      equipmentTypeStatus.textContent = "Solicitud enviada al administrador.";
    }

    newEquipmentTypeName.value = "";
  } catch (error) {
    equipmentTypeStatus.textContent = window.SICI_CAN_MANAGE_EQUIPMENT_TYPES
      ? "Error de conexion al guardar el tipo."
      : "Error de conexion al enviar la solicitud.";
  }
});

equipmentTypeRequestList?.addEventListener("click", async (event) => {
  const approveButton = event.target.closest("[data-type-request-approve]");
  const rejectButton = event.target.closest("[data-type-request-reject]");
  if (!approveButton && !rejectButton) return;

  const requestId = Number((approveButton || rejectButton).dataset.typeRequestApprove || rejectButton?.dataset.typeRequestReject);
  const request = equipmentTypeRequests.find((item) => item.id === requestId);
  const action = approveButton ? "aprobar" : "rechazar";

  if (!await siciConfirm(
    `${action === "aprobar" ? "Aprobar" : "Rechazar"} la solicitud "${request?.nombre || ""}".`,
    action === "aprobar" ? "Aprobar solicitud" : "Rechazar solicitud",
    action === "aprobar" ? "Aprobar" : "Rechazar"
  )) return;

  try {
    const response = await fetch(`/solicitudes-tipo-equipo/${requestId}/${action}/`, {
      method: "POST",
      headers: { "X-CSRFToken": csrfToken() }
    });
    const data = await response.json();
    if (!response.ok) {
      await siciAlert(data.error || "No se pudo atender la solicitud.", "Solicitud no procesada");
      return;
    }

    equipmentTypeRequests = equipmentTypeRequests.filter((item) => item.id !== requestId);
    if (data.type) {
      equipmentTypes = [...equipmentTypes, data.type].sort((a, b) => a.nombre.localeCompare(b.nombre));
      populateEquipmentTypes();
      populateReportCatalogFilters();
    }
    renderEquipmentTypeRequests();
  } catch (error) {
    await siciAlert("Error de conexion al atender la solicitud.", "Error de conexion");
  }
});

equipmentBrandForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const brandName = newEquipmentBrandName.value.trim();

  if (!window.SICI_CAN_MANAGE_EQUIPMENT_TYPES) {
    const confirmed = await siciConfirm(
      `Vas a solicitar la marca "${brandName}". Revisa que este bien escrita antes de enviarla.`,
      "Solicitar marca",
      "Enviar solicitud"
    );
    if (!confirmed) return;
  }

  equipmentBrandStatus.textContent = window.SICI_CAN_MANAGE_EQUIPMENT_TYPES ? "Guardando marca..." : "Enviando solicitud...";

  const payload = new FormData();
  payload.append("nombre", brandName);

  try {
    const response = await fetch(window.SICI_CAN_MANAGE_EQUIPMENT_TYPES ? "/marcas-equipo/crear/" : "/marcas-equipo/solicitar/", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrfToken()
      },
      body: payload
    });
    const data = await response.json();

    if (!response.ok) {
      equipmentBrandStatus.textContent = data.error || "No se pudo guardar la marca.";
      return;
    }

    if (window.SICI_CAN_MANAGE_EQUIPMENT_TYPES) {
      equipmentBrands = [...equipmentBrands, data.brand].sort((a, b) => a.nombre.localeCompare(b.nombre));
      equipmentBrandInput.value = data.brand.nombre;
      populateEquipmentBrands();
      populateReportCatalogFilters();
      equipmentBrandStatus.textContent = "Marca agregada correctamente.";
    } else {
      equipmentBrandStatus.textContent = "Solicitud enviada al administrador.";
    }

    newEquipmentBrandName.value = "";
  } catch (error) {
    equipmentBrandStatus.textContent = window.SICI_CAN_MANAGE_EQUIPMENT_TYPES
      ? "Error de conexion al guardar la marca."
      : "Error de conexion al enviar la solicitud.";
  }
});

equipmentBrandRequestList?.addEventListener("click", async (event) => {
  const approveButton = event.target.closest("[data-brand-request-approve]");
  const rejectButton = event.target.closest("[data-brand-request-reject]");
  if (!approveButton && !rejectButton) return;

  const requestId = Number((approveButton || rejectButton).dataset.brandRequestApprove || rejectButton?.dataset.brandRequestReject);
  const request = equipmentBrandRequests.find((item) => item.id === requestId);
  const action = approveButton ? "aprobar" : "rechazar";

  if (!await siciConfirm(
    `${action === "aprobar" ? "Aprobar" : "Rechazar"} la marca "${request?.nombre || ""}".`,
    action === "aprobar" ? "Aprobar marca" : "Rechazar marca",
    action === "aprobar" ? "Aprobar" : "Rechazar"
  )) return;

  try {
    const response = await fetch(`/solicitudes-marca-equipo/${requestId}/${action}/`, {
      method: "POST",
      headers: { "X-CSRFToken": csrfToken() }
    });
    const data = await response.json();
    if (!response.ok) {
      await siciAlert(data.error || "No se pudo atender la solicitud.", "Solicitud no procesada");
      return;
    }

    equipmentBrandRequests = equipmentBrandRequests.filter((item) => item.id !== requestId);
    if (data.brand) {
      equipmentBrands = [...equipmentBrands, data.brand].sort((a, b) => a.nombre.localeCompare(b.nombre));
      populateEquipmentBrands();
      populateReportCatalogFilters();
    }
    renderEquipmentBrandRequests();
  } catch (error) {
    await siciAlert("Error de conexion al atender la solicitud.", "Error de conexion");
  }
});

equipmentForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  equipmentFormStatus.textContent = "Guardando equipo...";

  const payload = new FormData(equipmentForm);
  payload.set("estado", assignmentStatus.value);
  payload.set("ubicacion", assignmentFront.value);
  payload.set("asignado_a", assignmentPerson.disabled ? "" : assignmentPerson.value.trim());

  try {
    const response = await fetch("/equipos/crear/", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrfToken()
      },
      body: payload
    });
    const data = await response.json();

    if (!response.ok) {
      equipmentFormStatus.textContent = data.error || "No se pudo guardar el equipo.";
      return;
    }

    rememberPhysicalLocation(data.equipment);
    equipment = [...equipment, data.equipment];
    populateInventoryFilterOptions();
    const location = locations.find((item) => item.name === data.equipment.front);
    if (location) {
      location.equipmentCount += 1;
    }
    renderLocations();
    renderInventory();
    resetEquipmentForm();
    equipmentFormStatus.textContent = "Equipo guardado correctamente.";
    switchView("inventory");
  } catch (error) {
    equipmentFormStatus.textContent = "Error de conexion al guardar el equipo.";
  }
});

locationForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  locationFormStatus.textContent = "Guardando ubicacion...";

  const payload = new FormData();
  payload.append("tipo", locationType.value);
  payload.append("nombre", locationName.value.trim());
  payload.append("responsable_nombre", locationManager.value.trim());
  payload.append("activa", locationActive.value);
  const editingId = locationId.value;
  const url = editingId ? `/ubicaciones/${editingId}/editar/` : "/ubicaciones/crear/";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "X-CSRFToken": csrfToken()
      },
      body: payload
    });
    const data = await response.json();

    if (!response.ok) {
      locationFormStatus.textContent = data.error || "No se pudo guardar la ubicacion.";
      return;
    }

    if (editingId) {
      locations = locations.map((item) => (item.id === data.location.id ? data.location : item));
    } else {
      locations = [...locations, data.location];
      if (data.physicalLocation) {
        physicalLocations.push(data.physicalLocation);
      }
    }
    locations = locations.sort((a, b) => a.name.localeCompare(b.name));
    populateLocationControls();
    renderLocations();
    applyRole();
    resetLocationForm();
    locationFormStatus.textContent = editingId ? "Ubicacion actualizada correctamente." : "Ubicacion guardada correctamente.";
  } catch (error) {
    locationFormStatus.textContent = "Error de conexion al guardar la ubicacion.";
  }
});

cancelLocationEdit?.addEventListener("click", resetLocationForm);

locationCards?.addEventListener("click", async (event) => {
  const editButton = event.target.closest("[data-location-edit]");
  if (editButton) {
    editLocation(Number(editButton.dataset.locationEdit));
    return;
  }

  const deleteButton = event.target.closest("[data-location-delete]");
  if (!deleteButton) return;
  const id = Number(deleteButton.dataset.locationDelete);
  const location = locations.find((item) => item.id === id);
  if (!await siciConfirm(
    `Se eliminara ${location?.name || "esta ubicacion"}.`,
    "Eliminar ubicacion",
    "Eliminar"
  )) return;

  try {
    const response = await fetch(`/ubicaciones/${id}/eliminar/`, {
      method: "POST",
      headers: { "X-CSRFToken": csrfToken() }
    });
    const data = await response.json();
    if (!response.ok) {
      await siciAlert(data.error || "No se pudo eliminar la ubicacion.", "No se pudo eliminar");
      return;
    }
    locations = locations.filter((item) => item.id !== id);
    populateLocationControls();
    renderLocations();
    applyRole();
  } catch (error) {
    await siciAlert("Error de conexion al eliminar la ubicacion.", "Error de conexion");
  }
});

responsibleForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  responsibleFormStatus.textContent = "Guardando responsable...";

  const payload = new FormData();
  payload.append("nombre", responsibleName.value.trim());
  payload.append("usuario", responsibleUsername.value.trim());
  payload.append("rol", responsibleRole.value);
  payload.append("ubicacion", responsibleLocation.value);
  payload.append("activo", responsibleActive.value);

  const editingId = responsibleId.value;
  if (!editingId) {
    payload.append("password", responsiblePassword.value);
  }
  const url = editingId ? `/responsables/${editingId}/editar/` : "/responsables/crear/";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "X-CSRFToken": csrfToken() },
      body: payload
    });
    const data = await response.json();
    if (!response.ok) {
      responsibleFormStatus.textContent = data.error || "No se pudo guardar el responsable.";
      return;
    }

    if (editingId) {
      responsibles = responsibles.map((item) => (item.id === data.responsible.id ? data.responsible : item));
    } else {
      responsibles = [...responsibles, data.responsible];
    }
    responsibles = responsibles.sort((a, b) => a.name.localeCompare(b.name));
    renderResponsibles();
    applyRole();
    resetResponsibleForm();
    responsibleFormStatus.textContent = editingId ? "Responsable actualizado correctamente." : "Responsable guardado correctamente.";
  } catch (error) {
    responsibleFormStatus.textContent = "Error de conexion al guardar el responsable.";
  }
});

responsibleCards?.addEventListener("click", async (event) => {
  const editButton = event.target.closest("[data-responsible-edit]");
  if (editButton) {
    editResponsible(Number(editButton.dataset.responsibleEdit));
    return;
  }

  const passwordButton = event.target.closest("[data-responsible-password]");
  if (passwordButton) {
    const id = Number(passwordButton.dataset.responsiblePassword);
    editResponsible(id);
    await changeResponsiblePassword(id);
    return;
  }

  const deleteButton = event.target.closest("[data-responsible-delete]");
  if (!deleteButton) return;
  const id = Number(deleteButton.dataset.responsibleDelete);
  const responsible = responsibles.find((item) => item.id === id);
  if (!await siciConfirm(
    `Se eliminara el usuario ${responsible?.username || ""}. Esta accion no se puede deshacer.`,
    "Eliminar responsable",
    "Eliminar"
  )) return;

  try {
    const response = await fetch(`/responsables/${id}/eliminar/`, {
      method: "POST",
      headers: { "X-CSRFToken": csrfToken() }
    });
    const data = await response.json();
    if (!response.ok) {
      await siciAlert(data.error || "No se pudo eliminar el responsable.", "No se pudo eliminar");
      return;
    }
    responsibles = responsibles.filter((item) => item.id !== id);
    renderResponsibles();
    applyRole();
  } catch (error) {
    await siciAlert("Error de conexion al eliminar el responsable.", "Error de conexion");
  }
});

passwordChangeBtn?.addEventListener("click", async () => {
  if (!responsibleId.value) return;
  await changeResponsiblePassword(responsibleId.value);
});

cancelResponsibleEdit?.addEventListener("click", cancelResponsibleEditing);

function closeImportPreviewDialog() {
  if (importPreviewDialog.open) importPreviewDialog.close();
  pendingImportFile = null;
  excelInput.value = "";
}

function renderImportPreview(data) {
  importPreviewFilename.textContent = data.filename;
  importPreviewTotal.textContent = data.totalCount;
  importPreviewValid.textContent = data.validCount;
  importPreviewRejected.textContent = data.rejectedCount;
  importTypeSummary.innerHTML = data.typeSummary.length
    ? data.typeSummary.map((item) => `
        <span>${escapeHtml(item.type)}: ${item.count}</span>
      `).join("")
    : `<p class="empty-state">No hay equipos validos para cargar.</p>`;
  importErrorSection.classList.toggle("form-collapsed", data.errors.length === 0);
  importErrorList.innerHTML = data.errors.map((item) => `
    <div class="import-error-item">
      <span>Fila ${item.row}</span>
      <div>
        <strong>${escapeHtml(item.serial)}</strong>
        <small>${escapeHtml(item.type)}</small>
      </div>
      <p>${escapeHtml(item.reason)}</p>
    </div>
  `).join("");
  importPreviewStatus.textContent = data.rejectedCount
    ? "Los registros con error no se guardaran. Al confirmar se descargara un Excel para corregirlos."
    : "Todos los registros pasaron las validaciones.";
  confirmImportPreview.disabled = data.validCount === 0;
  confirmImportPreview.textContent = data.validCount
    ? `Cargar ${data.validCount} equipo${data.validCount === 1 ? "" : "s"}`
    : "Sin equipos validos";
  importPreviewDialog.showModal();
}

async function requestImportPreview(file) {
  const scopedLocation = selectedLocation();
  const fixedLocation = scopedLocation ? scopedLocation.name : "ubicaciones del archivo";
  importStatus.textContent = `Analizando ${file.name} para ${fixedLocation}...`;
  const payload = new FormData();
  payload.append("archivo", file);
  payload.append("preview", "true");

  try {
    const response = await fetch("/equipos/importar/", {
      method: "POST",
      headers: { "X-CSRFToken": csrfToken() },
      body: payload
    });
    const data = await response.json();
    if (!response.ok) {
      importStatus.textContent = data.error || "No se pudo analizar el archivo.";
      pendingImportFile = null;
      excelInput.value = "";
      return;
    }
    importStatus.textContent = `${data.validCount} validos y ${data.rejectedCount} con error. Revisa la vista previa.`;
    renderImportPreview(data);
  } catch (error) {
    importStatus.textContent = "Error de conexion al analizar el archivo.";
    pendingImportFile = null;
    excelInput.value = "";
  }
}

async function importPendingFile() {
  if (!pendingImportFile) return;
  const file = pendingImportFile;
  confirmImportPreview.disabled = true;
  cancelImportPreview.disabled = true;
  closeImportPreview.disabled = true;
  importPreviewStatus.textContent = "Guardando equipos validos...";
  const payload = new FormData();
  payload.append("archivo", file);

  try {
    const response = await fetch("/equipos/importar/", {
      method: "POST",
      headers: { "X-CSRFToken": csrfToken() },
      body: payload
    });
    const data = await response.json();
    if (!response.ok) {
      importPreviewStatus.textContent = data.error || "No se pudo importar el archivo.";
      return;
    }
    data.equipment.forEach(rememberPhysicalLocation);
    equipment = [...equipment, ...data.equipment];
    populateInventoryFilterOptions();
    syncLocationEquipmentCounts();
    renderLocations();
    renderInventory();
    if (data.rejectedFile) {
      downloadBase64File(
        data.rejectedFile,
        data.rejectedFilename || "Equipos-rechazados-SICI.xlsx",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      importStatus.textContent =
        `${data.count} equipo${data.count === 1 ? "" : "s"} importado${data.count === 1 ? "" : "s"} y ` +
        `${data.rejectedCount} rechazado${data.rejectedCount === 1 ? "" : "s"}. Se descargo el Excel con las observaciones.`;
    } else {
      importStatus.textContent = `${data.count} equipo${data.count === 1 ? "" : "s"} importado${data.count === 1 ? "" : "s"} correctamente.`;
    }
    closeImportPreviewDialog();
  } catch (error) {
    importStatus.textContent = "Error de conexion al importar el archivo.";
  } finally {
    confirmImportPreview.disabled = false;
    cancelImportPreview.disabled = false;
    closeImportPreview.disabled = false;
  }
}

excelInput.addEventListener("change", async (event) => {
  pendingImportFile = event.target.files[0] || null;
  if (!pendingImportFile) return;
  await requestImportPreview(pendingImportFile);
});

confirmImportPreview?.addEventListener("click", importPendingFile);
cancelImportPreview?.addEventListener("click", closeImportPreviewDialog);
closeImportPreview?.addEventListener("click", closeImportPreviewDialog);
importPreviewDialog?.addEventListener("cancel", (event) => {
  event.preventDefault();
  if (cancelImportPreview.disabled) return;
  closeImportPreviewDialog();
});

roleSelect.addEventListener("input", applyRole);
searchInput.addEventListener("input", renderInventory);

populateLocationControls();
applyTheme(document.documentElement.dataset.theme || "light");
disableBrowserAutocomplete();
populateEquipmentTypes();
populateEquipmentBrands();
configureEquipmentTypeForm();
configureEquipmentBrandForm();
renderEquipmentTypeRequests();
renderEquipmentBrandRequests();
renderLocations();
attachMacFormatter(macEthernetInput);
attachMacFormatter(macWifiInput);
syncAssignmentPersonRequirement();
applyRole();
openEquipmentFromQrParam();
