"use client";

import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDisclosure } from "@mantine/hooks";
import { SearchSchoolModal } from "../Modals/SearchSchoolModal";
import { SearchSchoolFormValues } from "@/entities/form";

type Props = {
  onSearch?: (data: SearchSchoolFormValues) => void;
};

export const SearchButton = ({ onSearch }: Props) => {
  const [isOpen, handlers] = useDisclosure(false);

  return (
    <>
      <IconButton
        edge="start"
        sx={{
          color: "#060666ff",
          border: `1px solid #060666ff`,
          width: 40,
          height: 40,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={handlers.open}
        disableRipple
      >
        <SearchIcon style={{ fontSize: 28 }} />
      </IconButton>

      <SearchSchoolModal
        opened={isOpen}
        onClose={handlers.close}
        onSearch={onSearch}
      />
    </>
  );
};
