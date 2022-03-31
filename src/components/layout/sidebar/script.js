import { ref } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { useConsts } from "@/composables/use-consts";

export default {
  name: "TheSidebar",
  props: {
    showHome: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { SidebarMenu } = useConsts();

    const getActiveKey = (path) => {
      let key = "0-0";

      SidebarMenu.forEach((item1, index1) => {
        item1.children.forEach((item2, index2) => {
          const routePaths = (path || route.path).split("/");
          const itemPaths = item2.path.split("/");

          if (
            routePaths[1] === itemPaths[1] &&
            routePaths[2] === itemPaths[2]
          ) {
            key = `${index1}-${index2}`;
          }
        });
      });

      return key;
    };

    const activeKey = ref(getActiveKey());

    onBeforeRouteUpdate((to, from, next) => {
      activeKey.value = getActiveKey(to.path);
      next();
    });

    const onSelect = async (key) => {
      const indexes = key.split("-");
      const index1 = indexes[0];
      const index2 = indexes[1];

      const { path } = SidebarMenu[index1].children[index2];

      await router.push(path);
    };

    return {
      router,
      activeKey,
      onSelect,
    };
  },
};
