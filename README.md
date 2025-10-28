# TicketFlow - Multi-Framework Ticket Management Application

A comprehensive ticket management system implemented using: **React**

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Usage Guide](#usage-guide)
- [Design Specifications](#design-specifications)
- [Implementation Details](#implementation-details)
- [Browser Compatibility](#browser-compatibility)
- [Known Issues](#known-issues)
- [Future Enhancements](#future-enhancements)

## 🎯 Overview

TicketFlow is a modern, responsive ticket management web application that demonstrates identical functionality across three different frontend implementations. Each version provides a seamless user experience with authentication, dashboard analytics, and full CRUD operations for ticket management.

### Core Functionality

- **Landing Page**: Attractive hero section with wavy background and call-to-action buttons
- **Authentication**: Login and signup with form validation and session management
- **Dashboard**: Statistics overview showing total, open, and resolved tickets
- **Ticket Management**: Complete CRUD operations (Create, Read, Update, Delete)
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Real-time Validation**: Inline error messages and toast notifications

## ✨ Features

### 1. Landing Page
- Eye-catching hero section with app name and description
- Wavy SVG background animation
- Two decorative circular blur elements
- Login and "Get Started" call-to-action buttons
- Feature showcase cards with icons
- Consistent footer across all pages

### 2. Authentication System
- **Login Page**: Email and password authentication
- **Signup Page**: Account creation with password confirmation
- Form validation with inline error messages
- Toast notifications for success/failure feedback
- Session persistence using localStorage
- Protected routes with automatic redirects
- Simulated authentication (no backend required)

### 3. Dashboard
- Summary statistics cards:
  - Total tickets count
  - Open tickets (green indicator)
  - Resolved/Closed tickets (gray indicator)
- Quick navigation to Ticket Management
- Logout functionality
- Welcoming user interface

### 4. Ticket Management (CRUD)
- **Create**: Modal form to add new tickets
- **Read**: Grid display of tickets with status badges
- **Update**: Edit existing tickets with pre-filled forms
- **Delete**: Confirmation dialog before removal
- Status options: `open`, `in_progress`, `closed`
- Color-coded status tags:
  - Green: Open tickets
  - Amber: In Progress tickets
  - Gray: Closed tickets
- Real-time form validation
- Toast notifications for all actions

### 5. Error Handling
- Form validation errors displayed inline
- Toast notifications for system messages
- Unauthorized access redirects to login
- Clear, descriptive error messages
- Graceful handling of edge cases

## 🛠 Tech Stack

### React Version
- **React 18.x** (via CDN)
- **Lucide React** for icons
- **Tailwind CSS** for styling
- localStorage for data persistence


## 📁 Project Structure

```
ticket-management-app/
├── node_modules
├── public
├── src/
|   ├── auth
|   |    ├── AuthContext.ts
|   |    ├── AuthProvider.tsx
|   |    └── useAuth.ts
|   ├── components
|   |    ├── Footer.ts
|   |    ├── TicketModal.tsx
|   |    └── toast.tsx
│   └── pages    
|        ├── Dashboard.tsx
|        ├── LandingPage.tsx
|        ├── LoginPage.tsx  
|        ├── SignupPage.tsx   
|        └── TicketManagement.tsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├──tsconfig.node.json
└── vite.config.ts
```

## 🚀 Setup Instructions

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional but recommended)

### Option 1: Direct File Access
1. Download the implementation you want to test
2. Open the HTML file directly in your browser
3. Start using the application

#### Using VS Code Live Server
1. Install "Live Server" extension
2. Right-click on index.html
3. Select "Open with Live Server"


## 📖 Usage Guide

### Getting Started

1. **First Visit**: You'll see the landing page with the TicketFlow hero section

2. **Create Account**:
   - Click "Get Started" or navigate to signup
   - Enter any email (e.g., `user@example.com`)
   - Enter a password and confirm it
   - Click "Sign Up"

3. **Login**:
   - Click "Login" button
   - Enter the same credentials
   - Click "Login"

4. **View Dashboard**:
   - See statistics overview
   - Click "Manage Tickets" to proceed

5. **Create Ticket**:
   - Click "New Ticket" button
   - Fill in title (required) and description (optional)
   - Select status: Open, In Progress, or Closed
   - Click "Create"

6. **Edit Ticket**:
   - Click "Edit" button on any ticket card
   - Modify fields as needed
   - Click "Update"

7. **Delete Ticket**:
   - Click "Delete" button on any ticket
   - Confirm deletion in the dialog
   - Ticket is permanently removed

8. **Logout**:
   - Click "Logout" button
   - Returns to landing page
   - Session cleared

### Test Credentials
Since authentication is simulated, you can use **any email and password combination**:
- Email: `test@example.com`
- Password: `password123`

Or create your own!

## 🎨 Design Specifications

### Layout Requirements
- **Max Width**: 1440px (centered on larger screens)
- **Responsive Breakpoints**:
  - Mobile: < 768px (stacked layout)
  - Tablet: 768px - 1024px
  - Desktop: > 1024px (multi-column grid)

### Color Palette
- **Primary**: Indigo (#4F46E5)
- **Success/Open**: Green (#10B981)
- **Warning/In Progress**: Amber (#F59E0B)
- **Neutral/Closed**: Gray (#6B7280)
- **Background**: Blue-Indigo gradient
- **Error**: Red (#EF4444)

### Typography
- **Headings**: Bold, large sizes (text-4xl, text-3xl)
- **Body**: Regular weight, readable sizes
- **Labels**: Medium weight, smaller sizes

### Visual Elements
- **Hero Section**: Wavy SVG background with decorative circles
- **Cards**: White background, rounded corners, shadows
- **Buttons**: Rounded, with hover states
- **Status Badges**: Rounded pills with color coding
- **Modals**: Centered overlay with backdrop blur

### Accessibility
- Semantic HTML elements
- Proper heading hierarchy
- Alt text for decorative elements
- Sufficient color contrast (WCAG AA)
- Keyboard navigation support
- Focus states on interactive elements

## 🔧 Implementation Details

### React Version

**Key Features**:
- Functional components with hooks
- Context API for authentication state
- useState for local component state
- useEffect for side effects
- Component composition

**State Management**:
```javascript
// Auth context provides user state globally
const { user, login, signup, logout } = useAuth();

// Local state for forms and UI
const [tickets, setTickets] = useState([]);
const [showModal, setShowModal] = useState(false);
```

**File Structure**:
- Single-file component architecture
- All components in one HTML file
- React loaded via CDN


### Data Persistence

All versions use localStorage for data persistence:

**Auth Session**:
```javascript
// Key: 'ticketapp_session'
// Value: { email: "user@example.com", name: "user" }
localStorage.setItem('ticketapp_session', JSON.stringify(userData));
```

**Tickets**:
```javascript
// Key: 'ticketapp_tickets'
// Value: Array of ticket objects
localStorage.setItem('ticketapp_tickets', JSON.stringify(tickets));
```

**Ticket Schema**:
```javascript
{
  id: "1234567890",
  title: "Fix login bug",
  description: "Users cannot log in with special characters",
  status: "open" // "open" | "in_progress" | "closed"
}
```

### Security Considerations

**Note**: This is a demo application with simulated authentication. In production:
- Use proper backend authentication
- Hash passwords securely
- Use JWT or session tokens
- Implement CSRF protection
- Validate all inputs server-side
- Use HTTPS
- Implement rate limiting

## 🌐 Browser Compatibility

### Supported Browsers
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

### Features Used
- ES6+ JavaScript (arrow functions, destructuring, etc.)
- CSS Grid and Flexbox
- localStorage API
- Fetch API (not used but available)
- SVG support

### Mobile Support
- ✅ iOS Safari 14+
- ✅ Chrome Mobile
- ✅ Firefox Mobile
- ✅ Samsung Internet

## ⚠️ Known Issues

### React Version
- None reported

### General
- localStorage has a 5-10MB limit (sufficient for this use case)
- Data is not synced across browsers or devices
- No backend means data is local to each browser

## 🔮 Future Enhancements

### Potential Features
- [ ] Backend API integration
- [ ] Real authentication with JWT
- [ ] User profile management
- [ ] Ticket categories and tags
- [ ] File attachments
- [ ] Comments on tickets
- [ ] Real-time updates (WebSocket)
- [ ] Search and filter tickets
- [ ] Sort by different criteria
- [ ] Export tickets (CSV, PDF)
- [ ] Dark mode toggle
- [ ] Email notifications
- [ ] Multi-language support (i18n)
- [ ] Ticket history/audit log
- [ ] Priority levels
- [ ] Due dates and reminders
- [ ] Team collaboration features

### Technical Improvements
- [ ] Unit tests (Jest, Vue Test Utils)
- [ ] E2E tests (Cypress, Playwright)
- [ ] State management library (Redux, Vuex, Pinia)
- [ ] TypeScript support
- [ ] Build optimization
- [ ] Code splitting
- [ ] Progressive Web App (PWA)
- [ ] Offline support
- [ ] Performance monitoring

## 📞 Support & Contact

For questions, issues, or suggestions regarding TicketFlow:
- Report bugs or request features
- Check existing documentation
- Review code comments for implementation details

## 📄 License

This project is created for educational and demonstration purposes.

---

## 🎓 Learning Outcomes

By exploring these three implementations, you can learn:

1. **React Patterns**: Component composition, hooks, context API
2. **Responsive Design**: Mobile-first CSS with Tailwind
3. **Form Validation**: Client-side validation techniques
4. **State Management**: Different approaches across frameworks
5. **localStorage**: Browser storage for persistence
6. **UI/UX**: Consistent design language across implementations

## 🙏 Acknowledgments

- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for beautiful icons (React version)
- **React**, **Vue.js** teams for excellent documentation

---

**Built with ❤️ for the HNG Stage 2 Challenge**