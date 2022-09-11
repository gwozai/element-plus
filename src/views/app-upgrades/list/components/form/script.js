import { reactive, ref } from "vue";
import { useHelpers } from "@/composables/use-helpers";
import { useEnums } from "element-plus-admin/composables/use-enums";
import { useValidators } from "vue-validation";
import { useFormDialog } from "element-plus-admin/composables/use-form-dialog";
import { tencentCloudCosApi } from "@/apis/admin/tencent-cloud-cos";
import { filesApi } from "@/apis/admin/files";
import { UploadTo } from "element-plus-admin/enums/upload-to";
import { appUpgradesApi } from "@/apis/admin/app-upgrades";

export default {
  emits: ["ok"],
  setup(props, context) {
    const formRef = ref(null);

    const { deepCopy } = useHelpers();

    const { isRequired } = useValidators();

    const { enums } = useEnums();

    const cDialog = reactive({
      visible: false,
    });

    const initialModel = {
      status: 1,
    };

    const cForm = reactive({
      id: 0,
      model: deepCopy(initialModel),
      rules: {
        platform: [isRequired({ label: "平台" })],
        versionName: [isRequired({ label: "版本名称" })],
        versionCode: [isRequired({ label: "版本号" })],
        log: [isRequired({ label: "更新日志" })],
      },
    });

    const { show, validateField, submit } = useFormDialog({
      api: appUpgradesApi,
      cDialog,
      cForm,
      formRef,
      initialModel,
      onOk() {
        context.emit("ok");
      },
    });

    return {
      tencentCloudCosApi,
      filesApi,
      UploadTo,
      enums,
      formRef,
      cDialog,
      cForm,
      show,
      validateField,
      submit,
    };
  },
};
