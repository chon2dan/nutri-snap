interface CompressionOptions {
  quality: number;
  maxWidth: number;
  maxHeight: number;
  format: string;
}

interface CompressionResult {
  blob: Blob;
  dataUrl: string;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
}

export const compressImage = async (
  file: File,
  opts: CompressionOptions
): Promise<CompressionResult> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      let { width, height } = img;

      if (width > opts.maxWidth || height > opts.maxHeight) {
        const ratio = Math.min(opts.maxWidth / width, opts.maxHeight / height);
        width = Math.floor(width * ratio);
        height = Math.floor(height * ratio);
      }

      canvas.width = width;
      canvas.height = height;

      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);
      }

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const result: CompressionResult = {
              blob,
              dataUrl: canvas.toDataURL(opts.format, opts.quality / 100),
              originalSize: file.size,
              compressedSize: blob.size,
              compressionRatio: ((file.size - blob.size) / file.size) * 100,
            };
            resolve(result);
          } else {
            reject(new Error("압축 실패"));
          }
        },
        opts.format,
        opts.quality / 100
      );
    };

    img.onerror = () => reject(new Error("이미지 로드 실패"));
    img.src = URL.createObjectURL(file);
  });
};
