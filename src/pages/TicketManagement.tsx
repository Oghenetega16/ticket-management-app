import { useState, useEffect } from "react";
import { Plus, LogOut, Trash2, SquarePen, Ticket } from "lucide-react";
import { useAuth } from "../auth/useAuth";
import Toast from "../components/toast";
import TicketModal from "../components/TicketModal";
import Footer from "../components/Footer";

interface TicketType {
    id: string;
    title: string;
    description?: string;
    status: "open" | "in_progress" | "closed";
}

interface ToastProps {
    message: string;
    type: "success" | "error";
}

interface TicketManagementProps {
    onNavigate: (page: "dashboard" | "landing") => void;
}

export default function TicketManagement({ onNavigate }: TicketManagementProps) {
    const { logout } = useAuth();
    const [tickets, setTickets] = useState<TicketType[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editingTicket, setEditingTicket] = useState<TicketType | null>(null);
    const [toast, setToast] = useState<ToastProps | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    useEffect(() => {
        const savedTickets = localStorage.getItem("ticketapp_tickets");
        if (savedTickets) {
            try {
                setTickets(JSON.parse(savedTickets));
            } catch {
                console.error("Error loading tickets");
            }
        }
    }, []);

    const saveTickets = (newTickets: TicketType[]) => {
        setTickets(newTickets);
        localStorage.setItem("ticketapp_tickets", JSON.stringify(newTickets));
    };

    const handleCreateOrUpdate = (ticketData: Omit<TicketType, "id">) => {
        if (editingTicket) {
            const updated = tickets.map((t) =>
                t.id === editingTicket.id ? { ...ticketData, id: t.id } : t
            );
            saveTickets(updated);
            setToast({ message: "Ticket updated successfully!", type: "success" });
        } else {
            const newTicket: TicketType = { ...ticketData, id: Date.now().toString() };
            saveTickets([...tickets, newTicket]);
            setToast({ message: "Ticket created successfully!", type: "success" });
        }
        setShowModal(false);
        setEditingTicket(null);
    };

    const handleEdit = (ticket: TicketType) => {
        setEditingTicket(ticket);
        setShowModal(true);
    };

    const handleDelete = (id: string) => {
        saveTickets(tickets.filter((t) => t.id !== id));
        setToast({ message: "Ticket deleted successfully!", type: "success" });
        setDeleteConfirm(null);
    };

    const handleLogout = () => {
        logout();
        onNavigate("landing");
    };

    const getStatusColor = (status: TicketType["status"]) => {
        switch (status) {
            case "open":
                return "bg-green-100 text-green-800";
            case "in_progress":
                return "bg-amber-100 text-amber-800";
            case "closed":
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusLabel = (status: TicketType["status"]) => {
        switch (status) {
            case "open":
                return "Open";
            case "in_progress":
                return "In Progress";
            case "closed":
                return "Closed";
            default:
                return status;
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex flex-col">
            {toast && <Toast {...toast} onClose={() => setToast(null)} />}

            <div className="grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                    <div className="flex flex-col gap-4 mb-6 sm:mb-8">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                            <div>
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Ticket Management</h1>
                                <button
                                    onClick={() => onNavigate("dashboard")}
                                    className="text-indigo-600 hover:underline mt-2 text-sm sm:text-base cursor-pointer"
                                >
                                    ← Back to Dashboard
                                </button>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                <button
                                    onClick={() => {
                                    setEditingTicket(null);
                                    setShowModal(true);
                                    }}
                                    className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm sm:text-base cursor-pointer"
                                >
                                    <Plus size={20} />
                                    New Ticket
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm sm:text-base cursor-pointer"
                                >
                                    <LogOut size={20} />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    {tickets.length === 0 ? (
                        <div className="text-center py-12 sm:py-16">
                            <Ticket size={48} className="mx-auto text-gray-400 mb-4 sm:w-16 sm:h-16" />
                            <p className="text-gray-600 text-base sm:text-lg px-4">No tickets yet. Create your first ticket!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {tickets.map((ticket) => (
                                <div key={ticket.id} className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                                    <div className="flex justify-between items-start gap-2 mb-3 sm:mb-4">
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 break-words flex-1">{ticket.title}</h3>
                                        <span
                                            className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 ${getStatusColor(
                                            ticket.status
                                            )}`}
                                        >
                                            {getStatusLabel(ticket.status)}
                                        </span>
                                    </div>

                                    {ticket.description && (
                                        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-3">{ticket.description}</p>
                                    )}

                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <button
                                            onClick={() => handleEdit(ticket)}
                                            className="flex items-center justify-center gap-1 px-3 py-1.5 cursor-pointer sm:py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-sm"
                                        >
                                            <SquarePen size={16} />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => setDeleteConfirm(ticket.id)}
                                            className="flex items-center justify-center gap-1 px-3 py-1.5 cursor-pointer sm:py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition text-sm"
                                        >
                                            <Trash2 size={16} />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {showModal && (
                <TicketModal
                    ticket={editingTicket}
                    onClose={() => {
                        setShowModal(false);
                        setEditingTicket(null);
                }}
                    onSave={handleCreateOrUpdate}
                />
            )}

            {deleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-4 sm:p-6 max-w-md w-full">
                        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Confirm Delete</h3>
                        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Are you sure you want to delete this ticket? This action cannot be undone.</p>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <button
                                onClick={() => handleDelete(deleteConfirm)}
                                className="w-full py-2 bg-red-500 text-white cursor-pointer rounded-lg hover:bg-red-600 transition text-sm sm:text-base"
                            >
                                Delete
                            </button>

                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="w-full py-2 bg-gray-200 text-gray-800 cursor-pointer rounded-lg hover:bg-gray-300 transition text-sm sm:text-base"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}