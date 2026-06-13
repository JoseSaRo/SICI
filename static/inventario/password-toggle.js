document.querySelectorAll(".password-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const input = button.closest(".password-field")?.querySelector("input");
    if (!input) return;

    const showPassword = input.type === "password";
    input.type = showPassword ? "text" : "password";
    button.classList.toggle("is-visible", showPassword);
    button.setAttribute("aria-label", showPassword ? "Ocultar contrasena" : "Mostrar contrasena");
    button.setAttribute("title", showPassword ? "Ocultar contrasena" : "Mostrar contrasena");
  });
});
