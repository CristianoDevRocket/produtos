import { Input, Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ARMAZENS } from '../constants';

export default function SearchBar({ search, armazem, onChangeSearch, onChangeArmazem }) {
  return (
    <Space wrap>
      <Input
        allowClear
        prefix={<SearchOutlined />}
        placeholder="Buscar por nome, lote ou localização"
        value={search}
        onChange={(e) => onChangeSearch(e.target.value)}
        style={{ width: 320 }}
      />
      <Select
        allowClear
        placeholder="Filtrar por armazém"
        value={armazem || undefined}
        onChange={(v) => onChangeArmazem(v ?? '')}
        style={{ width: 220 }}
        options={ARMAZENS.map((a) => ({ label: a, value: a }))}
      />
    </Space>
  );
}
