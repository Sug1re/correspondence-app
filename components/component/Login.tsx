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
      <Container maxWidth="md">
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
            <SignInButton />
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
    <Button onClick={signInWithGoogle}>
      <Typography>サインイン</Typography>
    </Button>
  );
}

// googleButtonでSignOut
function SignOutButton() {
  return (
    <Button onClick={() => auth.signOut()}>
      <Typography>サインアウト</Typography>
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
