import { useState } from "react";
import { X } from "lucide-react";

interface TicketType {
    id: string;
    title: string;
    description?: string;
    status: "open" | "in_progress" | "closed";
}

interface TicketModalProps {
    ticket: TicketType | null;
    onClose: () => void;
    onSave: (ticketData: Omit<TicketType, "id">) => void;
}

export default function TicketModal({ ticket, onClose, onSave }: TicketModalProps) {
    const [title, setTitle] = useState(ticket?.title || "");
    const [description, setDescription] = useState(ticket?.description || "");
    const [status, setStatus] = useState<TicketType["status"]>(ticket?.status || "open");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!title.trim()) newErrors.title = "Title is required";
        if (!status) newErrors.status = "Status is required";
        if (!["open", "in_progress", "closed"].includes(status)) {
            newErrors.status = "Status must be open, in_progress, or closed";
        }
        return newErrors;
    };

    const handleSubmit = () => {
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        onSave({ title, description, status });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold">{ticket ? "Edit Ticket" : "Create Ticket"}</h2>
                    <button onClick={onClose} aria-label="close" className="text-gray-500 hover:text-gray-700 cursor-pointer">
                        <X size={24} />
                    </button>
                </div>

                <div className="space-y-4 sm:space-y-6">
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Title *</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter ticket title"
                            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        {errors.title && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            placeholder="Describe the issue..."
                            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label htmlFor="ticketStatus" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Status *</label>
                        <select
                            id="ticketStatus"
                            value={status}
                            onChange={(e) => setStatus(e.target.value as TicketType["status"])}
                            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            <option value="open">Open</option>
                            <option value="in_progress">In Progress</option>
                            <option value="closed">Closed</option>
                        </select>
                        {errors.status && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.status}</p>}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <button
                            onClick={handleSubmit}
                            className="w-full py-2.5 sm:py-3 bg-indigo-600 text-white cursor-pointer rounded-lg font-semibold hover:bg-indigo-700 transition text-sm sm:text-base cursor-pointer"
                        >
                        {ticket ? "Update" : "Create"}
                        </button>

                        <button
                            onClick={onClose}
                            className="w-full py-2.5 sm:py-3 bg-gray-200 text-gray-800 cursor-pointer rounded-lg font-semibold hover:bg-gray-300 transition text-sm sm:text-base cursor-pointer"
                        >
                        Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}