const createAccount = (email, user) => {
    const localAccounts = localStorage.getItem('localAccounts');
    const arrayLocalAccounts = JSON.parse(localAccounts) || [];
    const errorDivs = document.querySelectorAll('.form-error');
    const successDivs = document.querySelectorAll('.form-success');
    const emailError = errorDivs[2];
    const userError = errorDivs[3];
    const createAccountSuccess = successDivs[1];
    emailError.innerHTML = '';
    userError.innerHTML = '';
    createAccountSuccess.innerHTML = '';

    if (!localAccounts)
        localStorage.setItem('localAccounts', `[{"email": "${email}", "user": "${user}", "name": "", "cpf": "", "address":{}, "phone": ""}]`);
    else {
        for (let obj of arrayLocalAccounts) {
            if (obj.email === email) return emailError.innerHTML = '<p>E-mail informado já está em uso.</p>';
            if (obj.user === user) return userError.innerHTML = '<p>Nome de usuário informado já está em uso.</p>';
        }

        arrayLocalAccounts.push({ email:email, user: user, name: "", cpf: "", address:{}, phone: "" });
        localStorage.setItem('localAccounts', JSON.stringify(arrayLocalAccounts));
    }
    createAccountSuccess.innerHTML = '<p>Conta criada com sucesso!</p><p>Entre com seu e-mail e usuário...</p>';
};
const allInputs = document.querySelectorAll('.sign-in-or-create-account input');
for (let input of allInputs) input.oninput = () => {
    input.value = input.value.replaceAll(' ', '');
};

const createAccountForm = document.querySelector('.create-account-form');

createAccountForm.onsubmit = (event) => {
    event.preventDefault();
    const email = document.querySelectorAll('.create-account-form > input')[0];
    const user = document.querySelectorAll('.create-account-form > input')[1];

    if (email.value.length > 0 && user.value.length > 0)
        createAccount(email.value, user.value);
};
