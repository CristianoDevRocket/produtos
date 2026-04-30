import { useRef, useState } from 'react';
import { Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { parseCSV } from '../utils/csvParser';
import { isEnderecoDuplicado, isNomeDuplicado } from '../utils/validators';

export default function ImportCSVButton({ produtos, onCreate }) {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    setLoading(true);
    try {
      const rows = await parseCSV(file);
      let created = 0;
      let skipped = 0;
      const localCache = [...produtos];

      for (const row of rows) {
        const invalid =
          !row.nome ||
          !row.endereco ||
          !row.armazem ||
          !row.lote ||
          Number.isNaN(row.quantidade) ||
          row.quantidade < 0 ||
          isNomeDuplicado(row.nome, localCache) ||
          isEnderecoDuplicado(row.endereco, localCache);

        if (invalid) {
          skipped++;
          continue;
        }

        const createdItem = await onCreate(row);
        localCache.push(createdItem);
        created++;
      }

      message.success(`Importação concluída: ${created} criado(s), ${skipped} ignorado(s)`);
    } catch {
      message.error('Falha ao processar o CSV');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <input
        type="file"
        accept=".csv,text/csv"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={handleFile}
      />
      <Button
        icon={<UploadOutlined />}
        loading={loading}
        onClick={() => inputRef.current?.click()}
      >
        Importar CSV
      </Button>
    </>
  );
}
