// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');
// Collect employee data
const collectEmployees = function () {
  // TODO: Get user input to create and return an array of employee objects
  let employees = [employeeGenerator()];
  // stores the response from our confirm
  function addMorData() {
    let addMore = confirm("Enter more employees?");
    debugger;
    if (addMore) {
      // if true we call our function again and push the return to the employees array
      employees.push(employeeGenerator());
      addMorData();
    } else {
      return employees;
    }
  }
  addMorData();
  return employees;
}

const addMoreEmployeeData = function (employees) {
 
}

// function to check if prompt input is a number, 
const checkForNumbers = function (input, msg) {
  input = parseInt(input);
  if (!input) {
    return checkForNumbers(prompt(msg, 'Try again.'));
  } else { return input };
}

// function to check if prompt input is full of letters
const checkForLetters = function (input, msg) {
  if (parseInt(input)|| input == "First Name" || input == "Last Name") {
    return checkForLetters(prompt(msg, 'Try again.'));
  } else { return input };
}
// employee generator using prompts
employeeGenerator = function () {
  let promptString = 'Enter employee\'s';
  // using string literals to make these lines more legible
  let employee = {
    firstName: checkForLetters(prompt(`${promptString} first name.`, 'First Name')),
    lastName: checkForLetters(prompt(`${promptString}  last name.`, 'Last Name')),
    salary: checkForNumbers(prompt(`${promptString}  salary.`, 'Salary'),
      'Salary')
  };
  return employee;
}

// Display the average salary
const displayAverageSalary = function (employeesArray) {
  let total = 0.0;
  for (let i = 0; i < employeesArray.length; i++) {
    total += employeesArray[i].salary;
  }
  total /= employeesArray.length;
  console.log(`Average Employee Salary is: ${total}`);
}

// Select a random employee
const getRandomEmployee = function (employeesArray) {
  // TODO: Select and display a random employee
  // creates a var called rand that creates and stores a 
  // random int between 0 and employeesArray.length - 1
  let rand = Math.floor(Math.random() * employeesArray.length);
  let employee = employeesArray[rand];
  console.log(`Here's random employee${employee.firstName}`);
  console.log(employee);

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
