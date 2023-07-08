import { useList } from "element-plus-admin/components/list/composables/use-list";
import { useEnums } from "element-plus-admin/composables/use-enums";
import { ref } from "vue";
import { jobsApi } from "@/apis/admin/jobs";
import BForm from "./components/form/index.vue";

export default {
  components: {
    BForm,
  },
  setup() {
    const formRef = ref(null);

    const { enums } = useEnums();

    const { list, currentPage, cFilters, reRender, onPageChange, search, del } =
      useList({
        api: jobsApi,
        filters: {
          model: {
            name: { $like: "" },
          },
          rules: {},
        },
        extraQuery: {
          order: [["order", "DESC"]],
        },
      });

    return {
      jobsApi,
      formRef,
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
