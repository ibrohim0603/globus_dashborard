import React, { useContext, useState } from "react";
import { Input, Form, Button, Upload, message } from "antd";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { usePostData } from "../../../utils/hooks";
import { queryClient } from "../../../App";
import { useTranslation } from "react-i18next";

const CategoryAddForm = ({ formRef, setModalOpen }) => {
  const { t } = useTranslation();
  // const { queryClient } = useContext(QueryContext);
  const postMutate = usePostData("/category");

  const onFinish = (values) => {
    postMutate.mutate(
      { ...values, photoId: values?.photoId?.file?.response?.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["categories"] });
          formRef.current.resetFields();
          setModalOpen(false);
        },
      }
    );
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
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
        // setPhotoId(info.file.response.id);
        message.success(info.file.name + " " + t("file uploaded successfully"));
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <Form
      ref={formRef}
      name="basic"
      labelCol={{ span: 12 }}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        // label="Name_Uz"
        name="name_Uz"
        rules={[
          {
            required: true,
            message: t("Please, write ", { text: t("Name", { text: "_Uz" }) }),
          },
        ]}
      >
        <Input placeholder={t("Name", { text: "_Uz" })} />
      </Form.Item>

      <Form.Item
        // label="Name_Ru"
        name="name_Ru"
        rules={[
          {
            required: true,
            message: t("Please, write ", { text: t("Name", { text: "_Ru" }) }),
          },
        ]}
      >
        <Input placeholder={t("Name", { text: "_Ru" })} />
      </Form.Item>
      <Form.Item
        name="name_En"
        rules={[
          {
            required: true,
            message: t("Please, write ", { text: t("Name", { text: "_En" }) }),
          },
        ]}
      >
        <Input placeholder={t("Name", { text: "_En" })} />
      </Form.Item>
      <div style={{ display: "flex", gap: 20 }}>
        <Form.Item
          name="photoId"
          rules={[{ required: true, message: t("Please, upload photo") }]}
        >
          <Upload {...props}>
            <Button
              style={{ display: "flex", alignItems: "center", gap: 10 }}
              icon={<AiOutlineCloudUpload style={{ fontSize: 20 }} />}
            >
              {t("Click to Upload")}
            </Button>
          </Upload>
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          disabled={postMutate.isLoading}
        >
          {t("Send")}
        </Button>
      </div>
    </Form>
  );
};

export default CategoryAddForm;
