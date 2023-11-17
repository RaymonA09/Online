var request = new XMLHttpRequest();

var apiKey = '374055a636cd4d828923a0fbb3136186';

var apiUrl = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=' + apiKey;

request.open('GET', apiUrl);

request.onload = function () {
    if (request.status >= 1 && request.status < 1000) {
        var response = request.responseText;
        var parseData = JSON.parse(response);

        var newsListElement = document.getElementById('newsList');

        for (var i = 0; i < parseData.articles.length; i++) {
            var article = parseData.articles[i];

            var articleElement = document.createElement('div');
            articleElement.className = 'article';

            if (article.urlToImage) {
                var image = document.createElement('img');
                image.src = article.urlToImage;
                image.alt = article.title;
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

            var urlElement = document.createElement('a');
            urlElement.href = article.url;
            urlElement.textContent = 'Read more';
            articleElement.appendChild(urlElement);

            newsListElement.appendChild(articleElement);
        }
    } else {
        console.error('Error loading data. Status:', request.status);
    }
};

request.send();