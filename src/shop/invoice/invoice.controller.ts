import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { InvoiceDTO } from './dto/invoice.dt';
import { Invoice } from './entity/invoice.entity';
import { InvoiceService } from './invoice.service';

@ApiTags('Invoice')
@Controller('invoice')
export class InvoiceController {
  private invoices: Invoice[] = [];

  constructor(private invoiceService: InvoiceService) {}

  @Get()
  @ApiOkResponse({
    description: 'Return list of invoices.',
    type: InvoiceDTO,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Invalid parameters provided' })
  async getInvoices(
    @Query('sort') sort: 'asc' | 'desc' = 'asc',
    @Query('limit') limit: number,
  ): Promise<InvoiceDTO[]> {
    return await this.invoiceService.findAll(sort, limit);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'string', description: 'Id of invoice' })
  @ApiOkResponse({
    description: 'Return invoice by id.',
    type: InvoiceDTO,
  })
  @ApiNotFoundResponse({ description: 'Invoice not found.' })
  @ApiBadRequestResponse({ description: 'Invalid parameters provided' })
  async getInvoiceById(
    @Param('id') id: string,
  ): Promise<InvoiceDTO | undefined> {
    return await this.invoiceService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'New invoice created.',
    type: InvoiceDTO,
  })
  @ApiBadRequestResponse({ description: 'Invalid input provided' })
  async createInvoice(
    @Body(ValidationPipe) input: InvoiceDTO,
  ): Promise<InvoiceDTO> {
    return await this.invoiceService.create(input);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: 'string', description: 'Id of invoice' })
  @ApiOkResponse({
    description: 'Invoice updated.',
    type: InvoiceDTO,
  })
  @ApiNotFoundResponse({ description: 'Invoice not found.' })
  @ApiBadRequestResponse({ description: 'Invalid parameters provided' })
  @ApiBadRequestResponse({ description: 'Invalid input provided' })
  async updateInvoice(
    @Param('id') id: string,
    @Body(ValidationPipe) input: InvoiceDTO,
  ): Promise<InvoiceDTO> {
    return await this.invoiceService.update(id, input);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string', description: 'Id of invoice' })
  @ApiOkResponse({ description: 'Invoice deleted.' })
  @ApiNotFoundResponse({ description: 'Invoice not found.' })
  @ApiBadRequestResponse({ description: 'Invalid parameters provided' })
  async deleteInvoice(@Param('id') id: string): Promise<void> {
    await this.invoiceService.delete(id);
  }
}
