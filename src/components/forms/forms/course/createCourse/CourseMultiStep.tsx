import { useState } from 'react';
import CourseForm from '.';
import CourseContentForm from './CourseContent';


const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [courseId, setCourseId] = useState(null);

    const handleNext = (newCourseId: any) => {
        setCourseId(newCourseId);
        setStep(step + 1);
    };

    return (
        <div>
            {step === 1 && <CourseForm onNext={handleNext} />}
            {step === 2 && (<CourseContentForm courseId={courseId} />)}
        </div>
    );
};

export default MultiStepForm;