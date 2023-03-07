import React, { useState } from 'react'
import { Modal } from 'antd';
const PostProductModal = (props, { children }) => {
  const { modalOpen, setModalOpen } = props

  return (
    <>
      <Modal
        title="Vertically centered modal dialog"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        {children}
      </Modal>
    </>
  )
}

export default PostProductModal;