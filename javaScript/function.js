// Fetch Category Button
const categoryBtn = () => {
  fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then(res => res.json())
    .then(data => dispalyCategory(data.categories))
    .catch(error => console.log(error));
};

//Display the Category
const dispalyCategory = data => {
  const btnContainer = document.getElementById('button-Container');
  data.forEach(part => {
    const button = document.createElement('div');

    button.innerHTML = `
    <button id="btn-${part.category}" onclick="loadCategoryPet('${part.category}')" class="category-btn flex items-center border-2 p-3 hover:border-black hover:bg-green hover:text-white">
            <img class="w-8 h-auto" src="${part.category_icon}" alt="img">
            <p class="text-lg font-medium">${part.category}</p>
          </button>
    `;
    btnContainer.append(button);
  });
};

// Fetch All Pet
const loadAllPet = async () => {
  const responce = await fetch(
    'https://openapi.programming-hero.com/api/peddy/pets'
  );
  const data = await responce.json();
  displayAllPet(data.pets);
};

// load pet by category
const loadCategoryPet = categoryName => {
  // fetch by Category
  const res = fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
  )
    .then(res => res.json())
    .then(data => {
      removeActiveClass();
      const activeBtn = document.getElementById(`btn-${categoryName}`);
      activeBtn.classList.add('active');
      displayAllPet(data.data);
    });
};

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName('category-btn');
  for (let btn of buttons) {
    btn.classList.remove('active');
  }
};
// display all pet
const displayAllPet = data => {
  const cardContainer = document.getElementById('dynamic-card');
  cardContainer.classList =
    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';
  cardContainer.innerHTML = '';
  data.forEach(item => {
    console.log(item);
    const card = document.createElement('div');
    if (item.length == 0) {
      console.log('empty data');
    }
    card.innerHTML = `
    <div class=" shadow-xl  rounded-lg border-2 border-green w-full h-full">
            <img class="h-auto w-full object-cover shadow-lg rounded-lg" src="${
              item.image
            }" alt="img">
            <div class="space-y-2 p-1">
              <h5 class="text-xl font-semibold">Name: ${item.pet_name}</h5>
              <p class="flex text-xl"><img class="w-6 h-max"
                  src="https://img.icons8.com/?size=100&id=103088&format=png&color=000000" alt="icon">Breed: ${
                    item.breed ? `${item.breed}` : 'Unknown!'
                  }</p>
              <p class="flex text-xl"><img class="w-6 h-max"
                  src="https://img.icons8.com/?size=100&id=GlEOr5x0aJpH&format=png&color=000000" alt="icon">Birth: ${
                    item.date_of_birth ? `${item.date_of_birth}` : 'Unknown!'
                  }</p>
              <p class="flex text-xl"><img class="w-6 h-max"
                  src="https://img.icons8.com/?size=100&id=70834&format=png&color=000000" alt="icon">Gender: ${
                    item.gender ? `${item.gender}` : 'Unknown!'
                  }</p>
              <p class="flex text-xl"><img class="w-6 h-max"
                  src="https://img.icons8.com/?size=100&id=85045&format=png&color=000000" alt="icon">Price: ${
                    item.price ? `${item.price}$` : 'Unknown!'
                  }</p>
            </div>
            <div class="pt-4 pb-2 flex justify-between items-center px-1 border-t-4 border-green">
              <img onclick="loveClick(${
                item.petId
              })" class="w-12 p-1 h-max bg-blue-100 border-2 border-green hover:border-black rounded-full hover:bg-green hover:text-white hover:rounded-md"
                src="https://img.icons8.com/?size=100&id=66628&format=png&color=000000">
              <button id="adopt-button" onclick="adoptEffect()" class="w-max p-2 h-max bg-blue-100 border-2 border-green hover:border-black rounded-md hover:bg-green hover:text-white hover:rounded-full">Adopt</button>
              <button onclick="loadDetails('${
                item.petId
              }')" class="w-max p-2 h-max bg-blue-100 border-2 border-green hover:border-black rounded-md hover:bg-green hover:text-white hover:rounded-full">Details</button>
            </div>
          </div>
    `;
    cardContainer.append(card);
  });
};

categoryBtn();
// loadAllPet();

