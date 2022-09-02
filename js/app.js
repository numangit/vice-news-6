// const loadDataCatagory = async (searchText) => {
//     const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
//     const data = await res.json();
//     displayCatagory(data.data.news_category)
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
    // console.log(catagories)
    const catagoryContainer = document.getElementById('catagory-container');
    catagories.forEach(catagory => {
        const newLi = document.createElement("li");
        newLi.classList.add("nav-item");
        newLi.innerHTML = `
        <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#" onclick="loadNews('${catagory.category_id}')">${catagory.category_name}</a>
        </li>
        `
        catagoryContainer.appendChild(newLi)
    });
}

//================= news card section codes ==============================

// function to load the news based on catagory
const loadNews = (id) => {
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => displayNews(data.data))
}
// function to display the news
const displayNews = (newsList) => {
    const newsCardContainer = document.getElementById('news-card-container');
    newsCardContainer.innerHTML = '';
    newsList.forEach(news => {
        console.log(news);
        const newDiv = document.createElement('div');
        newDiv.classList.add('col');
        newDiv.innerHTML = `
        <div class="card flex-sm-row">
        <img src="${news.thumbnail_url}">
        <div class="card-body text-start align-items-center pt-lg-5">
            <h5 class="card-title text-secondary fw-bold">Fundamental Of UI/UX Design
            </h5>
            <p class="card-text text-muted fw-light">
                We will be covering here about the Fundamental Of UI/UX Design.
            </p>
            <h6 class="text-info fw-bold">Price : $25</h6>
        </div>
    </div>
        `;
        newsCardContainer.appendChild(newDiv);
    });
}