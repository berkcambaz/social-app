import { ref } from "vue";

export function createLoader() {
  const loader = ref({
    status: false,
    wait: async function (promise: Promise<any>) {
      this.status = true;
      const timeout = new Promise((resolve) => { setTimeout(resolve, 500); });
      await Promise.all([timeout, promise]);
      this.status = false;
    }
  });

  return loader;
}