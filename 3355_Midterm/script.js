function hideAdd(addId) {
    document.getElementById(addId).style.display = 'none';
}

document.getElementById("main-form").onsubmit = function(e) {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone-number").value;
    let lastName = document.getElementById("last-name").value;

    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.match(emailRegex)) {
        alert("Please enter a valid email.");
        return;
    }

    phone = phone.replace(/[\s\-]/g, "");

    let phoneRegex = /^[5][0-9]{9}$/;
    if (!phone.match(phoneRegex)) {
        alert("Please enter a valid Turkish phone number.");
        return;
    }

    if (lastName.trim() === "") {
        alert("Please enter your last name.");
        return;
    }

    alert("Form submitted!");
};

window.onload = function() {
    fetch('https://run.mocky.io/v3/3045befa-687a-492d-a7d9-c8fdd4fb41e3')
        .then(response => response.json())
        .then(data => {
            let companySelect = document.getElementById("company");
            data.companies.forEach(company => {
                let option = document.createElement("option");
                option.value = company;
                option.textContent = company;
                companySelect.appendChild(option);
            });

            let subjectSelect = document.getElementById("subject");
            data.subjects.forEach(subject => {
                let option = document.createElement("option");
                option.value = subject;
                option.textContent = subject;
                subjectSelect.appendChild(option);
            });

            let phoneSelect = document.getElementById("phone-code");
            let areaCodes = ["+90"];
            areaCodes.forEach(code => {
                let option = document.createElement("option");
                option.value = code;
                option.textContent = code;
                phoneSelect.appendChild(option);
            });
        });
};
