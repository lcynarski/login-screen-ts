import React from "react";
import {FieldAttributes, useField} from "formik";
import TextField from "@material-ui/core/TextField";


interface TextFieldProps {
    label: string,
    id: string,
    type: string,
    fullWidth: boolean,
    className: string
}

const FormTextField = ({ label, id, type, fullWidth, className, ...props }: TextFieldProps & FieldAttributes<{}>) => {
    const [field, meta] = useField(props);
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

export default FormTextField;