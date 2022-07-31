import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
  constructor(private readonly httpService: HttpService) {}
}
