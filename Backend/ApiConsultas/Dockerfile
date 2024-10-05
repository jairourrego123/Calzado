FROM python:3.9-slim-bullseye

WORKDIR /ApiConsulta
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN pip install gunicorn

COPY . .

# COPY ./entrypoint.sh /
# ENTRYPOINT [ "sh", "/entrypoint.sh" ]
CMD [ "gunicorn", "--bind", "0.0.0.0:5000", "main:app" ] 