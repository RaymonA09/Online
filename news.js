// news.js

function fetchData(apiUrl) {
    var request = new XMLHttpRequest();
    request.open('GET', apiUrl);

    request.onload = function () {
        if (request.status === 200) {
            var response = request.responseText;
            var parseData = JSON.parse(response);
            displayNews(parseData.articles);
        } else {
            console.error('Error loading data. Status:', request.status);
        }
    };

    request.send();
}

function displayNews(articles) {
    var newsListElement = document.getElementById('newsList');
    newsListElement.innerHTML = ''; // Clear previous content

    for (var i = 0; i < articles.length; i++) {
        var article = articles[i];
        var articleElement = createArticleElement(article);
        newsListElement.appendChild(articleElement);
    }
}

function createArticleElement(article) {
    var articleElement = document.createElement('div');
    articleElement.className = 'article';

    if (article.urlToImage) {
        var image = document.createElement('img');
        image.src = article.urlToImage;
        image.alt = article.title;

        // Set a fixed size for the image
        image.style.width = '300px';
        image.style.height = '300px';

        articleElement.appendChild(image);
    }

    var titleElement = document.createElement('h2');
    titleElement.textContent = article.title;
    articleElement.appendChild(titleElement);

    if (article.author) {
        var authorElement = document.createElement('p');
        authorElement.textContent = `Author: ${article.author}`;
        articleElement.appendChild(authorElement);
    }

    var descriptionElement = document.createElement('p');
    descriptionElement.textContent = article.description;
    articleElement.appendChild(descriptionElement);

    var sourceElement = document.createElement('p');
    sourceElement.textContent = `Source: ${article.source.name}`;
    articleElement.appendChild(sourceElement);

    var publishedAtElement = document.createElement('p');
    publishedAtElement.textContent = `Published At: ${article.publishedAt}`;
    articleElement.appendChild(publishedAtElement);

    if (article.content) {
        var contentElement = document.createElement('p');
        contentElement.textContent = `Content: ${article.content}`;
        articleElement.appendChild(contentElement);
    }

    var urlElement = document.createElement('a');
    urlElement.href = article.url;
    urlElement.textContent = 'Read more';
    articleElement.appendChild(urlElement);

    return articleElement;
}

function changeCategory() {
    var category = document.getElementById('category').value;

    var apiUrl;
    if (category === 'all') {
        apiUrl = 'https://newsapi.org/v2/everything?q=top news international&from=2023-11-13&to=2023-11-16&sortBy=popularity&apiKey=374055a636cd4d828923a0fbb3136186';
    } else if (category === 'sports') {
        apiUrl = 'https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=374055a636cd4d828923a0fbb3136186';
    } else if (category === 'business') {
        var apiKey = '374055a636cd4d828923a0fbb3136186';
        var apiUrl = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=' + apiKey;
    } else if (category === 'entertainment') {
        var apiKey = '374055a636cd4d828923a0fbb3136186';
        var apiUrl = 'https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=' + apiKey;
    }
    

    fetchData(apiUrl);
}

// JavaScript to handle the search functionality
document.getElementById('search-bar').addEventListener('input', function () {
    // Get the input value
    var searchTerm = this.value.toLowerCase();

    // Get the container where search results will be displayed
    var searchResultsContainer = document.getElementById('search-results');

    // Clear previous search results
    searchResultsContainer.innerHTML = '';

    // Perform a search (you may fetch data from a server or use predefined data)
    var searchData = ['Result 1', 'Result 2', 'Result 3', 'Result 4', 'Result 5'];

    // Filter the data based on the search term
    var filteredResults = searchData.filter(function (result) {
        return result.toLowerCase().includes(searchTerm);
    });

    // Display the filtered results
    filteredResults.forEach(function (result) {
        var resultElement = document.createElement('p');
        resultElement.textContent = result;
        searchResultsContainer.appendChild(resultElement);
    });
});

// Fetch data for the default category on page load
changeCategory();
