# Despliegue de SICI en Ubuntu

SICI usa PostgreSQL, Gunicorn y Django. Para la primera prueba local se publica en
`http://IP_DEL_SERVIDOR:8001`, sin modificar la configuracion de SIGEDO.

## 1. Actualizar el repositorio

```bash
cd /var/www/SICI
git pull origin main
```

Si el repositorio base esta en otra ruta, usa esa ruta en todos los comandos y en
el servicio systemd.

## 2. Preparar Python

```bash
sudo apt update
sudo apt install -y python3-venv python3-pip libpq-dev
cd /var/www/SICI
python3 -m venv .venv
./.venv/bin/pip install --upgrade pip
./.venv/bin/pip install -r requirements.txt
```

## 3. Crear PostgreSQL

Entra a PostgreSQL:

```bash
sudo -u postgres psql
```

Ejecuta, cambiando la contrasena:

```sql
CREATE USER sici_admin WITH PASSWORD 'CONTRASENA_SEGURA';
CREATE DATABASE sici_db OWNER sici_admin;
\q
```

## 4. Configurar variables

Obtiene la IP del servidor con:

```bash
hostname -I
```

Crea `/etc/sici.env`:

```bash
sudo nano /etc/sici.env
```

Contenido:

```ini
DJANGO_SECRET_KEY=CLAVE_LARGA_Y_ALEATORIA
DJANGO_DEBUG=false
DJANGO_SECURE_COOKIES=false
ALLOWED_HOSTS=127.0.0.1,localhost,IP_DEL_SERVIDOR,sici.aifamx.com
CSRF_TRUSTED_ORIGINS=http://IP_DEL_SERVIDOR:8001,https://sici.aifamx.com
DB_NAME=sici_db
DB_USER=sici_admin
DB_PASSWORD=CONTRASENA_SEGURA
DB_HOST=localhost
DB_PORT=5432
```

Protege el archivo:

```bash
sudo chmod 600 /etc/sici.env
```

## 5. Preparar Django

```bash
cd /var/www/SICI
set -a
source /etc/sici.env
set +a
./.venv/bin/python manage.py migrate
./.venv/bin/python manage.py collectstatic --noinput
./.venv/bin/python manage.py createsuperuser
./.venv/bin/python manage.py check --deploy
mkdir -p media
```

## 6. Primera prueba por IP

```bash
cd /var/www/SICI
set -a
source /etc/sici.env
set +a
./.venv/bin/gunicorn sici.wsgi:application --bind 0.0.0.0:8001 --workers 3 --timeout 120
```

Si UFW esta activo:

```bash
sudo ufw allow 8001/tcp
```

Abre desde otra computadora:

```text
http://IP_DEL_SERVIDOR:8001
```

## 7. Dejar SICI como servicio

Copia `deploy/sici.service.example` y cambia `CHANGE_ME` por el usuario Linux que
es propietario de `/var/www/SICI`:

```bash
sudo cp deploy/sici.service.example /etc/systemd/system/sici.service
sudo nano /etc/systemd/system/sici.service
sudo systemctl daemon-reload
sudo systemctl enable --now sici
sudo systemctl status sici
```

Logs:

```bash
sudo journalctl -u sici -f
```

## 8. Actualizaciones posteriores

```bash
cd /var/www/SICI
git pull origin main
./.venv/bin/pip install -r requirements.txt
set -a
source /etc/sici.env
set +a
./.venv/bin/python manage.py migrate
./.venv/bin/python manage.py collectstatic --noinput
sudo systemctl restart sici
sudo systemctl status sici
```

## 9. Dominio y HTTPS

Cuando la prueba por IP funcione:

1. Crea el registro DNS `sici.aifamx.com` apuntando a la IP publica del servidor.
2. Copia `deploy/nginx-sici.conf.example` a `/etc/nginx/sites-available/sici`.
3. Habilita el sitio sin modificar el bloque de SIGEDO.
4. Ejecuta Certbot para `sici.aifamx.com`.
5. Cambia `DJANGO_SECURE_COOKIES=true` en `/etc/sici.env`.
6. Cierra el puerto publico 8001 y deja Nginx como unica entrada.

```bash
sudo ln -s /etc/nginx/sites-available/sici /etc/nginx/sites-enabled/sici
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d sici.aifamx.com
sudo ufw delete allow 8001/tcp
sudo systemctl restart sici
```