// Love Btn click
function loveClick(id) {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then(response => response.json())
    .then(data => displayFavorite(data.petData));
  // favorite pet constainer
}
const displayFavorite = petData => {
  const favoriteContainer = document.getElementById('love-pet-container');
  const imageDiv = document.createElement('div');
  imageDiv.innerHTML = `
  <img class="h-full rounded-md" src=${petData.image} alt=""/>
  `;
  favoriteContainer.appendChild(imageDiv);
};

// Adopt button effect
const adoptEffect = () => {
  const adoptPopup = document.getElementById('adopt-container');

  let countdown = 4;
  let intervalTime = 400;

  function startCountdown() {
    const adoptCountdown = setInterval(() => {
      countdown--;
      if (countdown > 0) {
        startCountdown();
        clearInterval(adoptCountdown);
        intervalTime -= 100;
        my_modal_2.showModal();
        adoptPopup.innerHTML = `
<div class="h-max flex flex-col items-center">
        <img class="w-12" src="./images/loading-infinity.gif" alt="adopt loader" />
        <h3 class="text-3xl font-bold">Congrates</h3>
        <h4 class="text-xl">Adoption Process is Start for your Pet</h4>
        <p class="text-5xl font-bold">${countdown}</p>
        <form class="hidden" method="dialog">
        <button id="close-btn"  class="btn">Close</button>
      </form>
      </div>
    `;
      } else {
        clearInterval(adoptCountdown);
        console.log('Countdown finished!');
        document.getElementById('close-btn').click();
      }
    }, intervalTime);
  }
  startCountdown();
};

// load display details
const loadDetails = async petId => {
  const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
  const response = await fetch(uri);
  const data = await response.json();
  displayDetails(data.petData);
};
// display details
const displayDetails = item => {
  console.log(item);
  const modalContent = document.getElementById('modal-content');
  modalContent.innerHTML = `
  <img src="${item.image}" class="mx-auto" alt="pet image">
      <div class="space-y-4">
        <h3 class="text-2xl font-semibold ">Name: ${item.pet_name}</h3>
        <div class="grid grid-cols-2 gap-2">
          <p class="flex text-lg"><img class="w-6 h-max"
              src="https://img.icons8.com/?size=100&id=103088&format=png&color=000000" alt="icon">Breed: ${
                item.breed ? `${item.breed}` : 'Unknown!'
              }</p>
          <p class="flex text-lg"><img class="w-6 h-max"
              src="https://img.icons8.com/?size=100&id=GlEOr5x0aJpH&format=png&color=000000" alt="icon">Birth: ${
                item.date_of_birth ? `${item.date_of_birth}` : 'Unknown!'
              }</p>
          <p class="flex text-lg"><img class="w-6 h-max"
              src="https://img.icons8.com/?size=100&id=70834&format=png&color=000000" alt="icon">Gender: ${
                item.gender ? `${item.gender}` : 'Unknown!'
              }</p>
          <p class="flex text-lg"><img class="w-6 h-max"
              src="https://img.icons8.com/?size=100&id=85045&format=png&color=000000" alt="icon">Price: ${
                item.price ? `${item.price}$` : 'Unknown!'
              }</p>
          <p class="flex text-lg"><img class="w-6 h-max"
              src="https://img.icons8.com/?size=100&id=16649&format=png&color=000000" alt="icon">Price: ${
                item.price ? `${item.price}$` : 'Unknown!'
              }</p>
          <p class="flex text-lg"><img class="w-6 h-max"
              src="https://img.icons8.com/?size=100&id=16649&format=png&color=000000" alt="icon">Vaccinated status: ${
                item.vaccinated_status
                  ? `${item.vaccinated_status}`
                  : 'Unknown!'
              }</p>
        </div>
        <div>
          <h2 class="text-2xl ">Details Information</h2>
          <p class="text-lg">${item.pet_details}</p>
        </div>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn">Close</button>
        </form>
      </div>
  `;
  document.getElementById('details_modal').showModal();
};

const handleApi = () => {
  document.getElementById('loader').style.display = 'block';
  setTimeout(function () {
    loadAllPet();
    document.getElementById('love-pet-container').classList.remove('hidden');
    document.getElementById('love-pet-container').classList.add('grid');
  }, 2000);
};
handleApi();
