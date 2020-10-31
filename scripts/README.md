# WoTB Grinder

## Requirements

- Docker
- WoTB Api Application ID

## Configuration

```
cd <root_directory> && vi .env
```

Paste `APPLICATION_ID=<application_id>` in `.env`, replace `<application_id>` with the actual WoTB application ID, and save.

## Build

```
docker-compose build
```

## Start Development Instance

```
docker-compose up
```
