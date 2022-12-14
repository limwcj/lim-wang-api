import { Module } from '@nestjs/common';

import { OrdersControllerModule } from '../../controllers/orders/orders.controller.module';
import { OrdersResolver } from './orders.resolver';

@Module({
  imports: [OrdersControllerModule],
  providers: [OrdersResolver],
  exports: [OrdersResolver],
})
export class OrdersResolverModule {}
