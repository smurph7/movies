import { useRouter } from 'next/router';

export function usePageChange() {
  const router = useRouter();

  function handlePageChange(href) {
    router.push(href, null, { shallow: true });
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  return { handlePageChange };
}
