from django.contrib.auth.signals import user_logged_in, user_logged_out, user_login_failed
from django.dispatch import receiver

from .models import RegistroAcceso, Responsable


def access_request_data(request):
    if not request:
        return {
            "direccion_ip": None,
            "direccion_ip_reenviada": "",
            "agente_usuario": "",
            "ruta": "",
            "clave_sesion": "",
        }

    return {
        "direccion_ip": request.META.get("REMOTE_ADDR") or None,
        "direccion_ip_reenviada": request.META.get("HTTP_X_FORWARDED_FOR", ""),
        "agente_usuario": request.META.get("HTTP_USER_AGENT", ""),
        "ruta": request.path[:255],
        "clave_sesion": request.session.session_key or "",
    }


def responsible_data(user):
    if not user or not getattr(user, "is_authenticated", False):
        return "", ""

    responsable = Responsable.objects.filter(user=user).first()
    if not responsable:
        return "", "Administrador" if user.is_staff else "Usuario"

    return responsable.nombre, responsable.get_rol_display()


@receiver(user_logged_in)
def log_user_login(sender, request, user, **kwargs):
    responsable_nombre, responsable_rol = responsible_data(user)
    RegistroAcceso.objects.create(
        evento=RegistroAcceso.Evento.LOGIN,
        usuario=user,
        nombre_usuario=user.get_username(),
        responsable_nombre=responsable_nombre,
        responsable_rol=responsable_rol,
        **access_request_data(request),
    )


@receiver(user_logged_out)
def log_user_logout(sender, request, user, **kwargs):
    responsable_nombre, responsable_rol = responsible_data(user)
    RegistroAcceso.objects.create(
        evento=RegistroAcceso.Evento.LOGOUT,
        usuario=user if getattr(user, "is_authenticated", False) else None,
        nombre_usuario=user.get_username() if getattr(user, "is_authenticated", False) else "",
        responsable_nombre=responsable_nombre,
        responsable_rol=responsable_rol,
        **access_request_data(request),
    )


@receiver(user_login_failed)
def log_failed_login(sender, credentials, request, **kwargs):
    RegistroAcceso.objects.create(
        evento=RegistroAcceso.Evento.LOGIN_FALLIDO,
        nombre_usuario=str(credentials.get("username", ""))[:150],
        **access_request_data(request),
    )
