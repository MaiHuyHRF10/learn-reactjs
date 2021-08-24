import { yupResolver } from "@hookform/resolvers/yup";
import { Button, makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { LockOutlined } from "@material-ui/icons";
import InputField from "components/form-controls/InputField";
import PasswordField from "components/form-controls/PasswordField";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import LinearProgress from "@material-ui/core/LinearProgress";

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

RegisterForm.defaultProps = {
  onSubmit: null,
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    padding: "16px",
  },

  progress: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
  },

  avatar: {
    margin: "0 auto",
    backgroundColor: "rgb(220, 0, 78)",
  },

  title: {
    padding: "16px",
    textAlign: "center",
  },

  submit: {
    margin: "12px 0",
  },
}));

function RegisterForm(props) {
  const classes = useStyles();

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required("Please enter your full name")
      .test("should has at least two words", "Please enter at least two words", (value) => {
        return value.split(" ").length >= 2;
      }),

    email: yup.string().required("Please enter your email").email("Please enter a valid email"),

    password: yup
      .string()
      .required("Please enter your password")
      .matches(/[A-Z,0-9]/, "must contain at least 1 letter [a-z] and 1 number [0-9]")
      .min(6, "Please enter at least 6 charecters"),

    retypePassword: yup
      .string()
      .required("Please retype your password")
      .oneOf([yup.ref("password")], "Password does not match"),
  });

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      retypePassword: "",
    },
    resolver: yupResolver(schema),
  });

  const { isSubmitting } = form.formState;

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress}></LinearProgress>}

      <Avatar className={classes.avatar}>
        <LockOutlined></LockOutlined>
      </Avatar>

      <Typography component="h3" variant="h5" className={classes.title}>
        Create An Account
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullName" label="Full Name" form={form} />
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <PasswordField name="retypePassword" label="Retype Password" form={form} />

        <Button
          disabled={isSubmitting}
          type="submit"
          className={classes.submit}
          color="primary"
          variant="contained"
          size="large"
          fullWidth
        >
          Create account
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
