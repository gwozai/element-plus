import { useList } from "element-plus-admin/components/list/composables/use-list";
import { useEnums } from "element-plus-admin/composables/use-enums";
import { ref } from "vue";
import { adsApi } from "@/apis/admin/ads";
import Form from "./components/form/index.vue";
import { ElMessage } from "element-plus";
import { categoriesApi } from "@/apis/admin/categories";

export default {
  components: {
    "vc-form": Form,
  },
  setup() {
    const form = ref(null);

    const { enums } = useEnums();

    const { list, currentPage, cFilters, reRender, onPageChange, search } =
      useList({
        api: categoriesApi,
        filters: {
          model: {
            name: { $like: "" },
          },
          rules: {},
        },
      });

    const del = async ({ id }) => {
      await adsApi.delete({ id });
      ElMessage.success("删除成功");
      await reRender();
    };

    return {
      adsApi,
      form,
      enums,
      list,
      currentPage,
      cFilters,
      reRender,
      onPageChange,
      search,
      del,
    };
  },
};
