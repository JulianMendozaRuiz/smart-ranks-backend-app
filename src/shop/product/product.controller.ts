import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductDTO } from './dto/product.dt';
import { IsPositivePipe } from '../../common/pipes/is-positive/is-positive.pipe';
import { CreateProductDTO } from './dto/create-product.dt';
import { UpdateProductDTO } from './dto/update-product.dt';
import { IsMongoIdPipe } from '../../common/pipes/is-mongo-id/is-mongo-id.pipe';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Get list products' })
  @ApiOkResponse({
    description: 'Return list products.',
    type: ProductDTO,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Invalid parameters provided' })
  async findAll(
    @Query('sort') sort: 'asc' | 'desc' = 'desc',
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe, IsPositivePipe)
    limit: number,
  ) {
    const result = await this.productService.findAll(sort, limit);
    // TODO: Move to logging service instead
    console.log('found products', result);

    return result;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by id' })
  @ApiParam({ name: 'id', description: 'Product id' })
  @ApiOkResponse({
    description: 'Return product by id.',
    type: ProductDTO,
  })
  @ApiNotFoundResponse({ description: 'Product not found.' })
  @ApiBadRequestResponse({ description: 'Invalid mongoid provided' })
  async findOne(@Param('id', ValidationPipe, IsMongoIdPipe) id: string) {
    const product = await this.productService.findById(id);

    // TODO: Move to logging service instead
    console.log('product', product);

    return product;
  }

  @Post()
  @ApiOperation({ summary: 'Create new product' })
  @ApiCreatedResponse({
    description: 'New product created.',
    type: CreateProductDTO,
  })
  @ApiBadRequestResponse({ description: 'Invalid parameters provided' })
  create(@Body(ValidationPipe) input: CreateProductDTO) {
    return this.productService.create(input);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update product' })
  @ApiOkResponse({
    description: 'Product updated.',
    type: UpdateProductDTO,
  })
  @ApiNotFoundResponse({ description: 'Product not found.' })
  @ApiBadRequestResponse({ description: 'Invalid product object provided' })
  update(
    @Param('id', ValidationPipe) id: string,
    @Body(ValidationPipe) input: UpdateProductDTO,
  ) {
    return this.productService.update(id, input);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete product' })
  @ApiParam({ name: 'id', description: 'Product id' })
  @ApiNoContentResponse({ description: 'Product deleted.' })
  @ApiNotFoundResponse({ description: 'Product not found.' })
  async remove(@Param('id', ValidationPipe) id: string) {
    await this.productService.delete(id);
  }
}
