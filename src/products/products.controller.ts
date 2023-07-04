/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('api/products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  async getAllProducts() {
    return this.productService.getAllProducts();
  }
}
