import { useConsts } from "@/composables/use-consts";
import { useAuth } from "../../composables/use-auth";
import { deepCopy } from "jt-helpers";
import Files from "./files/index.vue";
import { onMounted, reactive } from "vue";
import { useCos } from "./composables/use-cos";

const { ApiUrl } = useConsts();
const { getHeaders } = useAuth();

export default {
  components: {
    "cc-files": Files,
  },
  props: {
    action: {
      type: String,
      default: `${ApiUrl}/admin/files/actions/upload`,
    },
    headers: {
      type: Object,
      default: () => getHeaders(),
    },
    data: Object,
    multiple: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "请选择文件",
    },
    buttonSize: {
      type: String,
      default: "default",
    },
    buttonClass: String,
    showUploaded: {
      type: Boolean,
      default: true,
    },
    fileDir: {
      type: String,
      default: "",
    },
    cosConfig: {
      type: Object,
      default: () => null,
    },
    value: {
      type: [Number, Array],
      default: 0,
    },
    tip: {
      type: String,
      default: "",
    },
    officeViewerServiceUrl: String,
  },
  emits: ["update:value", "change", "success", "error"],
  setup(props, context) {
    const cUpload = reactive({
      progress: 0,
    });

    const cos = useCos({
      ...props.cosConfig,
      onProgress(progress) {
        cUpload.progress = progress;
      },
    });

    onMounted(async () => {
      if (props.cosConfig) {
        await cos.initialize();
      }
    });

    const update = (id) => {
      if (props.multiple) {
        const value = props.value ? [...props.value, id] : [id];

        context.emit("update:value", value);
        context.emit("change", value);
      } else {
        context.emit("update:value", id);
        context.emit("change", id);
      }
    };

    const beforeUpload = async (file) => {
      if (props.cosConfig) {
        update((await cos.upload(file, props.fileDir)).id);
        return Promise.reject();
      } else {
        return Promise.resolve();
      }
    };

    const onSuccess = (res) => {
      context.emit("success", res.data);
      update(res.data.id);
    };

    const onError = (err, file, fileList) => {
      context.emit("error", { err, file, fileList });
    };

    const onDelete = (index) => {
      if (props.multiple) {
        const value = deepCopy(props.value);

        value.splice(index, 1);

        context.emit("update:value", value);
        context.emit("change", value);
      } else {
        context.emit("update:value", undefined);
        context.emit("change", undefined);
      }
    };

    return {
      cUpload,
      beforeUpload,
      onSuccess,
      onError,
      onDelete,
    };
  },
};
