"use client";

import {
  Drawer,
  List,
  Box,
  ListItemButton,
  ListItemText,
  Collapse,
} from "@mui/material";

import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDisclosure } from "@mantine/hooks";
import { useToastContext } from "@/context/ToastContext";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

import AppsIcon from "@mui/icons-material/Apps";
import MapIcon from "@mui/icons-material/Map";
import HomeIcon from "@mui/icons-material/Home";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import BusinessIcon from "@mui/icons-material/Business";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { Conditional } from "../Wrapper/conditionalWrapper";

interface SideBarProps {
  open: boolean;
  onClose: () => void;
}

export default function SideBar({ open, onClose }: SideBarProps) {
  const [user] = useAuthState(auth);
  const { showToast } = useToastContext();
  const router = useRouter();

  const [isSchoolOpen, schoolHandlers] = useDisclosure(false);
  const [isCourseOpen, courseHandlers] = useDisclosure(false);

  const onHome = () => {
    router.push("/");
  };

  const onEntrance = () => {
    router.push("/entrance");
  };

  const onTransfer = () => {
    router.push("/transfer");
  };

  const onBookmarks = () => {
    router.push("/bookmarks");
  };

  const onFaq = () => {
    router.push("/faq");
  };

  const logout = async () => {
    try {
      await signOut(auth);
      showToast("ログアウトしました");
      onClose();
    } catch {
      showToast("ログアウトに失敗しました");
    }
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      variant="temporary"
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: "#ffffff",
          width: { xs: "80vw", sm: "35vw" },
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
      }}
    >
      <List
        sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}
      >
        <ListItemButton
          sx={{
            borderRadius: 2,
            mx: 1,
            "&:hover": {
              backgroundColor: "rgba(0, 51, 153, 0.1)",
            },
          }}
          onClick={() => {
            onHome();
            onClose();
          }}
        >
          <HomeIcon sx={{ marginRight: 2, color: "#060666ff" }} />
          <ListItemText
            primary="ホーム"
            primaryTypographyProps={{ fontWeight: 600, color: "#060666ff" }}
          />
        </ListItemButton>

        <ListItemButton
          sx={{
            borderRadius: 2,
            mx: 1,
            "&:hover": {
              backgroundColor: "rgba(0, 51, 153, 0.1)",
            },
          }}
          onClick={() => {
            onBookmarks();
            onClose();
          }}
        >
          <BookmarksIcon sx={{ marginRight: 2, color: "#060666ff" }} />
          <ListItemText
            primary="ブックマーク一覧"
            primaryTypographyProps={{ fontWeight: 600, color: "#060666ff" }}
          />
        </ListItemButton>

        <ListItemButton
          sx={{
            borderRadius: 2,
            mx: 1,
            "&:hover": {
              backgroundColor: "rgba(0, 51, 153, 0.1)",
            },
          }}
          onClick={() => {
            onEntrance();
            onClose();
          }}
        >
          <LooksOneIcon sx={{ marginRight: 2, color: "#060666ff" }} />
          <ListItemText
            primary="新入学"
            primaryTypographyProps={{ fontWeight: 600, color: "#060666ff" }}
          />
        </ListItemButton>

        <ListItemButton
          sx={{
            borderRadius: 2,
            mx: 1,
            "&:hover": {
              backgroundColor: "rgba(0, 51, 153, 0.1)",
            },
          }}
          onClick={() => {
            onTransfer();
            onClose();
          }}
        >
          <LooksTwoIcon sx={{ marginRight: 2, color: "#060666ff" }} />
          <ListItemText
            primary="転入学"
            primaryTypographyProps={{ fontWeight: 600, color: "#060666ff" }}
          />
        </ListItemButton>

        <ListItemButton
          sx={{
            borderRadius: 2,
            mx: 1,
            "&:hover": {
              backgroundColor: "rgba(0, 51, 153, 0.1)",
            },
          }}
          onClick={schoolHandlers.toggle}
        >
          <BusinessIcon sx={{ marginRight: 2, color: "#060666ff" }} />
          <ListItemText
            primary="学校一覧"
            primaryTypographyProps={{ fontWeight: 600, color: "#060666ff" }}
          />
          {isSchoolOpen ? (
            <ExpandLessOutlinedIcon sx={{ color: "#060666ff" }} />
          ) : (
            <ExpandMoreOutlinedIcon sx={{ color: "#060666ff" }} />
          )}
        </ListItemButton>
        <Collapse in={isSchoolOpen} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            sx={{ bgcolor: "#dff0dfff", borderRadius: 2, mx: 0.5 }}
          >
            <ListItemButton
              sx={{
                borderRadius: 2,

                mx: 1,
                "&:hover": {
                  backgroundColor: "rgba(0, 51, 153, 0.1)",
                },
              }}
            >
              <ListItemText
                primary="N高等学校"
                primaryTypographyProps={{ fontWeight: 600, color: "#060666ff" }}
              />
            </ListItemButton>
            <ListItemButton
              sx={{
                borderRadius: 2,
                mx: 1,
                "&:hover": {
                  backgroundColor: "rgba(0, 51, 153, 0.1)",
                },
              }}
            >
              <ListItemText
                primary="S高等学校"
                primaryTypographyProps={{ fontWeight: 600, color: "#060666ff" }}
              />
            </ListItemButton>
            <ListItemButton
              sx={{
                borderRadius: 2,
                mx: 1,
                "&:hover": {
                  backgroundColor: "rgba(0, 51, 153, 0.1)",
                },
              }}
            >
              <ListItemText
                primary="R高等学校"
                primaryTypographyProps={{ fontWeight: 600, color: "#060666ff" }}
              />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton
          sx={{
            borderRadius: 2,
            mx: 1,
            "&:hover": {
              backgroundColor: "rgba(0, 51, 153, 0.1)",
            },
          }}
          onClick={courseHandlers.toggle}
        >
          <AppsIcon sx={{ marginRight: 2, color: "#060666ff" }} />
          <ListItemText
            primary="コース一覧"
            primaryTypographyProps={{ fontWeight: 600, color: "#060666ff" }}
          />
          {isCourseOpen ? (
            <ExpandLessOutlinedIcon sx={{ color: "#060666ff" }} />
          ) : (
            <ExpandMoreOutlinedIcon sx={{ color: "#060666ff" }} />
          )}
        </ListItemButton>
        <Collapse in={isCourseOpen} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            sx={{ bgcolor: "#dff0dfff", borderRadius: 2, mx: 0.5 }}
          >
            <ListItemButton
              sx={{
                borderRadius: 2,
                mx: 1,
                "&:hover": {
                  backgroundColor: "rgba(0, 51, 153, 0.1)",
                },
              }}
            >
              <ListItemText
                primary="ネットコース"
                primaryTypographyProps={{ fontWeight: 600, color: "#060666ff" }}
              />
            </ListItemButton>
            <ListItemButton
              sx={{
                borderRadius: 2,
                mx: 1,
                "&:hover": {
                  backgroundColor: "rgba(0, 51, 153, 0.1)",
                },
              }}
            >
              <ListItemText
                primary="週5コース"
                primaryTypographyProps={{ fontWeight: 600, color: "#060666ff" }}
              />
            </ListItemButton>
            <ListItemButton
              sx={{
                borderRadius: 2,
                mx: 1,
                "&:hover": {
                  backgroundColor: "rgba(0, 51, 153, 0.1)",
                },
              }}
            >
              <ListItemText
                primary="週3コース"
                primaryTypographyProps={{ fontWeight: 600, color: "#060666ff" }}
              />
            </ListItemButton>
            <ListItemButton
              sx={{
                borderRadius: 2,
                mx: 1,
                "&:hover": {
                  backgroundColor: "rgba(0, 51, 153, 0.1)",
                },
              }}
            >
              <ListItemText
                primary="週1＋コース"
                primaryTypographyProps={{ fontWeight: 600, color: "#060666ff" }}
              />
            </ListItemButton>
            <ListItemButton
              sx={{
                borderRadius: 2,
                mx: 1,
                "&:hover": {
                  backgroundColor: "rgba(0, 51, 153, 0.1)",
                },
              }}
            >
              <ListItemText
                primary="＋ONE授業"
                primaryTypographyProps={{ fontWeight: 600, color: "#060666ff" }}
              />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton
          sx={{
            borderRadius: 2,
            mx: 1,
            "&:hover": {
              backgroundColor: "rgba(0, 51, 153, 0.1)",
            },
          }}
          onClick={() => {}}
        >
          <MapIcon sx={{ marginRight: 2, color: "#060666ff" }} />
          <ListItemText
            primary="キャンパスを探す"
            primaryTypographyProps={{ fontWeight: 600, color: "#060666ff" }}
          />
        </ListItemButton>

        <ListItemButton
          sx={{
            borderRadius: 2,
            mx: 1,
            "&:hover": {
              backgroundColor: "rgba(0, 51, 153, 0.1)",
            },
          }}
          onClick={() => {
            onFaq();
            onClose();
          }}
        >
          <LiveHelpIcon sx={{ marginRight: 2, color: "#060666ff" }} />
          <ListItemText
            primary="よくある質問"
            primaryTypographyProps={{ fontWeight: 600, color: "#060666ff" }}
          />
        </ListItemButton>

        <Conditional when={!!user}>
          <ListItemButton
            sx={{
              borderRadius: 2,
              mx: 1,
              "&:hover": {
                backgroundColor: "rgba(0, 51, 153, 0.1)",
              },
            }}
            onClick={logout}
          >
            <LogoutIcon sx={{ marginRight: 2, color: "#060666ff" }} />
            <ListItemText
              primary="ログアウト"
              primaryTypographyProps={{ fontWeight: 600, color: "#060666ff" }}
            />
          </ListItemButton>
        </Conditional>
      </List>

      <Box flexGrow={1} />
    </Drawer>
  );
}
