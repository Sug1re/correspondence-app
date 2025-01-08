"use client";

// 必要なライブラリをインポート
import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

// 型定義
interface School {
  name: string;
  tuition: number;
  nearestStation: string;
  distanceFromStation: number;
  weeklyCourses: number;
  field: string;
  requiresOutOfPrefecture: boolean;
  admissionMethod: string;
  schoolingFrequency: number;
  isOnline: boolean;
}

interface FormData {
  tuition?: string;
  nearestStation?: string;
  distanceFromStation?: string;
  weeklyCourses?: string;
  field?: string;
  requiresOutOfPrefecture?: string;
  admissionMethod?: string;
  schoolingFrequency?: string;
  isOnline?: string;
}

// 学校データの例
const schools: School[] = [
  {
    name: "School A",
    tuition: 100000,
    nearestStation: "Station 1",
    distanceFromStation: 10, // 徒歩分数
    weeklyCourses: 5,
    field: "スポーツ",
    requiresOutOfPrefecture: false,
    admissionMethod: "オンライン",
    schoolingFrequency: 2,
    isOnline: true,
  },
  {
    name: "School B",
    tuition: 200000,
    nearestStation: "Station 2",
    distanceFromStation: 5,
    weeklyCourses: 3,
    field: "Arts",
    requiresOutOfPrefecture: true,
    admissionMethod: "Interview",
    schoolingFrequency: 1,
    isOnline: false,
  },
  // 他の学校データを追加
];

// 推薦アルゴリズム
const recommendSchools = (input: Partial<School>): School[] => {
  // 入力がすべて未定義の場合は、falseを返す
  if (
    input.tuition === undefined &&
    input.nearestStation === undefined &&
    input.distanceFromStation === undefined &&
    input.weeklyCourses === undefined &&
    input.field === undefined &&
    input.requiresOutOfPrefecture === undefined &&
    input.admissionMethod === undefined &&
    input.schoolingFrequency === undefined &&
    input.isOnline === undefined
  ) {
    return []; // 未入力の場合、空の配列を返す
  }

  return schools.filter((school) => {
    return (
      input.tuition === undefined ||
      school.tuition <= input.tuition ||
      input.nearestStation === undefined ||
      school.nearestStation === input.nearestStation ||
      input.distanceFromStation === undefined ||
      school.distanceFromStation <= input.distanceFromStation ||
      input.weeklyCourses === undefined ||
      school.weeklyCourses === input.weeklyCourses ||
      input.field === undefined ||
      school.field === input.field ||
      input.requiresOutOfPrefecture === undefined ||
      school.requiresOutOfPrefecture === input.requiresOutOfPrefecture ||
      input.admissionMethod === undefined ||
      school.admissionMethod === input.admissionMethod ||
      input.schoolingFrequency === undefined ||
      school.schoolingFrequency <= input.schoolingFrequency ||
      input.isOnline === undefined ||
      school.isOnline === input.isOnline
    );
  });
};

// メインコンポーネント
const SchoolRecommendation: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({});
  const [results, setResults] = useState<School[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (): void => {
    const filteredResults = recommendSchools({
      tuition: formData.tuition ? Number(formData.tuition) : undefined,
      nearestStation: formData.nearestStation || undefined,
      distanceFromStation: formData.distanceFromStation
        ? Number(formData.distanceFromStation)
        : undefined,
      weeklyCourses: formData.weeklyCourses
        ? Number(formData.weeklyCourses)
        : undefined,
      field: formData.field || undefined,
      requiresOutOfPrefecture: formData.requiresOutOfPrefecture === "true",
      admissionMethod: formData.admissionMethod || undefined,
      schoolingFrequency: formData.schoolingFrequency
        ? Number(formData.schoolingFrequency)
        : undefined,
      isOnline: formData.isOnline === "true",
    });
    setResults(filteredResults);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        学校推薦システム
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="学費の上限"
            name="tuition"
            type="number"
            value={formData.tuition || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="最寄り駅"
            name="nearestStation"
            value={formData.nearestStation || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="駅からの時間 (分)"
            name="distanceFromStation"
            type="number"
            value={formData.distanceFromStation || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="週のコース数"
            name="weeklyCourses"
            type="number"
            value={formData.weeklyCourses || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="分野"
            name="field"
            value={formData.field || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="県外に行く必要があるか"
            name="requiresOutOfPrefecture"
            value={formData.requiresOutOfPrefecture || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="true">はい</MenuItem>
            <MenuItem value="false">いいえ</MenuItem>
          </TextField>
          <TextField
            label="受験方法"
            name="admissionMethod"
            value={formData.admissionMethod || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="スクーリング頻度 (回)"
            name="schoolingFrequency"
            type="number"
            value={formData.schoolingFrequency || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            select
            label="オンラインで受講可能か"
            name="isOnline"
            value={formData.isOnline || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="true">はい</MenuItem>
            <MenuItem value="false">いいえ</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        推薦を取得
      </Button>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          推薦結果:
        </Typography>
        {results.length > 0 ? (
          results.map((school, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{school.name}</Typography>
                <Typography>学費: {school.tuition}円</Typography>
                <Typography>
                  最寄り駅: {school.nearestStation} (徒歩
                  {school.distanceFromStation}分)
                </Typography>
                <Typography>分野: {school.field}</Typography>
                <Typography>受験方法: {school.admissionMethod}</Typography>
                <Typography>
                  スクーリング頻度: {school.schoolingFrequency}回
                </Typography>
                <Typography>
                  オンライン対応: {school.isOnline ? "はい" : "いいえ"}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>条件に一致する学校が見つかりませんでした。</Typography>
        )}
      </Box>
    </Box>
  );
};

export default SchoolRecommendation;
