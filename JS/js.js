"use strict";

//#region Contacts
// הגדרת מערך של אנשי קשר – כל איש קשר הוא אובייקט עם פרטים אישיים,
// כולל היסטוריית עדכונים (updates) לצורך מעקב על שינויים.
const contacts =
  [
    {
      image: "./IMG/Anna.jpg",
      fullName: "Anna Bannana",
      age: 21,
      phone: "0558496322",
      email: "Ann959@gmail.com",
      address: "Tel-Aviv",
      notes: "",
      group: "",
      isFavorite: false,
      updates: []
    },
    {
      image: "https://scontent.ftlv6-1.fna.fbcdn.net/v/t39.30808-1/489225020_2048874075632474_6577772289893890330_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=110&ccb=1-7&_nc_sid=e99d92&_nc_ohc=epJ1oq_lxFIQ7kNvwHL3nu9&_nc_oc=AdnG4g5DHSwWv3LLscCAS99MdmsbN06teJ0UsK64OpcxwS74WZx2yJc_EOThVM7tF-aQ0uyVjq6nFrk8doq3JkZy&_nc_zt=24&_nc_ht=scontent.ftlv6-1.fna&_nc_gid=DP0dwG7IXsbZqhLVRy_ODw&oh=00_AfQngIvcDfoeqvi0yhJZ0y2JUKoPCnqrYZXUIH_rNJKD9A&oe=689514EE",
      fullName: "Igor Nikonov",
      age: 27,
      phone: "0547730575",
      email: "igornikon2901@gmail.com",
      address: "Kiryat-Yam Shapira",
      notes: "Bike rider and climber",
      group: "",
      isFavorite: false,
      updates: []
    },
    {
      image: "./IMG/joe.jpg",
      fullName: "Joe Speen",
      age: 29,
      phone: "0546689710",
      email: "joe123@walla.com",
      address: "Nesher",
      notes: "",
      group: "",
      isFavorite: false,
      updates: []
    },
    {
      image: "./IMG/Mai.jpg",
      fullName: "Mai Yates",
      age: 25,
      phone: "0548265154",
      email: "mayt@gmail.com",
      address: "Haifa",
      notes: "",
      group: "",
      isFavorite: false,
      updates: []
    }];
//#endregion

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
  console.log(groupSelected);
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
      custName.textContent = elem.fullName + " - " + elem.phone;
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
  });

  document.querySelector('.counter span').textContent =
    contacts.length === 0 ? "No Contacts To Display" : contacts.length + " Contacts";
}

// מסיר את כל האלמנטים מהרשימה (נדרש לפני ציור חדש כדי למנוע כפילויות)
function removeList() {
  document.querySelectorAll('.customer').forEach(elem => elem.remove());
}

// מצייר רשימה בהתחלה
showList();
//#endregion

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

//#region PhoneBook Interaction
// מנהל את כל האירועים של לחיצות על פריטי הרשימה (מידע, עריכה, מחיקה)
phoneBook.addEventListener('click', (e) => {
  const classes = ['customer', 'custName', 'custAction', 'custIMG', 'infoCust'];
  if (e.target && classes.some(cls => e.target.classList.contains(cls))) {
    showInfo(e.target.getAttribute('data-id')); // הצגת מידע
  }
  else if (e.target && e.target.tagName === 'IMG' && e.target.className === 'editCust') {
    editContact(e.target.getAttribute('data-id')); // מעבר לטופס עריכה
  }
  else if (e.target && e.target.tagName === 'IMG' && e.target.className === 'deleteCust' &&
    confirm(`Are you sure you want to delete contact: ${contacts[e.target.getAttribute('data-id')].fullName}?`)) {
    deleteContact(e.target.getAttribute('data-id')); // מחיקה
  }
});

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

// מוחק איש קשר מסוים ומעדכן את הרשימה
function deleteContact(index) {
  removeList();
  contacts.splice(index, 1);
  showList();
}

// פותח טופס עריכה לאיש קשר
function editContact(index) {
  createContactForm('edit', index);
}

// פותח טופס הוספת איש קשר חדש
function addContact() {
  createContactForm("add");
}

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
//#endregion

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

//#region Search Bar
// מאפשר חיפוש בזמן אמת לפי שם איש קשר ומסנן את הרשימה על המסך
const inputValue = document.getElementById('searchBar');
inputValue.addEventListener('input', () => {
  const value = inputValue.value.toLowerCase();
  const customers = document.querySelectorAll('.customer');

  customers.forEach((customer, index) => {
    const name = contacts[index].fullName.toLowerCase();
    customer.style.display = name.includes(value) ? 'flex' : 'none';
  });
});
//#endregion

