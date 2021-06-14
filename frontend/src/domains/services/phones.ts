import { Pagination } from './../entities/pagination';
import { PATHS, withAuthRequest } from './../apis/index';
import BE from '../apis';
import { PhoneInterface } from '../entities/phones';

export const addPhonePicture = async (id: number, file: Blob) => {
  const form = new FormData();
  form.append('picture', file);

  return withAuthRequest(BE.patch, PATHS.PHONE_PICTURE(id), {
    data: form
  });
}
  


export const createPhone = async (phone: PhoneInterface) => {
  const result = await withAuthRequest(BE.post, PATHS.PHONE_CREATE, {
    data: phone,
  });

  if (phone.picture) {
    await addPhonePicture(result.id, phone.picture);
  }
  

  return result;

  
};

export const getPhones = async ({ pageSize, current }: Pagination) => {
  

  let params = {
    size: pageSize,
    offset: 0
  }

  if (current && pageSize) {
    params.offset = (current - 1) * pageSize;
  }
  
  const result = await withAuthRequest(BE.get, PATHS.PHONE_LIST, { params });

  return { list: result.items, total: result.total }

};

export const getPhone = (id: number) =>
  withAuthRequest(BE.get, PATHS.PHONE_DETAIL(id));

export const deletePhone = (id: number) =>
  withAuthRequest(BE.delete, PATHS.PHONE_DELETE(id));

export const updatePhone = async (phone: PhoneInterface, id: number) => {
  const result = await withAuthRequest(BE.patch, PATHS.PHONE_UPDATE(id), {
    data: phone,
  });

  if (typeof phone.picture !== 'string') {
    await addPhonePicture(id, phone.picture)
  }

  return result;
};

