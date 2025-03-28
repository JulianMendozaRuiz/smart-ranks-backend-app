import { HttpException, Injectable } from '@nestjs/common';
import { Product } from './entity/product.entity';
import { ProductDTO } from './dto/product.dt';
import { CreateProductDTO } from './dto/create-product.dt';
import { UpdateProductDTO } from './dto/update-product.dt';
import { ProductPurchaseDTO } from './dto/product-purchase.dt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductOrderDTO } from '../invoice/dto/product-order.dt';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll(sort: 'asc' | 'desc' = 'desc', limit: number) {
    const queryResult = await this.productModel
      .find()
      .sort({ createdAt: sort })
      .limit(limit)
      .exec();

    return queryResult.map((product) => new ProductDTO(product));
  }

  async findById(id: string): Promise<ProductDTO> {
    const product = await this.productModel.findById(id).exec();

    if (!product) {
      throw new HttpException(`Product with ID ${id} not found`, 404);
    }
    return new ProductDTO(product);
  }

  async findAllForInvoiceById(
    pIdList: string[],
  ): Promise<ProductPurchaseDTO[]> {
    const queryResult = await this.productModel
      .find({ _id: { $in: pIdList } })
      .exec();

    console.log(queryResult);

    const dtos = queryResult.map((product) => new ProductPurchaseDTO(product));

    console.log(dtos);

    return dtos;
  }

  async validateProductsExist(
    productOrders: ProductOrderDTO[],
  ): Promise<ProductPurchaseDTO[]> {
    const productIds = productOrders.map((p) => p.product_id);
    const products = await this.findAllForInvoiceById(productIds);
    if (products.length !== productOrders.length) {
      throw new HttpException('Some products do not exist', 400);
    }

    return products;
  }

  async create(product: CreateProductDTO): Promise<ProductDTO> {
    const newProduct = new ProductDTO({
      ...product,
      createdAt: new Date(),
    } as Product);

    const response = await this.productModel.create(newProduct);

    return new ProductDTO(response);
  }

  async update(
    id: string,
    productUpdate: UpdateProductDTO,
  ): Promise<ProductDTO> {
    const result = await this.productModel
      .findByIdAndUpdate(
        { _id: id },
        {
          ...productUpdate,
        },
        { new: true },
      )
      .exec();

    return new ProductDTO(result as Product);
  }

  async delete(id: string): Promise<void> {
    const response = await this.productModel.findByIdAndDelete(id).exec();

    console.log(response);
  }
}
