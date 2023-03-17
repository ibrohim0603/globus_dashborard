import { Button, Col, Form, Input, message, Row } from "antd";
import React, { useContext, useRef, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import PostProductModal from "../../../components/postProductModal/PostProductModal";
import { useEditData, usePostData } from "../../../utils/hooks";
import { queryClient } from "../../../App";
import { useTranslation } from "react-i18next";

const InfoEdit = ({ infos, editRef, setModalOpen, telAddBtn }) => {
  const data = infos?.data?.data[0];
  const { t } = useTranslation();
  const editMut = useEditData("/information");

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
                message: t("Please, input your ", { text: t("address") }),
              },
            ]}
          >
            <Input
              placeholder={t("Please, input your ", { text: t("address") })}
            />
          </Form.Item>

          <Form.Item
            name="addressMap"
            rules={[
              {
                required: true,
                message: t("Please, input your ", {
                  text: t("address map link"),
                }),
              },
            ]}
          >
            <Input
              placeholder={t("Please, input your ", {
                text: t("address map link"),
              })}
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: t("Please, input your ", { text: t("email") }),
              },
            ]}
          >
            <Input
              placeholder={t("Please, input your ", { text: t("email") })}
            />
          </Form.Item>

          <Form.Item
            name="telegram"
            rules={[
              {
                required: true,
                message: t("Please, input your ", { text: t("telegram") }),
              },
            ]}
          >
            <Input
              placeholder={t("Please, input your ", { text: t("telegram") })}
            />
          </Form.Item>

          <Form.Item
            name="instagram"
            rules={[
              {
                required: true,
                message: t("Please, input your ", { text: t("instagram") }),
              },
            ]}
          >
            <Input
              placeholder={t("Please, input your ", { text: t("instagram") })}
            />
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
                          message: t("Phone number") + " " + Number(index + 1),
                        },
                      ]}
                      noStyle
                    >
                      <Input
                        placeholder={
                          t("Phone number") + " " + Number(index + 1)
                        }
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
                    {t("Add number")}
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
