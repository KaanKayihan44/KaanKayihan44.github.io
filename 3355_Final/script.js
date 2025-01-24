const languageData = {
    en: {
        searchPlaceholder: "Search by position",
        cityPlaceholder: "Search by city",
        filterCountry: "Country",
        filterCity: "City",
        filterWorkingPreference: "Working Preference",
        remote: "Remote",
        onsite: "On-site",
        hybrid: "Hybrid",
        apply: "Apply",
        login: "Login",
        register: "Register",
        jobDetails: "Job Details",
        description: "Description",
        location: "Location",
        lastUpdated: "Last Updated",
        applications: "Applications",
        search: "Search",
        apply: "Apply",
        filters: "Filters",
        countries: {
            tr: "Turkey",
            us: "USA",
            de: "Germany"
        },
        viewDetails: "View Details",
        password: "Password",
        emailPlaceholder: "Enter your email",
        passwordPlaceholder: "Enter your password",
    },
    tr: {
        searchPlaceholder: "Pozisyona göre ara",
        cityPlaceholder: "Şehire göre ara",
        filterCountry: "Ülke",
        filterCity: "Şehir",
        filterWorkingPreference: "Çalışma Tercihi",
        remote: "Uzaktan",
        onsite: "Yüzyüze",
        hybrid: "Hibrit",
        apply: "Başvur",
        login: "Giriş Yap",
        register: "Kayıt Ol",
        jobDetails: "İş İlanı Detayı",
        description: "Açıklama",
        location: "Konum",
        lastUpdated: "Son Güncellenme",
        applications: "Başvuru Sayısı",
        search: "Ara",
        apply: "Başvur",
        filters: "Filtreler",
        countries: {
            tr: "Türkiye",
            us: "Amerika",
            de: "Almanya"
        },
        viewDetails: "Detayları Gör",
        email: "E-posta",
        password: "Şifre",
        emailPlaceholder: "E-postanızı girin",
        passwordPlaceholder: "Şifrenizi girin"
    }
};

let currentLanguage = localStorage.getItem('language') || 'en';


function switchLanguage(language) {
    currentLanguage = language;
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (languageData[language] && languageData[language][key]) {
            element.textContent = languageData[language][key];
            if (element.placeholder) {
                element.placeholder = languageData[language][key];
            }
        }
    });

    const countryFilter = document.getElementById('country-filter');
    countryFilter.innerHTML = `
        <option value="tr">${languageData[language].countries.tr}</option>
        <option value="us">${languageData[language].countries.us}</option>
        <option value="de">${languageData[language].countries.de}</option>
    `;
    
    updateCities();
}

const countries = {
    tr: { cities: ["Istanbul", "Izmir"] },
    us: { cities: ["New York", "Los Angeles"] },
    de: { cities: ["Berlin", "Hamburg"] }
};

const countryFilter = document.getElementById('country-filter');
const cityFilter = document.getElementById('city-filter');


function updateCities() {
    const country = countryFilter.value;
    const cities = countries[country] ? countries[country].cities : [];
    cityFilter.innerHTML = cities.map(city => `<option value="${city}">${city}</option>`).join('');
    cityFilter.disabled = !cities.length;
    if (cities.length > 0) {
        cityFilter.value = cities[0];
    }
}

const jobListings = [
    { id: 1, title: "Software Developer", city: "Istanbul", country: "tr", description: "A great opportunity for a developer.", location: "Istanbul, Turkey", lastUpdated: "2025-01-13", applications: 5 },
    { id: 2, title: "Marketing Manager", city: "Izmir", country: "tr", description: "Join our marketing team.", location: "Izmir, Turkey", lastUpdated: "2025-01-10", applications: 3 },
    { id: 3, title: "Graphic Designer", city: "Berlin", country: "de", description: "Creative position in Berlin.", location: "Berlin, Germany", lastUpdated: "2025-01-12", applications: 2 },
    { id: 4, title: "Project Manager", city: "Los Angeles", country: "us", description: "Manage projects in Los Angeles.", location: "Los Angeles, USA", lastUpdated: "2025-01-09", applications: 4 }
];


function filterJobs(jobs, positionQuery, cityQuery, countryQuery) {
    return jobs.filter(job => 
        (!positionQuery || job.title.toLowerCase().includes(positionQuery)) &&
        (!cityQuery || job.city.toLowerCase() === cityQuery) &&
        (!countryQuery || job.country.toLowerCase() === countryQuery)
    );
}


function displayJobs(jobs) {
    const jobListElement = document.querySelector('#job-list ul');
    jobListElement.innerHTML = '';

    if (jobs.length === 0) {
        jobListElement.innerHTML = `<li>No jobs found.</li>`;
        return;
    }

    jobs.forEach(job => {
        const jobItem = document.createElement('li');
        jobItem.setAttribute('data-id', job.id);
        jobItem.setAttribute('data-title', job.title);

        const countryTranslated = languageData[currentLanguage].countries[job.country];

        jobItem.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong data-lang-key="location">Location:</strong> ${job.city}, ${countryTranslated}</p>
            <p><strong data-lang-key="lastUpdated">Last Updated:</strong> ${job.lastUpdated}</p>
            <p><strong data-lang-key="applications">Applications:</strong> ${job.applications}</p>
            <button onclick="viewJobDetails(${job.id})" data-lang-key="viewDetails">View Details</button>
        `;
        
        jobListElement.appendChild(jobItem);
    });
}


function viewJobDetails(id) {
    const job = jobListings.find(job => job.id === id);
    if (job) {
        window.location.href = `job-detail.html?id=${id}&title=${encodeURIComponent(job.title)}&location=${encodeURIComponent(job.location)}&description=${encodeURIComponent(job.description)}&lastUpdated=${encodeURIComponent(job.lastUpdated)}&applications=${job.applications}`;
    }
}


function applyForJob() {
    const messageDiv = document.getElementById('application-message');
    messageDiv.style.display = 'block';

    
    const applyButton = document.getElementById('apply-button');
    applyButton.disabled = true;
    applyButton.textContent = languageData[currentLanguage].apply + " (Applied)";
}

document.getElementById('search-button').addEventListener('click', function () {
    const positionQuery = document.getElementById('position').value.trim().toLowerCase();
    const cityQuery = cityFilter.value.trim().toLowerCase();
    const countryQuery = countryFilter.value.trim().toLowerCase();

    const filteredJobs = filterJobs(jobListings, positionQuery, cityQuery, countryQuery);
    displayJobs(filteredJobs);
});

countryFilter.addEventListener('change', updateCities);
cityFilter.addEventListener('change', function() {
    const positionQuery = document.getElementById('position').value.trim().toLowerCase();
    const cityQuery = cityFilter.value.trim().toLowerCase();
    const countryQuery = countryFilter.value.trim().toLowerCase();

    const filteredJobs = filterJobs(jobListings, positionQuery, cityQuery, countryQuery);
    displayJobs(filteredJobs);
});

document.addEventListener('DOMContentLoaded', () => {
    switchLanguage(currentLanguage);
    updateCities();
    displayJobs(jobListings);
});
