import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const JoinUs = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext); // Get the current user from AuthContext

    const handleJoinClick = () => {
        if (user) {
            // If user is already logged in, redirect directly to volunteer form
            navigate('/volunteer');
        } else {
            // If user is not logged in, set flag and redirect to signup/login
            localStorage.setItem('wantsToVolunteer', 'true');
            navigate('/signupLogin');
        }
    };

    return (
        <div className="flex justify-center text-center items-center min-h-40 mt-20">
            <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col w-full md:w-3/4 lg:w-2/3">
                <div className="text-center md:text-left">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                        🌟 Join the Bhayat NGO Community! 🌟
                    </h2>
                    <p className="mt-2 text-gray-700">
                        Be a changemaker – Make a difference today!
                    </p>
                    <ul className="mt-3 text-gray-600 text-left list-disc pl-5">
                        <li>✅ Make a real impact in communities</li>
                        <li>✅ Be part of meaningful projects</li>
                        <li>✅ Meet like-minded people & grow your network</li>
                        <li>✅ Develop new skills & gain valuable experience</li>
                    </ul>
                    <p className="mt-3 font-semibold text-gray-800">How You Can Contribute:</p>
                    <ul className="text-gray-600 text-left list-disc pl-5">
                        <li>💙 Education – Teach and mentor underprivileged children</li>
                        <li>💙 Healthcare – Support medical camps & awareness programs</li>
                        <li>💙 Environment – Join tree plantation & cleanup drives</li>
                        <li>💙 Fundraising & Events – Help organize campaigns & donations</li>
                        <li>💙 Social Media & Outreach – Spread awareness & inspire change</li>
                    </ul>
                </div>
                
                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleJoinClick}
                        className="bg-red-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-red-700 transition-all"
                    >
                        {user ? 'Fill Volunteer Form' : 'Join Us'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JoinUs;