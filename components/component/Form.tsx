import React from "react";
import { useForm, Controller } from "react-hook-form";
// import { db } from "@/firebase";
import { useRouter } from "next/navigation";
import { Box, Button } from "@mui/material";
import * as Component from "@/components/component";

const Form = () => {
  // React Hook Formの設定
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tuition: 0, // tuition の初期値
    },
  });

  const router = useRouter();

  // フォーム送信時の処理
  const onSubmit = (data: any) => {
    // フォームデータをクエリパラメータに変換
    const queryString = new URLSearchParams({
      tuition: String(data.tuition),
    }).toString();

    // クエリパラメータを付けてページ遷移
    router.push(`/search?${queryString}`);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/*学費*/}
      <Box sx={{ my: 4 }}>
        <Controller
          name="tuition"
          control={control}
          render={({ field }) => <Component.TuitionSlider {...field} />}
        />
      </Box>
      {/*検索ボタン*/}
      <Box sx={{ my: 3 }}>
        <Button variant="contained" type="submit">
          検索
        </Button>
      </Box>
    </form>
  );
};

export default Form;
