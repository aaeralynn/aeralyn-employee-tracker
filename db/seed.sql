-- Seed the departments table
INSERT INTO departments (name) VALUES
('Sales'),
('Marketing'),
('Engineering'),
('Human Resources'),
('Finance');

-- Seed the role table
INSERT INTO role (title, salary, department_id) VALUES
('Sales Manager', 80000, 1),
('Sales Associate', 50000, 1),
('Marketing Manager', 90000, 2),
('Marketing Coordinator', 60000, 2),
('Software Engineer', 100000, 3),
('QA Engineer', 90000, 3),
('HR Manager', 85000, 4),
('Recruiter', 70000, 4),
('Accountant', 75000, 5);

-- Seed the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL), -- John is a Sales Manager
('Jane', 'Smith', 2, 1),  -- Jane is a Sales Associate
('Emily', 'Johnson', 3, NULL), -- Emily is a Marketing Manager
('Michael', 'Brown', 4, 3), -- Michael is a Marketing Coordinator
('Chris', 'Davis', 5, NULL), -- Chris is a Software Engineer
('Sarah', 'Wilson', 6, 5), -- Sarah is a QA Engineer
('David', 'Martinez', 7, NULL), -- David is an HR Manager
('Laura', 'Garcia', 8, 7), -- Laura is a Recruiter
('Jessica', 'Miller', 9, NULL); -- Jessica is an Accountant