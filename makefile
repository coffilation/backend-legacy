.PHONY: docker_dev
docker_dev:
	docker compose up -d

.DEFAULT_GOAL: docker_dev
