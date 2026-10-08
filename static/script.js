const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");

async function loadStudents() {
    const response = await fetch("/api/students");
    const students = await response.json();

    table.innerHTML = "";

    students.forEach(student => {
        table.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.course}</td>
                <td>
                    <button onclick="editStudent(${student.id})">
                        Edit
                    </button>
                    <button onclick="deleteStudent(${student.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const student = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        course: document.getElementById("course").value
    };

    await fetch("/api/students", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    });

    form.reset();
    loadStudents();
});

async function deleteStudent(id) {
    await fetch(`/api/students/${id}`, {
        method: "DELETE"
    });

    loadStudents();
}

async function editStudent(id) {
    const name = prompt("Enter new name:");
    const email = prompt("Enter new email:");
    const course = prompt("Enter new course:");

    if (!name || !email || !course) {
        return;
    }

    const student = {
        name: name,
        email: email,
        course: course
    };

    await fetch(`/api/students/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    });

    loadStudents();
}

loadStudents();