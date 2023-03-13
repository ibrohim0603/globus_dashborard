import { Button, Col, Form, Input, message, Row } from "antd";
import React, { useContext, useRef, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import PostProductModal from "../../../components/postProductModal/PostProductModal";
import { useEditData, usePostData } from "../../../utils/hooks";
import { QueryContext } from "../../../App";

const InfoEdit = ({ infos, editRef, setModalOpen, telAddBtn }) => {
  const data = infos?.data?.data[0];
  const { queryClient } = useContext(QueryContext);

  const editMut = useEditData("/information");
  console.log(editRef?.current);

  const onFinish = (values) => {
    console.log(values);
    if (!values?.phone) {
      message.error("Tel nomer qushing");
    } else {
      editMut.mutate(
        {
          id: data?.id,
          value: values,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["infos"] });
            message.success("Information was successfully changed");
            setModalOpen(false);
            // editRef.current.resetFields();
          },
        }
      );
    }
  };

  return (
    <>
      {editMut.isLoading ? (
        "loading"
      ) : (
        <Form
          ref={editRef}
          name="basic"
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto",
            columnGap: 10,
          }}
          fields={[
            {
              name: ["address"],
              value: data?.address,
            },
            {
              name: ["addressMap"],
              value: data?.addressMap,
            },
            {
              name: ["email"],
              value: data?.email,
            },
            {
              name: ["instagram"],
              value: data?.instagram,
            },
            {
              name: ["telegram"],
              value: data?.telegram,
            },
            {
              name: ["email"],
              value: data?.email,
            },
            {
              name: ["phone"],
              value: data?.phone,
            },
          ]}
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
                        style={{ width: "92%", marginRight: 5 }}
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
                    block
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
          <Button htmlType="submit" type="primary">
            Send
          </Button>
        </Form>
      )}
    </>
  );
};

export default InfoEdit;
