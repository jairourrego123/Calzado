python manage.py makemigrations --noinput
python manage.py migrate --noinput
python manage.py collectstatic --noinput # extrae los Static

gunicorn  ApiBackend.wsgi:application --env \
    DJANGO_SETTINGS_MODULE=ApiBackend.settings_production\
    --bind 0.0.0.0:8000 \
    --workers 4 \
    --log-level=info --timeout 300 --access-logfile - &
sleep 5s # Espera 5s para arrancar el servicio de nginx
service nginx start
