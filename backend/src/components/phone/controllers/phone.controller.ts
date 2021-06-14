import {
  ApiBearerAuth,
  ApiConsumes,
  ApiExtraModels,
  ApiTags,
} from '@nestjs/swagger';
import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  UseInterceptors,
  Delete,
  Param,
  Patch,
  Req,
  UploadedFile,
} from '@nestjs/common';
import { Ok, Paginate } from 'src/utils';
import { PhoneService } from '../services';
import { Phone, Provider } from 'src/entities';
import {
  ApiPaginatedResponse,
  ApiPagination,
  Pagination,
  User,
} from 'src/common/decorators';
import { IPagination } from 'src/common/interfaces';
import { JwtGuard } from 'src/common/guards';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { Count } from 'src/common/dtos';
import { LoggingInterceptor } from 'src/common/interceptors';
import { PhoneDto, PhoneUploadDto } from '../dtos';

@ApiTags('Phone')
@ApiBearerAuth()
@Controller('phones')
@ApiExtraModels(Paginate)
@UseInterceptors(LoggingInterceptor)
export class PhoneController {
  constructor(private phoneService: PhoneService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(
    @User() user: Provider,
    @Body() phone: PhoneDto,
  ): Promise<Phone> {
    return await this.phoneService.createPhone(phone, user);
  }

  @UseGuards(JwtGuard)
  @Patch(':id/picture')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('picture'))
  async uploadPhonePicture(
    @Param('id') id: number,
    @User() user?: Provider,
    @Body() data?: PhoneUploadDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Phone> {
    return await this.phoneService.savePhonePicture(id, user, file);
  }

  @Get()
  @ApiPagination({
    filterFields: {
      statuses: [1],
    },
    sortFields: ['createdAt'],
    defaultSort: { field: 'createdAt', order: 'DESC' },
  })
  @ApiPaginatedResponse(Phone)
  async get(@Pagination() pagination: IPagination): Promise<Paginate<Phone>> {
    const [items, count] = await Promise.all([
      this.phoneService.getList(pagination),
      this.phoneService.count(pagination),
    ]);
    return new Paginate<Phone>(items, count?.count);
  }

  @Get('count')
  @ApiPagination({
    filterFields: {
      name: 'Hello',
      modelId: '1',
    },
    count: true,
  })
  async count(@Pagination() pagination: IPagination): Promise<Count> {
    return await this.phoneService.count(pagination);
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Phone> {
    return await this.phoneService.getById(id);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteById(
    @User() user: Provider,
    @Param('id') id: number,
  ): Promise<Ok> {
    await this.phoneService.deleteById(id, user);

    return new Ok('Deleted successfully');
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async updateById(
    @User() user: Provider,
    @Param('id') id: number,
    @Body() phone: PhoneDto,
  ): Promise<Ok> {
    await this.phoneService.updateById(id, phone, user);

    return new Ok('Updated successfully');
  }
}
