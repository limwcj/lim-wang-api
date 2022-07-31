import { Query, Resolver } from '@nestjs/graphql';

import { OrdersController } from '../../controllers/orders/orders.controller';

@Resolver()
export class OrdersResolver {
  constructor(private readonly ordersController: OrdersController) {}

  @Query((returns) => String)
  health() {
    return 'OK';
  }
}
