import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { auth, provider } from "../../../firebase";
import { FirebaseError } from "firebase/app";
import { Container } from "../../UIKit/Container";
import { Button } from "../../UIKit/Button/Button";
import { Paper } from "../../UIKit/Paper/Paper";
import { Input } from "../../UIKit/Input";
import styles from "./SignUpPage.module.scss";

export type SignUpFormType = {
  email: string;
  password: string;
};

export const SignUpPage = () => {
  const { control, reset, handleSubmit, setError } = useForm<SignUpFormType>({
    defaultValues: {
      password: "",
      email: "",
    },
    mode: "onSubmit",
  });

  const handleNativeAuth: SubmitHandler<SignUpFormType> = async ({
    email,
    password,
  }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMessage = error.message;
        const errorCode = error.code;

        switch (errorCode) {
          case "auth/invalid-email":
            setError("email", { message: "This email address is invalid." });
            break;
          case "auth/user-disabled":
            setError("email", {
              message: "This email address is disabled by the administrator.",
            });
            break;
          case "auth/user-not-found":
            setError("email", {
              message: "This email address is not registered.",
            });
            break;
          case "auth/wrong-password":
            setError("password", {
              message:
                "The password is invalid or the user does not have a password.",
            });
            break;
          default:
            console.error(errorMessage);
            break;
        }
      }
    }
    reset();
  };

  const handleGoogleAuth = () => {
    signInWithPopup(auth, provider).catch((error) => {
      console.error(error);
    });
  };

  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.contentWrapper}>
          <Paper className={styles.signUpModal}>
            <h4 className={styles.title}>Sign up</h4>
            <div className={styles.nativeAuth}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "email is required",
                  validate: (email) =>
                    email
                      .toLowerCase()
                      .match(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                      ) ?? "invalid email",
                }}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <Input
                    label="Email"
                    value={value}
                    onChange={onChange}
                    placeholder="email"
                    errorMessage={error?.message}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "password is required",
                  validate: (password) =>
                    password.length >= 6 || "min password length is 6",
                }}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <Input
                    label="Password"
                    value={value}
                    onChange={onChange}
                    placeholder="password"
                    limit={100}
                    errorMessage={error?.message}
                    type="password"
                  />
                )}
              />
              <Button text="Log in" onClick={handleSubmit(handleNativeAuth)} />
            </div>
            <Button
              text="Log in with Google"
              startIcon={
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" />
              }
              onClick={handleGoogleAuth}
              size="small"
            />
          </Paper>
        </div>
      </Container>
    </div>
  );
};
