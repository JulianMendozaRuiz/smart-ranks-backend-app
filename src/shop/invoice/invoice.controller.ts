import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { InvoiceDTO } from './dto/invoice.dt';
import { Invoice } from './entity/invoice.entity';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDTO } from './dto/create-invoice.dt';
import { UpdateInvoiceDTO } from './dto/update-invoice.dt';
import { IsMongoIdPipe } from '../../common/pipes/is-mongo-id/is-mongo-id.pipe';

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
  async findAll(
    @Query('sort', ValidationPipe) sort: 'asc' | 'desc' = 'asc',
    @Query('limit', ValidationPipe, new DefaultValuePipe(100)) limit: number,
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
  async findById(
    @Param('id', ValidationPipe, IsMongoIdPipe) id: string,
  ): Promise<InvoiceDTO | undefined> {
    const result = await this.invoiceService.findById(id);

    // TODO: Move to logging service
    console.log('invoice', result);

    return result;
  }

  @Post()
  @ApiBody({ type: CreateInvoiceDTO, description: 'Invoice input DTO' })
  @ApiCreatedResponse({
    description: 'New invoice created.',
    type: InvoiceDTO,
  })
  @ApiBadRequestResponse({ description: 'Invalid input provided' })
  async createInvoice(
    @Body(new ValidationPipe({ transform: true })) input: CreateInvoiceDTO,
  ): Promise<InvoiceDTO> {
    return await this.invoiceService.create(input);
  }

  @Put(':id')
  @ApiBody({
    type: UpdateInvoiceDTO,
    description: 'Invoice input DTO for update',
  })
  @ApiParam({ name: 'id', type: 'string', description: 'Id of invoice' })
  @ApiOkResponse({
    description: 'Invoice updated.',
    type: InvoiceDTO,
  })
  @ApiNotFoundResponse({ description: 'Invoice not found.' })
  @ApiBadRequestResponse({ description: 'Invalid parameters provided' })
  @ApiBadRequestResponse({ description: 'Invalid input provided' })
  async updateInvoice(
    @Param('id', ValidationPipe, IsMongoIdPipe) id: string,
    @Body(ValidationPipe) input: UpdateInvoiceDTO,
  ): Promise<InvoiceDTO> {
    return await this.invoiceService.update(id, input);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiParam({ name: 'id', type: 'string', description: 'Id of invoice' })
  @ApiNoContentResponse({ description: 'Invoice deleted.' })
  @ApiNotFoundResponse({ description: 'Invoice not found.' })
  @ApiBadRequestResponse({ description: 'Invalid parameters provided' })
  async deleteInvoice(@Param('id') id: string): Promise<void> {
    await this.invoiceService.delete(id);
  }
}
