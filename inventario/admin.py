from django.contrib import admin

from .models import Equipo, EquipoEliminado, MarcaEquipo, Movimiento, RegistroAcceso, ResguardoEquipo, Responsable, SolicitudMarcaEquipo, SolicitudTipoEquipo, TipoEquipo, Ubicacion


@admin.register(Ubicacion)
class UbicacionAdmin(admin.ModelAdmin):
    list_display = ("nombre", "tipo", "responsable_nombre", "responsable_cargo", "activa")
    list_filter = ("tipo", "activa")
    search_fields = ("nombre", "responsable_nombre")


@admin.register(Responsable)
class ResponsableAdmin(admin.ModelAdmin):
    list_display = ("nombre", "usuario", "user", "rol", "ubicacion", "activo")
    list_filter = ("rol", "activo")
    search_fields = ("nombre", "usuario", "user__username")


@admin.register(TipoEquipo)
class TipoEquipoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "activo", "creado")
    list_filter = ("activo",)
    search_fields = ("nombre",)


@admin.register(SolicitudTipoEquipo)
class SolicitudTipoEquipoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "solicitante", "estado", "creado")
    list_filter = ("estado", "creado")
    search_fields = ("nombre", "solicitante__username")


@admin.register(MarcaEquipo)
class MarcaEquipoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "activo", "creado")
    list_filter = ("activo",)
    search_fields = ("nombre",)


@admin.register(SolicitudMarcaEquipo)
class SolicitudMarcaEquipoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "solicitante", "estado", "creado")
    list_filter = ("estado", "creado")
    search_fields = ("nombre", "solicitante__username")


@admin.register(Equipo)
class EquipoAdmin(admin.ModelAdmin):
    list_display = ("tipo_equipo", "marca_equipo", "modelo", "numero_serie", "estado", "ubicacion", "asignado_a", "factura")
    list_filter = ("estado", "tipo_equipo", "marca_equipo", "ubicacion")
    search_fields = ("tipo", "tipo_equipo__nombre", "marca", "marca_equipo__nombre", "modelo", "numero_serie", "asignado_a")


@admin.register(Movimiento)
class MovimientoAdmin(admin.ModelAdmin):
    list_display = ("equipo", "tipo", "estado_equipo", "ubicacion", "realizado_por_nombre", "direccion_ip", "creado")
    list_filter = ("tipo", "estado_equipo", "ubicacion", "creado")
    search_fields = ("equipo__numero_serie", "descripcion", "realizado_por_nombre", "direccion_ip")


@admin.register(RegistroAcceso)
class RegistroAccesoAdmin(admin.ModelAdmin):
    list_display = ("evento", "nombre_usuario", "responsable_nombre", "direccion_ip", "creado")
    list_filter = ("evento", "creado", "responsable_rol")
    search_fields = ("nombre_usuario", "responsable_nombre", "direccion_ip", "direccion_ip_reenviada", "agente_usuario")
    readonly_fields = (
        "evento",
        "usuario",
        "nombre_usuario",
        "responsable_nombre",
        "responsable_rol",
        "direccion_ip",
        "direccion_ip_reenviada",
        "agente_usuario",
        "ruta",
        "clave_sesion",
        "creado",
    )

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(ResguardoEquipo)
class ResguardoEquipoAdmin(admin.ModelAdmin):
    list_display = ("equipo", "asignado_a", "ubicacion_nombre", "activo", "generado_por_nombre", "generado", "reemplazado", "cargado")
    list_filter = ("activo", "ubicacion_nombre", "fecha_asignacion", "generado", "reemplazado", "cargado")
    search_fields = (
        "equipo__numero_serie",
        "asignado_a",
        "generado_por_nombre",
        "reemplazado_por_nombre",
        "cargado_por_nombre",
    )
    readonly_fields = (
        "equipo",
        "asignado_a",
        "ubicacion_nombre",
        "fecha_asignacion",
        "generado_por",
        "generado_por_nombre",
        "generado_desde_ip",
        "generado",
        "activo",
        "reemplazado_por",
        "reemplazado_por_nombre",
        "reemplazado_desde_ip",
        "reemplazado",
        "archivo_firmado",
        "cargado_por",
        "cargado_por_nombre",
        "cargado_desde_ip",
        "cargado",
    )

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(EquipoEliminado)
class EquipoEliminadoAdmin(admin.ModelAdmin):
    list_display = ("numero_serie", "ubicacion_nombre", "estado", "eliminado_por_nombre", "direccion_ip", "eliminado")
    list_filter = ("estado", "ubicacion_nombre", "eliminado")
    search_fields = ("numero_serie", "descripcion_equipo", "eliminado_por_nombre", "snapshot")
    readonly_fields = (
        "numero_serie",
        "descripcion_equipo",
        "eliminado_por_usuario",
        "eliminado_por_responsable",
        "eliminado_por_nombre",
        "eliminado_por_rol",
        "direccion_ip",
        "agente_usuario",
        "ubicacion_nombre",
        "estado",
        "asignado_a",
        "snapshot",
        "eliminado",
    )

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

# Register your models here.
