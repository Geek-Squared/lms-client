// App.tsx
import { FC } from 'react';
import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuthStore } from '../../../../state/auth/auth';
import './styles.scss';

const SignupSchema = Yup.object().shape({
    username: Yup.string().required('Required'),
    password: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
});

const Login: FC = () => {
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    return (
        <>
            <div className='container'>
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={SignupSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        login(values.username, values.password)
                            .then(() => {
                                navigate('/')
                            })
                            .catch(error => {
                                console.error('Login failed:', error);
                            })
                            .finally(() => {
                                setSubmitting(false);
                            });
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field type="text" name="username" placeholder="Enter your email" />
                            <Field type="password" name="password" placeholder="Enter your password" />
                            <button className="auth-button" type="submit" disabled={isSubmitting}>
                                Sign Up
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default Login;