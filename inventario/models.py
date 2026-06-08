from django.conf import settings
from django.db import models


class Ubicacion(models.Model):
    class Tipo(models.TextChoices):
        FRENTE = "frente", "Frente de obra"
        MESA = "mesa", "Mesa de trabajo"

    nombre = models.CharField(max_length=120, unique=True)
    tipo = models.CharField(max_length=20, choices=Tipo.choices)
    responsable_nombre = models.CharField(max_length=120)
    responsable_cargo = models.CharField(max_length=40)
    activa = models.BooleanField(default=True)

    class Meta:
        verbose_name = "ubicacion"
        verbose_name_plural = "ubicaciones"

    def __str__(self):
        return self.nombre


class Responsable(models.Model):
    class Rol(models.TextChoices):
        ADMIN = "admin", "Administrador"
        MESA_TIC = "mesa_tic", "Mesa TIC"
        FRENTE = "frente", "Responsable de frente"
        MESA = "mesa", "Responsable de mesa"

    nombre = models.CharField(max_length=120)
    usuario = models.CharField(max_length=80, unique=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    rol = models.CharField(max_length=20, choices=Rol.choices)
    ubicacion = models.ForeignKey(Ubicacion, on_delete=models.PROTECT, null=True, blank=True)
    activo = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.nombre} ({self.get_rol_display()})"


class TipoEquipo(models.Model):
    nombre = models.CharField(max_length=80, unique=True)
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["nombre"]
        verbose_name = "tipo de equipo"
        verbose_name_plural = "tipos de equipo"

    def save(self, *args, **kwargs):
        self.nombre = self.nombre.strip()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.nombre


class SolicitudTipoEquipo(models.Model):
    class Estado(models.TextChoices):
        PENDIENTE = "pendiente", "Pendiente"
        APROBADA = "aprobada", "Aprobada"
        RECHAZADA = "rechazada", "Rechazada"

    nombre = models.CharField(max_length=80)
    solicitante = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    estado = models.CharField(max_length=20, choices=Estado.choices, default=Estado.PENDIENTE)
    comentario_admin = models.TextField(blank=True)
    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-creado"]
        verbose_name = "solicitud de tipo de equipo"
        verbose_name_plural = "solicitudes de tipos de equipo"

    def save(self, *args, **kwargs):
        self.nombre = self.nombre.strip()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.nombre} ({self.get_estado_display()})"


class MarcaEquipo(models.Model):
    nombre = models.CharField(max_length=80, unique=True)
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["nombre"]
        verbose_name = "marca de equipo"
        verbose_name_plural = "marcas de equipo"

    def save(self, *args, **kwargs):
        self.nombre = self.nombre.strip()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.nombre


class SolicitudMarcaEquipo(models.Model):
    class Estado(models.TextChoices):
        PENDIENTE = "pendiente", "Pendiente"
        APROBADA = "aprobada", "Aprobada"
        RECHAZADA = "rechazada", "Rechazada"

    nombre = models.CharField(max_length=80)
    solicitante = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    estado = models.CharField(max_length=20, choices=Estado.choices, default=Estado.PENDIENTE)
    comentario_admin = models.TextField(blank=True)
    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-creado"]
        verbose_name = "solicitud de marca de equipo"
        verbose_name_plural = "solicitudes de marcas de equipo"

    def save(self, *args, **kwargs):
        self.nombre = self.nombre.strip()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.nombre} ({self.get_estado_display()})"


class Equipo(models.Model):
    class Estado(models.TextChoices):
        ASIGNADO = "asignado", "Asignado"
        DISPONIBLE = "disponible", "Disponible"
        MANTENIMIENTO = "mantenimiento", "Mantenimiento"
        BAJA = "baja", "Dado de baja"

    tipo = models.CharField(max_length=80)
    tipo_equipo = models.ForeignKey(TipoEquipo, on_delete=models.PROTECT, null=True, blank=True)
    marca_equipo = models.ForeignKey(MarcaEquipo, on_delete=models.PROTECT, null=True, blank=True)
    marca = models.CharField(max_length=80, blank=True)
    modelo = models.CharField(max_length=100, blank=True)
    numero_serie = models.CharField(max_length=120, unique=True)
    procesador = models.CharField(max_length=120, blank=True)
    memoria_ram = models.CharField(max_length=60, blank=True)
    almacenamiento = models.CharField(max_length=80, blank=True)
    sistema_operativo = models.CharField(max_length=100, blank=True)
    mac_ethernet = models.CharField(max_length=17, blank=True)
    mac_wifi = models.CharField(max_length=17, blank=True)
    fecha_compra = models.DateField(null=True, blank=True)
    garantia_hasta = models.DateField(null=True, blank=True)
    factura = models.FileField(upload_to="facturas/", blank=True)
    estado = models.CharField(max_length=20, choices=Estado.choices, default=Estado.DISPONIBLE)
    ubicacion = models.ForeignKey(Ubicacion, on_delete=models.PROTECT)
    asignado_a = models.CharField(max_length=120, blank=True)
    observaciones = models.TextField(blank=True)
    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["tipo", "marca", "modelo"]

    @property
    def qr_payload(self):
        return f"SICI|{self.numero_serie}"

    def __str__(self):
        return f"{self.tipo} {self.marca} {self.modelo} - {self.numero_serie}"


