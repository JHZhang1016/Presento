import { useState } from 'react';
import { loginApi } from '../../api.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Card } from 'flowbite-react';
import { DarkThemeToggle } from 'flowbite-react';
import Form from './Form';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      value: password,
      onChange: (e) => setPassword(e.target.value),
      validate: (value) => {
        return value !== '' ? '' : 'Password can not be empty.';
      }
    }
  ]

  const onSubmit = async () => {
    try {
      await loginApi({ email: email, password: password });
      toast.success('Login successful!')
      navigate('/dashboard');
    } catch (error) {
      toast.error(`${error.message}`, {
        toastId: 'loginError'
      })
    }
  }

  return (
    <div className='flex items-center justify-center w-[100vw] h-[100vh] dark:bg-gray-900 dark:text-gray-400'>
      <DarkThemeToggle className='absolute top-4 right-4' />
      <Card className='w-96 min-h-96'>
        <Form title='Log in' fields={fields} buttonText='submit' onSubmit={onSubmit}></Form>
      </Card>
    </div>

  )
}

export default Login;