const checkLogin = () => {
    return alert('Descomentar redirect');
    /* const localAccounts = localStorage.getItem('localAccounts');
    const arrayLocalAccounts = JSON.parse(localAccounts) || [];

    if (localAccounts)
        for (let array of arrayLocalAccounts)
            if (array.loggedIn === true)
                return location.href = '/login/user/'; */
};
checkLogin();

const createAccount = (email, user) => {
    const localAccounts = localStorage.getItem('localAccounts');
    const arrayLocalAccounts = JSON.parse(localAccounts) || [];

    const errorDivs = document.querySelectorAll('.form-error');
    for (let error of errorDivs) error.innerHTML = '';

    const successDivs = document.querySelectorAll('.form-success');
    for (let success of successDivs) success.innerHTML = '';

    const emailError = errorDivs[2];
    const userError = errorDivs[3];
    const createAccountSuccess = successDivs[1];
    emailError.innerHTML = '';
    userError.innerHTML = '';
    createAccountSuccess.innerHTML = '';

    if (!localAccounts)
        localStorage.setItem('localAccounts', `[{"email": "${email}", "user": "${user}", "loggedIn": false, "name": "", "cpf": "", "address":{}, "phone": ""}]`);
    else {
        for (let obj of arrayLocalAccounts) {
            if (obj.email === email) return emailError.innerHTML = '<p>E-mail informado já está em uso.</p>';
            if (obj.user === user) return userError.innerHTML = '<p>Nome de usuário já em uso.</p>';
        }

        arrayLocalAccounts.push({ email:email, user: user, loggedIn: false, name: "", cpf: "", address:{}, phone: "" });
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

const signInForm = document.querySelector('.sign-in-form');

signInForm.onsubmit = (event) => {
    event.preventDefault();

    const email = document.querySelectorAll('.sign-in-form > input')[0].value;
    const user = document.querySelectorAll('.sign-in-form > input')[1].value;

    const localAccounts = localStorage.getItem('localAccounts');
    const arrayLocalAccounts = JSON.parse(localAccounts) || "[]";

    const errorDivs = document.querySelectorAll('.form-error');
    for (let error of errorDivs) error.innerHTML = '';

    const successDivs = document.querySelectorAll('.form-success');
    for (let success of successDivs) success.innerHTML = '';

    const emailError = errorDivs[0];
    const userError = errorDivs[1];
    const signInSuccess = successDivs[0];

    emailError.innerHTML = '';
    userError.innerHTML = '';
    signInSuccess.innerHTML = '';

    if (!localAccounts) {
        emailError.innerHTML = 'E-mail ainda não cadastrado.';
        userError.innerHTML = 'Usuário ainda não cadastrado.';
        return;
    }

    const userArrayIndex = arrayLocalAccounts.findIndex((account) => account.email === email && account.user === user);

    if (userArrayIndex !== -1) {
        for (let array of arrayLocalAccounts) array.loggedIn = false;
        arrayLocalAccounts[userArrayIndex].loggedIn = true;
        localStorage.setItem('localAccounts', JSON.stringify(arrayLocalAccounts));

        signInSuccess.innerHTML = 'Usuário logado com sucesso. Redirecionando...';
        window.location.href = '/login/user/';
    } else {
        emailError.innerHTML = 'E-mail não cadastrado ou não corresponde com usuário informado.';
        userError.innerHTML = 'Usuário não cadastrado ou não corresponde com e-mail informado.';
        return;
    }
};
