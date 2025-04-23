"use client";

import React, { useState } from "react";
import { Avatar, Box, Button } from "@mui/material";
import { signInWithPopup, User } from "firebase/auth";
import { auth, provider } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
  const [user] = useAuthState(auth);
  return (
    <>
      <Box>
        {user ? (
          <>
            <SignOutButton user={user} />
          </>
        ) : (
          <SignInButton />
        )}
      </Box>
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
        width: 35, // 幅
        height: 35, // 高さ
        borderRadius: "50%", // 円形にする
        padding: 0, // 内部の余白をなくす
        minWidth: 0, // ボタンの最小幅を0にして、幅が正確に反映されるように
        backgroundColor: "#FFFFFF",
      }}
    >
      <Avatar
        sx={{
          width: 31, // 幅
          height: 31, // 高さ
          backgroundColor: "#003399",
          color: "#FFFFFF",
        }}
      />
    </Button>
  );
}

// googleButtonでSignOut
function SignOutButton({ user }: { user: User }) {
  const handleSignOut = () => {
    const confirmed = window.confirm("本当にログアウトしますか？");
    if (confirmed) {
      auth.signOut();
    }
  };
  return (
    <Button
      onClick={handleSignOut}
      variant="contained"
      type="submit"
      sx={{
        width: 35, // 幅
        height: 35, // 高さ
        borderRadius: "50%", // 円形にする
        padding: 0, // 内部の余白をなくす
        minWidth: 0, // ボタンの最小幅を0にして、幅が正確に反映されるように
        backgroundColor: "#003399",
      }}
    >
      <Avatar
        src={user.photoURL || ""}
        alt={user.displayName || "User"}
        sx={{
          width: 31, // 幅
          height: 31, // 高さ
        }}
      />
    </Button>
  );
}
