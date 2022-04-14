<h1>Backend NestJS (PET PROJECT)</h1>

Начну, как мне кажется, с самого главного - ответа на возможные вопросы (ниже)

> А почему некоторые вещи реализованы в разных исполнениях?

> Почему так странно написаны тесты?

> Хотя бы ненужные комментарии удалил...

> Ужасная же у вас местами бизнес-логика, сударь!

> Почему ошибки и комментарии на разных языках, ты что лингвине?

Это PET PROJECT, своеобразный тренировочный полигон, так что здесь все сделанно умышленно.

- БД - PostgreSQL
- ORM - TypeORM
- CACHE - Redis (`default login/password - root/root`)
- SEARCH - Elastic stack
- LOGS - Sentry
- OpenAPI - Swagger (`http://localhost:3000/api`)

<h2>Предварительная настройка</h2>

Весь проект упакован в docker образ, поэтому нужно предварительно сделать пару вещей:

`.env.example` практически заполнен, осталась всего пара полей

- `EMAIL_SERVICE=`
- `EMAIL_USER=`
- `EMAIL_PASSWORD=`

Если нет необходимости тестировать отправку писем при регистрации, можете закомментировать строку с `sendVerificationLink` в `src/authentication/authentication.controller.ts`

При создание БД поле `host name/address` заполняется IP адресом, который можно получить командами `docker ps` -> `docker inspect [POSTGRES CONTAINER ID]`

Логи пишутся в SENTRY, поэтому нужно или прописать свой DSN, или отключить его в `src/app.module.ts`

    SentryModule.forRoot({
      dsn: 'https://2a32b564d67a4cc0a94d3e4ab5716847@o1182144.ingest.sentry.io/6327156', <- RIGHT HERE
      tracesSampleRate: 1.0,
      debug: true,
    }),

Если вы выбрали вариант "к черту sentry", то нужно будет еще убрать middleware с AppModule

    export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(Sentry.Handlers.requestHandler()).forRoutes({
        path: '*',
        method: RequestMethod.ALL,
        });
    }
    }

<ins>**Опции "строгости" в<ins> `tsconfig.json` <ins>ВКЛЮЧЕНЫ, учитывайте это!**<ins>

<h2>Запуск и тестирование</h2>

Структура проекта:
- `npm run documentation:serve` - посмотреть документацию Сompodoc до/после сборки
- посмотреть OpenAPI после сборки (`http://localhost:3000/api`)

Тесты:
- `npm run test` 
- `npm run test:e2e`

Запуск:
- `docker compose build`
- `docker compose up -d`

<h2>TODO LIST</h2>

- Change keyset pagination to cursor pagination
- Change all useless ANY types
- Write tests for 100% coverage
- 2FA/Refresh/EmailConfirm/ViewAuthFilter/RBAC done, but never used
- Exploring the microservices
- Try GraphQL instead of REST API
- Task Scheduling?
- Health checks (Terminus and Datadog)
- JSDoc - 100% coverage
