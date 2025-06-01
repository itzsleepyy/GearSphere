import { useState, useCallback, useRef } from 'react';
import { Alert } from 'react-native';

export interface UseApiStateOptions<T> {
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  showErrorAlert?: boolean;
  errorTitle?: string;
}

export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refreshing: boolean;
}

export interface UseApiStateReturn<T> {
  state: ApiState<T>;
  execute: (apiCall: () => Promise<T>) => Promise<T | null>;
  refresh: (apiCall: () => Promise<T>) => Promise<T | null>;
  reset: () => void;
  setData: (data: T) => void;
  setError: (error: string | null) => void;
}

export function useApiState<T>(options: UseApiStateOptions<T> = {}): UseApiStateReturn<T> {
  const {
    initialData = null,
    onSuccess,
    onError,
    showErrorAlert = true,
    errorTitle = 'Error'
  } = options;

  const [state, setState] = useState<ApiState<T>>({
    data: initialData,
    loading: false,
    error: null,
    refreshing: false,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const execute = useCallback(async (apiCall: () => Promise<T>): Promise<T | null> => {
    // Cancel previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    setState(prev => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const result = await apiCall();
      
      setState(prev => ({
        ...prev,
        data: result,
        loading: false,
        error: null,
      }));

      onSuccess?.(result);
      return result;
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return null;
      }

      const errorMessage = error.message || 'An unexpected error occurred';
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));

      if (showErrorAlert) {
        Alert.alert(errorTitle, errorMessage);
      }

      onError?.(error);
      return null;
    }
  }, [onSuccess, onError, showErrorAlert, errorTitle]);

  const refresh = useCallback(async (apiCall: () => Promise<T>): Promise<T | null> => {
    setState(prev => ({
      ...prev,
      refreshing: true,
      error: null,
    }));

    try {
      const result = await apiCall();
      
      setState(prev => ({
        ...prev,
        data: result,
        refreshing: false,
        error: null,
      }));

      onSuccess?.(result);
      return result;
    } catch (error: any) {
      const errorMessage = error.message || 'An unexpected error occurred';
      
      setState(prev => ({
        ...prev,
        refreshing: false,
        error: errorMessage,
      }));

      if (showErrorAlert) {
        Alert.alert(errorTitle, errorMessage);
      }

      onError?.(error);
      return null;
    }
  }, [onSuccess, onError, showErrorAlert, errorTitle]);

  const reset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    setState({
      data: initialData,
      loading: false,
      error: null,
      refreshing: false,
    });
  }, [initialData]);

  const setData = useCallback((data: T) => {
    setState(prev => ({
      ...prev,
      data,
    }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({
      ...prev,
      error,
    }));
  }, []);

  return {
    state,
    execute,
    refresh,
    reset,
    setData,
    setError,
  };
}

// Hook for optimistic updates
export interface UseOptimisticUpdateOptions<T> {
  onError?: (error: Error, originalData: T) => void;
  onSuccess?: (data: T) => void;
}

export function useOptimisticUpdate<T>(
  currentData: T,
  updateFunction: (data: T) => T,
  options: UseOptimisticUpdateOptions<T> = {}
) {
  const [optimisticData, setOptimisticData] = useState<T>(currentData);
  const [isOptimistic, setIsOptimistic] = useState(false);

  const executeOptimistic = useCallback(async (
    apiCall: () => Promise<T>,
    optimisticUpdate?: (data: T) => T
  ): Promise<T | null> => {
    const originalData = currentData;
    const updateFn = optimisticUpdate || updateFunction;
    
    // Apply optimistic update
    const optimistic = updateFn(originalData);
    setOptimisticData(optimistic);
    setIsOptimistic(true);

    try {
      const result = await apiCall();
      setOptimisticData(result);
      setIsOptimistic(false);
      options.onSuccess?.(result);
      return result;
    } catch (error: any) {
      // Rollback on error
      setOptimisticData(originalData);
      setIsOptimistic(false);
      options.onError?.(error, originalData);
      return null;
    }
  }, [currentData, updateFunction, options]);

  return {
    data: optimisticData,
    isOptimistic,
    executeOptimistic,
  };
}

// Hook for pagination
export interface UsePaginationOptions<T> {
  pageSize?: number;
  initialPage?: number;
  onError?: (error: Error) => void;
}

export function usePagination<T>(
  fetchFunction: (page: number, limit: number) => Promise<{ data: T[]; hasMore: boolean; total: number }>,
  options: UsePaginationOptions<T> = {}
) {
  const { pageSize = 20, initialPage = 1, onError } = options;
  
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async (pageNum: number = page, isRefresh: boolean = false) => {
    if (isRefresh) {
      setRefreshing(true);
      setPage(initialPage);
      setData([]);
    } else if (pageNum > initialPage) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    setError(null);

    try {
      const result = await fetchFunction(pageNum, pageSize);
      
      if (isRefresh || pageNum === initialPage) {
        setData(result.data);
      } else {
        setData(prev => [...prev, ...result.data]);
      }
      
      setHasMore(result.hasMore);
      setTotal(result.total);
      setPage(pageNum);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to load data';
      setError(errorMessage);
      onError?.(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  }, [fetchFunction, page, pageSize, initialPage, onError]);

  const refresh = useCallback(() => {
    loadData(initialPage, true);
  }, [loadData, initialPage]);

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      loadData(page + 1, false);
    }
  }, [loadData, loadingMore, hasMore, page]);

  const reset = useCallback(() => {
    setData([]);
    setPage(initialPage);
    setHasMore(true);
    setTotal(0);
    setError(null);
    setLoading(false);
    setRefreshing(false);
    setLoadingMore(false);
  }, [initialPage]);

  return {
    data,
    loading,
    refreshing,
    loadingMore,
    hasMore,
    total,
    error,
    loadData,
    refresh,
    loadMore,
    reset,
  };
}
