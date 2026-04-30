import { useEffect } from 'react';
import { DatePicker, Form, Input, InputNumber, Modal, Select } from 'antd';
import dayjs from 'dayjs';
import { ARMAZENS } from '../constants';
import { isEnderecoDuplicado, isNomeDuplicado } from '../utils/validators';

export default function ProdutoFormModal({
  open,
  produto,
  produtos,
  onCancel,
  onSubmit,
}) {
  const [form] = Form.useForm();
  const isEdit = Boolean(produto?.id);

  useEffect(() => {
    if (!open) return;

    if (produto) {
      form.setFieldsValue({
        nome: produto.nome || '',
        quantidade: produto.quantidade ?? 0,
        endereco: produto.endereco || '',
        armazem: produto.armazem || undefined,
        lote: produto.lote || '',
        codigo_barras: produto.codigo_barras || '',
        validade: produto.validade ? dayjs(produto.validade) : null,
      });
    } else {
      form.resetFields();
    }
  }, [open, produto, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        nome: values.nome.trim(),
        quantidade: Number(values.quantidade),
        endereco: values.endereco.trim(),
        armazem: values.armazem,
        lote: values.lote.trim(),
        codigo_barras: values.codigo_barras?.trim() || '',
        validade: values.validade
          ? values.validade.format('YYYY-MM-DD')
          : null,
      };

      await onSubmit(payload);
      form.resetFields();
    } catch (err) {
      // evita quebrar o modal se houver erro de validação
      console.log(err);
    }
  };

  return (
    <Modal
      open={open}
      title={isEdit ? 'Editar Produto' : 'Novo Produto'}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={handleOk}
      okText={isEdit ? 'Salvar' : 'Criar'}
      cancelText="Cancelar"
      width={640}
      destroyOnClose={false} // 🔥 importante
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="nome"
          label="Nome"
          rules={[
            { required: true, message: 'Informe o nome' },
            {
              validator: (_, value) =>
                isNomeDuplicado(value, produtos, produto?.id)
                  ? Promise.reject(new Error('Já existe um produto com este nome'))
                  : Promise.resolve(),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="quantidade"
          label="Quantidade"
          rules={[{ required: true, message: 'Informe a quantidade' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="endereco"
          label="Localização"
          rules={[
            { required: true, message: 'Informe a localização' },
            {
              validator: (_, value) =>
                isEnderecoDuplicado(value, produtos, produto?.id)
                  ? Promise.reject(new Error('Já existe um produto com esta localização'))
                  : Promise.resolve(),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="armazem"
          label="Armazém"
          rules={[{ required: true, message: 'Selecione o armazém' }]}
        >
          <Select
            options={ARMAZENS.map((a) => ({ label: a, value: a }))}
          />
        </Form.Item>

        <Form.Item
          name="lote"
          label="Lote"
          rules={[{ required: true, message: 'Informe o lote' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="codigo_barras" label="Código de Barras">
          <Input />
        </Form.Item>

        <Form.Item name="validade" label="Validade">
          <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}