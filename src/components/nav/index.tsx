import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../state/auth/auth';
import './styles.scss';

const Navbar = () => {

    const { getUser, user,logout } = useAuthStore();
    useEffect(() => {
        getUser();
      }, [getUser]);
    
    return (
        <nav className="navbar">
            <div className="navbar__left">
                <div className="navbar__logo">LMS</div>
                <div className="navbar__search">
                    {/* <div className="search-icon">🔍</div> */}
                    <input type="text" placeholder="Search Course Here..." />
                </div>
            </div>
            <div className="navbar__right">
                <Link className="navbar__item" to="/courses">My Courses</Link>
                <Link className="navbar__item" to="/admin">Create Course</Link>
                <Link className="navbar__item" to="/cart">Cart</Link>
                {
                    user? (
                        <>
                        <button className="navbar__item" onClick={() => {
                            logout();
                        }}>Logout</button>
                        </>
                    ) : (
                        <>
                        
                        <button className="navbar__item" onClick={() => {
                            window.location.href = '/login';
                        }}>Login</button>
                          <button className="navbar__item" onClick={() => {
                    window.location.href = '/sign-up';
                }}>Sign Up</button>
                        </>
                    )
                }
               
              
            </div>
        </nav>
    );
};

export default Navbar;