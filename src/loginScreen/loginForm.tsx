import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {useField, FormikProps, Form, Formik, FieldAttributes} from 'formik';
import validationSchema from "./validation";
import {Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


interface Values {
    email: string;
    password: string
}

interface TextFieldProps {
    label: string,
    id: string,
    type: string,
    fullWidth: boolean,
    className: string
}



const MyTextField = ({ label, id, type, fullWidth, className, ...props }: TextFieldProps & FieldAttributes<{}>) => {
    const [field, meta, helpers] = useField(props);
    return (
            <TextField
                id={id}
                label={label}
                type={type}
                fullWidth
                variant="outlined"
                className={className}
                {...field}
                error={!!(meta.touched && meta.error)}
                helperText={meta.touched && meta.error ? meta.error : null}
            />
    );
};

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

const LoginForm = () => {
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
                    setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }, 1000)}}
                validationSchema={validationSchema}
            >
                {(props: FormikProps<Values>) => (
                    <Form className={classes.form}>
                        <MyTextField
                            name="email"
                            id="email"
                            label="Email"
                            type="text"
                            fullWidth
                            className={classes.textField}
                        />
                        <MyTextField
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