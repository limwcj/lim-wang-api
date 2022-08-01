import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { LoggerModule } from 'nestjs-pino';
import { join } from 'path';

import { AuthModule } from './common/auth/auth.module';
import { DateScalar } from './common/scalars/date.scalar';
import { AppResolver } from './resolvers/app.resolver';
import { OrdersResolverModule } from './resolvers/orders/orders.resolver.module';
import { WechatResolverModule } from './resolvers/wechat/wechat.resolver.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.graphql'),
      debug: true,
      playground: true,
      introspection: true,
      context: ({ req }) => ({ req }),
    }),
    LoggerModule.forRoot(),
    AuthModule,
    OrdersResolverModule,
    WechatResolverModule,
  ],
  providers: [DateScalar, AppResolver],
  controllers: [AppResolver],
  exports: [],
})
export class AppModule {}
