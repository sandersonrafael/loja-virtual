const loadLocalAccounts = () => {
    const localAccounts = localStorage.getItem('localAccounts');
    const arrayLocalAccounts = JSON.parse(localAccounts) || [];
    return arrayLocalAccounts;
}

const logoutButton = document.querySelector('.container > p > button');
logoutButton.onclick = () => {
    const newArrayLocalAccounts = loadLocalAccounts();
    for (let account of newArrayLocalAccounts) account.loggedIn = false;
    localStorage.setItem('localAccounts', JSON.stringify(newArrayLocalAccounts));
    return location.href = '/login/';
}

// elements

const userNameTitle = document.querySelectorAll('.user-name-title');

const loggedUserName = document.querySelector('.user-name');
const loggedUserEmail = document.querySelector('.user-email');
const loggedUserPhone = document.querySelector('.user-phone');
const loggedUserCpf = document.querySelector('.user-cpf');

const loggedUserCep = document.querySelector('.address-cep');

const addressDisplay = document.querySelector('.user-address-hidden');

const loggedUserEstado = document.querySelector('.address-estado');
const loggedUserCidade = document.querySelector('.address-cidade');
const loggedUserLogradouro = document.querySelector('.address-logradouro');
const loggedUserNumero = document.querySelector('.address-numero');
const loggedUserComplemento = document.querySelector('.address-complemento');
const loggedUserBairro = document.querySelector('.address-bairro');

const errorMessages = document.querySelectorAll('.error-message');
const successMessage = document.querySelector('.success-message');

const disableItens = document.querySelectorAll('.disabled');
for (let item of disableItens) item.disabled = true;

// inputs rules -> contact infos

