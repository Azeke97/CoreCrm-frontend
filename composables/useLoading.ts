export const useLoading = () => {
  const loading = ref(false);
  const withLoading = async <T extends Promise<any>>(callback: T) => {
    loading.value = true;

    const res = await callback;

    loading.value = false;

    return res;
  };

  return { loading, withLoading }
}
