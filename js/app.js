// function to get and load data catagory
const loadDataCatagory = async () => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
        const data = await res.json();
        displayCatagory(data.data.news_category)
    } catch (error) {
        document.getElementById('page-container').innerHTML = `<p class="display-3 text-center p-5"> Sorry, We have faced an Error.</p>
        <p class="display-4 text-center p-5"> ${error}</p>`;
        console.log(error)
    }
}

// load catagory by default
loadDataCatagory();

//function to display catagories
const displayCatagory = (catagories) => {
    const catagoryContainer = document.getElementById('catagory-container');
    catagories.forEach(catagory => {
        const { category_id, category_name } = catagory;
        const newLi = document.createElement("li");
        newLi.classList.add("nav-item");
        newLi.innerHTML = `
        <li class="nav-item">
            <a class="nav-link text-dark-gray fw-semibold" aria-current="page" href="#" onclick="loadNews('${category_id}')">${category_name}</a>
        </li>
        `
        catagoryContainer.appendChild(newLi)
    });
}

// function to load the news based on catagory
const loadNews = async (id) => {
    showMessage(0);
    try {
        toggleSpinner(true);
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
        const data = await res.json();
        displayNews(data.data)
        return data;
    } catch (err) {
        document.getElementById('page-container').innerHTML = `<p class="display-3 text-center p-5"> Sorry, We have faced an Error.</p>
        <p class="display-4 text-center p-5"> ${error}</p>`;
        console.log(err.message);
    }
}
// function to display the news
const displayNews = (newsList) => {
    toggleSpinner(false);
    const newsCardContainer = document.getElementById('news-card-container');
    newsCardContainer.innerHTML = '';
    newsList.forEach(news => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('col');
        newDiv.innerHTML = `
        <div onclick="displayModalDetails('${news.image_url}','${news.title}','${news.author.name ? news.author.name : " No data Found"}','${news.author.published_date ? news.author.published_date : " No data Found"}','${news.rating.number}')" class="card flex-sm-row p-2" data-bs-toggle="modal" data-bs-target="#newsModal">
            <img class="" src="${news.thumbnail_url}">
            <div class="card-body text-start align-items-center pt-lg-3">
                    <h5 class="card-title text-dark fw-bold fs-3">${news.title}</h5>
                    <p class="card-text text-muted fw-light pt-lg-3">${news.details.length < 300 ? news.details :
                news.details.slice(0, 300) + "..."}</p>
                <div class="d-lg-flex mx-auto mt-5">
                    <div class="d-flex w-25 justify-space-around mx-auto">
                        <div class=" w-25 " >
                            <img class="img-fluid rounded-circle d-none d-md-flex" src="${news.author.img ? news.author.img : " No data Found"}" alt="">
                        </div>
                        <div class="d-flex justify-content-center align-items-center">
                            <p class="fw-semibold ps-3">${news.author.name ? news.author.name : "No data Found"}</p>                  
                        </div>
                    </div>
                    <div class="w-25 text-center d-flex justify-content-center align-items-center mx-auto"><i class="fa-regular fa-eye"></i>&nbsp;&nbsp;<strong>${news.total_view === null ? "no data found" : news.total_view}</strong></div>

                    <div class="w-25 text-center justify-content-center align-items-center mx-auto d-md-flex d-none "> <span><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star-half-stroke"></i></span></div>

                    <div class="w-25 text-center justify-content-center align-items-center ms-auto d-none d-md-flex "> <button class="btn text-danger"><i class="fa-solid fa-arrow-right fs-3"></i></button></div>
                </div>
            </div>
        </div>
        `;
        newsCardContainer.appendChild(newDiv);
        showMessage(newsList.length);
    });

    // function to sort and show most viewed
    document.getElementById('most-viewed').addEventListener('click', function () {
        newsCardContainer.innerHTML = '';
        newsList.sort((news1, news2) => news2.total_view - news1.total_view);
        newsList.forEach((news) => {
            // console.log(`${e.title} ${e.total_view}`);
            const newDiv = document.createElement('div');
            newDiv.classList.add('col');
            newDiv.innerHTML = `
            <div onclick="displayModalDetails('${news.image_url}','${news.title}','${news.author.name ? news.author.name : " No data Found"}','${news.author.published_date ? news.author.published_date : " No data Found"}','${news.rating.number}')" class="card flex-sm-row p-2" data-bs-toggle="modal" data-bs-target="#newsModal">
                <img class="" src="${news.thumbnail_url}">
                <div class="card-body text-start align-items-center pt-lg-3">
                        <h5 class="card-title text-dark fw-bold fs-3">${news.title}</h5>
                        <p class="card-text text-muted fw-light pt-lg-3">${news.details.length < 300 ? news.details :
                    news.details.slice(0, 300) + "..."}</p>
                    <div class="d-lg-flex mx-auto mt-5">
                        <div class="d-flex w-25 justify-space-around mx-auto">
                            <div class=" w-25 " >
                                <img class="img-fluid rounded-circle d-none d-md-flex" src="${news.author.img ? news.author.img : " No data Found"}" alt="">
                            </div>
                            <div class="d-flex justify-content-center align-items-center">
                                <p class="fw-semibold ps-3">${news.author.name ? news.author.name : "No data Found"}</p>                  
                            </div>
                        </div>
                        <div class="w-25  text-center d-flex justify-content-center align-items-center mx-auto"><i class="fa-regular fa-eye"></i>&nbsp;&nbsp;<strong>${news.total_view === null ? "no data found" : news.total_view}</strong></div>
    
                        <div class="w-25 text-center justify-content-center align-items-center mx-auto d-md-flex d-none "> <span><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star-half-stroke"></i></span></div>
    
                        <div class="w-25 text-center d-flex justify-content-center align-items-center ms-auto "> <button class="btn text-danger"><i class="fa-solid fa-arrow-right fs-3"></i></button></div>
                    </div>
                </div>
            </div>
            `;
            newsCardContainer.appendChild(newDiv);
            showMessage(newsList.length);
        });
    })
}

// function to display details in modal
const displayModalDetails = (img, title, author, publichDate, rating) => {
    const cardBody = document.getElementById('card-details');
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


