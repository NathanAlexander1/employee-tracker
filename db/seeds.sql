INSERT INTO departments (name)
VALUES 
    ("Human Resources"),
    ("Sales"),
    ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES 
    ("HR director", 100000, 1),
    ("salesperson", 50000, 2),
    ("lawyer", 40000, 3),
    ("paralegal", 20000, 3),
    ("Conflict resolver", 30000, 1),
    ("Deal maker", 35000, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ("Nathan", "Alexander", 1, NULL),
    ("Rachel", "Lally", 2, NULL),
    ("Lisa", "Dixon", 3, NULL),
    ("Liam", "Neeson", 4, 1),
    ("Lord", "Voldemort", 5, 2),
    ("Harry", "Potter", 6, 3),
    ("Mark", "Markson", 6, 1);

