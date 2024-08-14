export const convertFileToBase64 = (files: FileList): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result;

      if (typeof result === "string") {
        resolve(result);
      } else {
        reject(new Error("Failed to convert file to Base64"));
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(files[0]);
  });
};
