import type { Ref } from "vue";
import { ref } from "vue";
import type { FetchState } from "@/types/github";
export function useFetch<T>(url: string | Ref<string>) {
  const state = ref<FetchState<T>>({ status: "idle" });
  async function execute() {
    const urlStr = typeof url === "string" ? url : url.value;
    if (!urlStr) {
      //   state.value.status = "idle"; // 对象结构固定不变时改属性赋值
      state.value = {
        status: "idle",
      };
      return;
    }
    state.value = {
      status: "loading",
    };
    try {
      const res = await fetch(urlStr);
      // 先判断 HTTP 状态，fetch 不会因为 404/500 自动抛错
      if (!res.ok) {
        state.value = {
          status: "error",
          message: `请求失败: ${res.status} ${res.statusText}`,
        };
        return;
      }
      const jsonData = await res.json();
      state.value = { status: "success", data: jsonData };
    } catch (err) {
      state.value = {
        status: "error",
        message: err instanceof Error ? err.message : "网络异常",
      };
    }
  }
  // 既然要返回对象类型
  return {
    state,
    execute,
  };
}
