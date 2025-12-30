import Navbar from '../common/Navbar';

const PatientHomePage = ({ onNavigate, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onLogout={onLogout} userType="patient" />
      
      {/* Rest of your content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ... */}
      </div>
    </div>
  );
};