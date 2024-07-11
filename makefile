SERVICE = $(filter-out $@,$(MAKECMDGOALS))
CONTAINER = m1pex-$(SERVICE)

CONTAINER_NAME=my_container
LOCAL_ENV_FILE=.env
TARGET_DIR_ROOT=/app/
TARGET_DIR_SERVICE=/app/apps/${SERVICE}

.PHONY: copy-env-root copy-env-service

build-plain:
	docker compose build --no-cache --progress plain

build:
	docker compose build

up:
	docker compose up --build

up-d:
	docker compose up --build -d

stop:
	docker compose stop

down:
	docker compose down

#custom commands
migrate:
	docker compose run --rm $(CONTAINER) sh -c 'cd /app/apps/$(SERVICE) && turbo migrate --filter $(SERVICE)'

env-init:
	cp .env.example .env && cp .env.example ./apps/$(SERVICE)/.env

%:
	@: