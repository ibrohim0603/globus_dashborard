import { Button, Col, Form, Input, Row } from "antd";
import React, { useRef, useState } from "react";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import PostProductModal from "../../../components/postProductModal/PostProductModal";

const InfoAdd = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const addRef = useRef(null);

  const addResForm = () => {
    setModalOpen(false);
    addRef.current.resetFields();
  };

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <>
      <Row justify={"center"}>
        <Col span={4}>
          <Button
            type="primary"
            size="large"
            block
            onClick={() => setModalOpen(true)}
            style={{
              color: "#fff",
              fontSize: "20px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
            }}
          >
            <AiOutlinePlus />
            Add
          </Button>
        </Col>
      </Row>

      <PostProductModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        resForm={addResForm}
      >
        <Form
          ref={addRef}
          name="basic"
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto",
            columnGap: 10,
          }}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            <Input placeholder="Please input your address!" />
          </Form.Item>

          <Form.Item
            name="addressMap"
            rules={[
              {
                required: true,
                message: "Please input your address map link!",
              },
            ]}
          >
            <Input placeholder="Please input your address map link!" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input placeholder="Please input your address!" />
          </Form.Item>

          <Form.Item
            name="telegram"
            rules={[
              {
                required: true,
                message: "Please input your telegram!",
              },
            ]}
          >
            <Input placeholder="Please input your telegram!" />
          </Form.Item>
          <Form.Item
            name="instagram"
            rules={[
              {
                required: true,
                message: "Please input your instagram!",
              },
            ]}
          >
            <Input placeholder="Please input your instagram!" />
          </Form.Item>
        </Form>
        <Form.List name="phones">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  label={index === 0 ? "Passengers" : ""}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message:
                          "Please input passenger's name or delete this field.",
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder="passenger name"
                      style={{
                        width: "60%",
                      }}
                    />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <AiOutlineMinusCircle
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
                  style={{
                    width: "60%",
                  }}
                  icon={<AiOutlinePlusCircle />}
                >
                  Add field
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
      </PostProductModal>
    </>
  );
};

export default InfoAdd;
