import React, { useState } from "react";
import { Modal } from "antd";
const PostProductModal = ({ modalOpen, setModalOpen, children, resForm }) => {
  // const { modalOpen, setModalOpen } = props

  return (
    <>
      <Modal
        forceRender={true}
        title="Please fill in all fields"
        centered
        width={900}
        open={modalOpen}
        // onOk={() => setModalOpen(false)}
        onCancel={(r) => {
          // setModalOpen(false);
          resForm();
          // console.log(r);
        }}
        footer={null}
      >
        {children}
      </Modal>
    </>
  );
};

export default PostProductModal;
