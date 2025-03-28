import { Component, OnInit, Signal } from '@angular/core';
import { ProductsService } from "../../service/products.service"
import { CommonModule } from '@angular/common';
import { Productos } from '../../interfaces/productos'

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent implements OnInit {
  products: Signal<Productos[]>;
  
  constructor(private productosService: ProductsService) {
    this.products = this.productosService.loadProducts();
  }

  ngOnInit() {
    this.products = this.productosService.loadProducts();
  }
}
