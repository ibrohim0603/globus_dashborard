import { Button, Col, Form, Input, message, Row } from "antd";
import React, { useContext, useRef, useState } from "react";
import {
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
  AiOutlinePlus,
} from "react-icons/ai";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import PostProductModal from "../../../components/postProductModal/PostProductModal";
import { usePostData } from "../../../utils/hooks";
import { QueryContext } from "../../../App";

const InfoAdd = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const addRef = useRef(null);
  const { queryClient } = useContext(QueryContext);

  const postMut = usePostData("/information");

  const telAddBtn = (add) => {
    const phoneArr = addRef?.current?.getFieldValue("phone");

    if (phoneArr.some((i) => !!i == false)) {
      message.error("Bo'sh joyni to'ldiring");
    } else add();
  };

  const addResForm = () => {
    setModalOpen(false);
    addRef.current.resetFields();
  };

  const onFinish = (values) => {
    if (!values?.phone) {
      message.error("Tel nomer qushing");
    } else {
      postMut.mutate(
        {
          ...values,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["infos"] });
            addRef.current.resetFields();
            setModalOpen(false);
          },
        }
      );
    }
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

          <Form.List name="phone">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    // label={}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      style={{ width: "100%" }}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: `Phone num ${index + 1}`,
                        },
                      ]}
                      noStyle
                    >
                      <Input
                        placeholder={`Phone num ${index + 1}`}
                        style={{ width: "90%", marginRight: 5 }}
                      />
                    </Form.Item>

                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        style={{
                          fontSize: 20,
                          lineHeight: 1,
                          marginTop: 3,
                          marginLeft: 5,
                        }}
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => telAddBtn(add)}
                    style={{ width: "100%" }}
                    icon={<PlusOutlined />}
                  >
                    Add num
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
          <Button htmlType="submit">send</Button>
        </Form>
      </PostProductModal>
    </>
  );
};

export default InfoAdd;
