import {
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
  getCurrentInstance,
} from 'vue';
import { subscribe, type Result, type QueryOptions } from 'adax';

export const useSync = <FnType extends (x: any) => any>(
  readFn: FnType,
  getParamsObj?: () => Parameters<FnType>[0] | undefined,
  options: QueryOptions = {}
) => {
  const isMounted = ref(false);
  const result = ref<Readonly<ReturnType<FnType>>>(
    options?.skipInitalQuerying
      ? undefined
      : readFn(getParamsObj ? getParamsObj() : undefined)
  );
  
  const readTrigger = (res: Result) => (result.value = res.data);
  let sub = subscribe(
    readTrigger,
    readFn,
    getParamsObj ? getParamsObj() : undefined,
    {
      ...options,
      skipInitalQuerying: true,
    }
  );

  const instance = getCurrentInstance();
  let propsToWatch = { ...instance?.props };

  watch(
    () => ({ ...instance?.props }),
    (newProps) => {
      for (const key in newProps) {
        if (newProps[key] !== propsToWatch[key]) {
          sub.onBeforeUnmount();
          sub = subscribe(
            readTrigger,
            readFn,
            getParamsObj ? getParamsObj() : undefined,
            {
              ...options,
              skipInitalQuerying: true,
            }
          );
          result.value = options?.skipInitalQuerying
            ? undefined
            : readFn(getParamsObj ? getParamsObj() : undefined);
          break;
        }
      }
      propsToWatch = { ...newProps };
      sub.onMounted();
    }
  );

  onMounted(() => {
    isMounted.value = true;
    sub.onMounted();
  });

  onBeforeUnmount(() => {
    isMounted.value = false;
    sub.onBeforeUnmount();
  });
  return result;
};
