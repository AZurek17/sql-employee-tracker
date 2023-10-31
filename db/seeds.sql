INSERT INTO department (name)
VALUES  ("Engineering"),
        ("Accounting"),
        ("Legal");
        ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES  ("Engineer", 100000, 1),
        ("CPA", 80000, 2),
        ("Lawyer", 180000, 3);
        ("Sales Lead", 125000, 4)
        ("Salesperson", 90000, 4)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Doe", 1, null),
        ("Mike", "Hill", 4, 1)
        ("Kelly", "Floor", 5, 2)
        ("Steve", "Wall", 3, 1)
        ("Jane", "Doe", 2, null);
        