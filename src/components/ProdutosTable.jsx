import { Button, Space, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { formatQuantidade, formatValidade } from '../utils/formatters';

export default function ProdutosTable({ produtos, loading, onEdit, onDelete }) {
  const baseColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      sorter: (a, b) => Number(a.id) - Number(b.id),
    },
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
      sorter: (a, b) => a.nome.localeCompare(b.nome),
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantidade',
      key: 'quantidade',
      align: 'right',
      width: 130,
      sorter: (a, b) => Number(a.quantidade) - Number(b.quantidade),
      render: (v) => formatQuantidade(v),
    },
    {
      title: 'Localização',
      dataIndex: 'endereco',
      key: 'endereco',
    },
    {
      title: 'Armazém',
      dataIndex: 'armazem',
      key: 'armazem',
      filters: [
        { text: 'Centro Logístico 1', value: 'Centro Logístico 1' },
        { text: 'Depósito Central', value: 'Depósito Central' },
        { text: 'Hub Zona Sul', value: 'Hub Zona Sul' },
        { text: 'Armazém A', value: 'Armazém A' },
        { text: 'Armazém B', value: 'Armazém B' },
      ],
      onFilter: (value, record) => record.armazem === value,
    },
    {
      title: 'Validade',
      dataIndex: 'validade',
      key: 'validade',
      width: 140,
      render: (v) => (v ? formatValidade(v) : <Tag>Sem validade</Tag>),
    },
    {
      title: 'Lote',
      dataIndex: 'lote',
      key: 'lote',
      width: 110,
    },
  ];

  const actionsColumn = {
    title: 'Ações',
    key: 'acoes',
    width: 200,
    fixed: 'right',
    render: (_, record) => (
      <Space>
        {onEdit && (
          <Button icon={<EditOutlined />} onClick={() => onEdit(record)} size="small">
            Editar
          </Button>
        )}
        {onDelete && (
          <Button danger icon={<DeleteOutlined />} onClick={() => onDelete(record)} size="small">
            Excluir
          </Button>
        )}
      </Space>
    ),
  };

  const columns = onEdit || onDelete ? [...baseColumns, actionsColumn] : baseColumns;

  return (
    <Table
      rowKey="id"
      loading={loading}
      columns={columns}
      dataSource={produtos}
      scroll={{ x: 1100 }}
      pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t) => `${t} produto(s)` }}
    />
  );
}