loggedUserName.oninput = () => loggedUserName.value = loggedUserName.value.replaceAll(/[^a-zA-ZÁ-ÿ`´^~ ]/g, '');

loggedUserEmail.oninput = function() {
    if (this.value.indexOf('@') === -1 || this.value.indexOf('.')  === -1 || this.value.indexOf('.') === this.value.length - 1) errorMessages[1].innerHTML = 'Informe um e-mail válido.';
    else errorMessages[1].innerHTML = '';
};

const validatePhone = () => {
    if (loggedUserPhone.value.length !== 0 &&
        (loggedUserPhone.value.length < 15 ||
        loggedUserPhone.value[1] ===  '0' ||
        loggedUserPhone.value[2] === '0' ||
        loggedUserPhone.value[5] !== '9'))
        errorMessages[2].innerHTML = 'Informe um telefone válido.';
    else errorMessages[2].innerHTML = '';
};

loggedUserPhone.oninput = () => {
    loggedUserPhone.value = loggedUserPhone.value.replaceAll(/[^0-9]/g, '');
    
    if (loggedUserPhone.value.length === 12) loggedUserPhone.value = loggedUserPhone.value.slice(0, -1);
    else if (loggedUserPhone.value.length > 12) loggedUserPhone.value = loggedUserPhone.value.slice(0, 11);

    if (loggedUserPhone.value.length === 11) {
        loggedUserPhone.value = '(' 
        + loggedUserPhone.value.slice(0, 2) 
        + ') ' 
        + loggedUserPhone.value.slice(2, 7)
        + '-'
        + loggedUserPhone.value.slice(7);
    };
    validatePhone();
};

const validateCpf = (cpf) => {
    const cpfNineDigits = cpf.slice(0, -2);
    let multiplier = 10

    const checkLastDigits1 = Array.from(cpfNineDigits).reduce((total, digit) => {
        multiplier--;
        return total = total + Number(digit) * (multiplier + 1);
    }, 0);
    const digit10 = 11 - (checkLastDigits1 % 11) > 9 ? 0 : 11 - (checkLastDigits1 % 11);

    multiplier = 11;
    const checkLastDigits2 = Array.from(cpfNineDigits + String(digit10)).reduce((total, digit) => {
        multiplier--;
        return total = total + Number(digit) * (multiplier + 1);
    }, 0);
    const digit11 = 11 - (checkLastDigits2 % 11) > 9 ? 0 : 11 - (checkLastDigits2 % 11);

    const testRepetition = Array.from(cpfNineDigits).reduce((test, value, i, array) => {
        if (i > 0) return test = test && value === array[i - 1];
        return test = test;
    },true)

    return cpf.slice(9) === String(digit10) + String(digit11) && !testRepetition;
};

loggedUserCpf.oninput = () => {
    loggedUserCpf.value = loggedUserCpf.value.replaceAll(/[^0-9]/g, '');

    if (loggedUserCpf.value.length === 12) loggedUserCpf.value = loggedUserCpf.value.slice(0, -1);
    else if (loggedUserCpf.value.length > 12) loggedUserCpf.value = loggedUserCpf.value.slice(0, 1);

    if (loggedUserCpf.value.length !== 0 && loggedUserCpf.value.length !== 11) errorMessages[3].innerHTML = 'Informe um CPF com 11 dígitos.';
    else errorMessages[3].innerHTML = '';

    if (loggedUserCpf.value.length === 11) {
        validateCpf(loggedUserCpf.value) ? errorMessages[3].innerHTML = '' : errorMessages[3].innerHTML = 'Informe um CPF válido.'

        loggedUserCpf.value = loggedUserCpf.value.slice(0, 3) 
        + '.' 
        + loggedUserCpf.value.slice(3, 6)
        + '.'
        + loggedUserCpf.value.slice(6, 9)
        + '-'
        + loggedUserCpf.value.slice(9);
    };
};

// inputs rules -> address infos

const validateCep = (cep) => {
    addressDisplay.style.display = 'block';

    const cepError = () => {
        errorMessages[4].innerHTML = 'Cep não encontrado. Preencha o endereço manualmente...';
        setTimeout(() => errorMessages[4].innerHTML = '', 3000);
    }

    fetch(`https://viacep.com.br/ws/${cep}/json`)
        .then(res => res.json())
        .then(endereco => {
            if (endereco.erro) return cepError();

            errorMessages[4].innerHTML = '';
            if (endereco.cep) loggedUserCep.value = endereco.cep;
            if (endereco.uf) loggedUserEstado.value = endereco.uf;
            if (endereco.localidade) loggedUserCidade.value = endereco.localidade;
            if (endereco.logradouro) loggedUserLogradouro.value = endereco.logradouro;
            if (endereco.numero) loggedUserNumero.value = endereco.numero;
            if (endereco.bairro) loggedUserBairro.value = endereco.bairro;
        })
        .catch(err => cepError(err));
}

loggedUserCep.oninput = async () => {
    loggedUserCep.value = loggedUserCep.value.replaceAll(/[^0-9]/g, '');

    if (loggedUserCep.value.length === 9) loggedUserCep.value = loggedUserCep.value.slice(0, -1);
    else if (loggedUserCep.value.length > 9) loggedUserCep.value = loggedUserCep.value.slice(7);

    if (loggedUserCep.value.length === 8) {
        validateCep(loggedUserCep.value);
        loggedUserCep.value = loggedUserCep.value.slice(0, 5) + '-' + loggedUserCep.value.slice(5);
    }
    
}

loggedUserNumero.oninput = () => loggedUserNumero.value = loggedUserNumero.value.replaceAll(/[^0-9]/g, '');

// edit and save infos

const editUserInfosButton = document.querySelector('.edit-user-infos');
editUserInfosButton.onclick = () => {
    const changeDisabled = () => {
        for (let item of disableItens) item.disabled = !item.disabled;
    };

    const clearMessages = () => {
        for (let i = 4; i <= 11; i++) errorMessages[i].innerHTML = '';
        successMessage.innerHTML = '';
    };

    clearMessages();
    const editInfos = () => {
        editUserInfosButton.innerHTML = 'Salvar';
        changeDisabled();
    };

    const saveInfos = () => {
        const arrayLocalAccounts = loadLocalAccounts();
        const i = arrayLocalAccounts.findIndex(account => account.loggedIn === true);

        // contact infos

        if (loggedUserName.value) {
            errorMessages[0].innerHTML = '';
            arrayLocalAccounts[i].name = loggedUserName.value;
        } else {
            return errorMessages[0].innerHTML = 'Nome deve ser informado.';
        }
        if (loggedUserEmail.value) {
            errorMessages[1].innerHTML = '';
            for (let account of arrayLocalAccounts)
                if (account.email === loggedUserEmail.value && account.loggedIn === false)
                    return errorMessages[1].innerHTML = 'E-mail informado já está em uso.'
            arrayLocalAccounts[i].email = loggedUserEmail.value;
        }
        if (loggedUserPhone.value) arrayLocalAccounts[i].phone = loggedUserPhone.value;
        if (loggedUserCpf.value) arrayLocalAccounts[i].cpf = loggedUserCpf.value;

        localStorage.setItem('localAccounts', JSON.stringify(arrayLocalAccounts));

        // address infos

        if (loggedUserCep.value) arrayLocalAccounts[i].address.cep = loggedUserCep.value;
        else return errorMessages[4].innerHTML = 'CEP deve ser informado.'

        if (loggedUserEstado.value) arrayLocalAccounts[i].address.estado = loggedUserEstado.value;
        else return errorMessages[5].innerHTML = 'Estado deve ser informado.'

        if (loggedUserCidade.value) arrayLocalAccounts[i].address.cidade = loggedUserCidade.value;
        else return errorMessages[6].innerHTML = 'Cidade deve ser informada.'

        if (loggedUserLogradouro.value) arrayLocalAccounts[i].address.logradouro = loggedUserLogradouro.value;
        else return errorMessages[7].innerHTML = 'Rua deve ser informada.'

        arrayLocalAccounts[i].address.numero = loggedUserNumero.value || 'S/N';
        arrayLocalAccounts[i].address.complemento = loggedUserComplemento.value;
        if (!loggedUserNumero.value && !loggedUserComplemento.value)
        return errorMessages[8].innerHTML = 'Um número ou complemento deve ser informado.';

        if (loggedUserBairro.value) arrayLocalAccounts[i].address.bairro = loggedUserBairro.value;
        else return errorMessages[10].innerHTML = 'Bairro deve ser informado';

        for (let error of errorMessages) if (error.innerHTML !== '')
            return errorMessages[11].innerHTML = 'Falha ao atualizar dados. Revise todos os campos e tente novamente.'


        localStorage.setItem('localAccounts', JSON.stringify(arrayLocalAccounts));

        editUserInfosButton.innerHTML = 'Editar informações';
        changeDisabled();
        successMessage.innerHTML = 'Dados de usuário atualizados com êxito.'
        setTimeout(() => successMessage.innerHTML = '', 3000);
    };
    editUserInfosButton.innerHTML === 'Editar informações' ? editInfos() : saveInfos();
    return window.onload();
};

// load user data

window.onload = () => {
    const userInfos = loadLocalAccounts().find((user) => user.loggedIn === true);

    if (!userInfos) return location.href = '/login/';

    for (let name of userNameTitle) name.innerHTML = userInfos.user;

    if (userInfos.name) loggedUserName.value = userInfos.name;
    if (userInfos.email) loggedUserEmail.value = userInfos.email;
    if (userInfos.phone) loggedUserPhone.value = userInfos.phone;
    if (userInfos.cpf) loggedUserCpf.value = userInfos.cpf;

    if (userInfos.address.cep) {
        addressDisplay.style.display = 'block';
        loggedUserCep.value = userInfos.address.cep;
    }

    if (userInfos.address.estado) loggedUserEstado.value = userInfos.address.estado;
    if (userInfos.address.cidade) loggedUserCidade.value = userInfos.address.cidade;
    if (userInfos.address.logradouro) loggedUserLogradouro.value = userInfos.address.logradouro;
    if (userInfos.address.numero) loggedUserNumero.value = userInfos.address.numero;
    if (userInfos.address.complemento) loggedUserComplemento.value = userInfos.address.complemento;
    if (userInfos.address.bairro) loggedUserBairro.value = userInfos.address.bairro;
};
