"use strict";
// מצייר רשימה בהתחלה
showList();

// מאפשר חיפוש בזמן אמת לפי שם איש קשר ומסנן את הרשימה על המסך
const inputValue = document.getElementById('searchBar');
inputValue.addEventListener('input', () => {
  const value = inputValue.value.toLowerCase();
  const customers = document.querySelectorAll('.customer');

  customers.forEach((customer) => {
    const id = customer.getAttribute('data-id');
    const name = contacts[id].fullName.toLowerCase();
    const phone = contacts[id].phone;
    customer.style.display = name.includes(value) || phone.includes(value) ? 'flex' : 'none';
  });
  updateDisplayCounter()
});

// מטפל בלחיצה על כפתור הוספה או מחיקת כל אנשי הקשר
document.querySelector('.action-container').addEventListener('click', (e) => {
  if (e.target && e.target.className === 'deleteAll') {
    if (confirm("Are you sure you want to delete all contacts?"))
      deleteAllContact();
  } else if (e.target && e.target.className === 'addCust') {
    addContact();
  }
});

// מפעיל או מכבה אפקט ויזואלי (CSS) על המסך בלחיצה על הכפתור המתאים
document.querySelector('.toggleEffect').addEventListener('click', () => {
  document.body.classList.toggle('effect-on');
});

document.querySelector('#groupSort').addEventListener('change', (e) => {
  removeList()
  showList()
})


