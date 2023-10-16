import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import SocialLogin from './components/SocialLogin';
import EbookForm from './pages/EbookForm';
import EbookPreview from './pages/EbookPreview';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import ThankYou from './pages/ThankYou';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SocialLogin />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/ebook-form" element={<EbookForm />} />
          <Route path="/ebook-preview" element={<EbookPreview />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
