// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');
// Collect employee data
const collectEmployees = function () {
  // TODO: Get user input to create and return an array of employee objects
  let employees = [employeeGenerator()];
  // stores the response from our confirm
  let addMore = confirm("Enter more employees?");
  if (addMore) {
    employees.push(employeeGenerator());
  } else {
    return employees;
  }
}

// function to check if prompt input is a number, 
const checkForNumbers = function (input, msg) {
  if (!parseFloat(input)) {
    return checkForNumbers(prompt(msg, 'Try again.'));
  } else { return input };
}

 // function to check if prompt input is full of letters
const checkForLetters = function (input, msg) {
  if (parseInt(input)) {
    return checkForLetters(prompt(msg, 'Try again.'));
  } else { return input };
}
// employee generator using prompts
employeeGenerator = function () {
  let promptString = 'Enter employee\'s';
  return {
    firstName: checkForLetters(prompt(`${promptString} first name.`, 'First Name')),
    lastName: checkForLetters(prompt(`${promptString}  last name.`, 'Last Name')),
    salary: checkForNumbers(prompt(`${promptString}  salary.`, 'Salary'),
      'Salary')
  };;
}

// Display the average salary
const displayAverageSalary = function (employeesArray) {
  // TODO: Calculate and display the average salary
}

// Select a random employee
const getRandomEmployee = function (employeesArray) {
  // TODO: Select and display a random employee
  // creates a var called rand that creates and stores a 
  // random int between 0 and employeesArray.length - 1
  let rand = Math.floor(Math.random() * employeesArray.length);
}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function (employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function () {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function (a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);




}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
