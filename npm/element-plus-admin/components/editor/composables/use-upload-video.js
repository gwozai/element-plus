import { useCos } from "../../upload/composables/use-cos";
import { useConsts } from "@/composables/use-consts";

export const useUploadVideo = (cosConfig) => {
  const { ApiUrl } = useConsts();

  const cos = useCos(cosConfig);

  const configEditor = async (editor, props) => {
    editor.config.uploadVideoServer = props.uploadAction;

    editor.config.uploadVideoHeaders = props.uploadHeaders;

    if (props.cosConfig) {
      await cos.initialize();

      editor.config.customUploadVideo = (resultFiles, insertVideo) => {
        resultFiles.forEach(async (file) => {
          const { id } = await cos.upload(file);
          insertVideo(`${ApiUrl}/public/files/${id}`);
        });
      };
    } else {
      editor.config.uploadImgHooks = {
        customInsert: (insertVideo, result) => {
          insertVideo(`${ApiUrl}/public/files/${result.data.id}`);
        },
      };
    }
  };

  return {
    configEditor,
  };
};
