// TODO: Remove after implementing methods
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, Injectable } from '@nestjs/common';
import { Product } from './entity/product.entity';
import { ProductDTO } from './dto/product.dt';
import { CreateProductDTO } from './dto/create-product.dt';
import { randomUUID } from 'crypto';
import { updateProductDTO } from './dto/update-product.dt';
import { ProductPriceDTO } from './dto/product-price.dt';
import { ProductStatus } from './entity/product-status.enum';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  // TODO: Implement methods for CRUD operations using access to external DB

  //TODO: Implement method
  async findAll(
    sort: 'asc' | 'desc' = 'asc',
    limit: number,
  ): Promise<ProductDTO[]> {
    // const sortAsc = (a: Product, b: Product) => (a.name > b.name ? 1 : -1);
    // const sortDesc = (a: Product, b: Product) => (a.name < b.name ? 1 : -1);

    // // Create a new sorted copy instead of mutating the original array
    // const sortedProducts = [...this.products].sort(
    //   sort === 'asc' ? sortAsc : sortDesc,
    // );

    // return sortedProducts
    //   .slice(0, limit)
    //   .map((product) => new ProductDTO(product));
    return [
      {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        price: 10,
        stock: 100,
        status: ProductStatus.ACTIVE,
        createdAt: new Date(),
      },
    ];
  }

  async findById(id: string): Promise<ProductDTO> {
    // TODO: Replace with database search
    // return this.products.find((product) => product.id === id);
    return {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
      stock: 100,
      status: ProductStatus.ACTIVE,
      createdAt: new Date(),
    };
  }

  async findByIdOnlyPrice(pIdList: string[]): Promise<ProductPriceDTO[]> {
    const products: ProductPriceDTO[] = [];

    // TODO: Replace with database search
    for (const id of pIdList) {
      const product = this.products.find((p) => p.id === id);

      if (!product) {
        throw new HttpException(`Product with ID ${id} not found`, 404);
      }

      products.push(new ProductPriceDTO(product.id, product.price));
    }

    return products;
  }

  async create(product: CreateProductDTO): Promise<ProductDTO> {
    // Generate a unique ID for the new product using DB API
    // const newProduct = { ...product, id: randomUUID(), createdAt: new Date() };
    // this.products.push(newProduct);

    // return new ProductDTO(newProduct);
    return {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
      stock: 100,
      status: ProductStatus.ACTIVE,
      createdAt: new Date(),
    };
  }

  async update(id: string, newProduct: updateProductDTO): Promise<ProductDTO> {
    // TODO: Replace with database search
    // const productIndex = this.products.findIndex((p) => p.id === id);
    // if (productIndex === -1) {
    //   throw new HttpException('Product not found', 404);
    // }
    // // TODO: Replace with database update operation or call to update
    // const updatedProduct = { ...this.products[productIndex], ...newProduct };
    // this.products[productIndex] = updatedProduct;
    // return new ProductDTO(updatedProduct);
    return {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
      stock: 100,
      status: ProductStatus.INACTIVE,
      createdAt: new Date(),
    };
  }

  async delete(id: string): Promise<void> {
    // TODO: Replace with database search
    // const productIndex = this.products.findIndex((p) => p.id === id);
    // if (productIndex === -1) {
    //   throw new HttpException('Product not found', 404);
    // }
    // TODO: Replace with database delete operation or call to delete
    // this.products.splice(productIndex, 1);
  }
}
