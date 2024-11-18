import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateOrderDto, GetOrdersDto } from '../models/order.model';
import { RequestResult } from '../../../models/service/requestResult';

const apiUrl = 'https://localhost:7145/Api/Orders';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders(): Observable<RequestResult<GetOrdersDto[]>> {
    return this.http.get<RequestResult<GetOrdersDto[]>>(`${apiUrl}/GetOrders`);
  }

  createOrder(createOrderDto: CreateOrderDto): Observable<RequestResult<string>> {
    return this.http.post<RequestResult<string>>(`${apiUrl}/CreateOrder`, createOrderDto);
  }
}
