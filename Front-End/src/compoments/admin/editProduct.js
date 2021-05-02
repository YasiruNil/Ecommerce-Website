import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const EditProduct = ({ visible, onCreate, onCancel, selectedProduct }) => {
  const [form] = Form.useForm();
  const {
    name,
    description,
    price,
    quantity,
    sold,
    shipping,
    _id,
  } = selectedProduct;
  useEffect(() => {
    form.setFieldsValue(selectedProduct);
  });
  return (
    <>
      <Modal
        visible={visible}
        title='Basic Modal'
        okText='Ok'
        cancelText='Cancel'
        width={500}
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              values._id = _id;
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}>
        <Form
          {...formItemLayout}
          form={form}
          layout='Horizontal'
          name='form_in_modal'
          initialValues={{
            name,
            description,
            price,
            quantity,
            sold,
            shipping,
          }}>
          <Form.Item
            name='name'
            label='Name'
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name='description'
            label='Description'
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            name='price'
            label='Price'
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name='quantity'
            label='Quantity'
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name='sold'
            label='Sold'
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name='shipping'
            label='Shipping'
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditProduct;
