#!/bin/bash

# 配置内容
BACKUP_DIR="/mnt/data/postgresql/backup" # 备份文件存储路径
DB_USER="lobechat"                    # 数据库用户名
DB_NAME="lobechat"               # 数据库名称 (从环境变量中获取)
DB_HOST="localhost"                   # 数据库主机
DB_PORT=5432                          # 数据库端口
DATE=$(date +"%Y%m%d_%H%M%S")         # 当前时间戳
BACKUP_FILE="$BACKUP_DIR/db_backup_$DATE.sql"  # 备份文件名

# 创建备份文件夹
mkdir -p "$BACKUP_DIR"

# 执行备份命令
docker exec lobe-postgres pg_dump -U $DB_USER -h $DB_HOST -p $DB_PORT $DB_NAME > "$BACKUP_FILE"

# 可选：删除超过一定时间的备份（例如保留 7 天内的备份）
find "$BACKUP_DIR" -type f -mtime +30 -name "*.sql" -exec rm -f {} \;

echo "数据库备份完成: $BACKUP_FILE"
