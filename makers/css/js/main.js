/**************************************ПЕРВЫЙ CRUD************************************************************************/
let addBtn = document.querySelector(".plus__img");
let closeBtn = document.querySelector(".modal__close");
let modal = document.querySelector(".modal");
let nameInp = document.querySelector("#name");
let positionInp = document.querySelector("#position");
let imageInp = document.querySelector("#image");
let saveBtn = document.querySelector("#saveBtn");
let modalForm = document.querySelector(".modal__form");
let cardsContainer = document.querySelector(".cards");

addBtn.addEventListener("click", () => {
  modal.style.display = "block";
});
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
//CREATE
saveBtn.addEventListener("click", () => {
  if (!nameInp.value.trim()) {
    alert("Заполните имя");
    return;
  } else if (!positionInp.value.trim()) {
    alert("Заполните должность");
    return;
  } else if (!imageInp.value.trim()) {
    alert("Заполните фото");
    return;
  }
  let obj = {
    name: nameInp.value,
    position: positionInp.value,
    image: imageInp.value,
  };
  setItemToStorage(obj);
  createCard();
  nameInp.value = "";
  positionInp.value = "";
  imageInp.value = "";
  modal.style.display = "none";
});

createCard();

function setItemToStorage(user) {
  let data = JSON.parse(localStorage.getItem("users"));
  data.push(user);
  localStorage.setItem("users", JSON.stringify(data));
}

//READ
function createCard() {
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", "[]");
  }
  let newData = JSON.parse(localStorage.getItem("users"));
  cardsContainer.innerHTML = "";
  newData.forEach((elem, index) => {
    let cardItem = document.createElement("div");
    let imgCont = document.createElement("div");
    let cardImg = document.createElement("img");
    let cardDesc = document.createElement("div");
    let nameCard = document.createElement("h3");
    let positionCard = document.createElement("h3");

    let btnDelete = document.createElement("button");
    let btnEdit = document.createElement("button");

    cardItem.classList.add("cards__item");
    cardItem.style.height = "440px";
    imgCont.classList.add("image-cont");
    cardImg.classList.add("card-image");
    nameCard.classList.add("card-name");
    positionCard.classList.add("card-position");

    btnDelete.innerText = "Удалить";
    btnEdit.innerText = "Редактировать";

    btnDelete.classList.add("card__button");
    btnEdit.classList.add("card__button");
    btnDelete.addEventListener("click", () => {
      deleteUser(index);
    });
    btnEdit.addEventListener("click", () => {
      editUser(index);
    });
    nameCard.innerText = elem.name;
    positionCard.innerText = elem.position;
    cardImg.src = elem.image;
    cardDesc.append(nameCard, positionCard, btnEdit, btnDelete);
    imgCont.append(cardImg);
    cardItem.append(imgCont, cardDesc);
    cardsContainer.appendChild(cardItem);
  });
}

//DELETE
function deleteUser(index) {
  let data = JSON.parse(localStorage.getItem("users"));
  data.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(data));
  createCard();
}

//EDIT
let editModal = document.querySelector(".edit-modal");
let nameEdit = document.querySelector(".name-edit");
let positionEdit = document.querySelector(".position-edit");
let imageEdit = document.querySelector(".image-edit");
let btnEditSave = document.querySelector(".edit-save");
let btnEditClose = document.querySelector(".btn-close-edit");
let inputs = document.querySelectorAll(".edit-modal input");

function editUser(index) {
  editModal.style.display = "block";
  let data = JSON.parse(localStorage.getItem("users"));
  nameEdit.setAttribute("id", index);
  positionEdit.setAttribute("id", index);
  imageEdit.setAttribute("id", index);
  nameEdit.value = data[index].name;
  positionEdit.value = data[index].position;
  imageEdit.value = data[index].image;
}

btnEditSave.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("users"));
  let id1 = nameEdit.getAttribute("id");
  let id2 = positionEdit.getAttribute("id");
  let id3 = imageEdit.getAttribute("id");
  if (!nameEdit.value.trim()) {
    alert("Заполните имя");
    return;
  } else if (!positionEdit.value.trim()) {
    alert("Заполните должность");
    return;
  } else if (!imageEdit.value.trim()) {
    alert("Заполните фото");
    return;
  }
  let newObj = {
    name: nameEdit.value,
    position: positionEdit.value,
    image: imageEdit.value,
  };
  data.splice(id1, 1, newObj);
  data.splice(id2, 1, newObj);
  data.splice(id3, 1, newObj);
  localStorage.setItem("users", JSON.stringify(data));
  editModal.style.display = "none";
  nameEdit.value = "";
  positionEdit.value = "";
  imageEdit.value = "";
  createCard();
});
btnEditClose.addEventListener("click", () => {
  editModal.style.display = "none";
});

