"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { useIntersectionObserver } from "@/lib/hooks/useIntersectionObserver";

interface InfiniteScrollProps {
  loadMore: () => void;
  hasMore: boolean;
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  children: React.ReactNode;
  skeletonCount?: number;
}

const Skeleton = () => (
  <div className="w-full h-32 bg-gray-100 dark:bg-slate-800 animate-pulse rounded-lg mb-4" aria-hidden />
);

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  loadMore,
  hasMore,
  isLoading = false,
  isError = false,
  onRetry,
  children,
  skeletonCount = 3,
}) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });
  const triggered = useRef(false);

  useEffect(() => {
    if (isVisible && hasMore && !isLoading && !triggered.current) {
      triggered.current = true;
      loadMore();
    } else if (!isVisible) {
      triggered.current = false;
    }
  }, [isVisible, hasMore, isLoading, loadMore]);

  return (
    <div>
      {children}
      <div ref={ref} tabIndex={-1} aria-live="polite" aria-busy={isLoading} className="flex flex-col items-center mt-4 min-h-[40px]">
        {isLoading && Array.from({ length: skeletonCount }).map((_, i) => <Skeleton key={i} />)}
        {isError && (
          <div className="text-center text-red-600 dark:text-red-400 mt-2">
            <p>Une erreur est survenue.</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="mt-2 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 focus:outline-none focus:ring"
              >
                Réessayer
              </button>
            )}
          </div>
        )}
        {!hasMore && !isLoading && !isError && (
          <span className="text-gray-400 text-sm">Fin de la liste</span>
        )}
      </div>
    </div>
  );
};

export default InfiniteScroll; 