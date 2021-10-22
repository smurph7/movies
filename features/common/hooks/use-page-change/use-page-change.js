import { useRouter } from 'next/router';

export function usePageChange() {
  const router = useRouter();
  const newUrl = router.asPath.split('/');
  newUrl.pop();

  function handlePageChange(newPage) {
    router.push(`${newUrl.join('/')}/${newPage ?? 1}`, null, { shallow: true });
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  return { handlePageChange };
}
