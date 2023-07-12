import { FieldArray, Form, Formik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import FormikControl from '../components/FormikControl'

function LoginForm () {

const [formValues, setFormValues] =useState(null)

  const initialValues = {
    email: '',
    password: '',
    address:{
      pin:"",
      state:""
    },
    phones:["",""],
    phNumers:[{name:"",email:""}]
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Required'),
    phNumers: Yup.array().of(
      Yup.object().shape({
        // Validation rules for each item in the array
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required'),
        // Add more validation rules as needed
      })
    ),
  })

  const onSubmit = (values,onSubmitProps) => {
    
    console.log( onSubmitProps)
    
    // onSubmitProps.setSubmitting(false)
    // onSubmitProps.resetForm()
    console.log('Form data', values)
    // setFormValues(null)

  }

  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
     

      enableReinitialize
    >
      {formik => {
        return (
          <Form>
            <FormikControl
              control='input'
              type='email'
              label='Email'
              name='email'
            />
            <FormikControl
              control='input'
              type='text'
              label='Pin'
              name='address.pin'
            />
            <FormikControl
              control='input'
              type='text'
              label='State'
              name='address.state'
            />
            <FormikControl
              control='input'
              type='text'
              label='Phone 1'
              name='phones[0]'
            />
            <FormikControl
              control='input'
              type='text'
              label='Phone 2'
              name='phones[1]'
            />

{console.log('ssssssss', formik.errors, formik)}
            <FormikControl
              control='input'
              type='text'
              label='Phone 2'
              name='phones[1]'
            />
<hr />
<hr />
<FieldArray name='phNumers'>
{
  (fieldArrayProps)=>{
console.log('fieldArrayProps', fieldArrayProps)
const {push, remove, form}=fieldArrayProps
const {values}=form
const {phNumers}=values
return <div className="" >{
  phNumers.map((ph,index)=>(
    <div className="key" key={`phNumers.name${index}`}>
        <FormikControl
              control='input'
              type='text'
              label={`number ${index+ 1}`}
              name={`phNumers[${index}].name`}
            />
        <FormikControl
              control='input'
              type='text'
              label={`Email ${index+ 1}`}
              name={`phNumers[${index}].email`}
            />

            <button type='button' disabled={index ==0} onClick={()=>remove(index)}>-</button>
            <button type='button' onClick={()=>push({name:"",email:""})}>+</button>
    </div>
  ))
  }</div>
  }
}
</FieldArray>






            
          
             { console.log(formik.values)}
            <button type='reset' onClick={()=>setFormValues(null)}>Reset</button>
            <button type='button' onClick={()=>{
              formik.validateField("email")
            }}>validate Email</button>
            <button type='button'  onClick={()=>{
              formik.validateForm()
            }}>validate All</button>
            <button type='button' onClick={()=>{
              formik.setFieldTouched("email")
            }}>Visit Email</button>
            <button type='button'  onClick={()=>{
              formik.setTouched({email: true,password: true})
            }}>Visit Fields</button>
            
            <button type='submit' >Submit</button>
            <button type='button' onClick={()=>{
              setTimeout(()=>{
                setFormValues({   email: 'abc@gmail',
                password: '657gfjj',
              
            
    address:{
      pin:"334",
      state:"dsfdfds"
    },
    phones:["343","6786876"],
    phNumers:[{name:"sd",email:"advbb"},{name:"avg",email:"advbddb@"}]
              })
              },1000)
            }} >Load data</button>

          </Form>
        )
      }}
    </Formik>
  )
}

export default LoginForm