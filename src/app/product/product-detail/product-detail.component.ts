import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: any

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
    ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(
      params => {
        const productObservable = this.productService.getProductById( params.get('productId')!)
        productObservable.subscribe(
          (data) => {
            // console.log('got value ' + data)
            this.product = data
          },
          (err) => {
            console.error('something wrong occurred: ' + err)
          },
          () => {
            console.log('done')
          }

        )
      }
    )
  }

}
