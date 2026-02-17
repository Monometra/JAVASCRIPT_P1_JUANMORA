// CLI ERP
let students = []; // Wipes on reload!
let courses = [];
let staff = [];

// Window function to clear screen and show header
function showWindow(title) {
  console.clear();
  console.log('='.repeat(50));
  console.log(`   JS EXAMPLE CLI ERP - ${title.toUpperCase()}`);
  console.log('='.repeat(50));
  console.log('');
}

// Main menu function
function mainMenu() {
  showWindow('Main Menu');
  console.log('1. Manage Students');
  console.log('2. Manage Courses');
  console.log('3. Manage Staff');
  console.log('4. View Fees');
  console.log('5. Exit');
  console.log('');
  
  let choice = require('readline-sync').question('Pick your adventure (1-5): ');
  
  switch(choice) {
    case '1': studentsMenu(); break;
    case '2': coursesMenu(); break;
    case '3': staffMenu(); break;
    case '4': feesWindow(); break;
    case '5': console.log('Bye there!'); process.exit(); break;
    default: console.log('Oops, wrong choice!'); setTimeout(mainMenu, 1000);
  }
}

// Students menu (add, list, simple delete()
function studentsMenu() {
  showWindow('Students');
  console.log('1. Add Student');
  console.log('2. List Students');
  console.log('3. Delete Student');
  console.log('4. Back');
  
  let choice = require('readline-sync').question('Choose (1-4): ');
  
  if (choice === '1') {
    let name = require('readline-sync').question('Student name: ');
    let id = students.length + 1;
    let feesOwed = Math.floor(Math.random() * 1000) + 100; // Fake fees
    students.push({id, name, feesOwed});
    console.log(`Added ${name} (ID: ${id}, Fees: $${feesOwed}). Nice!`);
    setTimeout(studentsMenu, 1500);
  } else if (choice === '2') {
    showWindow('Student List');
    if (students.length === 0) {
      console.log('No students yet. add some.');
    } else {
      students.forEach(s => console.log(`ID: ${s.id}, Name: ${s.name}, Fees: $${s.feesOwed}`));
    }
    console.log('Press Enter to continue...');
    require('readline-sync').question('');
    studentsMenu();
  } else if (choice === '3') {
    let id = require('readline-sync').question('Student ID to delete: ');
    students = students.filter(s => s.id != id);
    console.log('Deleted! (or not found)');
    setTimeout(studentsMenu, 1000);
  } else {
    mainMenu();
  }
}

// Courses menu (kinda?)
function coursesMenu() {
  showWindow('Courses');
  console.log('1. Add Course');
  console.log('2. List Courses');
  console.log('3. Back');
  
  let choice = require('readline-sync').question('Choose (1-3): ');
  
  if (choice === '1') {
    let name = require('readline-sync').question('Course name: ');
    let code = require('readline-sync').question('Course code: ');
    courses.push({name, code});
    console.log(`Added ${name} (${code}). Sweet!`);
    setTimeout(coursesMenu, 1500);
  } else if (choice === '2') {
    showWindow('Course List');
    if (courses.length === 0) {
      console.log('No courses. Let\'s add!');
    } else {
      courses.forEach(c => console.log(`${c.code}: ${c.name}`));
    }
    require('readline-sync').question('Press Enter...');
    coursesMenu();
  } else {
    mainMenu();
  }
}

// Staff menu
function staffMenu() {
  showWindow('Staff');
  console.log('1. Add Staff');
  console.log('2. List Staff');
  console.log('3. Back');
  
  let choice = require('readline-sync').question('Choose (1-3): ');
  
  if (choice === '1') {
    let name = require('readline-sync').question('Staff name: ');
    let role = require('readline-sync').question('Role (teacher/admin): ');
    staff.push({name, role});
    console.log(`Added ${name} as ${role}. Team growing!`);
    setTimeout(staffMenu, 1500);
  } else if (choice === '2') {
    showWindow('Staff List');
    if (staff.length === 0) {
      console.log('Hire some staff first!');
    } else {
      staff.forEach(s => console.log(`${s.name} - ${s.role}`));
    }
    require('readline-sync').question('Press Enter...');
    staffMenu();
  } else {
    mainMenu();
  }
}

// Simple fees viewer
function feesWindow() {
  showWindow('Fees Overview');
  let totalFees = students.reduce((sum, s) => sum + s.feesOwed, 0);
  console.log(`Total fees owed by students: $${totalFees}`);
  if (students.length > 0) {
    console.log('Top debtor:', students.reduce((top, s) => s.feesOwed > top.feesOwed ? s : top, students[0])?.name);
  }
  console.log('');
  require('readline-sync').question('Press Enter to go back...');
  mainMenu();
}

// Start this shit up
console.log('Loading this shit... ;D');
setTimeout(mainMenu, 500);