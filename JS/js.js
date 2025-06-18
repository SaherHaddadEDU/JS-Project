'use strict';

const customers =
  [{
    image: "./IMG/Mai.jpg",
    name: "Mai Yates",
    phone: "0548265154",
    email: "mayt@gmail.com"
  },
  {
    image: "./IMG/joe.jpg",
    name: "Joe Speen",
    phone: "0546689710",
    email: "joe123@walla.com"
  },
  {
    image: "./IMG/Anna.jpg",
    name: "Anna Bannana",
    phone: "0558496322",
    email: "joe123@walla.com"
  }
  ];

const phoneBook = document.querySelector('.phoneBook')
customers.forEach((elem, index) => {
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

  const editCust = document.createElement('img');
  editCust.className = "editCust"
  editCust.src = "./IMG/Edit.png"
  editCust.alt = "Edit"

  const deleteCust = document.createElement('img');
  deleteCust.className = "deleteCust"
  deleteCust.src = "./IMG/Dele.png"
  deleteCust.alt = "Delete"

  custAction.append(infoCust, editCust, deleteCust)
  customer.append(custImg, custName, custAction)
  phoneBook.append(customer)
});
