import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Product } from '../product/models/product.model';
import { ProductService } from '../product/service/product.service';
import { CreateOrderDto } from './models/order.model';
import { OrderService } from './service/order.service';
import { LoginService } from '../login/service/login.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: any[] = [];  
  products: Product[] = []; 
  createOrderForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private productService: ProductService,
    private authService: LoginService 
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    this.loadProducts(); 


    this.createOrderForm = this.fb.group({
      orderDate: [new Date(), Validators.required],
      number: [0, [Validators.required, Validators.min(1)]],
      orderItems: this.fb.array([])  
    });
  }


  loadOrders(): void {
    this.orderService.getOrders().subscribe((response) => {
      this.orders = response.result ?? [];
    });
  }


  loadProducts(): void {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.result ?? [];  
    });
  }


  get orderItems(): FormArray {
    return this.createOrderForm.get('orderItems') as FormArray;
  }


  addProductToOrder(): void {
    const orderItem = this.fb.group({
      product: ['', Validators.required],  
      quantity: [1, [Validators.required, Validators.min(1)]],  
    });

    this.orderItems.push(orderItem);
  }


  removeProductFromOrder(index: number): void {
    this.orderItems.removeAt(index);
  }


  createOrder(): void {
    if (this.createOrderForm.valid) {
      const createOrderDto: CreateOrderDto = {
        orderDate: this.createOrderForm.value.orderDate,
        number: this.createOrderForm.value.number,
        user: this.authService.currentUserValue?.userID ?? '',
        orderItems: this.createOrderForm.value.orderItems,  
      };

      this.orderService.createOrder(createOrderDto).subscribe((response) => {
        this.loadOrders(); 
        this.resetForm();    
      });
    }
  }


  resetForm(): void {
    this.createOrderForm.reset({
      orderDate: new Date(),
      number: 0,
      user: ''
    });
    this.orderItems.clear();  
  }
}
