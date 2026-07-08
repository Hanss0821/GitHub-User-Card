import type { Ref } from 'vue'
import { ref, watch } from 'vue'
import { z, type ZodType } from 'zod'
import type { FetchState } from '@/types/github'

export function useFetch<T>(schema: ZodType<T>, url: string | Ref<string>) {
  const state = ref<FetchState<T>>({ status: 'idle' })
  async function execute(signal?: AbortSignal) {
    const urlStr = typeof url === 'string' ? url : url.value
    if (!urlStr) {
      //   state.value.status = "idle"; // 对象结构固定不变时改属性赋值
      state.value = {
        status: 'idle',
      }
      return
    }
    state.value = {
      status: 'loading',
    }
    try {
      const res = await fetch(urlStr, { signal })
      // 先判断 HTTP 状态，fetch 不会因为 404/500 自动抛错
      if (!res.ok) {
        state.value = {
          status: 'error',
          message: res.status === 404 ? `用户不存在` : `请求失败: ${res.status} ${res.statusText}`,
        }
        return
      }
      const jsonData = await res.json()
      const result = schema.parse(jsonData)
      state.value = { status: 'success', data: result }
    } catch (err) {
      // 顺序很重要：先排除"被取消"，它不是错误
      if (err instanceof DOMException && err.name === 'AbortError') return
      if (err instanceof z.ZodError) {
        state.value = { status: 'error', message: '数据格式异常' }
        return
      }
      state.value = {
        status: 'error',
        message: err instanceof Error ? err.message : '网络异常',
      }
    }
  }
  // 单一参数只能是Ref对象
  let timer: ReturnType<typeof setTimeout>
  watch(
    () => (typeof url === 'string' ? url : url.value),
    (newVal, oldVal, onCleanup) => {
      const controller = new AbortController()
      onCleanup(() => {
        clearTimeout(timer)
        controller.abort()
      }) // 下次触发时，先杀掉我这次的请求
      timer = setTimeout(() => execute(controller.signal), 300)
    },
    {
      immediate: true,
    },
  )
  // 既然要返回对象类型
  return {
    state,
    execute,
  }
}
