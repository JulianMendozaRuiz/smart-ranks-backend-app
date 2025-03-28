import { HttpException, Injectable } from '@nestjs/common';
import { Invoice } from './entity/invoice.entity';
import { InvoiceDTO } from './dto/invoice.dt';
import { CreateInvoiceDTO } from './dto/create-invoice.dt';
import { ProductOrderDTO } from './dto/product-order.dt';
import { ProductService } from '../product/product.service';
import { UpdateInvoiceDTO } from './dto/update-invoice.dt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../../core/user/user.service';
import { ProductPurchaseDTO } from '../product/dto/product-purchase.dt';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<Invoice>,
    private prouductService: ProductService,
    private userService: UserService,
  ) {}

  async findAll(sort: 'asc' | 'desc' = 'asc', limit: number) {
    const queryResult = await this.invoiceModel
      .find()
      .sort({ date: sort })
      .limit(limit)
      .exec();

    return queryResult.map((invoice) => new InvoiceDTO(invoice));
  }

  async findById(id: string): Promise<InvoiceDTO | undefined> {
    const invoice = await this.invoiceModel.findById(id).exec();

    if (!invoice) {
      throw new HttpException(`Invoice with ID ${id} not found`, 404);
    }

    return new InvoiceDTO(invoice);
  }

  async create(invoice: CreateInvoiceDTO): Promise<InvoiceDTO> {
    await this.userService.findById(invoice.user_id);

    const productsPurchase = await this.prouductService.validateProductsExist(
      invoice.products,
    );

    const total = this.calculateTotalAndCheckStock(
      productsPurchase,
      invoice.products,
    );

    const newInvoice = new InvoiceDTO({
      ...invoice,
      createdAt: new Date(),
      total,
    } as Invoice);

    const response = await this.invoiceModel.create(newInvoice);
    return new InvoiceDTO(response);
  }

  private calculateTotalAndCheckStock(
    productsPurchase: ProductPurchaseDTO[],
    productOrders: ProductOrderDTO[],
  ): number {
    let total = 0;

    productsPurchase.forEach((p) => {
      const currentProduct = productOrders.find(
        (pr) => pr.product_id === p.id,
      )!;

      if (currentProduct.quantity > p.stock) {
        throw new HttpException(`Not enough stock for product ${p.id}`, 400);
      }

      total += p.price * currentProduct.quantity;
    });

    return total;
  }

  async update(
    id: string,
    updatedInvoice: UpdateInvoiceDTO,
  ): Promise<InvoiceDTO> {
    await this.findById(id);

    if (updatedInvoice.user_id)
      await this.userService.findById(updatedInvoice.user_id);

    let products: ProductPurchaseDTO[] | undefined;
    let total: number | undefined;
    if (updatedInvoice.products) {
      products = await this.prouductService.validateProductsExist(
        updatedInvoice.products,
      );

      total = this.calculateTotalAndCheckStock(
        products,
        updatedInvoice.products,
      );
    }

    const invoice = {
      ...updatedInvoice,
      total,
    };

    const result = await this.invoiceModel
      .findByIdAndUpdate(id, invoice, { new: true })
      .exec();

    return new InvoiceDTO(result as Invoice);
  }

  async delete(id: string): Promise<void> {
    const response = await this.invoiceModel.findByIdAndDelete(id).exec();

    console.log(response);
  }
}
