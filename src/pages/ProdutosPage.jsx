import { useState } from 'react';
import { Alert, Button, Card, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useProdutos } from '../hooks/useProdutos';
import ProdutosTable from '../components/ProdutosTable';
import ProdutoFormModal from '../components/ProdutoFormModal';

export default function ProdutosPage() {
  const { produtos, loading, error, create, update } = useProdutos();
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleNew = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleEdit = (produto) => {
    setEditing(produto);
    setModalOpen(true);
  };

  const handleSubmit = async (payload) => {
    try {
      if (editing) {
        await update(editing.id, { ...editing, ...payload });
        message.success('Produto atualizado');
      } else {
        await create(payload);
        message.success('Produto criado');
      }
      setModalOpen(false);
      setEditing(null);
    } catch {
      message.error('Falha ao salvar produto');
    }
  };

  return (
    <Card
      title="Produtos"
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={handleNew}>
          Novo Produto
        </Button>
      }
    >
      {error && (
        <Alert
          type="error"
          showIcon
          message="Falha ao carregar produtos"
          description="Verifique se o json-server está rodando em http://localhost:3001"
          style={{ marginBottom: 16 }}
        />
      )}

      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <ProdutosTable produtos={produtos} loading={loading} onEdit={handleEdit} />
      </Space>

      <ProdutoFormModal
        open={modalOpen}
        produto={editing}
        produtos={produtos}
        onCancel={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
      />
    </Card>
  );
}
