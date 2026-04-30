function normalize(value) {
  return value?.toString().trim().toLowerCase() ?? '';
}

export function isNomeDuplicado(nome, produtos, ignoreId = null) {
  const target = normalize(nome);
  if (!target) return false;
  return produtos.some((p) => p.id !== ignoreId && normalize(p.nome) === target);
}

export function isEnderecoDuplicado(endereco, produtos, ignoreId = null) {
  const target = normalize(endereco);
  if (!target) return false;
  return produtos.some((p) => p.id !== ignoreId && normalize(p.endereco) === target);
}

export function podeExcluir(produto) {
  return Number(produto?.quantidade ?? 0) === 0;
}
