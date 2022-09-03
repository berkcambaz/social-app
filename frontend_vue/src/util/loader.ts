import { ref } from "vue";

export function createLoader() {
  const loader = ref({
    status: false,
    wait: async function <T>(promise: Promise<T>) {
      this.status = true;
      const timeout: Promise<void> = new Promise((resolve) => { setTimeout(resolve, 500); });
      const [value] = await Promise.all([promise, timeout]);
      this.status = false;
      return value;
    }
  });

  return loader;
}