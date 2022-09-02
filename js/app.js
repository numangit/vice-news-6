// const loadData = async () => {
//     const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
//     const data = res.json();
// }

//=============== catagory section codes =====================

// function to get and load data catagory
const loadDataCatagory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCatagory(data.data.news_category))
}
// load by default
loadDataCatagory();
//function to display catagories
const displayCatagory = (catagories) => {
    console.log(catagories)
    const catagoryContainer = document.getElementById('catagory-container');
    catagories.forEach(catagory => {
        const newLi = document.createElement("li");
        newLi.classList.add("nav-item");
        newLi.innerHTML = `
        <li class="nav-item">
            <a class="nav-link text-dark" aria-current="page" href="#" onclick="">${catagory.category_name}</a>
        </li>
        `
        catagoryContainer.appendChild(newLi)
    });
}