export const validateImage = (file: Express.Multer.File) => {
  if (file?.mimetype?.startsWith('image/')) {
    return true;
  }
  return false;
};
