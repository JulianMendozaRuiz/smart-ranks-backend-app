import { Injectable } from '@nestjs/common';
import { Invoice } from './entity/invoice.entity';
import { InvoiceDTO } from './dto/invoice.dt';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { randomUUID } from 'crypto';
import { CreateInvoiceDTO } from './dto/create-invoice.dt';
import { ProductOrderDTO } from './dto/product-order.dt';
import { ProductService } from '../product/product.service';
import { UpdateInvoiceDTO } from './dto/update-invoice.dt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class InvoiceService {
  private invoices: Invoice[] = [];

  constructor(
    private prouductService: ProductService,
    @InjectModel(Invoice.name) private invoiceModel: Model<Invoice>,
  ) {}
  // TODO: Implement methods for CRUD operations using access to external DB

  async findAll(sort: 'asc' | 'desc' = 'asc', limit: number) {
    return await this.invoiceModel
      .find()
      .sort({ date: sort })
      .limit(limit)
      .exec();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findById(id: string): Promise<InvoiceDTO | undefined> {
    // TODO: Replace with database search
    // return this.invoices.find((invoice) => invoice.id === id);
    return {
      id: 'id',
      user_id: 'user_id',
      products: [],
      total: 100,
      date: new Date(),
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(invoice: CreateInvoiceDTO): Promise<InvoiceDTO> {
    // TODO: Replace with database insert operation or call to create

    // const total = await this.getTotal(invoice.products);

    // const newInvoice: Invoice = {
    //   ...invoice,
    //   id: randomUUID(),
    //   createdAt: new Date(),
    //   total,
    // };
    // this.invoices.push(newInvoice);

    // return new InvoiceDTO(newInvoice);
    return {
      id: 'id',
      user_id: 'user_id',
      products: [],
      total: 100,
      date: new Date(),
    };
  }

  //TODO: Finish this function
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getTotal(productOrder: ProductOrderDTO[]): Promise<number> {
    const total = 0;

    return total;
  }

  //TODO: Implement update method
  async update(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    newInvoice: UpdateInvoiceDTO,
  ): Promise<InvoiceDTO> {
    return {
      id: 'id',
      user_id: 'user_id',
      products: [],
      total: 100,
      date: new Date(),
    };
  }

  //TODO: Implement delete method
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async delete(id: string): Promise<void> {}
}
