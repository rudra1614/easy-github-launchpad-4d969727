import { React, useEffect, useRef, useState } from "react";
import hBg from "./../../../Assets/Images/Header bg.png";

import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate, Link as LinkDom } from "react-router-dom";
import GoogleIcon from "../../../Assets/Icons/GoogleIcon.svg";
import eyeIcon from "../../../Assets/Icons/eye.png";
import closeEye from "../../../Assets/Icons/close eye.png";
import checkIcon from "../../../Assets/Icons/check.png";
import crossIcon from "../../../Assets/Icons/cross.png";
import mainImg from "../../../Assets/Images/authenticate-img.svg";

import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  Link,
  Snackbar,
} from "@mui/material";
import Header from "../../../Widgets/Header/Header";
import { Footer } from "../../../Widgets";
import axios from "axios";
import { auth, signInWithGoogle } from "../../../Components/Firebase";

export default function Register() {
  const privacy_check = useRef(false);
  const [showConfirmationCode, setShowConfirmationCode] = useState(false);
  const [openLoader, setOpenLoader] = useState(false);
  const [typeInput, setTypeInput] = useState("password");
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("This is a success message!");
  const [errorMsg, setErrorMsg] = useState("This is a error message!");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userImg, setUserImg] = useState("");
  const url = "https://job-px4t.onrender.com/api";

  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(true);
  const [focusedName, setFocusedName] = useState(false);
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [focusedPass, setFocusedPass] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validFirstName, setValidFirstName] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);

  const handleGoogleClick = async () => {
    signInWithGoogle()
      .then((result) => {
        setEmail();
        setUserImg(result?.user?.photoURL);
        const data = new FormData();
        data.append("fullName", result?.user?.displayName);
        data.append("userEmail", result?.user?.email);
        axios
          .post(url + "/user", data)
          .then((res) => {
            console.log(res);
            const token = res?.data?.token;
            const msg = res?.data?.message;
            if (msg === "Confirmation code sent to the email") {
              setSuccessMsg(msg);
              setOpenSuccess(true);
              setShowConfirmationCode(true);
            }
            if (token) {
              setSuccessMsg("Successfully Signed Up!");
              setOpenSuccess(true);
              setShowConfirmationCode(false);
              localStorage.setItem("token", token);
              localStorage.setItem("userData", JSON.stringify(res?.data?.data));
              localStorage.setItem("verify", JSON.stringify(true));
              setTimeout(() => {
                navigate("/user/login");
              }, 1000);
            }
            setOpenLoader(false);
          })
          .catch((err) => {
            console.log(err);
            setErrorMsg(err?.response?.data?.message || err?.message);
            setOpenError(true);
          });
        console.log(result.user.auth);
      })
      .catch((er) => {
        console.log(er);
        const unexpectedError = er?.message;
        const serverError = er?.response?.data?.message;
        if (unexpectedError) {
          setErrorMsg(unexpectedError);
        }
        if (serverError) {
          setErrorMsg(serverError);
        }
        setOpenError(true);
        setOpenLoader(false);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const fullName = lastName + " " + firstName;
    data.append("fullName", fullName);
    setOpenLoader(true);
    await axios
      .post(url + "/user", data)
      .then((res) => {
        const token = res?.data?.token;
        const msg = res?.data?.message;
        if (msg === "Confirmation code sent to the email") {
          setSuccessMsg(msg);
          setOpenSuccess(true);
          setShowConfirmationCode(true);
        }
        if (token) {
          setSuccessMsg("Successfully Signed Up!");
          setOpenSuccess(true);
          setShowConfirmationCode(false);
          localStorage.setItem("token", token);
          localStorage.setItem("userData", JSON.stringify(res?.data?.data));
          localStorage.setItem("verify", JSON.stringify(true));
          setTimeout(() => {
            navigate("/user/login");
          }, 1000);
        }
        setOpenLoader(false);
      })
      .catch((err) => {
        console.log(err);
        const unexpectedError = err?.message;
        const serverError = err?.response?.data?.message;
        if (unexpectedError) {
          setErrorMsg(unexpectedError);
        }
        if (serverError) {
          setErrorMsg(serverError);
        }
        setOpenError(true);
        setOpenLoader(false);
      });
  };
  const validatePassword = (password) => {
    // Minimum length of 10 characters
    const lengthValid = password.length >= 10;

    // At least one lowercase letter
    const lowercaseValid = /[a-z]/.test(password);

    // At least one uppercase letter
    const uppercaseValid = /[A-Z]/.test(password);

    // At least one digit
    const digitValid = /\d/.test(password);

    // At least one special character
    const specialCharValid = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

    setCheck1(lengthValid);
    setCheck3(lowercaseValid && uppercaseValid);
    setCheck2(digitValid);
    setCheck4(specialCharValid);
    // Update the validity state
    setValidPassword(
      lengthValid &&
        lowercaseValid &&
        uppercaseValid &&
        digitValid &&
        specialCharValid
    );
  };
  const isValidEmail = (email) => {
    // Regular expression for basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const isValidName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const nameLength = name.length >= 3 && name.length <= 25;
    return nameRegex.test(name) && nameLength;
  };

  const handleFirstNameChange = (event) => {
    const newFirstName = event.target.value;
    setFirstName(newFirstName);
    setValidFirstName(isValidName(newFirstName));
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };
  useEffect(() => {
    if (validEmail && validPassword && validFirstName) {
      setDisabled(false);
    } else setDisabled(true);
    console.log(disabled)
  }, [password, validPassword, firstName, validEmail, validFirstName]);
  return (
    <>
      {/* Backdrop - Loader */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Main sect  */}
      <div className="w-full h-screen flex">
        <div className="w-1/4 md:flex bg-[#19378b] p-[50px] relative h-screen hidden flex-col justify-between">
          <div className="w-full  text-white">
            <h2 className="mb-[25px] leading-tight text-[22px] font-bold ">
            Upgrade your life with a social worker NGO platform
            </h2>
            <p className="tracking-tight leading-tight">
            Access to a wide range of social works, allowing for a better
                lifestyle of other people, as well as reduced poverty levels in
                the world. Join today and start experiencing the benefits of social
                work.
            </p>
          </div>
          <img
            src={mainImg}
            alt="creative_image"
            className="w-[420px] absolute bottom-[75px] h-[305px]"
          />
        </div>
        <div className="bg-[#2144a5] w-full md:w-3/4">
          {/* Main Register Card */}
          <main className="relative w-full h-screen flex items-center justify-center">
            <div className="flex rounded-md flex-col z-40  items-center px-[30px] pb-[15px] pt-[40px] w-1/2  bg-white">
              {/* <CssBaseline /> */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  component="h1"
                  variant="h5"
                  className="mx-auto  w-full text-center text-black"
                  sx={{
                    fontSize: "24px",
                    marginBottom: "10px",
                    fontWeight: 600,
                  }}
                >
                  Sign up as a Social Worker
                </Typography>
                <Typography
                  component="h6"
                  variant="h6"
                  marginBottom={""}
                  sx={{ fontSize: "14px" }}
                  className="text-[#000] font-normal"
                >
                  Sign up with your Google account or use the form
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Button
                    onClick={handleGoogleClick}
                    className="flex w-full items-center  justify-center space-x-2 bg-white border border-gray-300 rounded-lg  shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 outline-none"
                  >
                    <img
                      src={GoogleIcon}
                      alt="GoogleIcon"
                      width={25}
                      height={25}
                    />
                    <span>Continue with Google</span>
                  </Button>
                  <div className="w-full flex items-center justify-between my-[10px]">
                    <hr className="h-[1.5px] bg-blue-300 flex w-[46%]" />
                    <span className="text-blue-300 text-[16px]">or</span>
                    <hr className="h-[1.5px] bg-blue-300 flex w-[46%]" />
                  </div>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="first-name"
                        size="small"
                        name="firstName"
                        required
                        fullWidth
                        error={
                          focusedName ? (validFirstName ? false : true) : false
                        }
                        id="firstName"
                        onFocus={() => setFocusedName(true)}
                        value={firstName}
                        onChange={handleFirstNameChange}
                        label="First Name"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        size="small"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        autoComplete="last-name"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="userEmail"
                        size="small"
                        label="Email Address"
                        error={
                          focusedEmail ? (validEmail ? false : true) : false
                        }
                        value={email}
                        onFocus={() => setFocusedEmail(true)}
                        onChange={(e) => {
                          setValidEmail(isValidEmail(e.target.value));
                          setEmail(e.target.value);
                        }}
                        name="userEmail"
                        autoComplete="email"
                      />
                    </Grid>
                    <Grid item sx={{ position: "relative" }} xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        size="small"
                        onFocus={() => setFocusedPass(true)}
                        label="Password"
                        type={typeInput}
                        id="password"
                        value={password}
                        autoComplete="new-password"
                        onChange={handlePasswordChange}
                        error={
                          focusedPass ? (validPassword ? false : true) : false
                        }
                      />
                      <img
                        width={17}
                        className={`absolute cursor-pointer right-[10px] top-[30px] `}
                        onClick={() => {
                          if (typeInput === "password") {
                            setTypeInput("text");
                          } else setTypeInput("password");
                        }}
                        height={17}
                        src={typeInput === "password" ? eyeIcon : closeEye}
                        alt="toggle input type"
                      />

                      <ul
                        className={`transition-all ${
                          focusedPass
                            ? "translate-y-1 flex flex-col"
                            : "h-0 w-0 opacity-0"
                        } duration-500 items-start justify-start text-[14px] mt-[10px]`}
                      >
                        <li className="flex space-x-2  items-center justify-center">
                          <img
                            src={check1 ? checkIcon : crossIcon}
                            width={15}
                            height={15}
                            alt="check-cross-icon"
                          />
                          <span>a minimum of 10 characters</span>
                        </li>
                        <li className="flex space-x-2  items-center justify-center">
                          <img
                            src={check2 ? checkIcon : crossIcon}
                            width={15}
                            height={15}
                            alt="check-cross-icon"
                          />
                          <span>a number</span>
                        </li>
                        <li className="flex space-x-2  items-center justify-center">
                          <img
                            src={check3 ? checkIcon : crossIcon}
                            width={15}
                            height={15}
                            alt="check-cross-icon"
                          />
                          <span>uppercase and lowercase letters</span>
                        </li>
                        <li className="flex items-center space-x-2 justify-center">
                          <img
                            src={check4 ? checkIcon : crossIcon}
                            width={15}
                            height={15}
                            alt="check-cross-icon"
                          />
                          <span>a special character</span>
                        </li>
                      </ul>
                    </Grid>
                    {showConfirmationCode ? (
                      <Grid item xs={12}>
                        <TextField
                          required
                          size="small"
                          fullWidth
                          name="confirmationCode"
                          label="Confirmation Code"
                          type="number"
                          id="confirmationCode"
                        />
                      </Grid>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Button
                    disabled={disabled}
                    type="submit"
                    variant="contained"
                    className=" w-full 0  transition-all bg-[#0050C8] font-normal active:bg-blue-800 hover:bg-blue-600 text-[16px] text-white rounded-md "
                    sx={{ marginTop: "52px" }}
                  >
                    Create Your Account
                  </Button>
                  <Grid
                    container
                    alignItems={"center"}
                    flexDirection={"column"}
                    justifyContent="center"
                    pt={"20px"}
                  >
                    <Grid item>
                      <span className="text-[#989898] tracking-tighter font-semibold">
                        By confirming your email, you agree to our
                      </span>
                      <a
                        href="#"
                        className="text-[blue] tracking-tighter font-semibold"
                      >
                        {"  "}
                        Terms of Service
                      </a>
                    </Grid>
                    <Grid item>
                      <span className="text-[#989898] tracking-tighter font-semibold">
                        and that you have read and understood our
                      </span>
                      <a
                        href="#"
                        className="text-[blue] tracking-tighter font-semibold"
                      >
                        {"  "}
                        Privacy Policy
                      </a>
                    </Grid>
                    <Grid item sx={{ mt: "15px" }} className="tracking-tighter">
                      Already have an account?
                      <Link variant="body2">
                        <LinkDom to={"/user/login"}> Sign in</LinkDom>
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </div>
          </main>
        </div>
      </div>
      {/* Error Alert */}
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={() => setOpenError(false)}
      >
        <Alert
          onClose={() => setOpenError(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
      {/* Success Alert */}
      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={() => setOpenSuccess(false)}
      >
        <Alert
          onClose={() => setOpenSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
