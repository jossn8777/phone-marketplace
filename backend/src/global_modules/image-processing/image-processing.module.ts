import { Global, HttpModule, Module } from '@nestjs/common';
import config from 'src/config';
import { ImageProcessingService } from './image-processing.service';

@Global()
@Module({
  providers: [ImageProcessingService],
  exports: [ImageProcessingService],
})
export class ImageProcessingModule {}
