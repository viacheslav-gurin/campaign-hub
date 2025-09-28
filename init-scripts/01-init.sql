-- Создание базы данных и пользователя для разработки
-- Этот скрипт выполнится автоматически при первом запуске контейнера

-- Создаем дополнительную базу для тестов
CREATE DATABASE marketing_hub_test;

-- Предоставляем права пользователю dev_user на все базы
GRANT ALL PRIVILEGES ON DATABASE marketing_hub_dev TO dev_user;
GRANT ALL PRIVILEGES ON DATABASE marketing_hub_test TO dev_user;

-- Убеждаемся, что пользователь может создавать схемы
ALTER USER dev_user CREATEDB;

\echo 'Database setup completed successfully!'