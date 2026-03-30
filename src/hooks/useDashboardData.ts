import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchDashboardData } from '../services/api/mockApi';
import { DashboardData } from '../types';

type UseDashboardDataOptions = {
  enabled?: boolean;
};

export function useDashboardData(options: UseDashboardDataOptions = {}) {
  const { enabled = true } = options;
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);
  const isMountedRef = useRef(true);
  const latestRequestRef = useRef(0);

  const load = useCallback(
    async ({ resetWhenDisabled = false }: { resetWhenDisabled?: boolean } = {}) => {
      if (!enabled) {
        if (resetWhenDisabled && isMountedRef.current) {
          setData(null);
          setError(null);
        }
        if (isMountedRef.current) {
          setLoading(false);
        }
        return;
      }

      latestRequestRef.current += 1;
      const requestId = latestRequestRef.current;

      if (isMountedRef.current) {
        setLoading(true);
        setError(null);
      }

      try {
        const nextData = await fetchDashboardData();
        if (isMountedRef.current && requestId === latestRequestRef.current) {
          setData(nextData);
        }
      } catch (loadError) {
        if (isMountedRef.current && requestId === latestRequestRef.current) {
          setError(loadError instanceof Error ? loadError.message : 'Erro inesperado ao carregar dados.');
        }
      } finally {
        if (isMountedRef.current && requestId === latestRequestRef.current) {
          setLoading(false);
        }
      }
    },
    [enabled],
  );

  useEffect(
    () => () => {
      isMountedRef.current = false;
    },
    [],
  );

  useEffect(() => {
    void load({ resetWhenDisabled: true });
  }, [load]);

  return {
    data,
    loading,
    error,
    retry: () => {
      void load();
    },
  };
}
