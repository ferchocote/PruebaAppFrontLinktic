import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { ResolveRequestResultService } from '../../../utils/resolve-requestResult';
import { RequestResult } from '../../../models/service/requestResult';
import { Product, AddProductDto, UpdateProductDto } from '../models/product.model';

const apiUrl = 'https://localhost:7145/Api/Products';

@Injectable()
export class ProductService  {
    private getProductSubject: BehaviorSubject<Product[] | null>;
    private addProductSubject: BehaviorSubject<Product | null>;

  constructor(
    private http: HttpClient,
    private readonly _resolveReqSvc: ResolveRequestResultService
  ) {
    this.getProductSubject = new BehaviorSubject<Product[] | null>(null);
    this.addProductSubject = new BehaviorSubject<Product | null>(null);
  }

  getProducts(): Observable<RequestResult<Product[]>> {
    return this.http.get<RequestResult<Product[]>>(`${apiUrl}`)
    .pipe(
        map((requestResult) => {
          this.getProductSubject.next(requestResult.result);
          return requestResult;
        }),
        catchError(this._resolveReqSvc.handleError)
      );
  }

  addProduct(product: AddProductDto): Observable<RequestResult<Product>> {
    return this.http.post<RequestResult<Product>>(`${apiUrl}`, product)
    .pipe(
        map((requestResult) => {
          this.addProductSubject.next(requestResult.result);
          return requestResult;
        }),
        catchError(this._resolveReqSvc.handleError)
      );
  }

  updateProduct(id: string, product: UpdateProductDto): Observable<RequestResult<Product>> {
    return this.http.put<RequestResult<Product>>(`${apiUrl}/${id}`, product)
    .pipe(
        map((requestResult) => {
          this.addProductSubject.next(requestResult.result);
          return requestResult;
        }),
        catchError(this._resolveReqSvc.handleError)
      );
  }

  deleteProduct(id: string): Observable<RequestResult<any>> {
    return this.http.delete<RequestResult<any>>(`${apiUrl}/${id}`)
    .pipe(
        map((requestResult) => {
          this.addProductSubject.next(requestResult.result);
          return requestResult;
        }),
        catchError(this._resolveReqSvc.handleError)
      );
  }
}
