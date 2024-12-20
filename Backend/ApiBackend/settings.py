"""
Django settings for ApiBackend project.

Generated by 'django-admin startproject' using Django 5.0.6.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

from pathlib import Path
from datetime import timedelta
import os
from decouple import config
import dj_database_url
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# SECRET_KEY = 'django-insecure-2&dm7imdm#%=_o8uh@h79g%_m7q-y8kdy6b+$**)g^w9ub^&0_'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# ALLOWED_HOSTS = ['*']

ALLOWED_HOSTS = ['127.0.0.1', 'localhost','unidaddesarrollo.ugc.edu.co']

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'your_django_secret_key')
# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'ApiBackendApp',
    'DevolucionesApp',
    'EntradasApp',
    'FinanzasApp',
    'GastosApp',
    'GestionDeUsuariosApp',
    'InventarioApp',
    'VentasApp',
    'AuthenticationApp',
    'rest_framework',
    'django_filters',
    'rest_framework_simplejwt',
    'corsheaders',
    
    
]

REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
    'DATE_FORMAT': '%d/%m/%Y',
}
    

MIDDLEWARE = [
     'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


# Autenticacion
AUTHENTICATION_BACKENDS = [
    # 'GestionDeUsuariosApp.CustomBackend.CustomBackend',
    'django.contrib.auth.backends.ModelBackend',
]

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=720),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    'USER_ID_FIELD': 'id',
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
}

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = [
    'authorization',
    'content-type',
    'x-csrftoken',
    'x-requested-with',
    'accept',
    'origin',
    'user-agent',
    'referer',
    'accept-encoding',
    'accept-language',
    'host',
    'connection',
]
CORS_ALLOW_CREDENTIALS = True

CSRF_TRUSTED_ORIGINS = ['http://localhost:3000']  # Asegúrate de agregar tu frontend aquí
# CORS_ORIGIN_WHITELIST = [
#     'http://localhost:3001',  # Reemplaza con la URL de tu frontend
#     'http://localhost:300',  # Reemplaza con la URL de tu frontend
# ]
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),

}

ROOT_URLCONF = 'ApiBackend.urls'
AUTH_USER_MODEL = 'GestionDeUsuariosApp.Usuarios'
AUTH_GROUP_MODEL = 'GestionDeUsuariosApp.Grupos'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'ApiBackend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': dj_database_url.parse(config('DATABASE_URL'), conn_max_age=600)
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'America/Bogota'

USE_I18N = False

USE_TZ = True



# Configuración de Django Rest Framework


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')


# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
