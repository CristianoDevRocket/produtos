import { useState } from 'react';
import { Alert, Button, Card, Modal, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useProdutos } from '../hooks/useProdutos';
import ProdutosTable from '../components/ProdutosTable';
import ProdutoFormModal from '../components/ProdutoFormModal';
import { podeExcluir } from '../utils/validators';

export default function ProdutosPage() {
  const { produtos, loading, error, create, update, remove } = useProdutos();
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

  const handleDelete = (produto) => {
    if (!podeExcluir(produto)) {
      Modal.warning({
        title: 'Não é possível excluir',
        content: `O produto "${produto.nome}" ainda possui ${produto.quantidade} unidade(s) em estoque. Zere a quantidade antes de excluir.`,
      });
      return;
    }
    Modal.confirm({
      title: 'Excluir produto',
      content: `Tem certeza que deseja excluir "${produto.nome}"?`,
      okText: 'Excluir',
      okButtonProps: { danger: true },
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          await remove(produto.id);
          message.success('Produto excluído');
        } catch {
          message.error('Falha ao excluir');
        }
      },
    });
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
        <ProdutosTable
          produtos={produtos}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
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
