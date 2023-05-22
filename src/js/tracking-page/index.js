const trackingCode = document.querySelector('.tracking-code');
const trackingButton = document.querySelector('.tracking-button');
const trackingInfos = document.querySelector('.tracking-infos');
const defaultContainer = document.querySelector('.default-container');

trackingButton.onclick = () => {
    if (trackingCode.value.length === 0) return trackingInfos.innerHTML = '<p>O código de rastreio precisa ser informado.</p>';
    trackingButton.disabled = true;
    trackingCode.disabled = true;
    let trackingTries = 0;
    trackingInfos.innerHTML = '<div class="loading-circle"><div class="loading-circle-white"></div></div>';
    let code = '';
    if (trackingCode.value) {
        code = trackingCode.value.toUpperCase();
    }

    const fetching = () => fetch(`https://api.linketrack.com/track/json?user=teste&token=1abcd00b2731640e886fb41a8a9671ad1434c599dbaa0a0de9a5aa619f29a83f&codigo=${code}`)
    .then(res => res.json())
    .then(res => {
        trackingInfos.innerHTML = '';
        defaultContainer.innerHTML = `<h1 class="tracking-title">Resultado da Busca</h1>`;
        const trackingSteps = res.eventos;
        let trackingStep = [];
        let stepStatus = [];
        trackingInfos.innerHTML += `<p>Código: ${code}</p>`;

        for (let i in trackingSteps) {
            trackingInfos.innerHTML += `<div class="tracking-step"></div>`;
            trackingStep = document.querySelectorAll('.tracking-step');

            trackingStep[i].innerHTML += `<p class="step-current-location"><span>Local: </span>${trackingSteps[i].local}</p>`;
            trackingStep[i].innerHTML += `<p class="step-update-date"><span>Data: </span>${trackingSteps[i].data} às ${trackingSteps[i].hora}</p>`;
            trackingStep[i].innerHTML += `<div class="step-status"></div>`;

            stepStatus = document.querySelectorAll('.step-status');

            stepStatus[i].innerHTML += `<span class="step-status-span">${trackingSteps[i].status}</span>`;
            for (let step of trackingSteps[i].subStatus) stepStatus[i].innerHTML += `<p>${step}</p>`;

            if (i < trackingSteps.length - 1) trackingInfos.innerHTML += `<span class="vertical-line">↑</span>`;
            if (i == trackingSteps.length - 1) trackingInfos.innerHTML += `<a href="/tracking/"><button class="tracking-button">Nova busca</button></a>`;
        }
    })
    .catch(err => {
        trackingTries++
        if (trackingTries < 4) {
            setTimeout(() => fetching(), 3000);
        } else {
            trackingButton.disabled = false;
            trackingCode.disabled = false;
            console.log('Falha na conexão...');
            trackingInfos.innerHTML = '<p>Objeto não encontrado. Verifique se o código informado está correto e tente novamente em alguns instantes...</p>';
        }
        
    });
    fetching();
}