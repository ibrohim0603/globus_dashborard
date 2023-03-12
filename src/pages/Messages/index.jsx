import { Button, Table, Modal, message } from "antd";
import React, { useContext, useState } from "react";
import { QueryContext } from "../../App";
import { useEditData, useGetData } from "../../utils/hooks";

const Messages = () => {
  const messages = useGetData(["messages"], "/message");
  const { queryClient } = useContext(QueryContext);
  const [num, setNum] = useState(null);
  const [num2, setNum2] = useState(null);
  const messageMut = useEditData("/message");

  const { confirm } = Modal;

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
          setNum(null);
        },
        onError: () => {
          message.error(
            "This message was not successfully <rejected></rejected>"
          );
        },
      }
    );
  };
  const readBtn = (id) => {
    messageMut.mutate(
      {
        id,
        value: { status: "RESOLVED" },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["messages"] });
          message.success(`This message was successfully resolved`);
          setNum2(null);
        },
        onError: () => {
          message.error("This message was not successfully resolved");
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
      message: d?.message,
      phone: d?.phone,
      status: d?.status,
      select: (
        <Button
          disabled={messageMut.isLoading}
          loading={num2 == i && messageMut.isLoading}
          onClick={() => {
            setNum2(i);
            readBtn(d?.id);
          }}
          style={{ color: "#005036", borderColor: "#005036" }}
        >
          Read
        </Button>
      ),
      del: (
        <Button
          disabled={messageMut.isLoading}
          loading={num == i && messageMut.isLoading}
          onClick={() => {
            setNum(i);
            rejBtn(d?.id);
          }}
          danger
        >
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
    ellipsis: true,
    width: 150,
  },
  {
    title: "Message",
    dataIndex: "message",
    key: "message",
    ellipsis: true,
  },
  {
    title: "Phone number",
    dataIndex: "phone",
    key: "phone",
    width: 130,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 100,
  },
  {
    title: "Select",
    dataIndex: "select",
    key: "select",
    colSpan: 2,
    width: 105,
  },
  {
    title: "del",
    width: 120,
    dataIndex: "del",
    key: "del",
    colSpan: 0,
  },
];
