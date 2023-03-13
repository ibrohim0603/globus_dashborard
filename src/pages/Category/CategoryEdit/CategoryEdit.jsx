import React, { useContext, useEffect, useState } from "react";
import { Input, Form, Button, Upload, message } from "antd";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useEditData, useGetData } from "../../../utils/hooks";
import { QueryContext } from "../../../App";

// import CategoryEdit from "../CategoryEdit/CategoryEdit";

const CategoryEdit = ({ editRef, id, setModalOpen }) => {
  // const [photoId, setPhotoId] = useState(null);
  const { queryClient } = useContext(QueryContext);
  const editMutate = useEditData("/category");

  const getFields = useGetData(["categories", id], `/category/${id}`);
  const { data } = getFields;

  const onFinish = (values) => {
    queryClient.invalidateQueries({ queryKey: ["categories", id] });
    editMutate.mutate(
      {
        value: {
          ...values,
          photoId: values?.photoId?.file?.response?.id || data?.photoId,
        },
        id,
      },
      {
        onSuccess: () => {
          setModalOpen(false);
          queryClient.invalidateQueries({ queryKey: ["categories"] });
          editRef.current.resetFields();
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
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <>
      {editMutate.isLoading ? (
        "Loading"
      ) : (
        <Form
          ref={editRef}
          name="basic"
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          fields={[
            {
              name: ["name_Uz"],
              value: data?.name_Uz,
            },
            {
              name: ["name_Ru"],
              value: data?.name_Ru,
            },
            {
              name: ["name_En"],
              value: data?.name_En,
            },
          ]}
        >
          <Form.Item
            // label="Name_Uz"
            name="name_Uz"
            rules={[{ required: true, message: "Please input your Name_Uz!" }]}
          >
            <Input placeholder="Name_Uz" />
          </Form.Item>

          <Form.Item
            // label="Name_Ru"
            name="name_Ru"
            rules={[{ required: true, message: "Please input your Name_Ru!" }]}
          >
            <Input placeholder="Name_Ru" />
          </Form.Item>
          <Form.Item
            name="name_En"
            rules={[{ required: true, message: "Please input your Name_En!" }]}
          >
            <Input placeholder="Name_En" />
          </Form.Item>
          <div style={{ display: "flex", gap: 20 }}>
            <Form.Item name="photoId">
              <Upload {...props}>
                <Button
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                  icon={<AiOutlineCloudUpload style={{ fontSize: 20 }} />}
                >
                  Click to Upload
                </Button>
              </Upload>
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={editMutate.isLoading}
            >
              Send
            </Button>
          </div>
        </Form>
      )}
    </>
  );
};

export default CategoryEdit;
