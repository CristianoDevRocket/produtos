import { useState } from 'react';
import { Alert, Button, Card, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useProdutos } from '../hooks/useProdutos';
import ProdutosTable from '../components/ProdutosTable';
import ProdutoFormModal from '../components/ProdutoFormModal';

export default function ProdutosPage() {
  const { produtos, loading, error, create } = useProdutos();
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (payload) => {
    try {
      await create(payload);
      message.success('Produto criado');
      setModalOpen(false);
    } catch {
      message.error('Falha ao criar produto');
    }
  };

  return (
    <Card
      title="Produtos"
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>
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
        <ProdutosTable produtos={produtos} loading={loading} />
      </Space>

      <ProdutoFormModal
        open={modalOpen}
        produtos={produtos}
        onCancel={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </Card>
  );
}
