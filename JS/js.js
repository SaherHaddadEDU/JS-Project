"use strict";

//#region Contacts
const contacts =
  [{
    image: "./IMG/Mai.jpg",
    name: "Mai Yates",
    age: 25,
    phone: "0548265154",
    email: "mayt@gmail.com",
    address: "Haifa"
  },
  {
    image: "./IMG/joe.jpg",
    name: "Joe Speen",
    age: 29,
    phone: "0546689710",
    email: "joe123@walla.com",
    address: "Nesher"
  },
  {
    image: "./IMG/Anna.jpg",
    name: "Anna Bannana",
    age: 21,
    phone: "0558496322",
    email: "joe123@walla.com",
    address: "Tel-Aviv"
  },
  {
    image: "https://scontent.ftlv5-1.fna.fbcdn.net/v/t51.75761-15/488645204_18504671326037052_7569166429576146923_n.jpg?stp=dst-jpegr_tt6&_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=BR2FM0hDDccQ7kNvwF82Bvj&_nc_oc=AdkHuwJZxy7OKYDvgSPPGZFjZE9dyQnh7YbfZsx6Xr7RmtbVk8OutKuT6qNhzDpFSIYTutaxcrkCMlChD3Ku_s--&_nc_zt=23&se=-1&_nc_ht=scontent.ftlv5-1.fna&_nc_gid=5H6Up_OU6PQqUNVGE0MiUA&oh=00_AfOn9XIh0glIOWp82vnMgTU1T5dJGfwKXQwQpbkPC0lOJA&oe=68589B40",
    name: "Igor Nikonov",
    age: 27,
    phone: "0547730575",
    email: "igornikon2901@gmail.com",
    address: "Kiryat-Yam Shapira"
  }];
const phoneBook = document.querySelector('.phoneBook')
function showList () {
  contacts.forEach((elem, index) => {
  const customer = document.createElement('li');
  customer.className = "customer";

  const custImg = document.createElement('img');
  custImg.className = "custIMG";
  custImg.src = elem.image;
  custImg.title = "Portrait Pic";
  custImg.alt = "Pic " + (index + 1);

  const custName = document.createElement('span');
  custName.className = "custName";
  custName.textContent = elem.name;

  const custAction = document.createElement('div');
  custAction.className = "custAction";

  const infoCust = document.createElement('img');
  infoCust.className = "infoCust"
  infoCust.src = "./IMG/Info.png"
  infoCust.alt = "Info"
  infoCust.setAttribute('data-id', index);

  const editCust = document.createElement('img');
  editCust.className = "editCust"
  editCust.src = "./IMG/Edit.png"
  editCust.alt = "Edit"
  editCust.setAttribute('data-id', index);

  const deleteCust = document.createElement('img');
  deleteCust.className = "deleteCust"
  deleteCust.src = "./IMG/Dele.png"
  deleteCust.alt = "Delete"
  deleteCust.setAttribute('data-id', index);

  custAction.append(infoCust, editCust, deleteCust)
  customer.append(custImg, custName, custAction)
  phoneBook.append(customer)
});
}
showList();

document.querySelector('.counter span').textContent = contacts.length + " Contacts"
//#endregion

//#region ClosePopup
document.getElementById('closeModal').addEventListener('click' , () => {
  document.getElementById('articalModal').style.display = 'none'
  document.body.style.overflow = 'auto'
  document.querySelector('.modalContent').remove();
})

const articalModal = document.getElementById('articalModal')
articalModal.addEventListener('click' , (e) => {
  if(e.target === articalModal){
    document.getElementById('articalModal').style.display = 'none'
    document.body.style.overflow = 'auto'
    document.querySelector('.modalContent').remove();
  }
})
//#endregion

//#region phoneBook work
phoneBook.addEventListener('click' , (e) => {
  if(e.target && e.target.tagName === 'IMG' && e.target.className === 'infoCust'){
    showInfo(e.target.getAttribute('data-id'))
  }
})

function showInfo(index) {
  document.getElementById('articalModal').style.display = 'block'
    document.body.style.overflow = 'hidden'
    let modal_content = document.querySelector('.modal-popup')
    let div = document.createElement('div')
    div.className = 'modalContent'
    div.innerHTML = `
    <p><strong>Name:</strong> ${contacts[index].name}</p>\n
    <p><strong>Age:</strong> ${contacts[index].age}</p>\n
    <p><strong>Telephone:</strong> ${contacts[index].phone}</p>\n
    <p><strong>Address:</strong> ${contacts[index].address}</p>`
    modal_content.append(div)
}
//#endregion

//#region 
