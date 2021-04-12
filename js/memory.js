//VARIBILI COSTANTI
const TIME = 600;
const RETRO = "img/img00.jpg";
// VARIABILI 
var CARTE;
var primacarta;
var secondacarta;
var nodoEasy;
var nodoNormal;
var nodoHard;
var nodoGame;
var n_carte;
var n_immagini;
var carteVittoria;
var suono = new Audio ("sound/card.wav");
var suono2 = new Audio ("sound/start.wav");
var suonovittoria = new Audio("sound/victory.wav");

//funzione che riproduce l'effetto audio desiderato
function playSound (snd) {
    try {
        snd.currentTime = 0;
        snd.play();
    } catch (e) {
        alert ("playSound" + e)
    }
}

function gestoreDifficoltà() {
    try {
        // modalità facile
        if (this.getAttribute("id")=="easy") {
            n_carte = 6;
            n_immagini = 3;
            nodoGame.setAttribute("class", 'easyGame');
            difficoltà(n_carte, n_immagini);
        }
        // modalità normale
        if (this.getAttribute("id")=="normal") {
            n_carte = 12;
            n_immagini = 6;
            nodoGame.setAttribute("class", 'normalGame');
            difficoltà(n_carte, n_immagini);
        }
        // modalità difficile
        if (this.getAttribute("id")=="hard") {
            n_carte = 18;
            n_immagini = 9;
            nodoGame.setAttribute("class", 'hardGame');
            difficoltà(n_carte, n_immagini);
            }
    } catch (e) {
        alert ("gestoreDifficoltà" + e)
    }
}

// funzione che associa alle carte un'illustrazione
function difficoltà(tot_carte, tot_immagini) {
    try {
        removeChild(nodoGame);
        playSound(suono2);
        // creo l'Array CARTE
        carteVittoria = 0;
        CARTE = [];
        primacarta = null;
        secondacarta = null;
        for (i=0; i<tot_carte; i++) {
            var nodoInput = document.createElement("input");
            nodoGame.appendChild(nodoInput);
            nodoInput.setAttribute("type", 'image');
			nodoInput.setAttribute("alt", 'carta');
            nodoInput.setAttribute("class", 'card');
            var stringa = "e" + String(i);
            nodoInput.setAttribute("id", stringa);
            nodoInput.setAttribute("src", RETRO);
            nodoInput.setAttribute("carta", "coperta");
            nodoInput.onclick = gestoreClickCarta;
            CARTE.push(nodoInput);
        }
    // associo alle carte un'img casuale
        for (var j=0; j<tot_immagini; j++) {
            var fileImg = "img/img" + j +".jpg";
            var j1 = CalcolaIndiceCarta();
            CARTE[j1].setAttribute("src1", fileImg);
            CARTE[j1] = null;
            var j2 = CalcolaIndiceCarta();
            CARTE[j2].setAttribute("src1", fileImg);
            CARTE[j2] = null;
        }
        vittoria(n_carte);
    } catch (e) {
        alert ("difficoltà" + e)
    }
}

function removeChild (nodo) {                            
    while (nodo.childNodes.length > 0) {
        nodo.removeChild(nodo.lastChild)
    }
}

//funzione che gira le carte nel caso in cui il giocatore non abbia trovato la coppia uguale
function giraCarte() {
    try {
        // viene riprodotto il suond e le carte acquisiscono come attributo src dell'immagine l'illustrazione del restro della carta
        playSound(suono);
        primacarta.setAttribute("src", RETRO);
        primacarta=null;
        secondacarta.setAttribute("src", RETRO);
        secondacarta=null;
    } catch (e) {
        alert("giraCarte" + e);
    }
}
//REGOLE DI GIOCO//
//la funzione viene invocata al click di una carta. Verifica i vari casi possibili.
function gestoreClickCarta () {
    try {
        // caso in cui il giocatore seleziona una carta scoperta
        if (this.getAttribute("carta") == "scoperta") {
            //non succede nulla
            return;
        // caso in cui il giocatore seleziona la prima carta già selezionata
        } if (this == primacarta) {
            // non succede nulla
            return;
        // caso in cui il giocatore seleziona la prima carta
        } if (primacarta == null) {
            // viene riprodotto il sound e la carta si gira mostrando l'illustrazione
            playSound(suono);
            primacarta = this;
            this.setAttribute("src", this.getAttribute("src1"));
            return;
        // caso in cui il giocatore seleziona la seconda carta
        } if (secondacarta == null) {
            // viene riprodotto il suond e la carta si gira mostrando l'illustazione
            playSound(suono);
            secondacarta = this;
            this.setAttribute ("src", this.getAttribute("src1"));
            // caso in cui le due carte scoperte sono uguali
            if (primacarta.getAttribute("src") == secondacarta.getAttribute("src")) {
                // le due carte aquisiscono l'attributo scoperta e restano girate mostrando l'illustrazione
                primacarta.setAttribute("carta", "scoperta");
                primacarta = null;
                secondacarta.setAttribute("carta", "scoperta");
                secondacarta = null;
                carteVittoria = carteVittoria + 2;
                vittoria (n_carte, carteVittoria);
            // se le due carte scoperte non sono uguali viene invocata la funziona che gira nuovamente le due carte
            } else {
                setTimeout(giraCarte, TIME);
            }
        }
    } catch (e) {
        alert ("gestoreClickCarta" + e);
    }
}

//attraverso le due funzioni viene calcolato l'indice random a cui viene affidata un'illustrazione ogni volta diversa
function uniformeRandom (k) {
    return Math.trunc(Math.random() * k);
}
function CalcolaIndiceCarta() {
    var i = uniformeRandom(n_carte);
    // controllo che l'elemento dell'array con l'indice random non sia già stato utilizzato
    while (CARTE[i] == null ) {
        i = uniformeRandom(n_carte);
    }
    return i;
}

//funzione che riprodce il suono in condizione d vittoria
// x = numero carte in gioco; y = numero carte girate
function vittoria (x, y) {
        if (y == x) {
            playSound(suonovittoria);
        }
    }

function gestoreLoad () {
    try {
        // assegno alle variabili l'elemento html
        nodoEasy = document.getElementById("easy");
        nodoNormal = document.getElementById("normal");
        nodoHard = document.getElementById("hard");
        nodoGame = document.getElementById("game");
        nodoNuovaPartita = document.getElementById("newGame");
        // invocazione funzioni al presentarsi dell'evento click
        nodoEasy.onclick = gestoreDifficoltà;
        nodoNormal.onclick = gestoreDifficoltà;
        nodoHard.onclick = gestoreDifficoltà;
    } catch (e) {
        alert("gestoreLoad" + e);
    }
}

window.onload = gestoreLoad

