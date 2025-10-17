import React from "react";
import { z } from "zod";
import { BaseForm } from "@/components/Base/BaseForm";
import { Button, Card, CardActions } from "@mui/material";
import { FormCheckbox } from "../Base/BaseCheckBoxForm";
import { FormRadioGroup } from "../Base/BaseRadioGroupForm";
import { FormSlider } from "../Base/BaseSliderForm";
import { TestSchema } from "@/lib/validation/TestSchema";
import {
  attendanceOptions,
  schoolingOptions,
  schoolOptions,
  SearchSchoolDefaultValues,
  styleOptions,
} from "@/entities/form";

import CloseIcon from "@mui/icons-material/Close";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import SchoolIcon from "@mui/icons-material/School";
import ComputerIcon from "@mui/icons-material/Computer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BusinessIcon from "@mui/icons-material/Business";

interface Props {
  onClose: () => void;
}

export const TestForm: React.FC<Props> = ({ onClose }) => {
  const onSubmit = (data: z.infer<typeof TestSchema>) => {
    console.log("Form Data:", data);
    onClose();
  };

  return (
    <>
      <Card
        sx={{
          mt: 3,
          border: `0.5px solid #FF6600`,
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <CardActions
          sx={{
            justifyContent: "flex-end",
            position: "sticky",
            top: 0,
            width: "100%",
            backgroundColor: "#fff",
            zIndex: 10,
            borderBottom: "1px solid #ddd",
          }}
        >
          <Button
            onClick={onClose}
            sx={{
              color: "#000000",
              mr: 1,
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <CloseIcon style={{ color: "#000000" }} />
          </Button>
        </CardActions>

        <BaseForm
          schema={TestSchema}
          onSubmit={onSubmit}
          defaultValues={SearchSchoolDefaultValues}
        >
          <FormSlider
            text="3年間の学費総額"
            Icon={CurrencyYenIcon}
            name="totalFee"
            min={0}
            step={100000}
            max={4000000}
          />

          <FormRadioGroup
            text="学校情報1"
            Icon={BusinessIcon}
            name="school"
            option={schoolOptions}
          />

          <FormRadioGroup
            text="学校情報2"
            Icon={ComputerIcon}
            name="style"
            option={styleOptions}
          />

          <FormCheckbox
            text="登校頻度"
            Icon={CalendarMonthIcon}
            name="attendance"
            option={attendanceOptions}
          />

          <FormRadioGroup
            text="スクーリング会場"
            Icon={SchoolIcon}
            name="schooling"
            option={schoolingOptions}
          />

          <CardActions
            sx={{
              pb: 1,
              justifyContent: "center",
              position: "sticky",
              bottom: 0,
              backgroundColor: "#fff",
              zIndex: 10,
              borderTop: "1px solid #ddd",
            }}
          >
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "#003399",
                fontWeight: "bold",
                width: "80%",
                transition: "transform 0.2s",
                "&:hover": {
                  backgroundColor: "#003399",
                  transform: "scale(0.95)",
                },
              }}
            >
              検索
            </Button>
          </CardActions>
        </BaseForm>
      </Card>
    </>
  );
};
