import { createApi } from "element-plus-admin/utils/create-api";
import { useAuth } from "element-plus-admin/composables/use-auth";

export const aliCloudOssApi = createApi({
  url: "/admin/aliCloudOss",
  getHeaders: useAuth().getHeaders,
});
