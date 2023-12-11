//https://api.github.com/users/USERNAME

const input = document.querySelector(`.gitHubUserName`);
const button = document.querySelector(`.button`);
const buttonRandom = document.querySelector(`.random`);
const body = document.querySelector(`body`);


async function getDataUser(event) {
    const MIN_LENGTH = 1;
    const MAX_LENGTH = 9;

    const removeElement = document.querySelectorAll('.dataContainer').forEach(container => container.remove())

    let userProfile = '';
    let randomID = ''
    let url;

    if(event.target.classList.contains('button')){
        userProfile += input.value;
        url = `https://api.github.com/users/${userProfile}`
    } else if(event.target.classList.contains('random')){
        randomID = generatorRandomIDUser(MIN_LENGTH, MAX_LENGTH)
        url = `https://api.github.com/user/${randomID}`
    }

    const response = await fetch(url);


    if(response.status === 404 && !event.target.classList.contains('random')) {
        alert("Error! No user account!");
        return
    } else if (response.status === 404 && event.target.classList.contains('random')){
        return getDataUser(event);
    }

    const data = await response.json();
    console.log(data)

    const dataContainer = document.createElement("div");
    dataContainer.classList.add("dataContainer")

    renderImg(data.avatar_url, dataContainer);
    renderData("Login ", data.login, dataContainer);
    renderData("Bio ",data.bio, dataContainer);
    renderData("Location ",data.location, dataContainer);
    renderData("Followers ",data.followers, dataContainer);

    body.appendChild(dataContainer);


}

function renderData(parametr, element, parentElement) {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `${element}` === "null" || null ? `${parametr} : No information` : `${parametr}:${element}`;
    parentElement.appendChild(newDiv);

    return newDiv;
}

function renderImg(img, parentElement) {
    const image = document.createElement("img");
    image.src = img;
    parentElement.appendChild(image);

    return image;
}

function generatorRandomIDUser(minLength, maxLength) {
    const numbers = '1234567890';
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

    let randomID = '';

    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * numbers.length);
        randomID += numbers[index];
    }

    return randomID;
}

button.addEventListener("click", (e) => {
    getDataUser(e)
})

buttonRandom.addEventListener("click", (e) => {
    getDataUser(e)
})






