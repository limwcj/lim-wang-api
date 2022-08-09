import { Injectable } from '@nestjs/common';

import { OrdersService } from '../../services/orders/orders.service';

@Injectable()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
}
