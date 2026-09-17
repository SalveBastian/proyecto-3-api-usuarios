ñ# Proyecto 3 - API de usuarios, PostgreSQL y pgAdmin

API REST con CRUD completo, validacion, PostgreSQL inicializado por script SQL y administracion mediante pgAdmin.

## Arranque


La API queda en `http://localhost:3004`; pgAdmin en `http://localhost:5050`. En pgAdmin cree un servidor con host `db`, puerto `5432` y las credenciales de `.env`.

## Pruebas

```sh
curl http://localhost:3004/health
curl http://localhost:3004/users
curl http://localhost:3004/users/1
curl -X POST http://localhost:3004/users -H "Content-Type: application/json" -d '{"name":"Marta Diaz","email":"marta@example.com"}'
curl -X PUT http://localhost:3004/users/1 -H "Content-Type: application/json" -d '{"name":"Ana Torres","email":"ana.torres@example.com"}'
curl -X DELETE http://localhost:3004/users/2
curl -i -X POST http://localhost:3004/users -H "Content-Type: application/json" -d '{"name":"","email":"invalido"}'
```

Use `make up`, `make down`, `make logs`, `make ps` y `make test` como ayuda operativa.

## Reflexion

PostgreSQL ejecuta los archivos de inicializacion solo cuando crea un directorio de datos vacio. Para repetirlos durante desarrollo, elimine explicitamente el volumen con `docker compose down -v` (esto borra los datos) y levante de nuevo, o aplique una migracion nueva. Dentro de la red de Compose, pgAdmin usa `db`, no `localhost`, porque `db` es el nombre DNS del servicio. El healthcheck evita que la API intente conectarse antes de que PostgreSQL acepte conexiones.

## Evidencias pendientes de capturar

Guarde en `evidencias/` capturas de `docker compose ps`, CRUD con curl, respuesta 400 y la tabla `users` en pgAdmin.

GET: /health:
(img/img1.png)

GET: /users:
(img/img2.png)

GET: /users/1:
(img/img4.png)

POST: /users:
(img/img5.png)

(img/img8.png)

PUT: /users