/*-----------------------ВТОРОЙ CRUD------------------------------------------------------------------------------------*/
let addBenefit = document.querySelector("#benefits-add");
let benefitModal = document.querySelector(".benefits__modal");
let saveBenefit = document.querySelector("#benefits__save");
let benefitNumber = document.querySelector("#benefits-number");
let benefitDesc = document.querySelector("#benefits-desc");
let benefitsContainer = document.querySelector(".benefits__items");
let benefitCLoseBtn = document.querySelector(".benefits-close-btn");

addBenefit.addEventListener("click", () => {
  benefitModal.style.display = "block";
});
benefitCLoseBtn.addEventListener("click", () => {
  benefitModal.style.display = "none";
});
saveBenefit.addEventListener("click", () => {
  if (!benefitNumber.value.trim()) {
    alert("Заполните номер");
    return;
  } else if (!benefitDesc.value.trim()) {
    alert("Заполните описание");
    return;
  }
  let obj = {
    number: benefitNumber.value,
    description: benefitDesc.value,
  };
  setBenefitToStorage(obj);
  createBenefit();
  benefitNumber.value = "";
  benefitDesc.value = "";
  benefitModal.style.display = "none";
});
createBenefit();

function setBenefitToStorage(benefit) {
  let data = JSON.parse(localStorage.getItem("benefits"));
  data.push(benefit);
  localStorage.setItem("benefits", JSON.stringify(data));
}

function createBenefit() {
  if (!localStorage.getItem("benefits")) {
    localStorage.setItem("benefits", "[]");
  }
  let newData = JSON.parse(localStorage.getItem("benefits"));
  benefitsContainer.innerHTML = "";
  newData.forEach((item, index) => {
    let benefitsItem = document.createElement("div");
    benefitsItem.classList.add("benefits__item");

    let benefitsNumber = document.createElement("div");
    benefitsNumber.classList.add("benefits__number");

    let benefitsInfo = document.createElement("p");
    benefitsInfo.classList.add("benefits__info");

    let benefitEditBtn = document.createElement("button");
    let benefitDeleteBtn = document.createElement("button");

    benefitsNumber.innerText = item.number;
    benefitsInfo.innerText = item.description;

    benefitEditBtn.innerText = "Редактировать";
    benefitDeleteBtn.innerText = "Удалить";

    benefitEditBtn.classList.add("card__button");
    benefitDeleteBtn.classList.add("card__button");
    benefitsItem.append(
      benefitsNumber,
      benefitsInfo,
      benefitEditBtn,
      benefitDeleteBtn
    );
    benefitDeleteBtn.addEventListener("click", () => {
      deleteBenefitItem(index);
    });
    benefitEditBtn.addEventListener("click", () => {
      editBenefit(index);
    });
    benefitsContainer.append(benefitsItem);
  });
}

function deleteBenefitItem(index) {
  let data = JSON.parse(localStorage.getItem("benefits"));
  data.splice(index, 1);
  localStorage.setItem("benefits", JSON.stringify(data));
  createBenefit();
}

//EDIT
let benefitEdit = document.querySelector(".benefit__edit");
let closeEditBenefit = document.querySelector(".benefits__edit-close");
let benefitEditNumber = document.querySelector(".benefit__number_edit");
let benefitEditDesc = document.querySelector(".benefit__desc_edit");
let benefitEditSaveBtn = document.querySelector(".benefit__save_edit");

function editBenefit(index) {
  benefitEdit.style.display = "block";
  let data = JSON.parse(localStorage.getItem("benefits"));
  benefitEditNumber.setAttribute("id", index);
  benefitEditDesc.setAttribute("id", index);
  benefitEditNumber.value = data[index].number;
  benefitEditDesc.value = data[index].description;
}
benefitEditSaveBtn.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("benefits"));
  let id1 = benefitEditNumber.getAttribute("id");
  let id2 = benefitDesc.getAttribute("id");
  if (!benefitEditNumber.value.trim()) {
    alert("Заполните номер");
    return;
  } else if (!benefitEditDesc.value.trim()) {
    alert("Заполните должность");
    return;
  }
  let newObj = {
    number: benefitEditNumber.value,
    description: benefitEditDesc.value,
  };
  data.splice(id1, 1, newObj);
  data.splice(id2, 1, newObj);

  localStorage.setItem("benefits", JSON.stringify(data));
  benefitEdit.style.display = "none";
  benefitEditNumber.value = "";
  benefitEditDesc.value = "";
  createBenefit();
});
closeEditBenefit.addEventListener("click", () => {
  benefitEdit.style.display = "none";
});

/****************************************ТРЕТИЙ CRUD****************************************************************************/
let stepsAddBtn = document.querySelector("#steps__add");
let stepsModal = document.querySelector(".steps__modal");
let closeStepsEdit = document.querySelector(".steps-close-btn");
let stepsSave = document.querySelector("#steps__save");
let stepsNumberInp = document.querySelector("#steps-number");
let stepsTitleInp = document.querySelector("#steps-title");
let stepsDescInp = document.querySelector("#steps-desc");
let stepsContainer = document.querySelector(".steps__new");

