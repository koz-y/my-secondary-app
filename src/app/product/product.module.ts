import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-listings/product-listings.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductService } from './service/product.service';


@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
