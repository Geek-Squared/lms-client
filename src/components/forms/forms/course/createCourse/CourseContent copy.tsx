import { useState, useEffect } from 'react';
import { Key } from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { faAdd, faTrash, faArrowDown, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CourseMediaCard from '../../../../cards/courseVideo';
import { useCourseStore } from '../../../../../state/course/course';
import { useAuthStore } from '../../../../../state/auth/auth';
import UniqueCourseCard from '../../../../shared/cards/course/CreatedCourse';

const validationSchema = Yup.object({
  modules: Yup.array().of(
    Yup.object({
      title: Yup.string().required('Required'),
      resources: Yup.array().of(
        Yup.object({
          type: Yup.string().required('Required'),
          file: Yup.mixed().required('A file is required'),
        })
      ),
      quizzes: Yup.array().of(
        Yup.object({
          question: Yup.string().required('Required'),
          answers: Yup.array().of(Yup.string().required('Required')),
          correctAnswer: Yup.string().required('Required'),
        })
      ),
      prerequisites: Yup.array().of(Yup.string()),
      releaseDate: Yup.date(),
    })
  ),
});

const CourseContentForm = ({ courseId }) => {
  const [moduleType, setModuleType] = useState([]);
  const [expandedModule, setExpandedModule] = useState(0); // Default to first module
  const fetchCourse = useCourseStore((state) => state.fetchCourse);
  const addModuleToCourse = useCourseStore((state) => state.addModuleToCourse);
  const course = useCourseStore((state) => state.course);
  const { getUser, user, logout } = useAuthStore();

  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    fetchCourse(courseId, user?.token);
  }, [fetchCourse, courseId]);

  console.log('course', course)

  return (
    <Formik
      initialValues={course || {
        modules: [],
      }}
      // validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          // Map over the modules and create a FormData object for each one
          const modules = values.modules.map((module) => {
            const formData = new FormData();
            Object.keys(module).forEach((key) => {
              if (key === 'resources') {
                module.resources.forEach((file, index) => {
                  formData.append(`resources[${index}]`, file);
                });
              } else if (key === 'videoUrl') {
                formData.append('videoUrl', module.videoUrl);
              } else {
                formData.append(key, module[key]);
              }
            });
            return formData;
          });
      
          // Call addModuleToCourse for each module
          for (const module of modules) {
            await addModuleToCourse(course?._id, module, user?.token);
          }
        } catch (error) {
          console.error(error);
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

                      {moduleType[index] === 'video' && <Field name={`modules.${index}.videoUrl`} type="file" onChange={async (event) => {
                        if (event.currentTarget.files.length > 0) {
                          const videoFile = event.currentTarget.files[0];
                          try {
                            await useCourseStore.getState().uploadVideo(courseId, videoFile, user?.token);
                            // After the video is uploaded, update the videoUrl field
                            setFieldValue(`modules.${index}.videoUrl`, useCourseStore.getState().course.video);
                          } catch (error) {
                            console.error(error);
                          }
                        }
                      }} />}
                      <label className="label" htmlFor={`modules.${index}.title`}>Module Title</label>
                      <Field name={`modules.${index}.title`} placeholder="e.g Introduction" />
                      {moduleType[index] === 'video' && (
                        <>
                          <label className="label" htmlFor={`modules.${index}.resources`}>Add a resource</label>
                          <Field name={`modules.${index}.resources`} placeholder="Resource File" type="file" accept="application/pdf,video/*"
                            onChange={async (event) => {
                              if (event.currentTarget.files.length > 0) {
                                const resourceFile = event.currentTarget.files[0];
                                try {
                                  // Replace this with your file upload logic
                                  await useCourseStore.getState().uploadResource(courseId, resourceFile, user?.token);
                                  // After the resource is uploaded, update the resourceUrl state variable
                                  // Replace this with your state update logic
                                  setResourceUrl(useCourseStore.getState().course.resource);
                                } catch (error) {
                                  console.error(error);
                                }
                              }
                            }}
                          />
                          <label className="label" htmlFor={`modules.${index}.prerequisites`}>Prerequisites</label>
                          <Field name={`modules.${index}.prerequisites`} placeholder="Prerequisites" />
                          <label className="label" htmlFor={`modules.${index}.releaseDate`}>Release Date</label>
                          <Field name={`modules.${index}.releaseDate`} placeholder="Release Date" type="date" />
                        </>
                      )}
                      {moduleType[index] === 'quiz' && (
                        <>
                          <label className="label" htmlFor={`modules.${index}.quizzes`}>Quizzes</label>
                          <FieldArray name={`modules.${index}.quizzes`}>
                            {({ push }) => (
                              <div>
                                <button type="button" onClick={() => push({ question: '', answers: [], correctAnswer: '' })}>Add Quiz</button>
                                {module.quizzes.map((quiz: { answers: any[]; }, quizIndex: Key | null | undefined) => (
                                  <div key={quizIndex}>
                                    <Field name={`modules.${index}.quizzes.${quizIndex}.question`} placeholder="Quiz Question" />
                                    <FieldArray name={`modules.${index}.quizzes.${quizIndex}.answers`}>
                                      {({ push }) => (
                                        <div>
                                          <button type="button" onClick={() => push('')}>Add Answer</button>
                                          {quiz.answers.map((answer: any, answerIndex: any) => (
                                            <Field key={answerIndex} name={`modules.${index}.quizzes.${quizIndex}.answers.${answerIndex}`} placeholder="Answer" />
                                          ))}
                                        </div>
                                      )}
                                    </FieldArray>
                                    <Field name={`modules.${index}.quizzes.${quizIndex}.correctAnswer`} placeholder="Correct Answer" />
                                  </div>
                                ))}
                              </div>
                            )}
                          </FieldArray>
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
                <a onClick={() => {
                  setModuleType([...moduleType, 'quiz']);
                  setFieldValue('modules', [...values.modules, { quizzes: [] }]);
                  setExpandedModule(values.modules.length); // Set new module as expanded
                }}>Quiz</a>
              </div>
            </div>

          </div>
        )
      }}
    </Formik>
  );
};

export default CourseContentForm;