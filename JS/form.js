"use strict";
// פותח טופס עריכה לאיש קשר
function editContact(index) {
    createContactForm('edit', index);
}

// פותח טופס הוספת איש קשר חדש
function addContact() {
    createContactForm("add");
}

// בדיקת תקינות מספר טלפון
function isPhoneNumberValid(phone) {
    if (phone.length !== 10) return false;
    if (phone[0] !== '0' || phone[1] !== '5') return false;
    for (let i = 2; i < 10; i++) {
        if (phone[i] < '0' || phone[i] > '9')
            return false;
    }
    return true;
}

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
      <label for="editName" ><strong>Full Name: </strong></label>
      <input type="text" id="editName" value="${contact.fullName}" required>
      <label for="editAge" ><strong>Age: </strong></label>
      <input type="number" id="editAge" value="${contact.age}">
      <label for="editPhone" ><strong>Phone: </strong></label>
      <input type="tel" id="editPhone" value="${contact.phone}" required>
      <label for="editAddress"><strong>Address: </strong></label>
      <input type="text" id="editAddress" value="${contact.address}">
      <label for="editEmail"><strong>Email: </strong></label>
      <input type="email" id="editEmail" value="${contact.email}">
      <label id="myDropdownLabel" for="myDropdown"><strong>Group:</strong></label>
      <select id="myDropdown" name="myOption">
        <option value="">No Group</option>
        <option value="Family">Family</option>
        <option value="Friend">Friend</option>
        <option value="Work">Work</option>
      </select><br>
      <label for="editImage"><strong>Image URL: </strong></label>
      <input type="url" id="editImage" value="${contact.image}">
      <label id="uploadImageLabel" for="uploadImage">Upload Image</label>
      <input type="file" class="file-input" id="uploadImage" accept="image/*">
      <label for="editNotes"><strong>Notes: </strong></label>
      <textarea id="editNotes">${contact.notes}</textarea>
      <div class="formBtn">
        <button type="submit" id="${isEdit ? 'saveEdit' : 'addContact'}" class="btn">${isEdit ? 'Save' : 'Add'}</button>
        <button type="button" id="cancel" class="btn">Cancel</button>
      </div>
    </form>`;

    modal_content.append(div);
    // הוספת קוד להציג את הערך הקיים בבחירה
    document.getElementById("myDropdown").value = contact.group || "";
    document.getElementById('cancel').addEventListener('click', closePopup);

    const uploadInput = document.getElementById('uploadImage');

    document.getElementById(isEdit ? 'saveEdit' : 'addContact').addEventListener('click', (e) => {
        e.preventDefault();
        const editName = document.getElementById('editName').value.trim();
        const phone = document.getElementById('editPhone').value.trim();
        let editImage = document.getElementById('editImage').value.trim()
        const uploadFile = uploadInput.files[0];
        const origName = isEdit ? contacts[index].fullName.toLowerCase() : "";
        const origPhone = isEdit ? contacts[index].phone : "";
        const nameExists = contacts.some((c, i) =>
            c.fullName.toLowerCase() === editName.toLowerCase() && (!isEdit || i !== index)
        );
        const phoneExists = contacts.some((c, i) =>
            c.phone === phone && (!isEdit || i !== index)
        );

        if (phoneExists) {
            if (!isEdit || phone !== origPhone) {
                alert(`The Phone number ${phone} already exists`);
                return;
            }
        }
        if (nameExists) {
            if (!isEdit || editName.toLowerCase() !== origName) {
                alert(`The contact name ${editName} already exists`);
                return;
            }
        }
        if (!editName || !phone) {
            alert(`Please fill in ${!editName && !phone ? 'Full Name and Phone' : !editName ? 'Full Name' : 'Phone'} field${!editName && !phone ? 's' : ''}.`);
            return;
        }
        if (!isPhoneNumberValid(phone)) {
            console.log(phone)
            alert(`Invalid phone number:
                \n1. Phone number must start with 05.
                \n2. Phone number must have ten digits.
                \n3. Phone number can only contain digits.`)
            return;
        }
        if (uploadFile) {
            editImage = URL.createObjectURL(uploadFile);
        } else if (!editImage) {
            editImage = "./IMG/contact.jpg";
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
            const existingContact = contacts[index];

            // עדכון רק השדות הרלוונטיים
            existingContact.fullName = editName;
            existingContact.age = document.getElementById('editAge').value.trim();
            existingContact.phone = phone;
            existingContact.address = document.getElementById('editAddress').value.trim();
            existingContact.email = document.getElementById('editEmail').value.trim();
            existingContact.image = editImage;
            existingContact.notes = document.getElementById('editNotes').value.trim();
            existingContact.group = document.getElementById('myDropdown').value.trim();

            // שמירת ההיסטוריה
            existingContact.updates = existingContact.updates || [];
            existingContact.updates.push(new Date().toLocaleString());
        } else {
            newContact.updates = [];
            contacts.push(newContact);
        }
        showList();
        closePopup();
    });
}