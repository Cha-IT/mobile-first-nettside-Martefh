const menuListe = document.querySelector('#menu-list');
const orderListe = document.querySelector('#order-list');
const SubmitOrdenButton = document.querySelector('#submit-order');

if (SubmitOrdenButton){
    SubmitOrdenButton.onclick = () => bestilling.sendBestilling();
}

class MenuItem {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    presenterVare() {
        return `${this.name} - kr ${this.price} NOK`;
    }
}

class Bestilling {
    constructor(){
        this.bestilteVarer = [];
    }

    leggTilVare(vare) {
        this.bestilteVarer.push(vare);
        this.oppdaterBestillingsliste();
    }

    oppdaterBestillingsliste() {
        orderListe.innerHTML = '';
        if (this.bestilteVarer.length === 0) {
            const tomMelding = document.createElement('p');
            tomMelding.textContent = 'Ingen varer bestilt.';
            orderListe.appendChild(tomMelding);
            return;
        }
        this.bestilteVarer.forEach((vare,index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${vare.presenterVare()}`;
            
            const fjernKanpp = document.createElement('button');
            fjernKanpp.textContent = '➖';
            fjernKanpp.style.marginLeft = '10px';
            fjernKanpp.onclick = () => this.fjernVare(index);

            listItem.appendChild(fjernKanpp);
            orderListe.appendChild(listItem);
        });

        const total = this.bestilteVarer.reduce((sum, vare) => sum + vare.price, 0);
        const totalElement = document.createElement('p');
        totalElement.textContent = `Total: kr ${total} NOK`;
        orderListe.appendChild(totalElement);
    }

    fjernVare(index){
    this.bestilteVarer.splice(index,1);
    this.oppdaterBestillingsliste();
    }

    sendBestilling(){
        if(this.bestilteVarer.length === 0){
            visModal("Bestillingen er tom!");
            return;
        }
        visModal("Bestilling sendt! Takk for din ordre 😊");
        this.bestilteVarer = [];
        this.oppdaterBestillingsliste();
    }
}

function visModal(melding) {
    const modal = document.querySelector('#modal');
    const modalMessage = document.querySelector('#modal-message');
    modalMessage.textContent = melding;
    modal.classList.remove('hidden'); 
}


const bestilling = new Bestilling();
const menuItem =[
    {
        id: "drikke",
        title: "Drikke",
        varer: [
            new MenuItem("Kaffe (sort)",40),
            new MenuItem("Cappuccino", 50),
            new MenuItem("Latte", 55),
            new MenuItem("Espresso", 35),
            new MenuItem("Chia Latte", 60),
            new MenuItem("Varm sjokolade med krem", 55),
            new MenuItem("Ferskpresset appelsinjuice", 65),
            new MenuItem("Smoothie (mango & pasjonsfrukt)", 70),
            new MenuItem("Cola, Cola-zer0, Sprite, Solo", 35),
        ],
    },
    {
        id: "småretter-lunsj",
        title: "Småretter & Lunsj",
        varer: [
            new MenuItem("Osteloff med ost & skinke", 75),
            new MenuItem("Croissant mad ost & skinke", 65),
            new MenuItem("Avokadotoast med chiliflak", 85),
            new MenuItem("Egg & bacon sandwich", 90),
            new MenuItem("Grillet kyllingwrap med pesto", 120),
            new MenuItem("Salat med feta & oliven", 110),
            new MenuItem("Dagens suppe med brød", 95),
        ],
    },
    {
        id: "søtsaker",
        title: "Søtsaker",
        varer: [
            new MenuItem("Gulerotkake med kremostglasur", 70),
            new MenuItem("Brownie med vaniljeis", 75),
            new MenuItem("Belgisk vaffel med bær & sirup", 85),
            new MenuItem("Makroner (3 stk)", 65),
            new MenuItem("Sjokoladefondant", 90),
            new MenuItem("Kanelsnurr", 50),            
        ],
    },
];

function visMeny() {
    menuListe.innerHTML = '';
    menuItem.forEach(kategori => {
        const kategoriTittel = document.createElement('h3');
        kategoriTittel.textContent = kategori.title;
        menuListe.appendChild(kategoriTittel);

        kategori.varer.forEach(vare => {
            const listItem = document.createElement('li');
            listItem.textContent = vare.presenterVare();

            const leggTilKnapp = document.createElement('button');
            leggTilKnapp.textContent = '➕ ';
            leggTilKnapp.classList.add('Legg-til-knapp');
            leggTilKnapp.onclick = () => bestilling.leggTilVare(vare);

            listItem.appendChild(leggTilKnapp);
            menuListe.appendChild(listItem);
        });
    });
}

visMeny();