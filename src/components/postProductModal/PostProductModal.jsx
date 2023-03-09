import React, { useState } from "react";
import { Modal } from "antd";
const PostProductModal = ({ modalOpen, setModalOpen, children, resForm }) => {
  // const { modalOpen, setModalOpen } = props

  return (
    <>
      <Modal
        title="Please fill in all fields"
        centered
        width={900}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => {
          setModalOpen(false);
          resForm();
        }}
        footer={null}
      >
        {children}
      </Modal>
    </>
  );
};

export default PostProductModal;
