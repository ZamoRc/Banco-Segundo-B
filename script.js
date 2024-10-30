let students = [
    { name: "Sofía Abarca", balance: 0 },
    { name: "Antonella Beltrán", balance: 0 },
    { name: "Francisco Bravo", balance: 0 },
    { name: "Sofía Bravo", balance: 0 },
    { name: "Mathew Cardozo", balance: 0 },
    { name: "Agustín Caroca", balance: 0 },
    { name: "Robinson Castro", balance: 0 },
    { name: "Francisca Celsi", balance: 0 },
    { name: "Juan Cerda", balance: 0 },
    { name: "Vicente Cid", balance: 0 },
    { name: "Benjamín Cornejo", balance: 0 },
    { name: "Lucas Droguett", balance: 0 },
    { name: "Ansheska Henríquez", balance: 0 },
    { name: "Sebastián Madrid", balance: 0 },
    { name: "Florencia Madrid", balance: 0 },
    { name: "Javier Reyes", balance: 0 },
    { name: "Evelyn Rojas", balance: 0 },
    { name: "Lucas Rojas", balance: 0 },
    { name: "Constanza Romero", balance: 0 },
    { name: "Montserrat Silva", balance: 0 },
    { name: "Gabriela Soto", balance: 0 },
    { name: "Antonella Torres", balance: 0 },
    { name: "María Paz Valdés", balance: 0 },
    { name: "Ibar Alonso Bustamante", balance: 0 },
];

function displayStudents() {
    const studentList = document.getElementById('students');
    studentList.innerHTML = '';
    students.forEach(student => {
        const li = document.createElement('li');
        li.textContent = `${student.name}: $${student.balance}`;
        studentList.appendChild(li);
    });
}

function addReward() {
    const name = document.getElementById('studentName').value;
    const amount = parseFloat(document.getElementById('rewardAmount').value);
    
    const student = students.find(s => s.name === name);
    if (student && !isNaN(amount)) {
        student.balance += amount;
        displayStudents();
    } else {
        alert('Estudiante no encontrado o monto inválido');
    }
}

displayStudents();
