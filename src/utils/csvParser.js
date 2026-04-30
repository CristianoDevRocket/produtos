import Papa from 'papaparse';

const FIELD_ALIASES = {
  nome: ['nome', 'name'],
  quantidade: ['quantidade', 'qtd', 'quantity'],
  endereco: ['endereco', 'localizacao', 'localização', 'location', 'address'],
  armazem: ['armazem', 'armazém', 'warehouse'],
  lote: ['lote', 'batch'],
  codigo_barras: ['codigo_barras', 'código_barras', 'codigobarras', 'barcode', 'ean'],
  validade: ['validade', 'expiry', 'expiration'],
};

function pick(row, candidates) {
  for (const key of candidates) {
    if (key in row && row[key] !== '' && row[key] !== undefined && row[key] !== null) {
      return row[key];
    }
  }
  return undefined;
}

function normalizeRow(row) {
  const lowered = {};
  for (const [k, v] of Object.entries(row)) lowered[k.trim().toLowerCase()] = v;
  return {
    nome: pick(lowered, FIELD_ALIASES.nome)?.toString().trim(),
    quantidade: Number(pick(lowered, FIELD_ALIASES.quantidade)),
    endereco: pick(lowered, FIELD_ALIASES.endereco)?.toString().trim(),
    armazem: pick(lowered, FIELD_ALIASES.armazem)?.toString().trim(),
    lote: pick(lowered, FIELD_ALIASES.lote)?.toString().trim(),
    codigo_barras: pick(lowered, FIELD_ALIASES.codigo_barras)?.toString().trim() || '',
    validade: pick(lowered, FIELD_ALIASES.validade)?.toString().trim() || null,
  };
}

export function parseCSV(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => resolve(result.data.map(normalizeRow)),
      error: (err) => reject(err),
    });
  });
}
