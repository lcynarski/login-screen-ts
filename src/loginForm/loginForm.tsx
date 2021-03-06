import React, {useContext, useState} from "react";
import { useHistory } from "react-router-dom";
import {FormikProps, Form, Formik} from 'formik';
import axios from "axios"
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";
import FormTextField from "./components/formTextField";
import validationSchema from "./validation";
import AuthContext from "../authContext";


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
        height: 440,
        "@media only screen and (max-width: 600px)": {
            opacity: 0.9,
            height: "100%",
            width: "100%"
        }
    },
    header: {
        padding: '30px 0'
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
    const {setAuthenticated} = useContext(AuthContext);
    const history = useHistory();
    const classes = useStyles();

    const initialValues = {
            email: '',
            password: ''
    }

    const logIn = (values: Values) => {
        axios.post(API_URL, {
            email: values.email,
            password: values.password
        })
            .then((resp) => {
                if (loginError) setLoginError(false);
                setAuthenticated(true);
                history.push("/home");
            })
            .catch((res) => {
                setLoginError(true);
                setAuthenticated(false);
            })
            .finally(() => setLoggingInProgress(false));
    }

    return (
        <Paper className={classes.root}>
            <h1 className={classes.header}>Welcome to our solution</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    setLoggingInProgress(true);
                    logIn(values);
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
                        {loggingInProgress ?
                            <CircularProgress color="secondary" /> :
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                fullWidth={true}
                                role="submit"
                                disabled={loggingInProgress}
                            >
                                Log In
                            </Button>
                        }
                    </Form>
                )}
            </Formik>
        </Paper>
    )
}

export default LoginForm;