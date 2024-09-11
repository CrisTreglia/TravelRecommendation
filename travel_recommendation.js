// Event listener for the Search button
document.getElementById('searchBtn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission from refreshing the page
    
    const searchInput = document.getElementById('searchInput').value.toLowerCase(); // Convert input to lowercase
    
    // Fetch data from the travel_recommendation_api.json file
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            // Clear only the recommendation results without overwriting the main content
            const resultsContainer = document.getElementById('recommendation-results');
            resultsContainer.innerHTML = ''; // Clear only the results, keep the main content intact

            // Search logic for countries, beaches, and temples
            if (searchInput.includes('beach')) {
                displayRecommendations(data.beaches, 'Beaches');
            } else if (searchInput.includes('temple')) {
                displayRecommendations(data.temples, 'Temples');
            } else {
                // Search through countries and their cities
                const matchedCountry = data.countries.find(country => country.name.toLowerCase().includes(searchInput));

                if (matchedCountry) {
                    displayCountryCities(matchedCountry);
                } else {
                    alert('No recommendations found for that keyword.');
                }
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});

// Function to display country cities
function displayCountryCities(country) {
    const resultsContainer = document.getElementById('recommendation-results');
    
    const countryTitle = document.createElement('h2');
    countryTitle.textContent = `Cities in ${country.name}`;
    resultsContainer.appendChild(countryTitle);

    country.cities.forEach(city => {
        const cityCard = document.createElement('div');
        cityCard.classList.add('recommendation-card');

        const image = document.createElement('img');
        image.src = city.imageUrl; // Ensure the image URL is valid
        image.alt = city.name;

        const cityName = document.createElement('h3');
        cityName.textContent = city.name;

        const description = document.createElement('p');
        description.textContent = city.description;

        cityCard.appendChild(image);
        cityCard.appendChild(cityName);
        cityCard.appendChild(description);

        resultsContainer.appendChild(cityCard);
    });
}

// Function to display general recommendations like beaches or temples
function displayRecommendations(recommendations, categoryTitle) {
    const resultsContainer = document.getElementById('recommendation-results');
    
    const title = document.createElement('h2');
    title.textContent = categoryTitle;
    resultsContainer.appendChild(title);

    recommendations.forEach(recommendation => {
        const recommendationCard = document.createElement('div');
        recommendationCard.classList.add('recommendation-card');

        const image = document.createElement('img');
        image.src = recommendation.imageUrl;
        image.alt = recommendation.name;

        const name = document.createElement('h3');
        name.textContent = recommendation.name;

        const description = document.createElement('p');
        description.textContent = recommendation.description;

        recommendationCard.appendChild(image);
        recommendationCard.appendChild(name);
        recommendationCard.appendChild(description);

        resultsContainer.appendChild(recommendationCard);
    });
}

// Event listener for the Clear button
document.getElementById('resetBtn').addEventListener('click', function() {
    const resultsContainer = document.getElementById('recommendation-results');
    resultsContainer.innerHTML = ''; // Clear only the recommendation results
});
