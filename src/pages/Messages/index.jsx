import { Button, Table, Modal, message } from "antd";
import React, { useContext } from "react";
import { QueryContext } from "../../App";
import { useEditData, useGetData } from "../../utils/hooks";

const Messages = () => {
  const messages = useGetData(["messages"], "/message");
  const { queryClient } = useContext(QueryContext);

  const messageMut = useEditData("/message");

  const { confirm } = Modal;
  const showConfirm = (text, id) => {
    confirm({
      title: text,
      okText: "Resolve",
      // okType: "success",
      cancelText: "Exit",
      onOk() {
        messageMut.mutate(
          {
            id,
            value: { status: "RESOLVED" },
          },
          {
            onSuccess: () => {
              message.success(`This message was successfully resolved`);
              queryClient.invalidateQueries({ queryKey: ["messages"] });
            },
          }
        );
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const rejBtn = (id) => {
    messageMut.mutate(
      {
        id,
        value: { status: "REJECTED" },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["messages"] });
          message.success(`This message was successfully rejected`);
        },
      }
    );
  };

  const dataSource = messages?.data?.data.map((d, i) => {
    return {
      key: i,
      time: d?.createdAt.slice(0, 10).replaceAll("-", "."),
      time2: d?.createdAt.slice(11, 16).replaceAll("-", "."),
      subject: d?.subject,
      // message: d?.message,
      phone: d?.phone,
      status: d?.status,
      select: (
        <Button
          onClick={() => showConfirm(d?.message, d?.id)}
          style={{ color: "#005036" }}
        >
          Read
        </Button>
      ),
      del: (
        <Button onClick={() => rejBtn(d?.id)} danger>
          Rejected
        </Button>
      ),
    };
  });

  return (
    <>
      <Table columns={columns} dataSource={dataSource} />
    </>
  );
};

export default Messages;

const columns = [
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
    width: 100,
    colSpan: 2,
  },
  {
    title: "time2",
    dataIndex: "time2",
    key: "time2",
    colSpan: 0,
    width: 70,
  },
  {
    title: "Subject",
    dataIndex: "subject",
    key: "subject",
  },
  {
    title: "Phone number",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Select",
    dataIndex: "select",
    key: "select",
    colSpan: 2,
    width: 50,
  },
  {
    title: "del",
    width: 50,
    dataIndex: "del",
    key: "del",
    colSpan: 0,
  },
];
