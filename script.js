const root = document.querySelector("#root");
const createBtn = document.querySelector("#create-btn");
const floorInput = document.querySelector("#floor-count");
const elevatorInput = document.querySelector("#elevator-count");
const divList = document.querySelector("#list");
const listItems = document.querySelector("#list-items");
const errorText = document.querySelector("#error-text");

const actionDiv = document.querySelector("#action");
const select = document.querySelector("#select");
const actionBtn = document.querySelector("#action-btn");

let elevatorObj = [];

createBtn.addEventListener("click", () => {
  if (!floorInput.value || !elevatorInput.value) {
    listItems.innerHTML = "";
    actionDiv.style.display= "none";
    errorText.textContent = "Please fill in both fields.";
    divList.appendChild(errorText);
  } else if (floorInput.value > 100 || floorInput.value < 2) {
    listItems.innerHTML = "";
    actionDiv.style.display= "none";
    errorText.textContent = "Please enter a floor between 2 and 100.";
  } else if (elevatorInput.value > 6 || elevatorInput.value < 1) {
    listItems.innerHTML = "";
    actionDiv.style.display= "none";
    errorText.textContent = "Please enter a elevator number between 1 and 6.";
  } else {
    errorText.textContent = "";
    listItems.innerHTML = "";
    for (let i = 0; i < floorInput.value; i++) {
      for (let j = 0; j < elevatorInput.value; j++) {
        actionDiv.style.display = "flex";
        actionDiv.style.justifyContent = "center";
        actionDiv.style.alignItems = "center";
        actionDiv.style.gap = "10px";
        const newDiv = document.createElement("div");
        newDiv.classList.add("eachDiv");
        listItems.appendChild(newDiv);
        if (i === floorInput.value - 1) {
          newDiv.classList.add("elevator", `${j + 1}`);
          let img = document.createElement("img");
          img.src = "https://cdn-icons-png.freepik.com/512/25/25814.png";
          img.style.width = "80%";
          newDiv.appendChild(img);
        }
      }
    }
    if (select.childNodes.length === 0) {
      for (let i = 0; i < floorInput.value; i++) {
        const option = document.createElement("option");
        option.value = i + 1;
        option.textContent = i + 1;
        select.appendChild(option);
        elevatorObj.push({ id: i + 1, currentFloor: 1, isActive: false });
      }
    } else {
      select.innerHTML = "";
      elevatorObj = [];
      for (let i = 0; i < floorInput.value; i++) {
        const option = document.createElement("option");
        option.value = i + 1;
        option.textContent = i + 1;
        select.appendChild(option);
        elevatorObj.push({ id: i + 1, currentFloor: 1, isActive: false });
      }
    }
    listItems.style.maxWidth = `${elevatorInput.value * 70}px`;
    listItems.style.maxHeight = `${floorInput.value * 70}px`;
  }
});

actionBtn.addEventListener("click", () => {
  let selectedFloor = select.value;
  selectedFloor = parseInt(selectedFloor, 10);

  let inactiveElevators = elevatorObj.filter((elevator) => !elevator.isActive);
  if (inactiveElevators.length === 0) {
    alert("no inactive elevators");
  }

  let closestElevator = inactiveElevators[0];
  let minDistance = Math.abs(closestElevator.currentFloor - selectedFloor);

  for (let elevator of inactiveElevators) {
    let distance = Math.abs(elevator.currentFloor - selectedFloor);
    if (distance < minDistance) {
      minDistance = distance;
      closestElevator = elevator;
    }
    if (elevator.currentFloor === selectedFloor) {
      alert("elevator is here!");
      return;
    }
  }
  closestElevator.currentFloor = selectedFloor;
  closestElevator.isActive = true;

  let transformVal = 70 * selectedFloor - 70;
  let divList = document.querySelectorAll(".elevator");
  let closestElevatorDiv = divList[closestElevator.id - 1];
  let elevatorImg = closestElevatorDiv.childNodes[0];
  elevatorImg.style.transition = "all 3s ease-in";
  elevatorImg.style.transform = `translateY(-${transformVal}px)`;

  elevatorImg.addEventListener("transitionend", function handleTransitionEnd() {
    closestElevator.isActive = false;
    elevatorImg.removeEventListener("transitionend", handleTransitionEnd);
  });
});
