import { useState } from "react";
import type { FormEvent } from "react";
import { useAuth } from "../auth/useAuth";
import Toast from "../components/toast";

type SignupPageProps = {
    onNavigate: (page: string) => void;
};

type ToastData = {
    message: string;
    type: "success" | "error";
};

type Errors = {
    email?: string;
    password?: string;
    confirmPassword?: string;
};

export default function SignupPage({ onNavigate }: SignupPageProps) {
    const { signup } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<Errors>({});
    const [toast, setToast] = useState<ToastData | null>(null);

    const validate = (): Errors => {
        const newErrors: Errors = {};
        if (!email) newErrors.email = "Email is required";
        if (!password) newErrors.password = "Password is required";
        if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
        if (password && confirmPassword && password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        return newErrors;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const result = signup(email, password, confirmPassword);

        if (result.success) {
            setToast({ message: "Account created successfully!", type: "success" });
            setTimeout(() => onNavigate("dashboard"), 1000);
        } else {
            setToast({ message: result.error || "Signup failed", type: "error" });
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
            {toast && <Toast {...toast} onClose={() => setToast(null)} />}

            <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-center mb-8">Create Account</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        {errors.email && (
                            <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        {errors.password && (
                            <p id="password-error" className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Re-enter your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        {errors.confirmPassword && (
                            <p id="confirmPassword-error" className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-center mt-4 text-gray-600">
                Already have an account?{" "}
                <button onClick={() => onNavigate("login")} className="text-indigo-600 hover:underline">
                    Login
                </button>
                </p>
            </div>
        </div>
    );
}
