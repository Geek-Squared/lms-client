import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientView from './ClientView';
import AdminView from './AdminView';
import CourseView from './CourseView';
import './styles.scss';

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <div className="app-content">
                    <Routes>
                        {/* <Route path="/" element={<ClientView />} /> */}
                        {/* <Route path="/admin" element={<AdminView />} /> */}
                        {/* <Route path="/course" element={<CourseView />} /> */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;