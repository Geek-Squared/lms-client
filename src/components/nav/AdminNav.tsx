import React from 'react';
import './styles.scss';

const AdminNav: React.FC = () => {
    return (
        <div className="admin-nav">
            <div className="logo">LMS Admin</div>
            <ul className="menu-items">
                <li>Home</li>
                <li>Inbox</li>
                <li>Courses</li>
                <li>Student List</li>
                <li>Quiz</li>
            </ul>
        </div>
    );
};

export default AdminNav;