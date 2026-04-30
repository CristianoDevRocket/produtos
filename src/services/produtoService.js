import { apiClient } from '../api/client';
import { PRODUTOS_ENDPOINT } from '../constants';

export const produtoService = {
  async list() {
    const { data } = await apiClient.get(PRODUTOS_ENDPOINT);
    return data;
  },

  async create(produto) {
    const { data } = await apiClient.post(PRODUTOS_ENDPOINT, produto);
    return data;
  },

  async update(id, produto) {
    const { data } = await apiClient.put(`${PRODUTOS_ENDPOINT}/${id}`, produto);
    return data;
  },

  async remove(id) {
    await apiClient.delete(`${PRODUTOS_ENDPOINT}/${id}`);
  },
};
