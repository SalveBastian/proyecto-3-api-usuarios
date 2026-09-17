.PHONY: up down logs ps test
up:
	docker compose up -d --build
down:
	docker compose down
logs:
	docker compose logs -f
ps:
	docker compose ps
test:
	curl http://localhost:3000/health
	curl http://localhost:3000/users
	curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name":"Marta Diaz","email":"marta@example.com"}'
	curl -X PUT http://localhost:3000/users/1 -H "Content-Type: application/json" -d '{"name":"Ana Actualizada","email":"ana.actualizada@example.com"}'
	curl -X DELETE http://localhost:3000/users/2
