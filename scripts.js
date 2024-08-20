document.addEventListener('DOMContentLoaded', () => {
    const showMatchupsBtn = document.getElementById('show-matchups');
    const showSkinsBtn = document.getElementById('show-skins');
    const showHabilidadesBtn = document.getElementById('show-habilidades');

    const matchupsSection = document.getElementById('matchups');
    const habilidadesSection = document.getElementById('habilidades');
    const skinsModal = document.getElementById('skins-modal');
    const matchupsModal = document.getElementById('matchups-modal');
    const adcDetailsModal = document.getElementById('adc-details-modal');
    const closeSkinsBtn = document.querySelector('#skins-modal .close');
    const closeMatchupsBtn = document.querySelector('#matchups-modal .close-matchups');
    const closeAdcDetailsBtn = document.querySelector('#adc-details-modal .close-adc-details');
    const prevBtn = document.querySelector('#skins-modal .arrow.prev');
    const nextBtn = document.querySelector('#skins-modal .arrow.next');
    const carouselImages = document.querySelectorAll('.carousel-item');
    
    let currentIndex = 0;

    function showSection(section) {
        matchupsSection.style.display = 'none';
        habilidadesSection.style.display = 'none';
        skinsModal.style.display = 'none';
        matchupsModal.style.display = 'none';
        adcDetailsModal.style.display = 'none';
        section.style.display = 'block';
    }

    showMatchupsBtn.addEventListener('click', () => {
        showSection(matchupsModal);
        document.getElementById('search-adc').focus();
    });

    showHabilidadesBtn.addEventListener('click', () => showSection(habilidadesSection));

    showSkinsBtn.addEventListener('click', () => {
        showSection(skinsModal);
        updateCarousel();
    });

    closeSkinsBtn.addEventListener('click', hideSkins);
    closeMatchupsBtn.addEventListener('click', () => matchupsModal.style.display = 'none');
    closeAdcDetailsBtn.addEventListener('click', () => adcDetailsModal.style.display = 'none');

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselImages.length - 1;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < carouselImages.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    function updateCarousel() {
        carouselImages.forEach((img, index) => {
            img.style.display = (index === currentIndex) ? 'block' : 'none';
        });
    }

    const searchInput = document.getElementById('search-adc');
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const adcItems = document.querySelectorAll('.adc-item');
        adcItems.forEach(item => {
            const name = item.querySelector('p').textContent.toLowerCase();
            item.style.display = name.includes(query) ? 'block' : 'none';
        });
    });

    document.querySelectorAll('.adc-item').forEach(item => {
        item.addEventListener('click', () => {
            const adcName = item.querySelector('p').textContent;
            showAdcDetails(adcName);
        });
    });

    function showAdcDetails(name) {
        const adcDetails = {
            'Aphelios': 'Aphelios pode manter a distância e usar suas armas para causar dano contínuo. Jinx deve aproveitar suas habilidades de mobilidade para evitar ataques prolongados e focar em eliminar Aphelios rapidamente antes que ele possa maximizar seu dano.',
            'Ashe': 'Ashe pode controlar o campo com suas flechas de gelo e ultimate. Jinx deve evitar ser atingida pela ultimate de Ashe e utilizar sua mobilidade para se reposicionar rapidamente para escapar do controle de grupo.',
            'Caitlyn': 'Caitlyn tem um longo alcance e pode usar suas armadilhas para controlar o campo. Jinx deve tentar se manter fora do alcance de Caitlyn e ser cautelosa com as armadilhas para evitar ser pegada.',
            'Draven': 'Draven é um ADC agressivo e pode causar muito dano rapidamente. Jinx deve evitar trocar de dano prolongado e focar em aproveitar qualquer oportunidade para atacar Draven quando ele estiver fora de posição.',
            'Jhin': 'Jhin é perigoso com seu ataque de longo alcance e habilidade de controle. Jinx deve evitar ficar em um grupo e se manter em movimento para não ser pegada pelo ataque de longo alcance de Jhin.',
            'Kai\'Sa': 'Kai\'Sa pode ser muito ameaçadora quando acumulada com itens. Jinx deve tentar manter distância e usar sua mobilidade para evitar ser atingida pelas habilidades de Kai\'Sa.',
            'Kog\'Maw': 'Kog\'Maw causa dano intenso de longo alcance. Jinx deve se manter afastada e usar sua mobilidade para se reposicionar constantemente, aproveitando qualquer oportunidade para atacar quando Kog\'Maw está vulnerável.',
            'Miss Fortune': 'Miss Fortune pode causar dano em área com sua ultimate. Jinx deve evitar ficar agrupada com seus aliados e tentar engajar Miss Fortune quando suas habilidades de área estiverem em recarga.',
            'Samira': 'Samira é uma ADC que pode ser muito perigosa se usar suas habilidades de forma eficaz. Jinx deve manter distância e evitar lutar contra Samira quando ela tem todas as habilidades disponíveis.',
            'Tristana': 'Tristana pode se tornar muito forte ao aumentar seu alcance com o tempo. Jinx deve tentar engajar Tristana quando ela estiver fora de posição e evitar ser pega pela explosão final de Tristana.',
            'Twitch': 'Twitch pode causar muito dano com emboscadas e ataques de longo alcance. Jinx deve manter uma boa visão do mapa e tentar não ficar sozinha em áreas onde Twitch possa estar escondido.',
            'Varus': 'Varus pode causar dano com suas flechas envenenadas e habilidades de longo alcance. Jinx deve evitar ser pegada por suas habilidades de longo alcance e tentar atacar Varus quando ele estiver fora de posição.',
            'Vayne': 'Vayne pode ser muito difícil de lidar com seu alto dano e mobilidade. Jinx deve tentar evitar enfrentar Vayne em espaços fechados e usar sua própria mobilidade para escapar dos ataques de Vayne.',
            'Xayah': 'Xayah pode usar suas habilidades para causar dano em área e se reposicionar. Jinx deve tentar manter distância e evitar ser pega pelas habilidades de área de Xayah.',
            'Zeri': 'Zeri é ágil e pode causar dano rapidamente. Jinx deve se manter em movimento e tentar utilizar sua própria mobilidade para se reposicionar e evitar os ataques rápidos de Zeri.'
        };

        const details = adcDetails[name] || 'Detalhes não disponíveis';
        document.querySelector('#adc-details-modal .modal-content').innerHTML = `
            <h2>${name}</h2>
            <p>${details}</p>
        `;
        adcDetailsModal.style.display = 'block';
    }

    window.addEventListener('click', (event) => {
        if (event.target === matchupsModal) {
            matchupsModal.style.display = 'none';
        }
        if (event.target === adcDetailsModal) {
            adcDetailsModal.style.display = 'none';
        }
        if (event.target === skinsModal) {
            hideSkins();
        }
    });

    // Adiciona listeners para os círculos dos inimigos
    document.querySelectorAll('area').forEach(area => {
        area.addEventListener('click', (event) => {
            event.preventDefault();
            if (area.id === 'enemy-1') {
                showSection(matchupsModal);
                document.getElementById('search-adc').focus();
            } else if (area.id === 'skins-area') {
                showSkins();
            }
        });
    });

    function showSkins() {
        skinsModal.style.display = 'block';
    }

    function hideSkins() {
        skinsModal.style.display = 'none';
    }
});