import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import FormTextField from "./components/formTextField";
import {FormikProps, Form, Formik} from 'formik';
import validationSchema from "./validation";
import {Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios"
import { useHistory } from "react-router-dom";


interface Values {
    email: string;
    password: string
}


const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'white',
        border: 0,
        borderRadius: 6,
        padding: '20px 30px 0',
        width: 600,
        height: 440
    },
    header: {
        padding: '30px 0'
    },
    form: {
        width: '100%'
    },
    textField: {
        paddingBottom: 20
    }
});

const API_URL = 'https://iqot98h9u0.execute-api.eu-west-1.amazonaws.com/default/';

const LoginForm = () => {
    const [loggingInProgress, setLoggingInProgress] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const history = useHistory();
    const classes = useStyles();

    const initialValues = {
            email: '',
            password: ''
    }

    return (
        <Paper className={classes.root}>
            <h1 className={classes.header}>Welcome to our solution</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    setLoggingInProgress(true);
                    axios.post(API_URL, {
                        email: values.email,
                        password: values.password
                    })
                        .then((resp) => {
                            if (loginError) setLoginError(false);
                            history.push("/home");
                    })
                        .catch(() => setLoginError(true))
                        .finally(() => setLoggingInProgress(false));
                }}
                validationSchema={validationSchema}
            >
                {(props: FormikProps<Values>) => (
                    <Form className={classes.form}>
                        <FormTextField
                            name="email"
                            id="email"
                            label="Email"
                            type="text"
                            fullWidth
                            isLoginError={loginError}
                            className={classes.textField}
                        />
                        <FormTextField
                            name="password"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            className={classes.textField}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            fullWidth={true}
                        >
                            Log In
                        </Button>
                    </Form>
                )}
            </Formik>
        </Paper>
    )
}

export default LoginForm;