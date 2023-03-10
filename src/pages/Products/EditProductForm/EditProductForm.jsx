import React, { useContext, useState, useEffect } from "react";
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
import { useEditData, useGetData, usePostData } from "../../../utils/hooks";
import { QueryContext } from "../../../App";
import { RiNeteaseCloudMusicFill } from "react-icons/ri";

const AddProductForm = ({ editRef, setModalOpen, modalOpen, id }) => {
  const [photoId, setPhotoId] = useState(null);
  const { queryClient } = useContext(QueryContext);
  const [fields, setFields] = useState(null);
  // console.log(fields);
  const defVals = useGetData(["products", id], `/products/${id}`, {
    onSuccess: (d) => {
      setFields(
        Object.keys(d)
          .filter((k) => {
            if (k !== "Category" && k !== "id") {
              return k;
            }
          })
          .map((k) => {
            return {
              name: [k],
              value: d[k],
            };
          })
      );
    },
    enabled: !!modalOpen || !!id,
  });
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["products", id] });
  }, [modalOpen]);

  const categs = useGetData(["categories"], "/category");

  const editMutate = useEditData("/products");

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
        setPhotoId(info.file.response.id);
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  // const fields = defValsKey.map((k) => {
  //   console.log(k);
  // });

  const onFinish = (values) => {
    console.log("Success:", {
      ...values,
      photoId: photoId || defVals?.data?.photoId,
    });
    editMutate.mutate(
      {
        id,
        value: { ...values, photoId: photoId || defVals?.data?.photoId },
      },
      {
        onSuccess: (d) => {
          queryClient.invalidateQueries({ queryKey: ["products"] });
          queryClient.invalidateQueries({ queryKey: ["products", id] });
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

  return (
    <>
      {defVals.isLoading ? (
        "Loading"
      ) : (
        <Form
          fields={fields}
          ref={editRef}
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
            rules={[
              { required: true, message: "Please, write description_Uz" },
            ]}
          >
            <Input.TextArea placeholder="description_Uz" />
          </Form.Item>
          <Form.Item
            name="description_Ru"
            rules={[
              { required: true, message: "Please, write description_Ru" },
            ]}
          >
            <Input.TextArea placeholder="description_Ru" />
          </Form.Item>
          <Form.Item
            name="description_En"
            rules={[
              { required: true, message: "Please, write description_En" },
            ]}
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

          <Form.Item>
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
      )}
    </>
  );
};

export default AddProductForm;
