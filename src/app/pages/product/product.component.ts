import { Component } from '@angular/core';
import { AddProductDto, Product, UpdateProductDto } from './models/product.model';
import { ProductService } from './service/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  products: Product[] = [];  // Lista de productos que deberías cargar desde tu servicio
  displayPopup: boolean = false;  // Para el popup de agregar producto
  displayPopup2: boolean = false; // Para el popup de actualizar producto

  // Formularios reactivos
  addProductForm!: FormGroup;
  updateProductForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private productService: ProductService) {}

  ngOnInit() {
    // Inicializa el formulario de agregar producto
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stockQuantity: ['', [Validators.required, Validators.min(0)]],
    });

    // Inicializa el formulario de actualizar producto
    this.updateProductForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stockQuantity: ['', [Validators.required, Validators.min(0)]]
    });

    this.loadProducts();
  }

  loadProducts(): void {
    // Carga los productos desde tu servicio
    this.productService.getProducts().subscribe(products => {
      this.products = products.result ?? [];
    });
  }

  onSubmit() {
    if (this.addProductForm.valid) {
      console.log('Nuevo Producto:', this.addProductForm.value);
      const product = this.addProductForm.value;

      this.productService.addProduct(product)
        .subscribe(resp => {
          if (resp.isSuccessful) {
            this.loadProducts();
          }
        });
      this.displayPopup = false; 
    }
  }

  onUpdateSubmit() {
    if (this.updateProductForm.valid) {
      console.log('Producto Actualizado:', this.updateProductForm.value);
      const product = this.updateProductForm.value;
      this.productService.updateProduct(product.id,product)
        .subscribe(resp => {
          if (resp.isSuccessful) {
            this.loadProducts();
          }
        });
      this.displayPopup2 = false;
    }
  }

  editProduct(product: any) {
    this.updateProductForm.patchValue(product); 
    this.displayPopup2 = true;
  }


  deleteProduct(productId: string) {
    console.log('Eliminar Producto con ID:', productId);
    this.productService.deleteProduct(productId)
        .subscribe(resp => {
          if (resp.isSuccessful) {
            this.loadProducts();
          }
        });
  }
}
