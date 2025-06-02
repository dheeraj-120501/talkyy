export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
      resolve(reader.result as string);
    };
    reader.readAsDataURL(blob);
  });
};

export const base64ToBlob = (base64: string): Blob => {
  const byteString = atob(base64.split(",")[1]); // Decode Base64
  const mimeString = base64.split(",")[0].split(":")[1].split(";")[0]; // Get MIME type
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString }); // Create and return Blob
};
