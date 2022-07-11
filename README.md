<h1>Backend NestJS (PET PROJECT)</h1>

Начну, как мне кажется, с самого главного - ответа на возможные вопросы (ниже)

> А почему некоторые вещи реализованы в разных исполнениях?

> Почему так странно написаны тесты?

> Почему ошибки и комментарии на разных языках, ты что лингвине?

Это PET PROJECT, своеобразный тренировочный полигон, так что здесь все сделанно умышленно.

- БД - PostgreSQL
- ORM - TypeORM
- CACHE - Redis (`default login/password - root/root`)
- SEARCH - Elastic stack
- LOGS - Sentry
- OpenAPI - Swagger (`http://localhost:3000/api`)

<h2>Предварительная настройка</h2>

Весь проект упакован в docker образ, поэтому нужно предварительно сделать пару вещей...

<ins>Но сперва, один важный момент <ins>

**Опции "строгости" в `tsconfig.json` ВКЛЮЧЕНЫ, учитывайте это!**

Не забывайте комментировать подключение импортов / инициализацию в конструкторе для шагов ниже, или отключите все опции в самом `tsconfig.json` чтобы не было ошибок при сборке! 

Итак, поехали!

`.env.example` практически заполнен, осталось видоизменить всего пару полей

- `EMAIL_SERVICE=`
- `EMAIL_USER=`
- `EMAIL_PASSWORD=`

Если нет необходимости тестировать отправку писем при регистрации, можете закомментировать строку с `sendVerificationLink` в `src/authentication/authentication.controller.ts`

    const newUser = await this.authenticationService.registration(userData);
    await this.emailConfirmationService.sendVerificationLink(userData.email); <- RIGHT HERE
    return newUser;

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

<h2>Запуск и тестирование</h2>

Запуск:
- `docker compose build`
- `docker compose up -d` (нужно подождать пару минут пока соберется elastic)

Структура проекта:
- `npm run documentation:serve` - посмотреть документацию Сompodoc
- посмотреть OpenAPI - `http://localhost:3000/api`

Тесты:
- `npm run test` 
- `npm run test:e2e`
- подергать ручки можно через Postman, т.к. UI практически не реализован 

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
