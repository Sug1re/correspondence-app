"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  Typography,
} from "@mui/material";

// React Hook Form の設定
type FormValues = {
  initialSetupCosts: number;
  tuitionFee: number;
  testFee: number;
  schooling: string;
  movingOutsideThePrefecture: string;
  commutingStyle: string;
  highSchool: string;
  attendanceFrequency: string;

  // fireStoreのコレクションを追加
};

const Form = () => {
  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      initialSetupCosts: 10, // 初期値設定
      tuitionFee: 10,
      testFee: 1,
      schooling: "スクーリングの有無を選択",
      movingOutsideThePrefecture: "県外移動の有無を選択",
      commutingStyle: "通学かオンラインを選択",
      highSchool: "学校の種類を選択",
      attendanceFrequency: "登校頻度を選択",
      // fireStoreのコレクションを追加
    },
  });

  // ユーザーが選択したデータを可視化
  const initialSetupCostsValue = watch("initialSetupCosts");
  const testFeeValue = watch("testFee");
  const tuitionFeeValue = watch("tuitionFee");
  const commutingStyleValue = watch("commutingStyle");
  const highSchoolValue = watch("highSchool");
  const attendanceFrequencyValue = watch("attendanceFrequency");
  // fireStoreのコレクションを追加

  const router = useRouter();

  const onSubmit = (data: FormValues) => {
    // フォームの値を取得
    const { initialSetupCosts } = data;
    const { tuitionFee } = data;
    const { testFee } = data;
    const { schooling } = data;
    const { movingOutsideThePrefecture } = data;
    const { commutingStyle } = data;
    const { highSchool } = data;
    const { attendanceFrequency } = data;
    // fireStoreのコレクションを追加

    // クエリパラメータを生成して検索ページへ遷移
    const query = new URLSearchParams({
      initialSetupCosts: initialSetupCosts.toString(), // number型を文字列に変換
      tuitionFee: tuitionFee.toString(), // number型を文字列に変換
      testFee: testFee.toString(), // number型を文字列に変換
      schooling: schooling,
      movingOutsideThePrefecture: movingOutsideThePrefecture,
      commutingStyle: commutingStyle,
      highSchool: highSchool,
      attendanceFrequency: attendanceFrequency,
      // fireStoreのコレクションを追加
    }).toString();

    router.push(`/search?${query}`);
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            検索条件
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* number型データ */}
          <Box>
            {/* 初期費用スライダー */}
            <Box sx={{ my: 4 }}>
              <Typography
                id="initialSetupCostsSlider"
                sx={{ fontWeight: 600 }}
                gutterBottom
              >
                初期費用（万円）：{initialSetupCostsValue}万円
              </Typography>
              <Controller
                name="initialSetupCosts"
                control={control}
                render={({ field }) => (
                  <Slider
                    {...field}
                    min={0}
                    step={0.5}
                    max={200}
                    valueLabelDisplay="auto"
                    aria-labelledby="initialSetupCostsSlider"
                  />
                )}
              />
            </Box>

            {/* 授業料スライダー */}
            <Box sx={{ my: 4 }}>
              <Typography
                id="tuitionFeeSlider"
                sx={{ fontWeight: 600 }}
                gutterBottom
              >
                授業料（万円）：{tuitionFeeValue}万円
              </Typography>
              <Controller
                name="tuitionFee"
                control={control}
                render={({ field }) => (
                  <Slider
                    {...field}
                    min={0}
                    step={0.5}
                    max={200}
                    valueLabelDisplay="auto"
                    aria-labelledby="tuitionFeeSlider"
                  />
                )}
              />
            </Box>

            {/* 受験料スライダー */}
            <Box sx={{ my: 4 }}>
              <Typography
                id="testFeeSlider"
                sx={{ fontWeight: 600 }}
                gutterBottom
              >
                受験料（万円）：{testFeeValue}万円
              </Typography>
              <Controller
                name="testFee"
                control={control}
                render={({ field }) => (
                  <Slider
                    {...field}
                    min={0}
                    step={0.5}
                    max={10}
                    valueLabelDisplay="auto"
                    aria-labelledby="testFeeSlider"
                  />
                )}
              />
            </Box>
          </Box>

          {/* boolean型データ */}
          <Box>
            {/* スクーリングがあるかどうか */}
            <Box sx={{ my: 4 }}>
              <Typography id="schooling" sx={{ fontWeight: 600 }} gutterBottom>
                スクーリング
              </Typography>
              <Controller
                name="schooling"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <RadioGroup
                      {...field} // field.value と field.onChange を適用
                      row // 横並びにするプロパティ
                      sx={{
                        gap: 1,
                      }}
                      aria-labelledby="schooling"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="スクーリング有り"
                      />
                      <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="スクーリング無し"
                      />
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Box>

            {/* 県外移動があるかどうか */}
            <Box sx={{ my: 4 }}>
              <Typography
                id="movingOutsideThePrefecture"
                sx={{ fontWeight: 600 }}
                gutterBottom
              >
                県外移動
              </Typography>
              <Controller
                name="movingOutsideThePrefecture"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <RadioGroup
                      {...field} // field.value と field.onChange を適用
                      row // 横並びにするプロパティ
                      sx={{
                        gap: 1,
                      }}
                      aria-labelledby="movingOutsideThePrefecture"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="県外移動有り"
                      />
                      <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="県外移動無し"
                      />
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Box>
          </Box>

          {/* string型データ */}
          <Box>
            {/* 学校の種類 */}
            <Box sx={{ my: 4 }}>
              <Typography id="highSchool" sx={{ fontWeight: 600 }} gutterBottom>
                学校の種類：{highSchoolValue}
              </Typography>
              <Controller
                name="highSchool"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <RadioGroup
                      {...field} // field.value と field.onChange を適用
                      row // 横並びにするプロパティ
                      sx={{
                        gap: 1,
                      }}
                      aria-labelledby="highSchool"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="通信制高等学校"
                        control={<Radio />}
                        label="通信制高等学校"
                      />
                      <FormControlLabel
                        value="サポート校"
                        control={<Radio />}
                        label="サポート校"
                      />
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Box>

            {/* 通学形態 */}
            <Box sx={{ my: 4 }}>
              <Typography
                id="commutingStyle"
                sx={{ fontWeight: 600 }}
                gutterBottom
              >
                通学形態 : {commutingStyleValue}
              </Typography>
              <Controller
                name="commutingStyle"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <RadioGroup
                      {...field} // field.value と field.onChange を適用
                      row // 横並びにするプロパティ
                      sx={{
                        gap: 1,
                      }}
                      aria-labelledby="commutingStyle"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="通学"
                        control={<Radio />}
                        label="通学"
                      />
                      <FormControlLabel
                        value="オンライン"
                        control={<Radio />}
                        label="オンライン"
                      />
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Box>

            {/* 登校頻度 */}
            <Box sx={{ my: 4 }}>
              <Typography
                id="attendance-frequency"
                sx={{ fontWeight: 600 }}
                gutterBottom
              >
                登校頻度：{attendanceFrequencyValue}
              </Typography>
              <Controller
                name="attendanceFrequency"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <RadioGroup
                      {...field} // field.value と field.onChange を適用
                      row // 横並びにするプロパティ
                      sx={{
                        gap: 2,
                      }}
                      aria-labelledby="attendance-frequency"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="週1"
                        control={<Radio />}
                        label="週1"
                      />
                      <FormControlLabel
                        value="週2"
                        control={<Radio />}
                        label="週2"
                      />
                      <FormControlLabel
                        value="週3"
                        control={<Radio />}
                        label="週3"
                      />
                      <FormControlLabel
                        value="週4"
                        control={<Radio />}
                        label="週4"
                      />
                      <FormControlLabel
                        value="週5"
                        control={<Radio />}
                        label="週5"
                      />
                      <FormControlLabel
                        value="オンライン"
                        control={<Radio />}
                        label="オンライン"
                      />
                      <FormControlLabel
                        value="自由"
                        control={<Radio />}
                        label="自由"
                      />
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Box>
          </Box>

          {/* 検索ボタン */}
          <Box>
            <Button variant="contained" type="submit">
              検索
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
};
export default Form;
