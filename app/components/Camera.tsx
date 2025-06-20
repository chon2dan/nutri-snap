"use client";

import { ChangeEvent, useRef } from "react";
import { Box, Typography, Stack, Paper } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { compressImage } from "@/utils/imageCompressor";

interface CameraProps {
  onImageSelect: (base64: string) => void;
  imagePreview: string | null;
}

export function Camera({ onImageSelect, imagePreview }: CameraProps) {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("file?.size", file?.size);
    const options = {
      quality: 90,
      maxWidth: 1920,
      maxHeight: 1080,
      format: file?.type || "image/jpeg",
    };
    if (file) {
      const result = await compressImage(file, options);
      console.log(
        "result.dataUrl size ",
        Math.round(result.dataUrl.length * 0.75)
      );
      onImageSelect(result.dataUrl);
    }
  };

  const triggerCameraCapture = () => cameraInputRef.current?.click();
  const triggerFileUpload = () => uploadInputRef.current?.click();

  return (
    <>
      {imagePreview ? (
        <Box sx={{ width: "100%" }}>
          <img
            src={imagePreview}
            alt="Preview"
            style={{
              width: "100%",
              maxHeight: "300px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Box>
      ) : (
        <Stack direction="row" spacing={2} width="100%">
          {/* 카메라 촬영 */}
          <Paper
            elevation={3}
            onClick={triggerCameraCapture}
            sx={{
              flex: 1,
              height: 200,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              "&:hover": {
                border: "1px solid",
                borderColor: "primary.main",
              },
            }}
          >
            <PhotoCameraIcon sx={{ fontSize: 48, color: "text.secondary" }} />
            <Typography variant="body2" mt={1}>
              Take a photo
            </Typography>
            <input
              type="file"
              ref={cameraInputRef}
              accept="image/*"
              capture="environment"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </Paper>

          {/* 이미지 업로드 */}
          <Paper
            elevation={3}
            onClick={triggerFileUpload}
            sx={{
              flex: 1,
              height: 200,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              "&:hover": {
                border: "1px solid",
                borderColor: "primary.main",
              },
            }}
          >
            <UploadFileIcon sx={{ fontSize: 48, color: "text.secondary" }} />
            <Typography variant="body2" mt={1}>
              Upload image
            </Typography>
            <input
              type="file"
              ref={uploadInputRef}
              accept="image/*, .heic, .heif"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </Paper>
        </Stack>
      )}
    </>
  );
}
