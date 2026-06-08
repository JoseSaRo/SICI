from django.db import migrations


MARCAS_INICIALES = [
    "Acer",
    "Apple",
    "ASUS",
    "Brother",
    "Canon",
    "Cisco",
    "Dahua",
    "Dell",
    "Epson",
    "Hikvision",
    "Honeywell",
    "HP",
    "Kingston",
    "Lenovo",
    "Lexmark",
    "Logitech",
    "Microsoft",
    "Ricoh",
    "Samsung",
    "SanDisk",
    "Seagate",
    "TP-Link",
    "Toshiba",
    "Ubiquiti",
    "Western Digital",
    "Xerox",
    "Zebra",
]


def cargar_marcas(apps, schema_editor):
    MarcaEquipo = apps.get_model("inventario", "MarcaEquipo")
    for nombre in MARCAS_INICIALES:
        MarcaEquipo.objects.get_or_create(nombre__iexact=nombre, defaults={"nombre": nombre})


def eliminar_marcas_sin_uso(apps, schema_editor):
    MarcaEquipo = apps.get_model("inventario", "MarcaEquipo")
    for nombre in MARCAS_INICIALES:
        marca = MarcaEquipo.objects.filter(nombre__iexact=nombre).first()
        if marca and not marca.equipo_set.exists():
            marca.delete()


class Migration(migrations.Migration):

    dependencies = [
        ("inventario", "0007_marcaequipo_equipo_marca_equipo_solicitudmarcaequipo"),
    ]

    operations = [
        migrations.RunPython(cargar_marcas, eliminar_marcas_sin_uso),
    ]
