import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, Radio, Select, Upload, message } from "antd";

const PostForm = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {/* <Form.Item label="Radio">
        <Radio.Group>
          <Radio value="male"> Male </Radio>
          <Radio value="female"> Female </Radio>
          <Radio value="both"> Both </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Input"  >
        <Input />
      </Form.Item>
      <Form.Item label="Select">
        <Select>
          <Select.Option value="demo">Demo</Select.Option>
        </Select>
      </Form.Item> */}

      <Form.Item label="Upload" valuePropName="fileList">
        <Upload {...props}>
          <Button>Click to Upload</Button>
        </Upload>
      </Form.Item>
    </Form>
  );
};

export default PostForm;
const props = {
  name: "photo",
  action: "http://3.19.30.204/upload/upload",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
