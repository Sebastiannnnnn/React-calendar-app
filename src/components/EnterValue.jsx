import React from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = values => {
    const errors = {}
    if (!values.description) {
        errors.description = 'Required'
    } else if (!/^[a-zäöåA-ZÄÖÅ]+$/.test(values.description)) {
        errors.description = 'Invalid description'
    }

    if (!values.hours) {
        errors.hours = 'Required'
    } else if (!/^([0-9.])+$/.test(values.hours)) {
        errors.hours = 'Invalid hours'
    }

    return errors
}

const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
}) => (
    <div>
        <label style={{paddingTop: '10px', display: 'inline-block'}}>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} />
            <br/>
                {touched &&
                ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </div>
    </div>
)

const HourForm = props => {
    const { handleSubmit } = props
    return (
        <form onSubmit={handleSubmit} style={{width: '100%', textAlign: 'left'}}>
            <Field name="description" type="text" component={renderField} label="Description" />
            <Field name="hours" type="text" component={renderField} label="Hours" />
        </form>
    )
}

export default reduxForm({
    form: 'hourForm',
    validate,
    initialValues: {
        description: '',
        hours: ''
    }
})(HourForm)