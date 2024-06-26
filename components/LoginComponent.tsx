'use client'
import apiClient from '@/utils/APIClient';
import Link from 'next/link';
import { useState } from 'react';
import { validateEmail, validatePassword } from '@/utils/validate';
import InputField from './InputField'; // Assuming this is the correct path
import { ToastContainer, toast } from 'react-toastify';
import { useCurrentUser } from '@/app/hook/user';
import Utils from '@/utils/utils';

type LoginFormFields = {
  email: string;
  password: string;
}

type TouchedFields = {
  [key in keyof LoginFormFields]: boolean;
}

type ErrorState = {
  [key in keyof LoginFormFields]?: string | null;
}

const fields: LoginFormFields = {
  email: '',
  password: '',
};

const validations: { [key: string]: (value: string) => string | null; } = {
  email: validateEmail,
  password: validatePassword,
};

export default function SignIn() {

  const { user } = useCurrentUser();
  if (user) { Utils.redirectTo("/", 3000); }

  // 添加一个新的状态变量来跟踪是否正在提交
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formFields, setFormFields] = useState(fields);
  const [touched, setTouched] = useState<TouchedFields>({ email: false, password: false });
  const [errors, setErrors] = useState<ErrorState>({});


  const handleInputChange = (field: keyof LoginFormFields) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFormFields((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      validateField(field, value);
    }
  };


  const handleBlur = (field: keyof LoginFormFields) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formFields[field]);
  };

  const validateField = (field: keyof LoginFormFields, value: string) => {
    const validationFunc = validations[field];
    if (validationFunc) {
      const errorMessage = validationFunc(value);
      setErrors((prev) => ({ ...prev, [field]: errorMessage }));
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // 如果已经在提交，直接返回
    if (isSubmitting) return;

    setIsSubmitting(true); // 设置为正在提交状态
    console.log(isSubmitting);
    Object.keys(formFields).forEach((field) => {
      const fieldKey = field as keyof LoginFormFields;
      validateField(fieldKey, formFields[fieldKey]);
    });
    if (Object.values(errors).every((error) => !error)) {
      try {
        const data = await apiClient.loginUser(formFields);
        // handle success (e.g. redirect user, show a success message, etc.)
        toast.success('Successfully logged in!', {
          position: toast.POSITION.TOP_CENTER,
          onClose: () => {
            Utils.redirectTo("/", 6000); // Redirect after the toast is dismissed
          }
        });
        //Utils.redirectTo("/",3000);
      } catch (error) {
        // handle error (e.g. show error message)
        console.error("An error occurred while logging in: ", error);
        toast.error('Failed to log in. Please try again.', {
          position: toast.POSITION.TOP_CENTER
        });
      }
    } else {
      setIsSubmitting(false); // 如果有验证错误，也要重置提交状态
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        id="email"
        field="email"
        value={formFields.email}
        handleChange={handleInputChange('email')}
        handleBlur={handleBlur('email')}
        touched={touched.email}
        type="email"
        label="Email"
        required
        error={touched.email && errors.email ? errors.email : undefined}
      />
      <InputField
        id="password"
        field="password"
        value={formFields.password}
        handleChange={handleInputChange('password')}
        handleBlur={handleBlur('password')}
        touched={touched.password}
        type="password"
        label="Password"
        required
        error={touched.password && errors.password ? errors.password : undefined}
      />
      <Link className="text-sm font-medium text-indigo-500 ml-2" href="/reset-password">
        Forgot Password?
      </Link>
      {/* The rest of your form */}
      <div className="mt-6">
        <button
          disabled={isSubmitting}
          className={`btn-sm text-sm text-white bg-indigo-500 hover:bg-indigo-600 w-full shadow-sm group 
              ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} // 添加样式来改变禁用按钮的外观
        >
          {isSubmitting ? 'Signing In...' : 'Sign In'}
          <span className="tracking-normal text-sky-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
            -&gt;
          </span>
        </button>

      </div>
      {/* <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
    </form>
  );
}