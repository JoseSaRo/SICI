from django.db import migrations


EQUIPMENT_TYPES = [
    "Access Point",
    "Bocinas",
    "Camara web",
    "Computadora de escritorio",
    "Disco duro externo",
    "Escaner",
    "Impresora",
    "Impresora multifuncional",
    "Monitor",
    "No Break",
    "Proyector",
    "Router",
    "Servidor",
    "Switch",
    "Tablet",
    "Telefono IP",
]


def seed_equipment_types(apps, schema_editor):
    TipoEquipo = apps.get_model("inventario", "TipoEquipo")

    for name in EQUIPMENT_TYPES:
        if not TipoEquipo.objects.filter(nombre__iexact=name).exists():
            TipoEquipo.objects.create(nombre=name, activo=True)


class Migration(migrations.Migration):

    dependencies = [
        ("inventario", "0016_resguardoequipo_ubicacion_fisica_nombre"),
    ]

    operations = [
        migrations.RunPython(seed_equipment_types, migrations.RunPython.noop),
    ]
