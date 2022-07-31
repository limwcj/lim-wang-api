import { Module } from '@nestjs/common';
import { OrdersServiceModule } from 'src/services/orders/orders.service.module';

import { OrdersController } from './orders.controller';

@Module({
  imports: [OrdersServiceModule],
  providers: [OrdersController],
  exports: [OrdersController],
})
export class OrdersControllerModule {}
