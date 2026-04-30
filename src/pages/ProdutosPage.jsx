import { Alert, Card } from 'antd';
import { useProdutos } from '../hooks/useProdutos';
import ProdutosTable from '../components/ProdutosTable';

export default function ProdutosPage() {
  const { produtos, loading, error } = useProdutos();

  return (
    <Card title="Produtos">
      {error && (
        <Alert
          type="error"
          showIcon
          message="Falha ao carregar produtos"
          description="Verifique se o json-server está rodando em http://localhost:3001"
          style={{ marginBottom: 16 }}
        />
      )}
      <ProdutosTable produtos={produtos} loading={loading} />
    </Card>
  );
}
