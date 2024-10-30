import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDdnluG_IKrDtGjTIOZ32tt2nsPFRgcfSU",
    authDomain: "banco-segundob.firebaseapp.com",
    projectId: "banco-segundob",
    storageBucket: "banco-segundob.appspot.com",
    messagingSenderId: "312587977591",
    appId: "1:312587977591:web:fbee28b15257fadbf05772",
    measurementId: "G-R5NQP34N0Q"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Variables globales
let students = [];

// Cargar estudiantes de Firestore
async function loadStudents() {
    try {
        const querySnapshot = await getDocs(collection(db, "students"));
        students = []; // Limpiar la lista antes de cargar nuevos estudiantes
        querySnapshot.forEach((doc) => {
            students.push({ id: doc.id, ...doc.data() });
        });
        displayStudents();
    } catch (error) {
        console.error("Error cargando estudiantes:", error);
        alert("Error al cargar estudiantes. Verifica la consola para más detalles.");
    }
}

// Mostrar estudiantes en la interfaz
function displayStudents() {
    const studentList = document.getElementById('students');
    studentList.innerHTML = ''; // Limpiar la lista antes de mostrar
    students.forEach(student => {
        const li = document.createElement('li');
        li.textContent = `${student.name}: $${student.balance.toFixed(2)}`; // Mostrar el balance con dos decimales
        studentList.appendChild(li);
    });
}

// Iniciar sesión
document.getElementById('loginButton').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Inicio de sesión exitoso");
        document.getElementById('admin').style.display = 'block'; // Mostrar sección de administración
        loadStudents(); // Cargar estudiantes después de iniciar sesión
    } catch (error) {
        console.error("Error de inicio de sesión:", error);
        alert(error.message);
    }
});

// Agregar recompensa y actualizar Firestore
async function addReward() {
    const name = document.getElementById('studentName').value.trim();
    const amount = parseFloat(document.getElementById('rewardAmount').value);
    
    const student = students.find(s => s.name === name);
    
    if (student && !isNaN(amount) && amount > 0) { // Validar estudiante y monto
        student.balance += amount;

        try {
            // Actualizar Firestore
            const studentRef = doc(db, "students", student.id);
            await updateDoc(studentRef, { balance: student.balance });

            displayStudents(); // Actualizar la visualización de estudiantes
            alert("Recompensa agregada con éxito.");
        } catch (error) {
            console.error("Error actualizando la recompensa:", error);
            alert("Error al agregar la recompensa. Verifica la consola para más detalles.");
        }
    } else {
        alert('Estudiante no encontrado o monto inválido');
    }
}

document.getElementById('addRewardButton').addEventListener('click', addReward);
