#!/bin/bash

UID = $(shell id -u)
DOCKER_FE=tfg_frontend
DOCKER_BE=tfg_backend

help: ## Mostrar este mensaje de ayuda
	@echo 'usage: make [target]'
	@echo
	@echo 'targets:'
	@egrep '^(.+)\:\ ##\ (.+)' ${MAKEFILE_LIST} | column -t -c 2 -s ':#'

start:
	docker compose up -d
	@docker exec ${DOCKER_FE} yarn dev --host &

down:
	@docker compose down

init: ## Iniciar contenedores y sus servicios
	@docker compose up -d
	@docker exec -it ${DOCKER_BE} python manage.py makemigrations
	@docker exec -it ${DOCKER_BE} python manage.py migrate
	@docker exec -it ${DOCKER_FE} yarn install
	@docker exec ${DOCKER_FE} yarn dev --host &
