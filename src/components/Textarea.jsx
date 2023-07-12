import { ErrorMessage, Field } from 'formik'
import React from 'react'
import TextError from './TextError'

function Textarea (props) {
  const { label, name, ...rest } = props
  return (
    <div className='form-control'>
      <label htmlFor={name}>{label}</label>
      <Field as='textarea' id={name} name={name} {...rest} />
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default Textarea