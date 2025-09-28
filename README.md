# Marketing Campaign Hub

Маркетинговая платформа для управления рекламными кампаниями.

## Быстрый старт

### Предварительные требования

- Node.js 18+ 
- Docker и Docker Compose
- Git

### 1. Клонирование и установка

```bash
# Клонируйте репозиторий
git clone <your-repo-url>
cd marketing-app

# Скопируйте переменные окружения
cp .env.example .env

# Отредактируйте .env файл если необходимо
```

### 2. Запуск базы данных

```bash
# Запуск PostgreSQL в Docker
docker-compose up -d postgres

# Проверка что контейнер запустился
docker-compose ps

# Просмотр логов (опционально)
docker-compose logs postgres
```

### 3. Настройка Backend

```bash
cd backend

# Установка зависимостей
npm install

# Генерация Prisma клиента
npm run db:generate

# Применение миграций
npm run db:migrate

# Заполнение тестовыми данными (опционально)
npm run db:seed

# Запуск в режиме разработки
npm run start:dev
```

Backend будет доступен по адресу: http://localhost:3001

### 4. Доступ к базе данных

#### Через pgAdmin (веб-интерфейс)
- URL: http://localhost:8080
- Email: admin@marketing-hub.local  
- Password: admin123

#### Через Prisma Studio
```bash
cd backend
npm run db:studio
```
Prisma Studio будет доступен по адресу: http://localhost:5555

#### Прямое подключение
- Host: localhost
- Port: 5432
- Database: marketing_hub_dev
- Username: dev_user
- Password: dev_password

## Полезные команды

### Docker
```bash
# Запуск всех сервисов
docker-compose up -d

# Остановка всех сервисов
docker-compose down

# Перестроить и запустить
docker-compose up -d --build

# Просмотр логов
docker-compose logs -f postgres
```

### База данных
```bash
cd backend

# Создание новой миграции
npm run db:migrate

# Сброс базы и применение всех миграций
npm run db:reset

# Генерация Prisma клиента после изменения schema.prisma
npm run db:generate

# Заполнение тестовыми данными
npm run db:seed
```

### Backend
```bash
cd backend

# Разработка
npm run start:dev

# Продакшн сборка
npm run build
npm run start:prod

# Тесты
npm run test
npm run test:watch
npm run test:cov
```

## Структура проекта

```
marketing-app/
├── docker-compose.yml          # Docker конфигурация
├── .env                        # Переменные окружения
├── init-scripts/               # SQL скрипты инициализации
│   └── 01-init.sql
├── backend/                    # NestJS API
│   ├── prisma/
│   │   ├── schema.prisma      # Схема базы данных
│   │   └── seed.ts            # Тестовые данные
│   ├── src/                   # Исходный код
│   └── package.json
└── frontend/                   # Next.js приложение (будет создан позже)
```

## API Эндпоинты

После запуска backend'а документация API будет доступна по адресу: http://localhost:3001/api

### Аутентификация
- `POST /auth/register` - Регистрация пользователя
- `POST /auth/login` - Вход в систему

### Кампании  
- `GET /campaigns` - Список кампаний пользователя
- `POST /campaigns` - Создание кампании
- `PUT /campaigns/:id` - Обновление кампании
- `DELETE /campaigns/:id` - Удаление кампании

## Решение проблем

### База данных не подключается
```bash
# Проверить статус контейнера
docker-compose ps

# Перезапустить PostgreSQL
docker-compose restart postgres

# Проверить логи
docker-compose logs postgres
```

### Ошибки миграций
```bash
cd backend

# Сбросить состояние миграций
npm run db:reset

# Или удалить папку migrations и создать заново
rm -rf prisma/migrations
npm run db:migrate
```

## Следующие шаги

1. ✅ Инфраструктура (PostgreSQL + Docker)
2. ✅ Backend база (NestJS + Prisma)  
3. 🔄 Auth модуль (JWT аутентификация)
4. 🔄 Campaigns CRUD модуль
5. 📋 Frontend (Next.js + MUI)
6. 📋 Интеграция и тестирование