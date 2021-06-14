import { RequestTimeoutException } from '@nestjs/common';

export const fetchWithTimeout = (url, options, timeout = 10000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new RequestTimeoutException(url || 'timeout')),
        timeout,
      ),
    ),
  ]);
};