stepsAddBtn.addEventListener("click", () => {
  stepsModal.style.display = "block";
});

closeStepsEdit.addEventListener("click", () => {
  stepsModal.style.display = "none";
});

stepsSave.addEventListener("click", () => {
  if (!stepsNumberInp.value.trim()) {
    alert("Fill the number");
    return;
  } else if (!stepsTitleInp.value.trim()) {
    alert("Fill the title");
    return;
  } else if (!stepsDescInp.value.trim()) {
    alert("Fill the desription");
    return;
  }

  let obj = {
    numberStep: stepsNumberInp.value,
    titleStep: stepsTitleInp.value,
    descriptionStep: stepsDescInp.value,
  };
  setStepsToStorage(obj);
  createStep();
  stepsNumberInp.value = "";
  stepsTitleInp.value = "";
  stepsDescInp.value = "";
  stepsModal.style.display = "none";
});
createStep();
function setStepsToStorage(step) {
  let data = JSON.parse(localStorage.getItem("steps"));
  data.push(step);
  localStorage.setItem("steps", JSON.stringify(data));
}

function createStep() {
  if (!localStorage.getItem("steps")) {
    localStorage.setItem("steps", "[]");
  }
  let newData = JSON.parse(localStorage.getItem("steps"));
  stepsContainer.innerHTML = "";
  newData.forEach((item, index) => {
    let stepsCard = document.createElement("div");
    stepsCard.classList.add("steps__card");

    let stepNumber = document.createElement("p");
    stepNumber.classList.add("steps__number");

    let stepTitle = document.createElement("p");
    stepTitle.classList.add("steps__title");

    let stepInfo = document.createElement("p");
    stepInfo.classList.add("steps__info");

    let stepEdit = document.createElement("button");
    stepEdit.innerText = "Редактировать";

    let stepDelete = document.createElement("button");
    stepDelete.innerText = "Удалить";

    stepEdit.classList.add("card__button");
    stepDelete.classList.add("card__button");

    stepDelete.addEventListener("click", () => {
      deleteStep(index);
    });

    stepEdit.addEventListener("click", () => {
      editStep(index);
    });

    stepNumber.innerText = item.numberStep;
    stepTitle.innerText = item.titleStep;
    stepInfo.innerText = item.descriptionStep;

    stepsCard.append(stepNumber, stepTitle, stepInfo, stepEdit, stepDelete);
    stepsContainer.append(stepsCard);
  });
}

function deleteStep(index) {
  let data = JSON.parse(localStorage.getItem("steps"));
  data.splice(index, 1);
  localStorage.setItem("steps", JSON.stringify(data));
  createStep();
}

let stepsEdit = document.querySelector(".steps__edit");
let stepEditNumInp = document.querySelector(".steps__number_edit");
let stepEditTitleInp = document.querySelector(".steps__title_edit");
let stepEditDescInp = document.querySelector(".steps__desc_edit");
let stepEditSaveBtn = document.querySelector(".step__save_edit");
let stepEditCloseBtn = document.querySelector(".steps__edit-close");

function editStep(index) {
  stepsEdit.style.display = "block";
  let data = JSON.parse(localStorage.getItem("steps"));
  stepEditNumInp.setAttribute("id", index);
  stepEditTitleInp.setAttribute("id", index);
  stepEditDescInp.setAttribute("id", index);
  stepEditNumInp.value = data[index].numberStep;
  stepEditTitleInp.value = data[index].titleStep;
  stepEditDescInp.value = data[index].descriptionStep;
}

stepEditSaveBtn.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("steps"));
  let id1 = stepEditNumInp.getAttribute("id");
  let id2 = stepEditTitleInp.getAttribute("id");
  let id3 = stepEditDescInp.getAttribute("id");

  if (!stepEditNumInp.value.trim()) {
    alert("Fill the number");
    return;
  } else if (!stepEditTitleInp.value.trim()) {
    alert("Fill the title");
    return;
  } else if (!stepEditDescInp.value.trim()) {
    alert("Fill the description");
    return;
  }
  let newObj = {
    numberStep: stepEditNumInp.value,
    titleStep: stepEditTitleInp.value,
    descriptionStep: stepEditDescInp.value,
  };
  data.splice(id1, 1, newObj);
  data.splice(id2, 1, newObj);
  data.splice(id3, 1, newObj);

  localStorage.setItem("steps", JSON.stringify(data));
  stepsEdit.style.display = "none";
  stepEditNumInp.value = "";
  stepEditTitleInp.value = "";
  stepEditDescInp.value = "";
  createStep();
});
stepEditCloseBtn.addEventListener("click", () => {
  stepsEdit.style.display = "none";
});
