"use client";

import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImagePreview);

type Props = {
  onFilesSelected: (files: File[]) => void;
};

export default function FileUpload({ onFilesSelected }: Props) {
  return (
    <FilePond
      allowMultiple={true}
      maxFiles={10}
      name="files"
      labelIdle='여기로 파일을 드래그하거나 <span class="filepond--label-action">찾아보기</span>'
      onupdatefiles={(fileItems) => {
        const files = fileItems.map((item) => item.file as File);
        onFilesSelected(files);
      }}
    />
  );
}
