import { DatePicker, Form, Input, InputNumber, Modal, Select } from 'antd';
import { ARMAZENS } from '../constants';
import { isEnderecoDuplicado, isNomeDuplicado } from '../utils/validators';

export default function ProdutoFormModal({ open, produtos, onCancel, onSubmit }) {
  const [form] = Form.useForm();

  const handleOk = async () => {
    const values = await form.validateFields();
    const payload = {
      nome: values.nome.trim(),
      quantidade: Number(values.quantidade),
      endereco: values.endereco.trim(),
      armazem: values.armazem,
      lote: values.lote.trim(),
      codigo_barras: values.codigo_barras?.trim() || '',
      validade: values.validade ? values.validade.format('YYYY-MM-DD') : null,
    };
    await onSubmit(payload);
    form.resetFields();
  };

  return (
    <Modal
      open={open}
      title="Novo Produto"
      onCancel={onCancel}
      onOk={handleOk}
      okText="Criar"
      cancelText="Cancelar"
      destroyOnClose
      width={640}
    >
      <Form form={form} layout="vertical" preserve={false}>
        <Form.Item
          name="nome"
          label="Nome"
          rules={[
            { required: true, message: 'Informe o nome' },
            {
              validator: (_, value) =>
                isNomeDuplicado(value, produtos)
                  ? Promise.reject(new Error('Já existe um produto com este nome'))
                  : Promise.resolve(),
            },
          ]}
        >
          <Input placeholder="Ex: Detergente Líquido" />
        </Form.Item>

        <Form.Item
          name="quantidade"
          label="Quantidade"
          rules={[
            { required: true, message: 'Informe a quantidade' },
            {
              validator: (_, value) =>
                value === undefined || value === null || Number(value) >= 0
                  ? Promise.resolve()
                  : Promise.reject(new Error('A quantidade não pode ser negativa')),
            },
          ]}
        >
          <InputNumber min={0} style={{ width: '100%' }} placeholder="0" />
        </Form.Item>

        <Form.Item
          name="endereco"
          label="Localização"
          rules={[
            { required: true, message: 'Informe a localização' },
            {
              validator: (_, value) =>
                isEnderecoDuplicado(value, produtos)
                  ? Promise.reject(new Error('Já existe um produto com esta localização'))
                  : Promise.resolve(),
            },
          ]}
        >
          <Input placeholder="Ex: Av. Brasil, 28 - Osasco/SP" />
        </Form.Item>

        <Form.Item
          name="armazem"
          label="Armazém"
          rules={[{ required: true, message: 'Selecione o armazém' }]}
        >
          <Select
            placeholder="Selecione"
            options={ARMAZENS.map((a) => ({ label: a, value: a }))}
            showSearch
          />
        </Form.Item>

        <Form.Item name="lote" label="Lote" rules={[{ required: true, message: 'Informe o lote' }]}>
          <Input placeholder="Ex: L1234" />
        </Form.Item>

        <Form.Item name="codigo_barras" label="Código de Barras">
          <Input placeholder="Opcional" />
        </Form.Item>

        <Form.Item name="validade" label="Validade (opcional)">
          <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
