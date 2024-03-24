import React from 'react';
import './styles.scss';
import { NavLink } from 'react-router-dom';

interface ClientNavProps {
    // Add any props you need for the component here
}

const ClientNav: React.FC<ClientNavProps> = () => {

    return (
        <div className="course-nav">
            <NavLink className="course_item" activeClassName="active" to={'/#'}>Web Development</NavLink>
            <NavLink className="course_item" activeClassName="active" to="/help">Excel</NavLink>
            <NavLink className="course_item" activeClassName="active" to="/cart">Game Development</NavLink>
            <NavLink className="course_item" activeClassName="active" to={''}>Leadership</NavLink>
            <NavLink className="course_item" activeClassName="active" to={''}>Design</NavLink>
            <NavLink className="course_item" activeClassName="active" to={''}>Marketing</NavLink>
            <NavLink className="course_item" activeClassName="active" to={''}>Data Science</NavLink>
            <NavLink className="course_item" activeClassName="active" to={''}>Photography</NavLink>
        </div>
    );
};

export default ClientNav;