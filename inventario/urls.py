from django.urls import path

from . import views

app_name = "inventario"

urlpatterns = [
    path("", views.home, name="home"),
    path("ubicaciones/crear/", views.crear_ubicacion, name="crear_ubicacion"),
    path("ubicaciones/<int:ubicacion_id>/editar/", views.editar_ubicacion, name="editar_ubicacion"),
    path("ubicaciones/<int:ubicacion_id>/eliminar/", views.eliminar_ubicacion, name="eliminar_ubicacion"),
    path("responsables/crear/", views.crear_responsable, name="crear_responsable"),
    path("responsables/<int:responsable_id>/editar/", views.editar_responsable, name="editar_responsable"),
    path("responsables/<int:responsable_id>/password/", views.cambiar_password_responsable, name="cambiar_password_responsable"),
    path("responsables/<int:responsable_id>/eliminar/", views.eliminar_responsable, name="eliminar_responsable"),
    path("equipos/crear/", views.crear_equipo, name="crear_equipo"),
    path("tipos-equipo/crear/", views.crear_tipo_equipo, name="crear_tipo_equipo"),
    path("tipos-equipo/solicitar/", views.solicitar_tipo_equipo, name="solicitar_tipo_equipo"),
    path("solicitudes-tipo-equipo/<int:solicitud_id>/aprobar/", views.aprobar_solicitud_tipo_equipo, name="aprobar_solicitud_tipo_equipo"),
    path("solicitudes-tipo-equipo/<int:solicitud_id>/rechazar/", views.rechazar_solicitud_tipo_equipo, name="rechazar_solicitud_tipo_equipo"),
    path("marcas-equipo/crear/", views.crear_marca_equipo, name="crear_marca_equipo"),
    path("marcas-equipo/solicitar/", views.solicitar_marca_equipo, name="solicitar_marca_equipo"),
    path("solicitudes-marca-equipo/<int:solicitud_id>/aprobar/", views.aprobar_solicitud_marca_equipo, name="aprobar_solicitud_marca_equipo"),
    path("solicitudes-marca-equipo/<int:solicitud_id>/rechazar/", views.rechazar_solicitud_marca_equipo, name="rechazar_solicitud_marca_equipo"),
    path("q/<str:numero_serie>/", views.equipo_qr_link, name="equipo_qr_link"),
    path("equipos/<str:numero_serie>/estado/", views.cambiar_estado_equipo, name="cambiar_estado_equipo"),
    path("equipos/<str:numero_serie>/eliminar/", views.eliminar_equipo, name="eliminar_equipo"),
    path("equipos/<str:numero_serie>/resguardo/", views.generar_resguardo_equipo, name="generar_resguardo_equipo"),
    path("equipos/<str:numero_serie>/resguardo/firmado/", views.cargar_resguardo_firmado, name="cargar_resguardo_firmado"),
    path("equipos/<str:numero_serie>/qr/", views.equipo_qr, name="equipo_qr"),
    path("resguardos/<int:resguardo_id>/firmado/", views.descargar_resguardo_firmado, name="descargar_resguardo_firmado"),
]
