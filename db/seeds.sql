INSERT INTO department (name)
VALUES  ("Managers"),
        ("Accounting"),
        ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES  ("Manager", 80000, 1),
        ("CPA", 80000, 2),
        ("Lawyer", 80000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Doe", 1, 1),
        ("Jane", "Doe", 2, 1);
        