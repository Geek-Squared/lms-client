import { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons"
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCourseStore } from '../../../../../state/course/course';
import { useAuthStore } from '../../../../../state/auth/auth';
import UniqueCourseCard from '../../../../shared/cards/course/CreatedCourse';

// const validationSchema = Yup.object({
//   modules: Yup.array().of(
//     Yup.object({
//       title: Yup.string().required('Required'),
//       resources: Yup.array().of(
//         Yup.object({
//           type: Yup.string().required('Required'),
//           file: Yup.mixed().required('A file is required'),
//         })
//       ),
//       quizzes: Yup.array().of(
//         Yup.object({
//           question: Yup.string().required('Required'),
//           answers: Yup.array().of(Yup.string().required('Required')),
//           correctAnswer: Yup.string().required('Required'),
//         })
//       ),
//       prerequisites: Yup.array().of(Yup.string()),
//       releaseDate: Yup.date(),
//     })
//   ),
// });

const CourseContentForm = ({ courseId }) => {
  const [moduleType, setModuleType] = useState([]);
  const [expandedModule, setExpandedModule] = useState(0);
  const fetchCourse = useCourseStore((state) => state.fetchCourse);
  const addModuleToCourse = useCourseStore((state) => state.addModuleToCourse);
  const course = useCourseStore((state) => state.course);
  const { getUser, user } = useAuthStore();

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    fetchCourse(courseId, user?.token);
  }, [fetchCourse, courseId]);

  console.log('course', course)

  return (
    <Formik
      initialValues={{
        modules: [
          {
            title: '',
            videoUrl: '',
            // resources: [],
            prerequisites: [],
            releaseDate: null
          }
        ]
      }}

      // validationSchema={validationSchema}
      onSubmit={async (values: any, { setSubmitting }) => {
        console.log('onSubmit called!');


        const formData: any = new FormData();

        formData.append('title', values.modules[0].title);
        formData.append('test', '123');

        const videoFile = values.modules[0].videoUrl;
        console.log('video', videoFile)
        if (videoFile) {
          formData.append('videoUrl', videoFile);
        }

        // values.modules[0].resources.forEach(resource => {
        //   const file = resource.fileUrl;
        //   if (file) {
        //     formData.append('resources', file);
        //   }
        // });

        formData.append('prerequisites', JSON.stringify(values.modules[0].prerequisites));

        formData.append('releaseDate', values.modules[0].releaseDate);
        console.log('formdata', formData);
        try {
          console.log('Module added!');
          await addModuleToCourse(course?._id, values.modules[0], formData, user.token);

          setSubmitting(false);

        } catch (error) {
          console.error(error);
          setSubmitting(false);
        }

      }}
    >
      {({ values, setFieldValue, handleSubmit }) => {
        const submitForm = () => {
          handleSubmit();
        };
        return (

          <div>
            <div className="page-container">
              {values.modules.map((module, index) => (
                <Form className="form" key={index}>
                  <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}>
                    <h3 onClick={() => setExpandedModule(index)}>
                      {/* {expandedModule === index ? <FontAwesomeIcon icon={faArrowDown} /> : <FontAwesomeIcon icon={faArrowRight} />} */}
                      {` ${module.title || 'Upload Module'}`}
                    </h3>
                    <FontAwesomeIcon icon={faTrash} onClick={() => {
                      const newModules = [...values.modules];
                      newModules.splice(index, 1);
                      setFieldValue('modules', newModules);
                      const newModuleType = [...moduleType];
                      newModuleType.splice(index, 1);
                      setModuleType(newModuleType);
                    }} />
                  </div>
                  {expandedModule === index && (
                    <>
                      {moduleType[index] === 'video' &&
                        <input type="file" 
                        name={`modules.${index}.videoUrl`}
                        accept="video/*" onChange={(event) => {
                            setFieldValue(`modules.${index}.videoUrl`, event.currentTarget.files[0]);
                          }} />
                      }
                      <label className="label" htmlFor={`modules.${index}.title`}>Module Title</label>
                      <Field name={`modules.${index}.title`} placeholder="e.g Introduction" />
                      {moduleType[index] === 'video' && (
                        <>
                          <label className="label" htmlFor={`modules.${index}.resources`}>Add a resource</label>
                          <Field name={`modules.${index}.resources[0].fileUrl`} placeholder="Resource File" type="file" accept="application/pdf,video/*"
                            onChange={async (event) => {
                              if (event.currentTarget.files.length > 0) {
                                const resourceFile = event.currentTarget.files[0];
                                const module = values.modules[index];
                                module.resources[0].file = resourceFile.name;
                                setFieldValue(`modules.${index}.resources[0].fileUrl`, resourceFile.name);
                              }
                            }}
                          />
                          <label className="label" htmlFor={`modules.${index}.prerequisites`}>Prerequisites</label>
                          <Field name={`modules.${index}.prerequisites`} placeholder="Prerequisites" />
                          <label className="label" htmlFor={`modules.${index}.releaseDate`}>Release Date</label>
                          <Field name={`modules.${index}.releaseDate`} placeholder="Release Date" type="date" />
                        </>
                      )}

                    </>
                  )}
                </Form>
              ))}
              <UniqueCourseCard
                title={course?.title}
                description={course?.description}
                imageUrl={"https://plus.unsplash.com/premium_photo-1678565869434-c81195861939?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" || course?.image}
                authorPic="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                authorName="DR Hannah Stills"
                level={course?.level}
              // price={19.99}
              >
                <div className="submit-button">
                  <button type="submit" className="submit" onClick={handleSubmit}>Submit</button>
                </div>
              </UniqueCourseCard>
            </div>
            <div className="dropdown">
              <button className="dropbtn">Add Module
                <FontAwesomeIcon icon={faAdd} />
              </button>
              <div className="dropdown-content">
                <a onClick={() => {
                  setModuleType([...moduleType, 'video']);
                  setFieldValue('modules', [...values.modules, { quizzes: [] }]);
                  setExpandedModule(values.modules.length); // Set new module as expanded
                }}>Video</a>

              </div>
            </div>

          </div>
        )
      }}
    </Formik>
  );
};

export default CourseContentForm;