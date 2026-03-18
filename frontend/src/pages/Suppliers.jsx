import { Table, Button, Modal, Form, Input } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Suppliers() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const fetchSuppliers = async () => {
    const res = await axios.get("/api/suppliers");
    setData(res.data);
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const onFinish = async (values) => {
    await axios.post("/api/suppliers", values);
    setOpen(false);
    form.resetFields();
    fetchSuppliers();
  };

  return (
    <div style={{ padding: 20 }}>
      <Button type="primary" onClick={() => setOpen(true)}>
        Add Supplier
      </Button>

      <Table
        style={{ marginTop: 20 }}
        dataSource={data}
        rowKey="id"
        columns={[
          { title: "Company", dataIndex: "companyName" },
          { title: "Email", dataIndex: "contactEmail" },
          { title: "Status", dataIndex: "status" }
        ]}
      />

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        title="Add Supplier"
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="companyName" rules={[{ required: true }]}>
            <Input placeholder="Company Name" />
          </Form.Item>

          <Form.Item name="contactEmail">
            <Input placeholder="Email" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}