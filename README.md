# JavaScript CLI ERP System

A lightweight command-line ERP (Enterprise Resource Planning) system built with Node.js, demonstrating core JavaScript concepts including data structures, functions, control flow, and user interaction through the terminal.

## Overview

This project is a mini CLI application that simulates an educational institution management system. It showcases fundamental JavaScript programming concepts in a practical, interactive environment.

## Features

- **Student Management**: Add, list, and delete student records with auto-generated IDs and fee tracking
- **Course Management**: Create and view course listings with unique course codes
- **Staff Management**: Add and display staff members with role assignments
- **Fees Overview**: Calculate total fees owed and identify top debtors
- **Interactive Menu System**: Clean, window-based navigation with clear visual separation

## Technologies Used

- **Node.js**: Runtime environment
- **CommonJS**: Module system
- **readline-sync**: Synchronous user input handling

## Installation

1. Clone this repository:
```bash
git clone https://github.com/Monometra/JAVASCRIPT_P1_JUANMORA.git
cd JAVASCRIPT_P1_JUANMORA/Dia1
```

2. Install dependencies:
```bash
npm install
```

## Usage

Run the application:
```bash
node script.js
```

### Main Menu Options

1. **Manage Students**: Add new students, view all registered students, or remove students by ID
2. **Manage Courses**: Register new courses and view the complete course catalog
3. **Manage Staff**: Add staff members (teachers/admins) and view staff directory
4. **View Fees**: Display total fees owed and highlight the student with the highest debt
5. **Exit**: Close the application

## JavaScript Concepts Demonstrated

- **Arrays**: Dynamic data storage for students, courses, and staff
- **Objects**: Structured data representation with properties
- **Functions**: Modular code organization with `showWindow()`, menu functions, and CRUD operations
- **Control Flow**: `switch` statements and conditional logic
- **Array Methods**: `forEach()`, `filter()`, `reduce()`, and `push()`
- **User Input**: Synchronous readline operations
- **Template Literals**: String interpolation for dynamic output
- **setTimeout()**: Asynchronous timing for better UX

## Project Structure

```
Dia1/
├── script.js          # Main application file
├── package.json       # Project metadata and dependencies
├── package-lock.json  # Dependency lock file
└── node_modules/      # Installed packages
```

## Code Highlights

### Dynamic Student Creation
Students are assigned auto-incrementing IDs and randomized fee amounts between $100-$1100 for demonstration purposes.

### Stateless Design
All data is stored in memory and resets on application restart, keeping the demo lightweight and focused on JavaScript fundamentals.

### Clean UI
The `showWindow()` function provides consistent visual formatting across all menu screens with header decorations and clear labeling.

## Learning Objectives

This project demonstrates proficiency in:
- Basic CRUD operations (Create, Read, Delete)
- Interactive CLI development
- Data manipulation with JavaScript array methods
- Functional programming patterns
- User input validation and flow control
- NPM package management

## Future Enhancements

Potential improvements for extended learning:
- Persistent data storage (JSON files or database)
- Student-course enrollment system
- Fee payment processing
- Staff-course assignment
- Search and filter functionality
- Update operations for existing records

## Author

**Juan Mora** (Monometra)  
GitHub: [@Monometra](https://github.com/Monometra)

## License

ISC

---

*Built as a demonstration project for JavaScript fundamentals course*