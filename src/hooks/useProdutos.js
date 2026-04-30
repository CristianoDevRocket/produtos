import { useCallback, useEffect, useState } from 'react';
import { produtoService } from '../services/produtoService';

export function useProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await produtoService.list();
      setProdutos(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const create = useCallback(async (produto) => {
    const created = await produtoService.create(produto);
    setProdutos((prev) => [...prev, created]);
    return created;
  }, []);

  const update = useCallback(async (id, produto) => {
    const updated = await produtoService.update(id, produto);
    setProdutos((prev) => prev.map((p) => (p.id === id ? updated : p)));
    return updated;
  }, []);

  const remove = useCallback(async (id) => {
    await produtoService.remove(id);
    setProdutos((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return { produtos, loading, error, refresh, create, update, remove };
}
