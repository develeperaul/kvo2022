import { ref, onMounted, onUnmounted, computed } from "vue";
import { useStore } from "vuex";
export default function ({ nameSpace, paginateList }) {
  const store = useStore();

  const currentPage = ref(1);
  const lastPage = computed(() => store.state[nameSpace].last_page);
  const scrollComponent = ref(null);
  const scrollLoading = ref(false);
  const hundleScroll = async (e) => {
    const el = scrollComponent.value;
    if (
      el &&
      el?.getBoundingClientRect().bottom < window.innerHeight &&
      !scrollLoading.value &&
      currentPage.value < lastPage.value
    ) {
      try {
        scrollLoading.value = true;
        await paginateList(currentPage.value);
        currentPage.value++;
      } catch (e) {
      } finally {
        scrollLoading.value = false;
      }
    }
  };
  onMounted(() => window.addEventListener("scroll", hundleScroll));
  onUnmounted(() => window.removeEventListener("scroll", hundleScroll));
  return { scrollComponent, scrollLoading };
}
