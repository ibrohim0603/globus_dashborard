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
import { queryClient } from "../../../App";
import { useTranslation } from "react-i18next";

const AddProductForm = ({ editRef, setModalOpen, modalOpen, id }) => {
  const [photoId, setPhotoId] = useState(null);
  const [fields, setFields] = useState(null);
  const { t } = useTranslation();

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
        // setPhotoId(info.file.response.id);
        message.success(info.file.name + " " + t("file uploaded successfully"));
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
      photoId: values?.photoId?.file?.response?.id || defVals?.data?.photoId,
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

  const l = localStorage.getItem("lang") || "en";
  const options = categs?.data?.data.map((d) => {
    if (l == "uz") {
      return {
        value: d?.id,
        label: d?.name_Uz,
      };
    } else if (l == "ru") {
      return {
        value: d?.id,
        label: d?.name_Ru,
      };
    } else {
      return {
        value: d?.id,
        label: d?.name_En,
      };
    }
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
            rules={[
              {
                required: true,
                message: t("Please, write ", {
                  text: t("Name", { text: "_Uz" }),
                }),
              },
            ]}
          >
            <Input placeholder={t("Name", { text: "_Uz" })} />
          </Form.Item>
          <Form.Item
            name="name_Ru"
            rules={[
              {
                required: true,
                message: t("Please, write ", {
                  text: t("Name", { text: "_Ru" }),
                }),
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
                message: t("Please, write ", {
                  text: t("Name", { text: "_En" }),
                }),
              },
            ]}
          >
            <Input placeholder={t("Name", { text: "_En" })} />
          </Form.Item>
          <Form.Item
            name="description_Uz"
            rules={[
              {
                required: true,
                message: t("Please, write ", {
                  text: t("Description", { text: "_Uz" }),
                }),
              },
            ]}
          >
            <Input.TextArea placeholder={t("Description", { text: "_Uz" })} />
          </Form.Item>
          <Form.Item
            name="description_Ru"
            rules={[
              {
                required: true,
                message: t("Please, write ", {
                  text: t("Description", { text: "_Ru" }),
                }),
              },
            ]}
          >
            <Input.TextArea placeholder={t("Description", { text: "_Ru" })} />
          </Form.Item>
          <Form.Item
            name="description_En"
            rules={[
              {
                required: true,
                message: t("Please, write ", {
                  text: t("Description", { text: "_En" }),
                }),
              },
            ]}
          >
            <Input.TextArea placeholder={t("Description", { text: "_En" })} />
          </Form.Item>
          <Form.Item
            name="type"
            rules={[
              {
                required: true,
                message: t("Please, write ", { text: t("type") }),
              },
            ]}
          >
            <Input placeholder={t("type")} />
          </Form.Item>
          <Form.Item
            name="size"
            rules={[
              {
                required: true,
                message: t("Please, write ", { text: t("size") }),
              },
            ]}
          >
            <Input
              placeholder={t("size")}
              size="middle"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="color"
            rules={[
              {
                required: true,
                message: t("Please, write ", { text: t("color") }),
              },
            ]}
          >
            <Input placeholder={t("color")} />
          </Form.Item>

          <Form.Item
            name="discount"
            rules={[
              {
                required: true,
                message: t("Please, write ", { text: t("discount") }),
              },
            ]}
          >
            <InputNumber
              placeholder={t("discount")}
              size="middle"
              style={{ width: "100%" }}
              min={0}
              type="number"
            />
          </Form.Item>

          <Form.Item
            name="price"
            rules={[
              {
                required: true,
                message: t("Please, write ", { text: t("price") }),
              },
            ]}
          >
            <InputNumber
              placeholder={t("price")}
              size="middle"
              style={{ width: "100%" }}
              min={0}
              type="number"
            />
          </Form.Item>

          <Form.Item
            name="categoryId"
            rules={[
              {
                required: true,
                message: t("Please, select a ", { text: t("category") }),
              },
            ]}
          >
            <Select
              style={{
                width: "100%",
              }}
              placeholder={t("Please, select a ", { text: t("category") })}
              options={options}
            />
          </Form.Item>
          <Form.Item
            name="active"
            rules={[
              {
                required: true,
                message: t("Please, select a ", { text: t("status") }),
              },
            ]}
          >
            <Select
              style={{
                width: "100%",
              }}
              placeholder={t("Please, select a ", { text: t("status") })}
              options={[
                { value: true, label: t("Active") },
                { value: false, label: t("Not active") },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="gender"
            rules={[
              {
                required: true,
                message: t("Please, select a ", { text: t("gender") }),
              },
            ]}
          >
            <Select
              style={{
                width: "100%",
              }}
              placeholder={t("Please, select a ", { text: t("gender") })}
              options={[
                { value: "MALE", label: t("Male") },
                { value: "FEMALE", label: t("Female") },
                { value: "BOTH", label: t("Both") },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="photoId"
            // rules={[{ required: true, message: t("Please, upload photo") }]}
          >
            <Upload {...props} style={{ width: "100%" }}>
              <Button
                style={{ display: "flex", alignItems: "center", gap: 10 }}
                icon={<AiOutlineCloudUpload style={{ fontSize: 20 }} />}
              >
                {t("Click to Upload")}
              </Button>
            </Upload>
          </Form.Item>
          <Button htmlType="submit">{t("Send")}</Button>
        </Form>
      )}
    </>
  );
};

export default AddProductForm;
