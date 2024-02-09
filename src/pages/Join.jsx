import {
  Alert,
  Avatar,
  Box,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import "../firebase"
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
import md5 from "md5";
import {getDatabase, ref, set} from 'firebase/database'
import { useDispatch } from "react-redux";
import { setUser } from "../store/userReducer";

const IsPasswordValid = (password, confirmPassword) => {
  if(password.length < 6 || confirmPassword.length < 6) {
    return false
  } else if (password !== confirmPassword) {
    return false
  } else {
    return true
  }
}

const Join = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const handleSubmit = async(event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = data.get('name')
    const email = data.get('email')
    const password = data.get('password')
    const confirmPassword = data.get('confirmPassword')

    if(!name || !email || !password || !confirmPassword) {
      setError('모든 항목을 입력해주세요.')
      return
    }
    if(!IsPasswordValid(password, confirmPassword)) {
      setError('비밀번호를 확인하세요')
      return
    }

    postUserData(name, email, password)
  }

  const postUserData = async (name, email, password) => {
    setLoading(true)
    try{
      const {user} = await createUserWithEmailAndPassword(getAuth(), email, password)
      await updateProfile(user, {
        displayName: name,
        photoURL: `https://gravatar.com/avatar/${md5(email)}?d=identicon`
      })
      await set(ref(getDatabase(),'users/'+user.uid), {
        name: user.displayName,
        avatar: user.photoURL
      })
      dispatch(setUser(user))
    } catch(e) {
      setError(e.message);
      setLoading(false)
    }
  }

  useEffect(() => {
    if(!error) return
    setTimeout(() => {setError('')},3000)
  },[error])

  return (
    <Container component="main" naxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <TagIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                required
                fullWidth
                label="닉네임"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                required
                fullWidth
                label="이메일 주소"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                required
                fullWidth
                label="비밀번호"
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="confirmPassword"
                required
                fullWidth
                label="확인 비밀번호"
                type="password"
              />
            </Grid>
          </Grid>
          {error ? <Alert sx={{ mt: 3 }} severity="error"> {error} </Alert> : null}
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            loading={loading}
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
          >
            회원가입
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "blue" }}
              >
                이미 계정이 있나요? 로그인으로 이동
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Join;
