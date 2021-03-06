import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import LoginForm from "../loginForm/loginForm";
import background from "../assets/background-0.jpg";

const useStyles = makeStyles({
    root: {
        background: `url(${background}) center`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: '100vh',
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

const LoginScreen = () => {
    const classes = useStyles();

    return (<div className={classes.root}>
        <LoginForm />
    </div>)
}

export default LoginScreen;