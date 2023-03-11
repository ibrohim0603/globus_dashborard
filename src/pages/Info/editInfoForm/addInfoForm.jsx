import React, { useContext, useState } from "react";
import { Input, Form, Button } from "antd";
import { useEditData, useGetData } from "../../../utils/hooks";
import { QueryContext } from "../../../App";

const EditInfoForm = ({ formRef, setModalOpen, id}) => {
  const infos = useGetData(["infos"], "/information");
  const data = infos?.data?.data[0]
  const infoId = data?.id
  console.log(data);
  const { queryClient } = useContext(QueryContext);
  const editMutate = useEditData([`infos`, infoId], `/informaiton${infoId}`);


  const onFinish = (values) => {
    editMutate.mutate(
      { values, id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["informaiton"] });
          formRef.current.resetFields();
          setModalOpen(false);
        },
      }
    );
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
      ]}
    >
      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: "Please input address!" }]}
      >
        <Input placeholder="address" />
      </Form.Item>

      <Form.Item
        label="Address map"
        name="addressMap"
        rules={[{ required: true, message: "Please input your addressMap!" }]}
      >
        <Input placeholder="map address iframe" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input placeholder="email" />
      </Form.Item>

      <Form.Item
        label="Instagram"
        name="instagram"
        rules={[{ required: true, message: "Please input your instagram!" }]}
      >
        <Input placeholder="instagram" />
      </Form.Item>

      <Form.Item
        label="Telegram"
        name="telegram"
        rules={[{ required: true, message: "Please input your telegram!" }]}
      >
        <Input placeholder="telegram" />
      </Form.Item>

      {data?.phone?.map((e, i) => {
        return (
          <Form.Item
            label={`phone ${i + 1}`}
            name="phone"
          >
            <Input
              placeholder="phone"
              defaultValue={e}
            />
          </Form.Item>
        )
      })}

      <div style={{ display: "flex", gap: 20 }}>
        <Button
          type="primary"
          htmlType="submit"
          disabled={editMutate.isLoading}
        >
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default EditInfoForm;
