# Архітектура

Залежності спрямовані всередину: інтерфейс і збереження знають про ядро, а ядро не знає про них.

```mermaid
flowchart LR
  UI[React UI] --> Core[src/core]
  UI --> Repo[RecipeRepository]
  Repo --> Local[IndexedDB, v0.2]
  Repo --> Api[REST API, v0.3]
  Api --> Service[Сервіси API]
  Service --> Core
  Service --> DB[(PostgreSQL)]
```

## Етапи

| Версія | Що додається | Нові технології |
| --- | --- | --- |
| v0.1 | Форма, перерахунок, деплой | Vite, React, TypeScript, Vitest |
| v0.2 | Вставка тексту, підказки, збереження | IndexedDB, PWA, Playwright |
| v0.3 | Акаунти, синхронізація, категорії | Node.js, Fastify, PostgreSQL, Drizzle, Docker |
| v0.4 | Розрахунок БЖВ | USDA FoodData Central, міграції даних |

## Модель даних для v0.3

```mermaid
erDiagram
  USER ||--o{ RECIPE : owns
  CATEGORY ||--o{ RECIPE : groups
  RECIPE ||--|{ RECIPE_INGREDIENT : contains
  PRODUCT ||--o{ RECIPE_INGREDIENT : describes
  USER {
    uuid id PK
    text email UK
    text password_hash
  }
  CATEGORY {
    uuid id PK
    text name
  }
  RECIPE {
    uuid id PK
    uuid user_id FK
    uuid category_id FK
    text title
    numeric servings
  }
  RECIPE_INGREDIENT {
    uuid id PK
    uuid recipe_id FK
    uuid product_id FK
    text raw_name
    numeric amount
    text unit
    int position
  }
  PRODUCT {
    uuid id PK
    text name_uk
    text icon
    numeric kcal_100g
    numeric protein_100g
    numeric fat_100g
    numeric carbs_100g
  }
```
