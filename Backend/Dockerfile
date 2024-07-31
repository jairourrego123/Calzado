FROM universidadlagrancolombia/python-nginx:v1

RUN mkdir /stock-genius

WORKDIR /stock-genius

COPY requirements.txt requirements.txt
RUN python -m pip install --no-cache-dir -r requirements.txt
RUN python -m pip install gunicorn

COPY . .

RUN rm /etc/nginx/sites-enabled/default
COPY nginx/nginx.conf /etc/nginx/sites-enabled/
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

COPY ./entrypoint.sh /
ENTRYPOINT [ "sh", "/entrypoint.sh" ]
