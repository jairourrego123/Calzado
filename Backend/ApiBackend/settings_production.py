from .settings import *
import os
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'your_django_secret_key')
# Desactivar el modo de depuración
DEBUG = False
# Configurar el nombre de host permitido
ALLOWED_HOSTS = [
"ApiBackend",
"127.0.0.1",
"localhost",
"unidaddesarrollo.ugc.edu.co"

]

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": os.getenv("DB_NAME", "db_stock_genius"),
        "USER": os.getenv("DB_USER", "jairo"),
        "PASSWORD": os.getenv("DB_PASS", "jairo"),
        "HOST": os.getenv("DB_HOST", "localhost"),
        "PORT": os.getenv("PORT", "5432"),
    }
}

CSRF_COOKIE_SECURE = True  # Asegurar la cookie CSRF
SESSION_COOKIE_SECURE = True  # Asegurar la cookie de sesión
X_FRAME_OPTIONS = "DENY"  # Denegar el acceso a otros dominios
# evitar ataques de falsificación de solicitudes entre sitios (CSRF),
# permite que Django confíe en los encabezados de solicitud enviados por los orígenes confiables
CSRF_TRUSTED_ORIGINS = [
"http://localhost:8000",
"http://127.0.0.1",
"http://ApiBackend",
"https://unidaddesarrollo.ugc.edu.co",

]
# controla qué orígenes tienen acceso a los recursos de la aplicación
CORS_ALLOW_ALL_ORIGINS = [
"http://localhost:8001",
"http://127.0.0.1",
"http://ApiBackend",
"https://unidaddesarrollo.ugc.edu.co",
]
STATIC_URL = "/stock-genius/static/" # ruta para los static que pide el navegador
STATIC_ROOT = os.path.join(BASE_DIR, "static")  # soluciona la ruta de la url aquí 
# Configurar el almacenamiento de archivos de medios
MEDIA_URL = "/stock-genius/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")
