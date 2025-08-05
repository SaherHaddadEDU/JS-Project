"use strict";
// מוחק איש קשר מסוים ומעדכן את הרשימה
function deleteContact(index) {
    removeList();
    contacts.splice(index, 1);
    showList();
}

// מוחק את כל אנשי הקשר מהרשימה
function deleteAllContact() {
    removeList();
    contacts.splice(0, contacts.length);
    showList();
}

// מסמן או מבטל סימון של איש קשר כמועדף (Favorite)
// הפונקציה בודקת את הערך הנוכחי ומשנה אותו להפך,
// ולאחר מכן מרעננת את הרשימה על המסך כדי להציג את העדכון.
function isFavoriteCust(index) {
    if (contacts[index].isFavorite === true) {
        contacts[index].isFavorite = false;
    }
    else {
        contacts[index].isFavorite = true
    }
    removeList();
    showList();
}

// אפקט הדגשה בהובר
phoneBook.addEventListener('mouseover', (e) => {
    if (e.target.closest('.customer')) {
        mouseOver(e.target);
    }
});

// הסרת הדגשה כשמוציאים את העכבר
phoneBook.addEventListener('mouseout', (e) => {
    if (e.target.closest('.customer')) {
        mouseOut(e.target);
    }
});

// מנהל את כל האירועים של לחיצות על פריטי הרשימה (מידע, עריכה, מחיקה)
phoneBook.addEventListener('click', (e) => {
    const classes = ['customer', 'custName', 'custAction', 'infoCust'];
    if (e.target && classes.some(cls => e.target.classList.contains(cls))) {
        showInfo(e.target.getAttribute('data-id')); // הצגת מידע
    }
    else if (e.target && e.target.className === 'custIMG') {
        openCustImage(e.target.getAttribute('data-id'));//הצגת תמונה של האיש קשר
    }
    else if (e.target && e.target.tagName === 'IMG' && e.target.className === 'editCust') {
        editContact(e.target.getAttribute('data-id')); // מעבר לטופס עריכה
    }
    else if (e.target && e.target.tagName === 'IMG' && e.target.className === 'deleteCust' &&
        confirm(`Are you sure you want to delete contact: ${contacts[e.target.getAttribute('data-id')].fullName}?`)) {
        deleteContact(e.target.getAttribute('data-id')); // מחיקה
    }
});

// אירוע לחיצה להוספה/הסרה של מועדף
phoneBook.addEventListener('click', (e) => {
    if (e.target.classList.contains('favoriteCust')) {
        const index = e.target.getAttribute('data-id');
        isFavoriteCust(index);
    }
});