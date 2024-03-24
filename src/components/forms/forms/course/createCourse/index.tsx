import { useEffect, FC } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './styles.scss';
import DescriptionField from '../../../../shared/fields/DescriptionField';
import { useCourseStore } from "../../../../../state/course/course";
import { useAuthStore } from "../../../../../state/auth/auth";

type FormValues = {
  title: string;
  description: string;
  category: string;
  duration: string;
  language: string;
  level: string;
  image: string;
};

type CourseFormProps = {
  onNext: (id: string) => void;
};

const validationSchema = Yup.object({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
  duration: Yup.string().required('Required'),
  language: Yup.string().required('Required'),
  level: Yup.string().required('Required'),
  prerequisites: Yup.string(),
  image: Yup.mixed().required('A file is required'),
});

const CourseForm: FC<CourseFormProps> = ({ onNext }) => {
  const { createCourse } = useCourseStore();
  const { getUser, user } = useAuthStore();

  useEffect(() => {
    getUser();
  }, [getUser]);
  

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        category: '',
        duration: '',
        language: '',
        level: '',
        image: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values: FormValues, { setSubmitting }) => {
        try {
          const formData = new FormData();
          Object.keys(values).forEach(key => {
            if (key === 'image' && values[key]) {
              formData.append(key, values[key]);
            } else {
              formData.append(key, values[key]);
            }
          });

          if (user && user.token) {
            const newCourse = await createCourse(formData, user.token);
            onNext(newCourse?.id);
          }
        } catch (error) {
          console.error('Failed to submit form:', error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ setFieldValue }) => (
        <Form className="form" encType="multipart/form-data">
          <label htmlFor="title">Course title</label>
          <Field name="title" type="text" />
          <ErrorMessage name="title" component="div" className="error-message" />

          <label htmlFor="description">Course description</label>
          <Field name="description" component={DescriptionField} />
          <label htmlFor="category">Category/subject</label>
          <Field name="category" type="text" />
          <ErrorMessage name="category" component="div" className="error-message" />

          <label htmlFor="duration">Course duration</label>
          <Field name="duration" type="text" />
          <ErrorMessage name="duration" component="div" className="error-message" />

          <label htmlFor="language">Language</label>
          <Field name="language" type="text" />
          <ErrorMessage name="language" component="div" className="error-message" />

          <label htmlFor="level">Level</label>
          <Field className="select" name="level" as="select">
            <option value="">Select level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </Field>
          <ErrorMessage name="level" component="div" className="error-message" />

          <label htmlFor="image">Course image/cover</label>
          <input id="image" name="image" type="file" onChange={(event) => {
            setFieldValue("image", event.currentTarget.files[0]);
          }} />
          <ErrorMessage name="image" component="div" className="error-message" />

          <button className="create-form-button" type="submit">Next</button>
        </Form>
      )}
    </Formik>
  );
};

export default CourseForm;