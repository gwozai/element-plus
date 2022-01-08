import { reactive, ref, watch } from "vue";
import { useHelpers } from "@/composables/use-helpers";
import FileViewer from "../file-viewer/index.vue";
import { ElMessage } from "element-plus";
import { publicFilesApi } from "../../apis/public/files";

export default {
  components: {
    "c-file-viewer": FileViewer,
  },
  props: {
    ids: {
      type: Array,
      default: () => [],
    },
    className: {
      type: String,
      default: "",
    },
    canPreview: {
      type: Boolean,
      default: true,
    },
    officeViewerServiceUrl: String,
  },
  setup(props) {
    const { getFileUrl } = useHelpers();

    const fileViewer = ref(null);

    const files = ref([]);

    watch(
      () => props.ids,
      async (newVal) => {
        if (newVal && newVal.length) {
          const { items } = await publicFilesApi.post({
            action: "findAllByIds",
            body: { ids: newVal },
          });

          files.value = items.map(({ id, name, ext }) => ({
            id,
            name,
            ext,
            url: getFileUrl({ id }),
          }));
        } else {
          files.value = [];
        }
      },
      { immediate: true, deep: true }
    );

    return {
      fileViewer,
      files,
      getFileUrl,
    };
  },
};
