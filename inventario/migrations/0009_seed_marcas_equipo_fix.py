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
    existentes = {nombre.lower() for nombre in MarcaEquipo.objects.values_list("nombre", flat=True)}
    nuevas = [
        MarcaEquipo(nombre=nombre)
        for nombre in MARCAS_INICIALES
        if nombre.lower() not in existentes
    ]
    MarcaEquipo.objects.bulk_create(nuevas)


class Migration(migrations.Migration):

    dependencies = [
        ("inventario", "0008_seed_marcas_equipo"),
    ]

    operations = [
        migrations.RunPython(cargar_marcas, migrations.RunPython.noop),
    ]
