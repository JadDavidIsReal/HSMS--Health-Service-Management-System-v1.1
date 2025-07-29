# Patch Notes

## Revamp 2025-07-29

### Project-Wide
- Removed all third-party UI libraries (e.g., Radix, Sonner, Recharts).
- Removed dark mode.
- Restructured folders for clarity.
- Implemented a role-based access control (RBAC) system.

### Nurse Features
- Created a dedicated dashboard view for nurses.
- Added sections for walk-in, scheduled, and referred consultations.
- Implemented a mock chat button and search bar.
- Created views for patient records (students, employees, community).
- Implemented editable nurse's notes in patient profiles.
- Built a stocks management page with add/edit/delete functionality.
- Added a history page for removed stock items.
- Created a reports page with placeholder charts.

### Doctor Features
- Created a dedicated dashboard view for doctors.
- Implemented search functionality.
- Enabled editable doctor's notes in patient profiles.
- Built a mock chat system with a basic UI.
- Added mock chat notifications to the header.

### Student/Patient Features
- Created a read-only view of the patient's own profile.
- Built an appointment booking form.
- Simplified the sidebar to show only relevant items.

### Styling & Responsiveness
- Ensured all components and pages are mobile-friendly.
- Made tables responsive by converting them to card lists on smaller screens.
- Adjusted layouts to stack vertically on mobile devices.
- Maintained a consistent look and feel using Tailwind CSS.
