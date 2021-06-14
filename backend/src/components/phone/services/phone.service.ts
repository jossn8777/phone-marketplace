import { Injectable, PreconditionFailedException } from '@nestjs/common';
import fs from 'fs';

import { IPagination } from 'src/common/interfaces';
import { ERROR_CODE, PHONE } from 'src/constants';
import { Phone, Provider } from 'src/entities';
import { PhoneRepository } from 'src/repositories';
import { PhoneDto } from '../dtos';
import config from 'src/config';
import { Count } from 'src/common/dtos';
import { ImageProcessingService } from 'src/global_modules/image-processing/image-processing.service';

@Injectable()
export class PhoneService {
  constructor(
    private phoneRepository: PhoneRepository,
    private imageProcessingService: ImageProcessingService,
  ) {}

  async createPhone(phone: PhoneDto, provider?: Provider): Promise<Phone> {
    const newPhone = await this.phoneRepository.save(
      this.phoneRepository.create({
        ...phone,
        createdBy: provider?.id,
      }),
    );

    return newPhone;
  }

  async savePhonePicture(
    id: number,
    user: Provider,
    file: Express.Multer.File,
  ): Promise<Phone> {
    const existed = await this.phoneRepository.findById(id, user);

    // Resize Image
    const compressImageBuffer = await this.imageProcessingService.compressImage(
      file.buffer,
    );

    const dir = __dirname + '/../../../../uploads/';

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const fileName = file?.originalname;

    fs.writeFileSync(dir + fileName, compressImageBuffer, {});

    const updated = await this.phoneRepository.save(
      this.phoneRepository.create({
        id: existed.id,
        picture: fileName,
      }),
    );

    return await this.phoneRepository.getById(id);
  }

  async getList(pagination: IPagination): Promise<Phone[]> {
    return await this.phoneRepository.search(pagination);
  }

  async getById(id: number): Promise<Phone> {
    const assets = await this.phoneRepository.search({
      limit: 1,
      offset: 0,
      filter: { id },
      sort: { field: 'createdAt', order: 'DESC' },
    } as IPagination);

    if (!assets?.length) {
      throw new PreconditionFailedException(ERROR_CODE.PHONE_NOT_FOUND);
    }
    return assets[0];
  }

  async count(pagination: IPagination): Promise<Count> {
    const count = await this.phoneRepository.countFilter(pagination);

    return {
      count,
    };
  }

  async deleteById(id: number, user: Provider): Promise<Phone> {
    const existed = await this.phoneRepository.findById(id, user);

    const updated = await this.phoneRepository.save(
      this.phoneRepository.create({
        id: existed.id,
        status: PHONE.STATUS.DELETED,
      }),
    );

    return updated;
  }

  async updateById(
    id: number,
    updatedData: PhoneDto,
    user: Provider,
  ): Promise<Phone> {
    const existed = await this.phoneRepository.findById(id, user);

    const updated = await this.phoneRepository.save(
      this.phoneRepository.create({
        id: existed.id,
        ...updatedData,
      }),
    );

    return await this.phoneRepository.getById(id);
  }
}
