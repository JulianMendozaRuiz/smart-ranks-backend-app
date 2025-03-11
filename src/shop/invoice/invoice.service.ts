import { Injectable } from '@nestjs/common';
import { Invoice } from './entity/invoice.entity';
import { InvoiceDTO } from './dto/invoice.dt';
import { randomUUID } from 'crypto';
import { CreateInvoiceDTO } from './dto/create-invoice.dt';
import { ProductOrderDTO } from './dto/product-order.dt';
import { ProductService } from '../product/product.service';

@Injectable()
export class InvoiceService {
  private invoices: Invoice[] = [];

  constructor(private prouductService: ProductService) {}
  // TODO: Implement methods for CRUD operations using access to external DB

  async getInvoices(
    sort: 'asc' | 'desc' = 'asc',
    limit: number,
  ): Promise<InvoiceDTO[]> {
    const sortAsc = (a: Invoice, b: Invoice) => (a.date > b.date ? 1 : -1);
    const sortDesc = (a: Invoice, b: Invoice) => (a.date < b.date ? 1 : -1);

    // Create a new sorted copy instead of mutating the original array
    const sortedInvoices = [...this.invoices].sort(
      sort === 'asc' ? sortAsc : sortDesc,
    );

    return sortedInvoices
      .slice(0, limit)
      .map((invoice) => new InvoiceDTO(invoice));
  }

  async getInvoiceById(id: string): Promise<InvoiceDTO | undefined> {
    // TODO: Replace with database search
    return this.invoices.find((invoice) => invoice.id === id);
  }

  async createInvoice(invoice: CreateInvoiceDTO): Promise<InvoiceDTO> {
    // TODO: Replace with database insert operation or call to create

    const total = await this.getTotalForInvoice(invoice.products);

    const newInvoice: Invoice = {
      ...invoice,
      id: randomUUID(),
      createdAt: new Date(),
      total,
    };
    this.invoices.push(newInvoice);

    return new InvoiceDTO(newInvoice);
  }

  //TODO: Finish this function
  async getTotalForInvoice(productOrder: ProductOrderDTO[]): Promise<number> {
    let total = 0;

    return total;
  }
}
