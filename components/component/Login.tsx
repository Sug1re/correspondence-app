"use client";

import React, { useState } from "react";
import { Avatar, Box, Button, Container } from "@mui/material";
import { signInWithPopup, User } from "firebase/auth";
import { auth, provider } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
  const [user] = useAuthState(auth);
  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ mt: 2 }}>
          {user ? (
            <>
              <Box display="flex" gap={4}>
                <SignOutButton user={user} />
              </Box>
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
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Googleログインエラー:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={signInWithGoogle}
      variant="contained"
      type="submit"
      disabled={loading}
      sx={{
        width: 50, // 幅
        height: 50, // 高さ
        borderRadius: "50%", // 円形にする
        padding: 0, // 内部の余白をなくす
        minWidth: 0, // ボタンの最小幅を0にして、幅が正確に反映されるように
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Avatar
        sx={{
          width: 46, // 幅
          height: 46, // 高さ
          backgroundColor: "#003399",
          color: "#FFFFFF",
        }}
      />
    </Button>
  );
}

// googleButtonでSignOut
function SignOutButton({ user }: { user: User }) {
  return (
    <Button
      onClick={() => auth.signOut()}
      variant="contained"
      type="submit"
      sx={{
        width: 50, // 幅
        height: 50, // 高さ
        borderRadius: "50%", // 円形にする
        padding: 0, // 内部の余白をなくす
        minWidth: 0, // ボタンの最小幅を0にして、幅が正確に反映されるように
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#003399",
      }}
    >
      <Avatar
        src={user.photoURL || ""}
        alt={user.displayName || "User"}
        sx={{
          width: 46, // 幅
          height: 46, // 高さ
        }}
      />
    </Button>
  );
}
