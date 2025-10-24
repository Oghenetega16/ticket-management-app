import { useEffect } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";

type ToastProps = {
    message: string;
    type: "success" | "error";
    onClose: () => void;
};

export default function Toast({ message, type, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const Icon = type === "error" ? AlertCircle : CheckCircle;
    const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";

    return (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 text-white transition-all duration-300 ease-in-out ${bgColor}`}>
            <Icon size={20} />
            <span>{message}</span>
        </div>
    );
}
