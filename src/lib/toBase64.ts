export const toBase64 = async (file: File) =>
  new Promise<string>((resolve, reject) => {
    if (!file.type.startsWith('image')) {
      return reject(errorMessages.invalidFileExtension);
    }

    if (toMegabytes(file.size) > megaBytesLimit) {
      return reject(errorMessages.fileTooLarge);
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      const result = fileReader.result;
      if (result) {
        return resolve(result as string);
      } else {
        return reject(errorMessages.uploadFailed);
      }
    };

    fileReader.onerror = () => {
      return reject(errorMessages.uploadFailed);
    };
  });

const megaBytesLimit = 2;

const errorMessages = {
  fileTooLarge: 'large',
  uploadFailed: 'uploadFailed',
  invalidFileExtension: 'invalidFileException',
};

function toMegabytes(bytes: number) {
  return Number((bytes / 1024 / 1024).toFixed(4));
}