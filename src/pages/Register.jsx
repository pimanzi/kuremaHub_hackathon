import { FiUser } from 'react-icons/fi';
import { CiLock } from 'react-icons/ci';
import { useEffect } from 'react';
import useUser from '@/features/Authentication/useUser';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useSignup from '@/features/Authentication/useSignup';

const Register = () => {
  const { signingUp, isSigningUp } = useSignup();
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/home');
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({ mode: 'onBlur' });

  const password = watch('password');

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-[var(--color-bg-main)]">
        <div className="loader"></div>
      </div>
    );
  function onSubmitSignUp(data) {
    signingUp(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      <div className="relative w-full md:w-1/2 flex flex-col items-center justify-center text-white p-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/90 z-10"></div>
        <div className="absolute inset-0 bg-[url('/images/Eric.jpg')] bg-cover bg-center bg-no-repeat"></div>
        <div className="relative z-20 max-w-lg text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            The easiest way to manage your events.
          </h1>
        </div>
      </div>
      <div className="w-full md:w-1/2 min-h-screen bg-white flex items-center justify-center p-6">
        <div className="bg-gray-300/50 p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-5">
          <div className="flex justify-center mb-4">
            <img src="/images/logoHub.png" alt="Logo" className="w-32" />
          </div>
          <h2 className="text-2xl font-bold text-black mb-4">Sign Up</h2>
          <p className="text-black mb-6">Enter your credentials below!</p>
          <form
            onSubmit={handleSubmit(onSubmitSignUp)}
            className="flex flex-col gap-2"
          >
            <input
              type="text"
              placeholder="First Name"
              className="pl-10 py-2 rounded-lg w-full bg-gray-300 text-black"
              {...register('firstName', {
                required: 'First name is required',
                pattern: {
                  value: /^[A-Za-z]{2,}$/,
                  message: 'Only letters, min 2 chars',
                },
              })}
            />
            <span className="text-sm text-red-400">
              {errors.firstName?.message}
            </span>

            <input
              type="text"
              placeholder="Last Name"
              className="pl-10 py-2 rounded-lg w-full bg-gray-300 text-black"
              {...register('lastName', {
                required: 'Last name is required',
                pattern: {
                  value: /^[A-Za-z]{2,}$/,
                  message: 'Only letters, min 2 chars',
                },
              })}
            />
            <span className="text-sm text-red-400">
              {errors.lastName?.message}
            </span>

            <div className="relative">
              <FiUser className="absolute ml-2 mt-2 text-black" />
              <input
                type="email"
                placeholder="Email"
                className="pl-10 py-2 rounded-lg w-full bg-gray-300 text-black"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email format',
                  },
                })}
              />
              <span className="text-sm text-red-400">
                {errors.email?.message}
              </span>
            </div>

            <div className="relative">
              <CiLock className="absolute ml-2 mt-2 text-black" />
              <input
                type="password"
                placeholder="Password"
                className="pl-10 py-2 rounded-lg w-full bg-gray-300 text-black"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 4, message: 'At least 4 characters' },
                })}
              />
              <span className="text-sm text-red-400">
                {errors.password?.message}
              </span>
            </div>

            <div className="relative mb-4">
              <input
                type="password"
                placeholder="Confirm Password"
                className="pl-10 py-2 rounded-lg w-full bg-gray-300 text-black"
                {...register('confirmPassword', {
                  required: 'Confirm password is required',
                  validate: (value) =>
                    value === password || 'Passwords do not match',
                })}
              />
              <span className="text-sm text-red-400">
                {errors.confirmPassword?.message}
              </span>
            </div>

            <button
              disabled={isSigningUp}
              className="w-full py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-500 transition duration-200"
              type="submit"
            >
              Sign Up
            </button>
          </form>

          <p className="text-black text-center mt-4">
            Have an account yet?{' '}
            <button onClick={() => navigate('/login')}>Login</button>
          </p>
          <button onClick={() => navigate('/home')}>Back Home</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
