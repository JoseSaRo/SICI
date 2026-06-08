from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from .models import Equipo, Movimiento, RegistroAcceso, Ubicacion


User = get_user_model()


class AuditTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="auditor", password="test-password", is_staff=True)
        self.ubicacion = Ubicacion.objects.create(
            nombre="Mesa de prueba",
            tipo=Ubicacion.Tipo.MESA,
            responsable_nombre="Responsable",
            responsable_cargo="Jefe de Mesa",
        )
        self.equipo = Equipo.objects.create(
            tipo="Laptop",
            numero_serie="TEST-001",
            estado=Equipo.Estado.DISPONIBLE,
            ubicacion=self.ubicacion,
        )

    def test_login_logout_are_audited(self):
        self.assertTrue(self.client.login(username="auditor", password="test-password"))
        self.client.logout()

        events = list(RegistroAcceso.objects.values_list("evento", flat=True))
        self.assertIn(RegistroAcceso.Evento.LOGIN, events)
        self.assertIn(RegistroAcceso.Evento.LOGOUT, events)

    def test_maintenance_requires_reason_and_records_actor(self):
        self.client.force_login(self.user)
        url = reverse("inventario:cambiar_estado_equipo", args=[self.equipo.numero_serie])

        response = self.client.post(url, {"estado": "Mantenimiento", "ubicacion": self.ubicacion.id})
        self.assertEqual(response.status_code, 400)

        response = self.client.post(
            url,
            {
                "estado": "Mantenimiento",
                "ubicacion": self.ubicacion.id,
                "motivo": "El ventilador produce ruido.",
            },
            REMOTE_ADDR="192.0.2.10",
        )
        self.assertEqual(response.status_code, 200)

        movimiento = Movimiento.objects.get(equipo=self.equipo, tipo=Movimiento.Tipo.MANTENIMIENTO)
        self.assertEqual(movimiento.realizado_por_usuario, self.user)
        self.assertEqual(movimiento.direccion_ip, "192.0.2.10")
        self.assertIn("El ventilador produce ruido.", movimiento.descripcion)
