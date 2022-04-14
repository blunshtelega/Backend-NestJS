import { ManagersController } from './managers/manager.controller';
import { ManagersService } from './managers/managers.service';
import { ManagersModule } from './managers/managers.module';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';
import { EmailConfirmationModule } from './emailConfirmation/emailConfirmation.module';
import { ProductsModule } from './products/products.module';
import { CompaniesModule } from './companies/companies.module';
import { OrdersModule } from './orders/orders.module';
import { CategoriesModule } from './categories/categories.module';
import { PricesModule } from './prices/prices.module';
import { SearchModule } from './search/search.module';
import { DatabaseModule } from './database/database.module';
import { SentryModule } from './sentry/sentry.module';
import * as Sentry from '@sentry/node';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        ELASTICSEARCH_NODE: Joi.string(),
        ELASTICSEARCH_USERNAME: Joi.string(),
        ELASTICSEARCH_PASSWORD: Joi.string(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        EMAIL_SERVICE: Joi.string().required(),
        EMAIL_USER: Joi.string().required(),
        EMAIL_PASSWORD: Joi.string().required(),
        TWO_FACTOR_AUTHENTICATION_APP_NAME: Joi.string(),
        JWT_VERIFICATION_TOKEN_SECRET: Joi.string().required(),
        JWT_VERIFICATION_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        EMAIL_CONFIRMATION_URL: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
      }),
    }),
    SentryModule.forRoot({
      dsn: 'https://2a32b564d67a4cc0a94d3e4ab5716847@o1182144.ingest.sentry.io/6327156',
      tracesSampleRate: 1.0,
      debug: true,
    }),
    DatabaseModule,
    AuthenticationModule,
    UsersModule,
    EmailConfirmationModule,
    ProductsModule,
    CompaniesModule,
    OrdersModule,
    CategoriesModule,
    PricesModule,
    SearchModule,
    ManagersModule,
  ],
  providers: [ManagersService],
  controllers: [ManagersController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(Sentry.Handlers.requestHandler()).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
