import React from 'react';
import './styles.scss';
import { NavLink } from 'react-router-dom';

interface ClientNavProps {
    // Add any props you need for the component here
}

const ClientNav: React.FC<ClientNavProps> = () => {

    return (
        //@ts-ignore
        <div className="course-nav">
            {/* @ts-ignore */}
            <NavLink className="course_item" activeClassName="active" to={'/#'}>Web Development</NavLink>
            {/* @ts-ignore */}

            <NavLink className="course_item" activeClassName="active" to="/help">Excel</NavLink>
            {/* @ts-ignore */}

            <NavLink className="course_item" activeClassName="active" to="/cart">Game Development</NavLink>
            {/* @ts-ignore */}

            <NavLink className="course_item" activeClassName="active" to={''}>Leadership</NavLink>
            {/* @ts-ignore */}

            <NavLink className="course_item" activeClassName="active" to={''}>Design</NavLink>
            {/* @ts-ignore */}

            <NavLink className="course_item" activeClassName="active" to={''}>Marketing</NavLink>
            {/* @ts-ignore */}

            <NavLink className="course_item" activeClassName="active" to={''}>Data Science</NavLink>
            {/* @ts-ignore */}

            <NavLink className="course_item" activeClassName="active" to={''}>Photography</NavLink>
        </div>
    );
};

export default ClientNav;