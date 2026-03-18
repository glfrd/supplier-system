import { Form, Input, Button, Card } from "antd";

export default function Login() {
  const onFinish = (values) => {
    console.log(values);
    alert("Login working boss 👌");
  };

  return (
    <Card title="Login" style={{ maxWidth: 320, margin: "100px auto" }}>
      <Form onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true }]}>
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Login
        </Button>
      </Form>
    </Card>
  );
}