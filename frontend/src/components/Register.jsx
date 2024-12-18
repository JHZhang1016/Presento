import { useState } from 'react';
import { registerApi } from '../../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Form from './Form';
import { Card, DarkThemeToggle } from 'flowbite-react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const fields = [
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      value: email,
      onChange: (e) => setEmail(e.target.value),
      validate: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? '' : 'Invalid Email Address.'
      }
    },
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      placeholder: 'Your Name',
      value: name,
      onChange: (e) => setName(e.target.value),
      validate: (value) => {
        return value !== '' ? '' : 'Name can not be empty.';
      }
    },
    {
      label: 'password',
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      value: password,
      onChange: (e) => setPassword(e.target.value),
      validate: (value) => {
        return value !== '' ? '' : 'Password can not be empty.';
      }
    },
    {
      label: 'Confirm Password',
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm Password',
      value: confirmPassword,
      onChange: (e) => {
        setConfirmPassword(e.target.value);
      },
      validate: (value) => {
        return value === password ? '' : 'Password not match.'
      }
    }
  ]

  const onSubmit = async () => {
    try {
      await registerApi({ email: email, username: name, password: password });
      toast.success('Sign up successful!')
      navigate('/dashboard');
    } catch (error) {
      toast.error(`${error.message}`, {
        toastId: 'RegisterError'
      })
    }
  }

  return (
    <div className='flex items-center justify-center w-[100vw] h-[100vh] dark:bg-gray-900 dark:text-gray-400'>
      <DarkThemeToggle className='absolute top-4 right-4' />
      <Card className='w-96 min-h-96'>
        <Form title='Sign up' fields={fields} buttonText='submit' onSubmit={onSubmit}></Form>
      </Card>
    </div>

  )
}

export default Register;