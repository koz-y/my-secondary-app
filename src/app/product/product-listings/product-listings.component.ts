import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-listings',
  templateUrl: './product-listings.component.html',
  styleUrls: ['./product-listings.component.scss']
})
export class ProductListComponent implements OnInit {

  products: any

  constructor(private productService: ProductService) { }

  ngOnInit(): void {

    const productsObservable = this.productService.getProducts()
    productsObservable.subscribe(
      (data) => {
        // console.log('got value ' + data)
        this.products = data
      },
      (err) => {
        console.error('something wrong occurred: ' + err)
      },
      () => {
        console.log('done')
      }
    )
  }
}
