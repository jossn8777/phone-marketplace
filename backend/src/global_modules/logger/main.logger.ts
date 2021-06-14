import { Injectable, Logger, Scope } from '@nestjs/common';
import pino from 'pino';
import pinoms from 'pino-multi-stream';
import moment from 'moment';

import config from 'src/config';

export interface LoggerObject {
  id?: number;
}

/**
 * We can use elasticsearch and kibana for logging streaming
 */

@Injectable({ scope: Scope.DEFAULT })
export class LoggerService {
  logger: pino.Logger;
  constructor() {
    // const streamToElastic = pinoElastic({
    //   index: 'index-here',
    //   consistency: 'one',
    //   node: 'elastic-search-url-here',
    //   'es-version': 7,
    //   'flush-bytes': 1000,
    // });

    // streamToElastic.on('error', (error) => {
    //   console.log('An error occurred', error);
    // });

    const streams = [
      { stream: process.stdout },
      // {
      //   level: 'error',
      //   stream: streamToElastic,
      // },
    ] as pinoms.Streams;

    this.logger = pino({ level: 'info' }, pinoms.multistream(streams));
  }

  error(
    method: string,
    className: string,
    apiUrl: string,
    input: any,
    result: any,
    timeProcessing: number,
    others?: LoggerObject,
  ) {
    this.logger.error({
      method,
      className,
      apiUrl,
      input: JSON.stringify(input),
      result: JSON.stringify(result),
      timeProcessing,
      apiCurrentTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      userId: others?.id || 0,
      ...others,
    });
  }
}
