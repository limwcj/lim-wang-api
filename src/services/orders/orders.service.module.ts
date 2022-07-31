import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Module({
  imports: [HttpModule],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersServiceModule {}
