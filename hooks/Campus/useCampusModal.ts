import { useEffect, useState } from "react";
import { CampusState, INITIAL_CAMPUS_STATE } from "@/entities/campus";

type Props = {
  opened: boolean;
  selectedCampus: CampusState;
  setSelectedCampus: React.Dispatch<React.SetStateAction<CampusState>>;
  onClose: () => void;
  onClearGlobal: () => void; // useCampusのonClear
};

export const useCampusModal = ({
  opened,
  selectedCampus,
  setSelectedCampus,
  onClose,
  onClearGlobal,
}: Props) => {
  // モーダル内の仮選択
  const [localSelectedCampus, setLocalSelectedCampus] =
    useState<CampusState>(selectedCampus);

  // モーダルを開いた時に「確定値 → 仮値」に同期
  useEffect(() => {
    if (opened) {
      setLocalSelectedCampus(selectedCampus);
    }
  }, [opened, selectedCampus]);

  // 決定ボタン
  const onSubmit = () => {
    setSelectedCampus(localSelectedCampus);
    onClose();
  };

  // クリアボタン
  const onClear = () => {
    onClearGlobal(); // location + campus をグローバルでリセット
    setLocalSelectedCampus(INITIAL_CAMPUS_STATE); // モーダル内もリセット
  };

  return {
    localSelectedCampus,
    setLocalSelectedCampus,
    onSubmit,
    onClear,
  };
};
