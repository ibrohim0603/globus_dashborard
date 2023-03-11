import React, { useContext } from "react";
import { Input, Form, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { usePostData } from "../../../utils/hooks";
import { QueryContext } from "../../../App";
import './addInfoForm.sass'

const AddInfoForm = ({ formRef, setModalOpen }) => {
  const { queryClient } = useContext(QueryContext);
  const postMutate = usePostData("/category");

  const onFinish = (values) => {
    console.log(values);
    setModalOpen(false)
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      ref={formRef}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="address"
        rules={[{ required: true, message: "Please input address!" }]}
      >
        <Input placeholder="address" />
      </Form.Item>

      <Form.Item
        name="addressMap"
        rules={[{ required: true, message: "Please input your addressMap!" }]}
      >
        <Input placeholder="map address iframe" />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input placeholder="email" />
      </Form.Item>

      <Form.Item
        name="instagram"
        rules={[{ required: true, message: "Please input your instagram!" }]}
      >
        <Input placeholder="instagram" />
      </Form.Item>

      <Form.Item
        name="telegram"
        rules={[{ required: true, message: "Please input your telegram!" }]}
      >
        <Input placeholder="telegram" />
      </Form.Item>

      <Form.List
        name="phone"
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                label={`Phone num ${index + 1}`}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input phone number or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input placeholder="phone number" style={{ width: '60%' }} />
                </Form.Item>

                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}

              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: '60%' }}
                icon={<PlusOutlined />}
              >
                Add num
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>

      <div style={{ display: "flex", gap: 20 }}>
        <Button
          type="primary"
          htmlType="submit"
          disabled={postMutate.isLoading}
        >
          Send
        </Button>
      </div>
    </Form>
  );
};

export default AddInfoForm;
