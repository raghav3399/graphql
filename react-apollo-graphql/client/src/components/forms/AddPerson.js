import { useMutation } from '@apollo/client'
import { Button, Form, Input } from 'antd'
import { useEffect, useState } from 'react'

import { v4 as uuidv4 } from 'uuid'
import { ADD_PERSON, GET_PEOPLE } from '../../graphql/queries'

const AddPerson = () => {
  const styles = getStyles()
  const [id] = useState(uuidv4())
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  const [addPerson] = useMutation(ADD_PERSON)

  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = values => {
    const { firstName, lastName } = values
    console.log("firstname is: ", firstName)
    addPerson({
      variables: {
        id,
        firstName,
        lastName
      },
      update: (cache, { data: { addPerson } }) => {
        const data = cache.readQuery({ query: GET_PEOPLE })
        cache.writeQuery({
          query: GET_PEOPLE,
          data: {
            ...data,
            people: [...data.people, addPerson]
          }
        })
      }
    })
  }

  return (
    <div>
        <h3 style={styles.h3}>
          <span style={styles.h3Text}>Add Person</span>
          <span style={{ ...styles.horizontalLine, ...styles.leftLine }}></span>
          <span style={{ ...styles.horizontalLine, ...styles.rightLine }}></span>
        </h3>
    <Form
      name='add-person-form'
      layout='inline'
      size='large'
      style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}
      form={form}
      onFinish={onFinish} >
      <Form.Item
      label="First Name: "
        name='firstName'
        rules={[{ required: true, message: 'Please enter a first name' }]} >
        <Input placeholder='First Name' />
      </Form.Item>
      <Form.Item  label="Last Name: "name='lastName' rules={[{ required: true, message: 'Please enter a last name' }]}>
        <Input placeholder='Last Name' />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            } >
            Add Person
          </Button>
        )}
      </Form.Item>
    </Form>
    </div>
  )
}

const getStyles = () => ({
  h3: {
    textAlign: 'center',
    position: 'relative',
  },
  h3Text: {
    position: 'relative',
    zIndex: 1,
  },
  horizontalLine: {
    content: '',
    position: 'absolute',
    top: '50%',
    height: '1px',
    backgroundColor: '#000',
    opacity: 0.1,
    width: '55%',
    zIndex: 0,
  },
  leftLine: {
    left: 0,
    transform: 'translateX(-30%)',
  },
  rightLine: {
    right: 0,
    transform: 'translateX(30%)',
  },
});


export default AddPerson
