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
// load catagory by default
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
            <a class="nav-link text-dark-gray fw-semibold" aria-current="page" href="#" onclick="loadNews('${catagory.category_id}')">${catagory.category_name}</a>
        </li>
        `
        catagoryContainer.appendChild(newLi)
    });
}

//================= news card section codes ==============================

// function to load the news based on catagory
const loadNews = (id = 08) => {
    toggleSpinner(true);
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => displayNews(data.data))
        .catch(showMessage())//problemmmmmmmm it show no result everytime
}
// loadNews();
// const loadNews = async (id) => {
//     try {
//         toggleSpinner(false);
//         const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
//         const data = await res.json();
//         displayNews(data.data)
//         showMessage()
//         return data;
//     } catch (err) {
//         console.log(err.message);
//     }
// }
// function to display the news
const displayNews = (newsList) => {
    toggleSpinner(false);
    const newsCardContainer = document.getElementById('news-card-container');
    newsCardContainer.innerHTML = '';
    newsList.forEach(news => {
        console.log(news);
        // const { image_url, title } = news;
        // console.log(image_url, title);
        const newDiv = document.createElement('div');
        newDiv.classList.add('col');
        newDiv.innerHTML = `
        <div onclick="displayModalDetails('${news.image_url}','${news.title}','${news.author.name ? news.author.name : " No data Found"}','${news.author.published_date ? news.author.published_date : " No data Found"}','${news.rating.number}')" class="card flex-sm-row p-2" data-bs-toggle="modal" data-bs-target="#newsModal">
            <img src="${news.thumbnail_url}">
            <div class="card-body text-start align-items-center pt-lg-3">
                    <h5 class="card-title text-dark fw-bold fs-3">${news.title}</h5>
                    <p class="card-text text-muted fw-light pt-lg-3">${news.details.length < 300 ? news.details :
                news.details.slice(0, 300) + "..."}</p>
                <div class="d-lg-flex mx-auto mt-5">
                    <div class="d-flex w-25 justify-space-around mx-auto">
                        <div class=" w-25 " >
                            <img class="img-fluid rounded-circle" src="${news.author.img ? news.author.img : " No data Found"}" alt="">
                        </div>
                        <div class="d-flex justify-content-center align-items-center">
                            <p class="fw-semibold ps-3">${news.author.name ? news.author.name : "No data Found"}</p>                  
                        </div>
                    </div>
                    <div class="w-25 text-center d-flex justify-content-center align-items-center mx-auto"><i class="fa-regular fa-eye"></i>&nbsp;&nbsp;<strong>${news.total_view}</strong></div>
                    <div class="w-25 text-center d-flex justify-content-center align-items-center mx-auto "> <span><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star-half-stroke"></i></span></div>
                    <div class="w-25 text-center d-flex justify-content-center align-items-center ms-auto "> <button class="btn text-primary"><i class="fa-solid fa-arrow-right fs-3"></i></button></div>
                </div>
            </div>
        </div>
        `;
        newsCardContainer.appendChild(newDiv);
        showMessage(newsList.length);
        // console.log(newsAmmount)
    });
}

// function to display details in modal
const displayModalDetails = (img, title, author, publichDate, rating) => {
    const cardBody = document.getElementById('card-details')
    cardBody.innerHTML = `
                    <img src="${img}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text"><small class="text-muted">Author : </small><strong> ${author} </strong></p>
                        <p class="card-text"><small class="text-muted"> Published on : </small><strong>${publichDate} </strong></p>
                        <p class="card-text"><small class="text-muted"> Rating : </small><strong>${rating} </strong></p>
                    </div>
    `
}

//function to show result message
const showMessage = (resultAmmount = 0) => {
    const messageSection = document.getElementById('message-container');
    messageSection.classList.remove('d-none');
    messageSection.innerText = '';
    if (resultAmmount === 0) {
        messageSection.innerText = "No Result Found"
    } else {
        messageSection.innerText = `${resultAmmount} Results Found`
    }
}

// function to toggle spinner 
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none');
    }
}