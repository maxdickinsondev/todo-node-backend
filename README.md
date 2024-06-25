# A simple CRUD Node.js dockerized application.

# Instalation

```
git clone https://github.com/maxdickinsondev/todo-node-backend.git
cd todo-node-backend
```

# Configuration

Create a `.env` in the source project like this.

```
# DATABASE

MYSQL_DB_HOST=db # Name of database service on the compose.yml
MYSQL_DB_USER=root
MYSQL_DB_PASS=root
MYSQL_DB_NAME=my_db
MYSQL_DB_LOCAL_PORT=3307
MYSQL_DB_DOCKER_PORT=3306

# APP

NODE_LOCAL_PORT=3333
NODE_DOCKER_PORT=3333
```

# Start application

`docker compose up -d`

# Run migrations

`docker compose exec app npm run migrate`

# Routes

```
GET /tasks
POST /tasks
PUT /tasks/1
DELETE /tasks/1
```
