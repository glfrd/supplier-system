import { Table, Button, Modal, Form, Input } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Suppliers() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(null);

  const fetchSuppliers = async () => {
    const res = await axios.get("/api/suppliers");
    setData(res.data);
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

const onFinish = async (values) => {
  if (editing) {
    await axios.put(`/api/suppliers/${editing.id}`, values);
  } else {
    await axios.post("/api/suppliers", values);
  }

  setOpen(false);
  setEditing(null);
  form.resetFields();
  fetchSuppliers();
};

  return (
    <div style={{ padding: 20 }}>
      <Button type="primary" onClick={() => setOpen(true)}>
        Add Supplier
      </Button>

    columns={[
      { title: "Company", dataIndex: "companyName" },
      { title: "Email", dataIndex: "contactEmail" },
      { title: "Status", dataIndex: "status" },
      {
        title: "Action",
        render: (_, record) => (
          <>
            <Button
              onClick={() => {
                form.setFieldsValue(record);
                setOpen(true);
                setEditing(record);
              }}
            >
              Edit
            </Button>

            <Button
              danger
              style={{ marginLeft: 8 }}
              onClick={async () => {
                await axios.delete(`/api/suppliers/${record.id}`);
                fetchSuppliers();
              }}
            >
              Blacklist
            </Button>
          </>
        )
      }
    ]}

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