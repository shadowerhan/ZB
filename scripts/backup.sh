#!/bin/sh
set -eu
mkdir -p "${BACKUP_DIR:-./backups}"
stamp=$(date -u +%Y%m%dT%H%M%SZ)
pg_dump --format=custom --no-owner "$DATABASE_URL" > "${BACKUP_DIR:-./backups}/novex-$stamp.dump"
find "${BACKUP_DIR:-./backups}" -type f -name 'novex-*.dump' -mtime +"${RETENTION_DAYS:-7}" -delete
