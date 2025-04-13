"use client";

import { useState } from "react";

const useModal = () => {
      const [openModalId, setOpenModalId] = useState<string | null>(null); // 各学校ごとのモーダルのIDを管理
      const handleOpen = (schoolId: string) => setOpenModalId(schoolId); // モーダルを開く関数
      const handleClose = () => setOpenModalId(null); // モーダルを閉じる関数
  return{
    openModalId,
    handleOpen,
    handleClose,
  } ;

}

export default useModal