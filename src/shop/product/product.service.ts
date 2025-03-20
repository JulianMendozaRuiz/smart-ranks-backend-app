import { HttpException, Injectable } from '@nestjs/common';
import { Product } from './entity/product.entity';
import { ProductDTO } from './dto/product.dt';
import { CreateProductDTO } from './dto/create-product.dt';
import { UpdateProductDTO } from './dto/update-product.dt';
import { ProductPriceDTO } from './dto/product-price.dt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  // TODO: Implement methods for CRUD operations using access to external DB
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  //TODO: Implement method
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

  async findByIdOnlyPrice(pIdList: string[]): Promise<ProductPriceDTO[]> {
    const products: ProductPriceDTO[] = [];

    // TODO: Replace with database search
    for (const id of pIdList) {
      const product = this.products.find((p) => p._id === id);

      if (!product) {
        throw new HttpException(`Product with ID ${id} not found`, 404);
      }

      products.push(new ProductPriceDTO(product._id, product.price));
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
    await this.productModel.findByIdAndUpdate(
      { _id: id },
      {
        ...productUpdate,
      },
    );

    return new ProductDTO(productUpdate as Product);
  }

  async delete(id: string): Promise<void> {
    const response = await this.productModel.findByIdAndDelete(id).exec();

    console.log(response);
  }
}
