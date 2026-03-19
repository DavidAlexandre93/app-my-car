import { useCallback, useEffect, useState } from 'react';
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

  const load = useCallback(async () => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const nextData = await fetchDashboardData();
      setData(nextData);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Erro inesperado ao carregar dados.');
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    let active = true;

    const run = async () => {
      if (!enabled) {
        setData(null);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const nextData = await fetchDashboardData();
        if (active) {
          setData(nextData);
        }
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : 'Erro inesperado ao carregar dados.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void run();

    return () => {
      active = false;
    };
  }, [enabled]);

  return {
    data,
    loading,
    error,
    retry: load,
  };
}
