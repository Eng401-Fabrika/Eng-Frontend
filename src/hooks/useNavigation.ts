import { useEffect, useState } from 'react';
import { apiRequest } from '../api/client';
import { useAuth } from '../auth/AuthContext';
import type { NavigationGroup } from '../types/navigation';

export function useNavigation() {
  const { token } = useAuth();
  const [groups, setGroups] = useState<NavigationGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (!token) return;
      setIsLoading(true);
      try {
        const data = await apiRequest<NavigationGroup[]>('/api/Navigation', { token });
        if (cancelled) return;
        const sorted = [...data]
          .sort((a, b) => a.order - b.order)
          .map((g) => ({ ...g, items: [...g.items].sort((a, b) => a.order - b.order) }));
        setGroups(sorted);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : 'Failed to load navigation.';
        setError(message);
        setGroups([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [token]);

  return { groups, isLoading, error };
}
