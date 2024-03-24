// CourseDetailsNav.tsx
import React from 'react';
import './styles.scss';
import { NavLink } from 'react-router-dom';

interface CourseDetailsNavProps {
  onTabChange: (tab: string) => void;
}

const CourseDetailsNav: React.FC<CourseDetailsNavProps> = ({ onTabChange }) => {
  return (
    <div className="course-description-nav">
      <NavLink className="course_item"
        //@ts-ignore
        activeClassName="active" to={''} onClick={() => onTabChange('description')}>Overview</NavLink>
      <NavLink className="course_item"
        //@ts-ignore
        activeClassName="active" to={''} onClick={() => onTabChange('discussion')}>Discussions</NavLink>
      <NavLink className="course_item"
        //@ts-ignore
        activeClassName="active" to={''} onClick={() => onTabChange('resources')}>Resources</NavLink>
      <NavLink className="course_item"
        //@ts-ignore
        activeClassName="active" to={''} onClick={() => onTabChange('qa')}>Q & A</NavLink>
    </div>
  );
};

export default CourseDetailsNav;