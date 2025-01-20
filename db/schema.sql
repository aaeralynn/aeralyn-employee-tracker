--Drop the database if it exists
DROP DATABASE IF EXISTS employees;

-- Create the database
CREATE DATABASE employees;

--Connect to the database
\c employees

--Create the departments table
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

--Create the role table
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

--Create the employee table
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    manager_id INTEGER,
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);

