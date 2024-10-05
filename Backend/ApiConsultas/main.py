
from flask import Flask, jsonify,request
from collections import OrderedDict
import json
import psycopg2
import io
import os
import json
import csv
from decouple import config


app = Flask(__name__)
app.config['NAME'] = config("DB_NAME")
app.config['USER'] = config("DB_USER")
app.config['PASSWORD'] = config("DB_PASS")
app.config['HOST'] = config("DB_HOST")
app.config['PORT'] = config("PORT")
api_key = config("API_KEY")


def conexion():
     
    conn = psycopg2.connect(
        host=app.config['HOST'],
        database=app.config['NAME'],
        user=app.config['USER'],
        password=app.config['PASSWORD'],
        port=app.config['PORT']
    )

    return conn
@app.route('/',methods=['POST'])

def informe():
    key = request.headers.get('Authorization')
    if key != "Api-Key "+api_key:
        return jsonify({'error': 'No autorizado'}), 401
    data = request.get_json()

    conn=conexion()
    cursor = conn.cursor()
    
    try:
        with open("sql/"+data['nombre']+'.sql', 'r') as file:  #data['nombre']+'.sql', 'r'
                sql_query = file.read()
    except IOError as e:
        return "Error al abrir el archivo",404
    
    sql_query = sql_query.replace('fecha_inicio', data['fecha_inicio'])
    sql_query = sql_query.replace('fecha_fin', data['fecha_fin'])
    sql_query = sql_query.replace('cliente', data['tenant'])
    cursor.execute(sql_query)
    # Obtener los resultados como una lista de diccionarios
    column_names = [desc[0] for desc in cursor.description]
    results = []
    for row in cursor.fetchall():
        results.append(dict(zip(column_names, row)))

    # Cerrar el cursor y la conexión a la base de datos
    cursor.close()
    conn.close()
    return  json.dumps(results).encode('utf8'), 200, {'Content-Type': 'application/json'}

if __name__ == '__main__':
    app.run(debug=True, port=5000)