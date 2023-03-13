import React, { useContext, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import {
  InputNumber,
  Form,
  Input,
  Select,
  message,
  Button,
  Upload,
} from "antd";
import { useGetData, usePostData } from "../../../utils/hooks";
import { QueryContext } from "../../../App";

const AddProductForm = ({ addRef, setModalOpen }) => {
  // const [photoId, setPhotoId] = useState(null);
  const categs = useGetData(["categories"], "/category");
  const { queryClient } = useContext(QueryContext);

  const postMutate = usePostData("/products");

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

  const onFinish = (values) => {
    // console.log("Success:", {
    //   ...values,
    //   photoId: values?.photoId?.file.response.id,
    // });
    postMutate.mutate(
      {
        ...values,
        photoId: values?.photoId?.file?.response?.id,
      },
      {
        onSuccess: (d) => {
          console.log(d, "<[----------------------");
          queryClient.invalidateQueries({ queryKey: ["products"] });
          setModalOpen(false);
        },
      }
    );
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const options = categs?.data?.data.map((d) => {
    return {
      value: d?.id,
      label: d?.name_Uz,
    };
  });
  // const handleChange = (val) => {
  //   setCategVal(val);
  //   console.log(val);
  // };

  return (
    <>
      <Form
        ref={addRef}
        name="basic"
        labelCol={{
          span: 1,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto",
          columnGap: 10,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="name_Uz"
          rules={[{ required: true, message: "Please, write name_Uz" }]}
        >
          <Input placeholder="name_Uz" />
        </Form.Item>
        <Form.Item
          name="name_Ru"
          rules={[{ required: true, message: "Please, write name_Ru" }]}
        >
          <Input placeholder="name_Ru" />
        </Form.Item>
        <Form.Item
          name="name_En"
          rules={[{ required: true, message: "Please, write name_En" }]}
        >
          <Input placeholder="name_En" />
        </Form.Item>
        <Form.Item
          name="description_Uz"
          rules={[{ required: true, message: "Please, write description_Uz" }]}
        >
          <Input.TextArea placeholder="description_Uz" />
        </Form.Item>
        <Form.Item
          name="description_Ru"
          rules={[{ required: true, message: "Please, write description_Ru" }]}
        >
          <Input.TextArea placeholder="description_Ru" />
        </Form.Item>
        <Form.Item
          name="description_En"
          rules={[{ required: true, message: "Please, write description_En" }]}
        >
          <Input.TextArea placeholder="description_En" />
        </Form.Item>
        <Form.Item
          name="type"
          rules={[{ required: true, message: "Please, write type" }]}
        >
          <Input placeholder="type" />
        </Form.Item>
        <Form.Item
          name="size"
          rules={[{ required: true, message: "Please, write size" }]}
        >
          <Input placeholder="size" size="middle" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="color"
          rules={[{ required: true, message: "Please, write color" }]}
        >
          <Input placeholder="color" />
        </Form.Item>

        <Form.Item
          name="discount"
          rules={[{ required: true, message: "Please, write discount" }]}
        >
          <InputNumber
            placeholder="discount"
            size="middle"
            style={{ width: "100%" }}
            min={0}
            type="number"
          />
        </Form.Item>

        <Form.Item
          name="price"
          rules={[{ required: true, message: "Please, write price" }]}
        >
          <InputNumber
            placeholder="price"
            size="middle"
            style={{ width: "100%" }}
            min={0}
            type="number"
          />
        </Form.Item>

        <Form.Item
          name="categoryId"
          rules={[{ required: true, message: "Please, select a category" }]}
        >
          <Select
            style={{
              width: "100%",
            }}
            placeholder="Select a category"
            options={options}
          />
        </Form.Item>
        <Form.Item
          name="active"
          rules={[{ required: true, message: "Please, select a condition" }]}
        >
          <Select
            style={{
              width: "100%",
            }}
            placeholder="Please, select a condition"
            options={[
              { value: true, label: "Active" },
              { value: false, label: "Non-active" },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="gender"
          rules={[{ required: true, message: "Please, select a gender" }]}
        >
          <Select
            style={{
              width: "100%",
            }}
            placeholder="Please, select a gender"
            options={[
              { value: "MALE", label: "Male" },
              { value: "FEMALE", label: "Female" },
              { value: "BOTH", label: "Both" },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="photoId"
          rules={[{ required: true, message: "Please, upload photo" }]}
        >
          <Upload {...props} style={{ width: "100%" }}>
            <Button
              style={{ display: "flex", alignItems: "center", gap: 10 }}
              icon={<AiOutlineCloudUpload style={{ fontSize: 20 }} />}
            >
              Click to Upload
            </Button>
          </Upload>
        </Form.Item>
        <Button htmlType="submit">Send</Button>
      </Form>
    </>
  );
};

export default AddProductForm;
