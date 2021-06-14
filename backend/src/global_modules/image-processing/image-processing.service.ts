import { Injectable } from '@nestjs/common';
import gmx from 'gm';
import http from 'http';
import https from 'https';

import config from 'src/config';

const gm = gmx.subClass({ imageMagick: true });

@Injectable()
export class ImageProcessingService {
  constructor() {}

  async compressImage(image: string | Buffer): Promise<Buffer> {
    return await new Promise(async (resolve, reject) => {
      try {
        let mainBuffer: Buffer = null;

        if (typeof image === 'string') {
          const { buffer, mime } = await this.getImage(image);

          mainBuffer = buffer;
        } else {
          mainBuffer = image;
        }

        gm(image as any)
          .resize(500, 800)
          .toBuffer((err, buffer) => {
            if (err) return reject(err);

            resolve(buffer);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  async getImage(url: string): Promise<any> {
    return await new Promise((resolve, reject) => {
      try {
        (url.startsWith('https') ? https : http)
          .get(url, (res) => {
            const bufs = [];
            res.on('data', (chunk) => {
              bufs.push(chunk);
            });

            res.on('end', () => {
              const data = Buffer.concat(bufs);

              resolve({ buffer: data, mime: res.headers['content-type'] });
            });
          })
          .on('error', (err) => {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  }
}
