import { Button, Input, Space } from "antd";
import "./SignUpEntry.css";

export function SignUpEntry() {
  return (
    <div>
      <h1>Register for a fast application experience with AI</h1>
      <Space.Compact style={{ maxWidth: "300px" }}>
        <Input defaultValue="Enter your email to try" />
        <Button type="primary">Sign up</Button>
      </Space.Compact>
    </div>
  );
}
