import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/types/product';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async getAllProducts() {
    const products = await this.productModel.find();
    if (products.length === 0) {
      throw new HttpException('Products not found!', HttpStatus.NOT_FOUND);
    } else {
      return products;
    }
  }
}
