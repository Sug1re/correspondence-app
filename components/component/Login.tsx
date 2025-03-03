"use client";

import React from "react";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import { signInWithPopup, User } from "firebase/auth";
import { auth, provider } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Form from "./Form";

const Login = () => {
  const [user] = useAuthState(auth);
  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ mt: 2 }}>
          {user ? (
            <>
              <Box display="flex" gap={4}>
                <UserInfo user={user} />
                <SignOutButton />
              </Box>
              <Form />
            </>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="70vh"
            >
              <SignInButton />
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Login;

// googleButtonでSignIn
function SignInButton() {
  const signInWithGoogle = () => {
    // firebaseを使ってgoogleでSignInする
    signInWithPopup(auth, provider);
  };

  return (
    <Button
      onClick={signInWithGoogle}
      variant="contained"
      type="submit"
      sx={{
        width: 200,
        height: 50,
        fontWeight: "bold",
        fontSize: "1rem",
        transition: "transform 0.2s ease-in-out", // スムーズなスケールアニメーション
        "&:hover": {
          transform: "scale(1.1)", // ホバー時のスケール
        },
      }}
    >
      サインイン
    </Button>
  );
}

// googleButtonでSignOut
function SignOutButton() {
  return (
    <Button
      onClick={() => auth.signOut()}
      variant="contained"
      type="submit"
      sx={{
        fontWeight: "bold",
        fontSize: "1rem",
        transition: "transform 0.2s ease-in-out", // スムーズなスケールアニメーション
        "&:hover": {
          transform: "scale(0.95)", // ホバー時のスケール
        },
      }}
    >
      サインアウト
    </Button>
  );
}

// ユーザー情報を表示
function UserInfo({ user }: { user: User }) {
  return (
    <>
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar src={user.photoURL || ""} alt={user.displayName || "User"} />
        <Typography variant="h6">{user.displayName || "ゲスト"}</Typography>
      </Box>
    </>
  );
}
