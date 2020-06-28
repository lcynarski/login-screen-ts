import React, { useMemo } from "react";
import {FieldAttributes, useField} from "formik";
import TextField from "@material-ui/core/TextField";


interface TextFieldProps {
    label: string,
    id: string,
    type: string,
    fullWidth: boolean,
    className: string,
    isLoginError?: boolean
}

const FormTextField = ({ label, id, type, fullWidth, isLoginError = false, className, ...props }: TextFieldProps & FieldAttributes<{}>) => {
    const [field, meta] = useField(props);

    const helperText = useMemo(() => {
        if (meta.touched && meta.error) return meta.error;
        if (isLoginError) return 'Selected email or password does not exist';
        return null;
    }, [meta.touched, meta.error, isLoginError]);

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
            helperText={helperText}
        />
    );
};

export default FormTextField;