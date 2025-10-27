import { useState, useEffect } from "react";
import { useAuth } from "../auth/useAuth";
import { AlertCircle, CheckCircle, Ticket, LogOut } from "lucide-react";
import Footer from "../components/Footer";

interface DashboardProps {
    onNavigate: (page: string) => void;
}

interface TicketType {
    id: string;
    title: string;
    status: "open" | "closed";
    description?: string;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
    const { user, logout } = useAuth();
    const [tickets, setTickets] = useState<TicketType[]>([]);

    useEffect(() => {
        const savedTickets = localStorage.getItem("ticketapp_tickets");
        if (savedTickets) {
            try {
                setTickets(JSON.parse(savedTickets));
            } catch (e) {
                console.error("Error loading tickets:", e);
            }
        }
    }, []);

    const handleLogout = () => {
        logout();
        onNavigate("landing");
    };

    const stats = {
        total: tickets.length,
        open: tickets.filter((t) => t.status === "open").length,
        resolved: tickets.filter((t) => t.status === "closed").length,
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
            <div className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
                            <p className="text-gray-600 mt-2">Welcome back, {user?.name}!</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white cursor-pointer rounded-lg hover:bg-red-600 transition"
                        >
                            <LogOut size={20} />
                            Logout
                        </button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium">Total Tickets</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
                                </div>
                                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                                    <Ticket className="text-indigo-600" size={24} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium">Open Tickets</p>
                                    <p className="text-3xl font-bold text-green-600 mt-2">{stats.open}</p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <AlertCircle className="text-green-600" size={24} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium">Resolved Tickets</p>
                                    <p className="text-3xl font-bold text-gray-600 mt-2">{stats.resolved}</p>
                                </div>
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                    <CheckCircle className="text-gray-600" size={24} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                            onClick={() => onNavigate("tickets")}
                            className="px-8 py-3 bg-indigo-600 text-white cursor-pointer rounded-lg font-semibold hover:bg-indigo-700 transition transform hover:scale-105"
                        >
                            Manage Tickets
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}