//#region Add/Delete All Contacts
// מטפל בלחיצה על כפתור הוספה או מחיקת כל אנשי הקשר
document.querySelector('.action-container').addEventListener('click', (e) => {
  if (e.target && e.target.className === 'deleteAll') {
    if (confirm("Are you sure you want to delete all contacts?"))
      deleteAllContact();
  } else if (e.target && e.target.className === 'addCust') {
    addContact();
  }
});

// מוחק את כל אנשי הקשר מהרשימה
function deleteAllContact() {
  removeList();
  contacts.splice(0, contacts.length);
  showList();
}
//#endregion

//#region Form Handler Add/Edit
// מייצר טופס דינמי (להוספה או עריכה) ומבצע בדיקות לפני שמירה.
// בעת עריכה – שומר היסטוריית עדכונים, בעת הוספה – יוצר איש קשר חדש.
function createContactForm(mode, index) {
  const isEdit = mode === 'edit';
  const contact = isEdit ? contacts[index] : {
    fullName: "", age: "", phone: "", address: "", email: "", image: "", notes: "", updates: []
  };

  document.getElementById('articalModal').style.display = 'block';
  document.body.style.overflow = 'hidden';

  const modal_content = document.querySelector('.modal-popup');
  const div = document.createElement('div');
  div.className = 'modalContent';
  div.innerHTML = `
    <form>
      <label><strong>Full Name: </strong></label>
      <input type="text" id="editName" value="${contact.fullName}" required>
      <label><strong>Age: </strong></label>
      <input type="number" id="editAge" value="${contact.age}">
      <label><strong>Phone: </strong></label>
      <input type="tel" id="editPhone" value="${contact.phone}" required>
      <label><strong>Address: </strong></label>
      <input type="text" id="editAddress" value="${contact.address}">
      <label><strong>Email: </strong></label>
      <input type="email" id="editEmail" value="${contact.email}">
      <label><strong>Image URL: </strong></label>
      <label for="myDropdown">Group:</label>
      <select id="myDropdown" name="myOption">
        <option value="">No Group</option>
        <option value="Family">Family</option>
        <option value="Friend">Friend</option>
        <option value="Work">Work</option>
      </select>
      <input type="url" id="editImage" value="${contact.image}">
      <label><strong>Notes: </strong></label>
      <textarea id="editNotes">${contact.notes}</textarea>
      <div class="formBtn">
        <button type="submit" id="${isEdit ? 'saveEdit' : 'addContact'}" class="btn">${isEdit ? 'Save' : 'Add'}</button>
        <button type="button" id="cancel" class="btn">Cancel</button>
      </div>
    </form>`;

  modal_content.append(div);
  document.getElementById('cancel').addEventListener('click', closePopup);

  document.getElementById(isEdit ? 'saveEdit' : 'addContact').addEventListener('click', (e) => {
    e.preventDefault();
    const editName = document.getElementById('editName').value.trim();
    const phone = document.getElementById('editPhone').value.trim();
    let editImage = document.getElementById('editImage').value.trim()
    const nameExists = contacts.some((c, i) =>
      c.fullName.toLowerCase() === editName.toLowerCase() && (!isEdit || i !== index)
    );

    if (nameExists && !isEdit) {
      alert(`The contact name ${editName} already exists`);
      return;
    }
    if (!editName || !phone) {
      alert(`Please fill in ${!editName && !phone ? 'Full Name and Phone' : !editName ? 'Full Name' : 'Phone'} field${!editName && !phone ? 's' : ''}.`);
      return;
    }
    if (!editImage) {
      editImage = "./IMG/contact.jpg"
    }


    const newContact = {
      fullName: editName,
      age: document.getElementById('editAge').value.trim(),
      phone,
      address: document.getElementById('editAddress').value.trim(),
      email: document.getElementById('editEmail').value.trim(),
      image: editImage,
      notes: document.getElementById('editNotes').value.trim(),
      group: document.getElementById('myDropdown').value.trim()
    };



    removeList();
    if (isEdit) {
      newContact.updates = contacts[index].updates || [];
      newContact.updates.push(new Date().toLocaleString());
      contacts[index] = newContact;
    } else {
      newContact.updates = [];
      contacts.push(newContact);
    }
    showList();
    closePopup();
  });
}
//#endregion

//#region Effect
// מפעיל או מכבה אפקט ויזואלי (CSS) על המסך בלחיצה על הכפתור המתאים
document.querySelector('.toggleEffect').addEventListener('click', () => {
  document.body.classList.toggle('effect-on');
});
//#endregion

//#region favorite

phoneBook.addEventListener('click', (e) => {
  if (e.target.classList.contains('favoriteCust')) {
    const index = e.target.getAttribute('data-id');
    isFavoriteCust(index);
  }
});

//#endregion

document.querySelector('#groupSort').addEventListener('change', (e) => {
  removeList()
  showList()
})
