import { useRef, useCallback } from 'react';

export function useInfiniteScroll(loading: boolean, hasMore: boolean | null, loadMore: () => void) {
  const observer = useRef<IntersectionObserver | null>(null);
  
  const lastElementRef = useCallback(
    (node: any) => {
      if (loading) return;

      if (observer.current) {
        observer.current?.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore, loadMore]
  );

  return lastElementRef;
}