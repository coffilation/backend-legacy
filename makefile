.PHONY: docker_dev
docker_dev:
	docker compose up

.DEFAULT_GOAL: docker_dev
