import { useState, useEffect } from "react";
import { useAuth } from "../auth/useAuth";
import { AlertCircle, CheckCircle, Ticket, LogOut } from "lucide-react";

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
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Welcome back, {user?.name}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition w-full sm:w-auto"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Total Tickets */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs sm:text-sm font-medium">Total Tickets</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">{stats.total}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Ticket className="text-indigo-600" size={20} />
              </div>
            </div>
          </div>

          {/* Open Tickets */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs sm:text-sm font-medium">Open Tickets</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-1 sm:mt-2">{stats.open}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="text-green-600" size={20} />
              </div>
            </div>
          </div>

          {/* Resolved Tickets */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs sm:text-sm font-medium">Resolved Tickets</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-600 mt-1 sm:mt-2">{stats.resolved}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="text-gray-600" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={() => onNavigate("tickets")}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition text-sm sm:text-base"
          >
            Manage Tickets
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 sm:py-8 mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm sm:text-base">&copy; {new Date().getFullYear()} TicketFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}