class Movimiento(models.Model):
    class Tipo(models.TextChoices):
        ALTA = "alta", "Alta"
        ASIGNACION = "asignacion", "Asignacion"
        CAMBIO_ESTADO = "cambio_estado", "Cambio de estado"
        MANTENIMIENTO = "mantenimiento", "Mantenimiento"
        BAJA = "baja", "Baja"

    equipo = models.ForeignKey(Equipo, on_delete=models.CASCADE, related_name="movimientos")
    tipo = models.CharField(max_length=30, choices=Tipo.choices)
    descripcion = models.TextField()
    realizado_por = models.ForeignKey(Responsable, on_delete=models.SET_NULL, null=True, blank=True)
    realizado_por_usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    realizado_por_nombre = models.CharField(max_length=120, blank=True)
    realizado_por_rol = models.CharField(max_length=80, blank=True)
    direccion_ip = models.GenericIPAddressField(null=True, blank=True)
    agente_usuario = models.TextField(blank=True)
    ubicacion = models.ForeignKey(Ubicacion, on_delete=models.SET_NULL, null=True, blank=True)
    estado_equipo = models.CharField(max_length=20, choices=Equipo.Estado.choices, blank=True)
    asignado_a = models.CharField(max_length=120, blank=True)
    creado = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-creado"]

    def __str__(self):
        return f"{self.get_tipo_display()} - {self.equipo.numero_serie}"


class RegistroAcceso(models.Model):
    class Evento(models.TextChoices):
        LOGIN = "login", "Inicio de sesion"
        LOGOUT = "logout", "Cierre de sesion"
        LOGIN_FALLIDO = "login_fallido", "Inicio de sesion fallido"

    evento = models.CharField(max_length=20, choices=Evento.choices)
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    nombre_usuario = models.CharField(max_length=150, blank=True)
    responsable_nombre = models.CharField(max_length=120, blank=True)
    responsable_rol = models.CharField(max_length=80, blank=True)
    direccion_ip = models.GenericIPAddressField(null=True, blank=True)
    direccion_ip_reenviada = models.CharField(max_length=255, blank=True)
    agente_usuario = models.TextField(blank=True)
    ruta = models.CharField(max_length=255, blank=True)
    clave_sesion = models.CharField(max_length=40, blank=True)
    creado = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-creado"]
        verbose_name = "registro de acceso"
        verbose_name_plural = "registros de acceso"

    def __str__(self):
        return f"{self.get_evento_display()} - {self.nombre_usuario or 'desconocido'}"


class ResguardoEquipo(models.Model):
    equipo = models.ForeignKey(Equipo, on_delete=models.CASCADE, related_name="resguardos")
    asignado_a = models.CharField(max_length=120)
    ubicacion_nombre = models.CharField(max_length=120)
    fecha_asignacion = models.DateField()
    generado_por = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="resguardos_generados",
    )
    generado_por_nombre = models.CharField(max_length=120, blank=True)
    generado_desde_ip = models.GenericIPAddressField(null=True, blank=True)
    generado = models.DateTimeField(auto_now_add=True)
    activo = models.BooleanField(default=True)
    reemplazado_por = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="resguardos_reemplazados",
    )
    reemplazado_por_nombre = models.CharField(max_length=120, blank=True)
    reemplazado_desde_ip = models.GenericIPAddressField(null=True, blank=True)
    reemplazado = models.DateTimeField(null=True, blank=True)
    archivo_firmado = models.FileField(upload_to="resguardos_firmados/%Y/%m/", blank=True)
    cargado_por = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="resguardos_cargados",
    )
    cargado_por_nombre = models.CharField(max_length=120, blank=True)
    cargado_desde_ip = models.GenericIPAddressField(null=True, blank=True)
    cargado = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-generado"]
        verbose_name = "resguardo de equipo"
        verbose_name_plural = "resguardos de equipos"

    def __str__(self):
        return f"Resguardo {self.equipo.numero_serie} - {self.asignado_a}"


class EquipoEliminado(models.Model):
    numero_serie = models.CharField(max_length=120, db_index=True)
    descripcion_equipo = models.CharField(max_length=260)
    eliminado_por_usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    eliminado_por_responsable = models.ForeignKey(Responsable, on_delete=models.SET_NULL, null=True, blank=True)
    eliminado_por_nombre = models.CharField(max_length=120, blank=True)
    eliminado_por_rol = models.CharField(max_length=80, blank=True)
    direccion_ip = models.GenericIPAddressField(null=True, blank=True)
    agente_usuario = models.TextField(blank=True)
    ubicacion_nombre = models.CharField(max_length=120, blank=True)
    estado = models.CharField(max_length=20, choices=Equipo.Estado.choices, blank=True)
    asignado_a = models.CharField(max_length=120, blank=True)
    snapshot = models.JSONField()
    eliminado = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-eliminado"]
        verbose_name = "equipo eliminado"
        verbose_name_plural = "equipos eliminados"

    def __str__(self):
        return f"{self.numero_serie} eliminado el {self.eliminado:%d/%m/%Y %H:%M}"

# Create your models here.
