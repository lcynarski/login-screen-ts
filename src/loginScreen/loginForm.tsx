import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {useField, FormikProps, Form, Formik, FieldAttributes} from 'formik';
import validationSchema from "./validation";


interface Values {
    email: string;
    password: string
}

interface TextFieldProps {
    label: string,
    id: string,
    type: string,
    fullWidth: boolean
}

const MyTextField = ({ label, id, type, fullWidth, ...props }: TextFieldProps & FieldAttributes<{}>) => {
    const [field, meta, helpers] = useField(props);
    return (
            <TextField
                id={id}
                label={label}
                type={type}
                fullWidth
                {...field}
                error={!!(meta.touched && meta.error)}
                helperText={meta.touched && meta.error ? meta.error : null}
            />
    );
};

const LoginForm = () => {

    const initialValues = {
            email: '',
            password: ''
    }

    return (
        <div>
            <h1>Please log in</h1>
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
                    <Form>
                        <MyTextField
                            name="email"
                            id="email"
                            label="Email"
                            type="text"
                            fullWidth
                        />
                        <MyTextField
                            name="password"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                        />
                        <Button
                            type="submit"
                        >
                            Log In
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default LoginForm;