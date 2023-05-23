const contactName = document.querySelector('#contact-name');
const contactPhone = document.querySelector('#contact-phone');
const contactForm = document.querySelector('#contact-submit');
const contactContainer = document.querySelector('.container');

contactName.oninput = () => contactName.value = contactName.value.replaceAll(/[^a-zA-ZÁ-ÿ`´^~ ]/g, '');
contactPhone.oninput = () => {
    contactPhone.value = contactPhone.value.replaceAll(/[^0-9]/g, '');

    if (contactPhone.value.length === 12) contactPhone.value = contactPhone.value.slice(0, -1);
    else if (contactPhone.value.length > 12) contactPhone.value = contactPhone.value.slice(10);

    console.log(contactPhone.value)
    if (contactPhone.value.length === 11) {
        contactPhone.value = '(' 
        + contactPhone.value.slice(0, 2) 
        + ')' 
        + contactPhone.value.slice(2, 7)
        + '-'
        + contactPhone.value.slice(7);
    }
}

contactForm.onsubmit = (e) => {
    e.preventDefault();
    contactContainer.innerHTML = `<h1>Obrigado por entrar em contato com a gente, ${contactName.value.split(' ')[0]}!</h1>`;
    contactContainer.innerHTML += '<p>Logo mais te retornaremos através dos meios de contato informados. Fique atento(a) à sua caixa de entrada, lixeira e spam!</p>';
    window.scrollTo({top: 0, behavior: "smooth"})
}