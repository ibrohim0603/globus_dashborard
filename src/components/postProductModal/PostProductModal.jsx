import React, { useState } from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";

const PostProductModal = ({ modalOpen, setModalOpen, children, resForm }) => {
  const { t } = useTranslation();

  return (
    <>
      <Modal
        forceRender={true}
        title={t("Please, fill in all fields")}
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
