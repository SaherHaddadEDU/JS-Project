"use strict";
//#region Init & Render
const phoneBook = document.querySelector('.phoneBook');

// מצייר מחדש את רשימת אנשי הקשר על המסך:
// 1. ממיין לפי שם.
// 2. יוצר עבור כל איש קשר אלמנט <li> עם תמונה, שם, טלפון וכפתורי פעולה.
// 3. מציג את מספר אנשי הקשר בכותרת העליונה.
function showList() {
    contacts.sort((a, b) => {
        if (a.isFavorite && !b.isFavorite) return -1;
        if (!a.isFavorite && b.isFavorite) return 1;
        return a.fullName.localeCompare(b.fullName)
    });
    const groupSelected = document.querySelector('#groupSort').value.trim();
    contacts.forEach((elem, index) => {
        if (contacts[index].group === groupSelected || groupSelected === "All") {
            const customer = document.createElement('li');
            customer.className = "customer";
            customer.setAttribute('data-id', index);

            const custImg = document.createElement('img');
            custImg.className = "custIMG";
            custImg.src = elem.image;
            custImg.title = "Portrait Pic";
            custImg.setAttribute('data-id', index);

            // fallback במקרה של קישור שבור
            custImg.onerror = function () {
                this.onerror = null; // מונע לולאה אם fallback לא קיים
                this.src = "./IMG/contact.jpg";
            };

            const custName = document.createElement('span');
            custName.className = "custName";
            custName.textContent = elem.fullName + " | " + elem.phone;
            custName.setAttribute('data-id', index);

            const custAction = document.createElement('div');
            custAction.className = "custAction";
            custAction.setAttribute('data-id', index);

            // כפתור מידע
            const infoCust = document.createElement('img');
            infoCust.className = "infoCust";
            infoCust.src = "./IMG/Info.png";
            infoCust.alt = "Info";
            infoCust.setAttribute('data-id', index);

            // כפתור עריכה
            const editCust = document.createElement('img');
            editCust.className = "editCust";
            editCust.src = "./IMG/Edit.png";
            editCust.alt = "Edit";
            editCust.setAttribute('data-id', index);

            // כפתור מחיקה
            const deleteCust = document.createElement('img');
            deleteCust.className = "deleteCust";
            deleteCust.src = "./IMG/Dele.png";
            deleteCust.alt = "Delete";
            deleteCust.setAttribute('data-id', index);

            // כפתור מועדפים 
            const favoriteCust = document.createElement('img');
            favoriteCust.className = "favoriteCust";
            if (elem.isFavorite)
                favoriteCust.src = "./IMG/Favorite.png";
            else
                favoriteCust.src = "./IMG/noFavorite.png";
            favoriteCust.alt = "Favorite";
            favoriteCust.setAttribute('data-id', index);

            custAction.append(favoriteCust, infoCust, editCust, deleteCust);
            customer.append(custImg, custName, custAction);
            phoneBook.append(customer);
        }
        updateDisplayCounter();
    });
}

// מסיר את כל האלמנטים מהרשימה (נדרש לפני ציור חדש כדי למנוע כפילויות)
function removeList() {
    document.querySelectorAll('.customer').forEach(elem => elem.remove());
}

// מעדכן את מונה אנשי הקשר שמוצגים כרגע על המסך
// (סופר רק אנשי קשר שלא מוסתרים עם display:none).
function updateDisplayCounter() {
    const customers = document.querySelectorAll('.customer');
    let count = 0;
    customers.forEach(cust => {
        if (cust.style.display !== 'none') count++;
    });
    document.querySelector('.counter span').textContent =
        count === 0 ? "No Contacts To Display" : `${count} Contacts`;
}

//#region UI Effects Hover
// משנה צבע רקע בזמן מעבר עכבר כדי לסמן פריט
function mouseOver(target) {
    target.closest('.customer').style.backgroundColor = "#ccc";
    target.closest('.customer').style.transition = "0.5s background-color";
}

// מחזיר את צבע הרקע כשהעכבר יוצא
function mouseOut(target) {
    target.closest('.customer').style.backgroundColor = "aliceblue";
    target.closest('.customer').style.transition = "0.5s background-color";
}
//#endregion