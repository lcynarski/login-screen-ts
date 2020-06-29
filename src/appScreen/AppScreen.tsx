import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import gif from "../assets/dogGif1.gif";

const useStyles = makeStyles({
    root: {
        backgroundImage: "linear-gradient(red, yellow, green)",
        height: '100vh',
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        color: "white"
    },
});

const AppScreen = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h1>Successfully logged in</h1>
            <img src={gif} alt="dog meme" />
        </div>
    )
}

export default AppScreen;