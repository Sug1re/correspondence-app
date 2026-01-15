"use client";

import { BREADCRUMB_HEIGHT, BREADCRUMB_LABELS } from "@/lib/constants";
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

export const Breadcrumb = () => {
  const router = useRouter();
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    return {
      label: BREADCRUMB_LABELS[segment] ?? decodeURIComponent(segment),
      href,
    };
  });

  return (
    <Box
      sx={{
        pt: 9,
        pb: 1,
        px: 2,
        height: BREADCRUMB_HEIGHT,
        backgroundColor: "rgba(0, 51, 153, 0.1)",
      }}
    >
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          onClick={() => router.push("/")}
          sx={{
            cursor: "pointer",
            fontSize: 12,
            color: "#000000",
            display: "flex",
            alignItems: "center",
          }}
        >
          Home
        </Link>

        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return isLast ? (
            <Typography
              key={crumb.href}
              fontSize={12}
              color="#000000"
              aria-current="page"
            >
              {crumb.label}
            </Typography>
          ) : (
            <Link
              key={crumb.href}
              underline="hover"
              onClick={() => router.push(crumb.href)}
              sx={{ cursor: "pointer", fontSize: 12, color: "#000000" }}
            >
              {crumb.label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};
