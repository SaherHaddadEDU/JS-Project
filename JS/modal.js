"use strict";
//#region Modal Handling
// סוגר את חלון המידע כאשר לוחצים על כפתור ה-X
document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('articalModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.querySelector('.modalContent').remove();
});

// סוגר את חלון המידע בלחיצה על רקע כהה מסביב לפופאפ
const articalModal = document.getElementById('articalModal');
articalModal.addEventListener('click', (e) => {
    if (e.target === articalModal) {
        document.getElementById('articalModal').style.display = 'none';
        document.body.style.overflow = 'auto';
        document.querySelector('.modalContent').remove();
    }
});

// פונקציה לסגירה כללית (משותפת לכפתור ביטול ולסגירה אוטומטית)
function closePopup() {
    document.getElementById('articalModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.querySelector('.modalContent').remove();
}
//#endregion

//#region Contact Actions Info/Edit/Delete
// מציג חלון מידע עם כל הפרטים של איש קשר + היסטוריית עדכונים
function showInfo(index) {
    document.getElementById('articalModal').style.display = 'block';
    document.body.style.overflow = 'hidden';

    const modal_content = document.querySelector('.modal-popup');
    const div = document.createElement('div');
    div.className = 'modalContent';
    div.innerHTML = `
    <p><strong>Name: </strong> ${contacts[index].fullName}</p>
    <p><strong>Telephone: </strong> ${contacts[index].phone}</p>`;
    if (contacts[index].age > 0)
        div.innerHTML += `<p><strong>Age: </strong> ${contacts[index].age}</p>`;
    if (contacts[index].email)
        div.innerHTML += `<p><strong>Email: </strong> ${contacts[index].email}</p>`;
    if (contacts[index].address)
        div.innerHTML += `<p><strong>Address: </strong> ${contacts[index].address}</p>`;
    if (contacts[index].notes)
        div.innerHTML += `<p><strong>Notes: </strong> ${contacts[index].notes}</p>`;
    if (contacts[index].group && contacts[index].group != "All")
        div.innerHTML += `<p><strong>Group: </strong> ${contacts[index].group}</p>`
    if (contacts[index].updates && contacts[index].updates.length > 0) {
        div.innerHTML += `<p><strong>Update History:</strong></p>`;
        contacts[index].updates.forEach((time, i) => {
            div.innerHTML += `<p style="font-size:0.8em; margin-left:10px;">${i + 1}. ${time}</p>`;
        });
    }
    modal_content.append(div);
}