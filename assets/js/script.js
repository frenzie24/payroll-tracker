// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// consts to make our code more legible
const promptString = 'Enter employee\'s';
const fnString = "First Name";
const lnString = "Last Name";
const salString = "Salary";
const tryString = "Try Again.";

// Collect employee data
const collectEmployees = function () {
  // TODO: Get user input to create and return an array of employee objects
  let employees = [employeeGenerator()];

  //if the user canceled we return an empty array
  if (employees[0] == undefined) {
    return undefined;
  }
  /*
   we create a block level function here to recurvsivly
   call itself while we build employee data
   the function returns when the user does not select true 
  */
  function addMorData() {
    let addMore = confirm("Enter more employees?");
    //### uncomment line below to step through addMorData() ###
    //debugger;
    // if the user wants to add more employees we continue
    // otherwise return employees
    if (addMore) {
      // if true we call our function again and push employeeGenerator() to the employees array
      // we used recursion to solve the while loop without using a while loop
      employees.push(employeeGenerator());
      // If the last employee was canceled it will be undefined
      // if so remove last entry from the array and return employees 
      if (employees[employees.length - 1] == undefined) {
        employees.pop();
        return employees;
      }
      // the last employee added was valid, so we call ourself and begin again
      addMorData();
    } else {
      return employees;
    }
  }
  // addMorData() is called here for the first time to begin building our data with recursion
  addMorData();
  return employees;
}



// function to check if prompt input is a number, 
const checkForNumbers = function (input, msg) {
  // if the user cancels we return undefined
  if (!input) return undefined;
  // parseInt to check if input is a string or numbers
  input = parseInt(input);
  if (!input) {
    return checkForNumbers(prompt(msg, tryString));
  } else { return input };
}

// function to check if prompt input is full of letters
const checkForLetters = function (input, msg) {
  if (!input) return undefined;

  // parseInt to check if input is a string or numbers and if the user changed the default text
  if (parseInt(input) || input == fnString || input == lnString) {
    return checkForLetters(prompt(msg, tryString));
  } else { return input };
}

// employee generator using prompts
// when employeeGenerator is called a 
employeeGenerator = function () {

  // using string literals to make these lines more legible
  let employee = { firstName:'', lastName: '', salary: '' };

   /* each property of our employee object is populated by a script level function
     this seperate function handles the logic to ensure the user input is valid or has cancelled
     the values passed are always the users input followed by the string message */
  // if the empolyee object properties are ALL defined return employee otherwise return undefined
  employee.firstName= checkForLetters(prompt(`${promptString} ${fnString}.`, fnString), `${promptString} ${fnString}.`);
  if (!employee.firstName) {
    return undefined;
  }
  employee.lastName= checkForLetters(prompt(`${promptString} ${lnString}.`, lnString), `${promptString} ${lnString}.`);
  if (!employee.lastName) {
    return undefined;
  }
  employee.salary = checkForNumbers(prompt(`${promptString} ${salString}.`, salString), `${promptString} ${salString}.`)
  if (!employee.salary) {
    return undefined;
  }
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
  // random int >= 0 and < employeesArray.length
  let rand = Math.floor(Math.random() * employeesArray.length);
  // we use rand as the index to acess our random employee
  // next we display the employee and an object that can be expanded
  let employee = employeesArray[rand];
  console.log(`Here's random employee ${employee.firstName}`);
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
  if (employees) {
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
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
