import { AlertCircle, CheckCircle, Ticket } from 'lucide-react';

interface LandingPageProps {
    onNavigate: (page: 'login' | 'signup') => void;
}

function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-sm">© 2025 TicketFlow. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-grow">
                <div className="relative overflow-hidden">
                    <svg
                        className="absolute bottom-0 w-full h-32 sm:h-48 md:h-64 lg:h-80"
                        viewBox="0 0 1440 320"
                        preserveAspectRatio="none"
                    >
                        <path
                            fill="#4F46E5"
                            fillOpacity="0.1"
                            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,128C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        ></path>
                    </svg>

                    <div className="hidden md:block absolute top-20 right-20 w-64 h-64 bg-indigo-300 rounded-full opacity-20 blur-3xl"></div>
                    <div className="hidden md:block absolute bottom-40 left-10 w-96 h-96 bg-blue-300 rounded-full opacity-20 blur-3xl"></div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
                        <div className="text-center space-y-6 sm:space-y-8">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900">TicketFlow</h1>
                            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                                Streamline your support workflow with our powerful ticket management
                                system. Track, manage, and resolve tickets efficiently.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                                <button
                                    onClick={() => onNavigate('login')}
                                    className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-indigo-600 text-white cursor-pointer rounded-lg font-semibold hover:bg-indigo-700 transition"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => onNavigate('signup')}
                                    className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-white text-indigo-600 cursor-pointer rounded-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition"
                                >
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                                <Ticket className="text-indigo-600" size={24} />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold mb-2">Easy Ticket Management</h3>
                            <p className="text-sm sm:text-base text-gray-600">
                                Create, update, and track tickets with an intuitive interface designed
                                for efficiency.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle className="text-green-600" size={24} />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold mb-2">Real-time Updates</h3>
                            <p className="text-sm sm:text-base text-gray-600">
                                Stay informed with instant notifications and status updates on all your
                                tickets.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                                <AlertCircle className="text-amber-600" size={24} />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold mb-2">Smart Prioritization</h3>
                            <p className="text-sm sm:text-base text-gray-600">Organize tickets by priority and status to focus on what matters most.</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}