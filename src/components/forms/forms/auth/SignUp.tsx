// App.tsx
import { FC } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useAuthStore } from '../../../../state/auth/auth';
import './styles.scss';

const SignupSchema = Yup.object().shape({
    fullName: Yup.string().required('Required'),
    username: Yup.string().required('Required'),
    password: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    role: Yup.string().oneOf(['student', 'instructor', 'admin'], 'Invalid role').required('Required'),
    terms: Yup.bool().oneOf([true], 'You must agree to the terms and conditions').required('Required'),
});


const SignUp: FC = () => {
    const signup = useAuthStore((state) => state.signup);

    return (
        <>
            <div className='container'>
                <h2>Let's create your account</h2>
                <Formik
                    initialValues={{ fullName: '', username: '', password: '', role: 'admin', terms: false }}
                    validationSchema={SignupSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        signup(values.fullName, values.username, values.password, values.role);
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field type="text" name="fullName" placeholder="Enter your full name" />
                            <Field type="text" name="username" placeholder="Enter your email" />
                            <Field type="password" name="password" placeholder="Enter your password" />
                            {/* <Field type="text" name="role" placeholder="Role" /> */}
                            {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Field type="checkbox" name="terms" />
                                <label htmlFor="terms">I agree to the terms and conditions</label>
                            </div> */}
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

export default SignUp;