import { BrowserRouter as Router, Routes } from 'react-router-dom';
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