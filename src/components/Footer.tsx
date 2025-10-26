export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-6 sm:py-8 mt-12 sm:mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-sm sm:text-base">&copy; {new Date().getFullYear()} TicketFlow. All rights reserved.</p>
            </div>
        </footer>
    )
}