import React from 'react';
import AdminNav from './components/nav/AdminNav';
import './styles.scss';
import MultiStepForm from './components/forms/forms/course/createCourse/CourseMultiStep';

const AdminView: React.FC = () => {
    return (
        <div className='admin-view'>
            <AdminNav />
            <div className='admin-content'>
               <MultiStepForm />
            </div>
        </div>
    );
};

export default AdminView;