import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import gif from "../assets/dogGif1.gif";

const useStyles = makeStyles({
    root: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

const AppScreen = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <img src={gif} alt="dog meme" />
        </div>
    )
}

export default AppScreen;