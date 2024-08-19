// src/utils/getFileIcon.tsx

import React from "react";
import {
  AudioTwoTone,
  FileImageTwoTone,
  FilePdfTwoTone,
  FileTextTwoTone,
  FileUnknownTwoTone,
  FileWordTwoTone,
  VideoCameraTwoTone,
} from "@ant-design/icons";

export const getFileType = (fileExt: string): string => {
  switch (fileExt.toLowerCase()) {
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
      return "image";
    case "pdf":
      return "pdf";
    case "doc":
    case "docx":
    case ".pages":
      return "word";
    case "txt":
    case "md":
      return "text";
    case "mp4":
    case "avi":
    case "mov":
    case "wmv":
    case "mkv":
      return "video";
    case "mp3":
    case "wav":
    case "aac":
    case "flac":
    case "ogg":
      return "audio";
    default:
      return "unsupported";
  }
};

export const getFileIcon = (fileName: string, iconSize: number): React.ReactElement => {
  if (!fileName) {
    return <FileUnknownTwoTone style={{ fontSize: iconSize }} twoToneColor="#27AE60" />;
  }

  const fileExtension = fileName.split(".").pop()?.toLowerCase();
  if (!fileExtension) {
    return <FileUnknownTwoTone style={{ fontSize: iconSize }} twoToneColor="#27AE60" />;
  }

  const fileType = getFileType(fileExtension);
  switch (fileType) {
    case "image":
      return <FileImageTwoTone style={{ fontSize: iconSize }} twoToneColor="#27AE60" />;
    case "word":
      return <FileWordTwoTone style={{ fontSize: iconSize }} twoToneColor="#27AE60" />;
    case "text":
      return <FileTextTwoTone style={{ fontSize: iconSize }} twoToneColor="#27AE60" />;
    case "video":
      return <VideoCameraTwoTone style={{ fontSize: iconSize }} twoToneColor="#27AE60" />;
    case "audio":
      return <AudioTwoTone style={{ fontSize: iconSize }} twoToneColor="#27AE60" />;
    case "pdf":
      return <FilePdfTwoTone style={{ fontSize: iconSize }} twoToneColor="#27AE60" />;
    default:
      return <FileUnknownTwoTone style={{ fontSize: iconSize }} twoToneColor="#27AE60" />;
  }
};
