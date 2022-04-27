/*------------------------------------------------------------------------------------------\
|                            Programme JavaScript application Bucheron                      |
\------------------------------------------------------------------------------------------*/

//Cache et Iniitilise les différents element graphique de selection
var zSelBuch = document.getElementById("selectBuch");
var zSelSect = document.getElementById("selectSecteur");
var searchEspece = document.getElementById("choixEspece");
var zAffichEspece = document.getElementById("selectEspece");
var zTableTotal = document.getElementById("tableArbre");
var zTbodyArbre = document.getElementById("bodyTable");
zTableTotal.hidden = true;
zSelBuch.hidden = true;
zSelSect.hidden = true;
searchEspece.hidden = true;
zAffichEspece.hidden = true;
//Varialbe initialisé a zero
var callBucheron = 0;
var nbArbreCoche = 0;
var tableDonne = [];
var dateSelect = 0;
var old = "";
var listIdArbre = [];
var historique = [];

/*------------------------------------------------------------------------------------------\
|                                  Script pour le calendrier                                |
\------------------------------------------------------------------------------------------*/

//Initalisé a 1 quand le premier element graphique sera afficher
var verrif = 0;
//Initalisé a 1 si jamais l'alert pour prevenir d'un probleme de date s'active
var alertActive = 0;
document.getElementById('selectD').onchange = function () {
    today = new Date();
    var mois = today.getMonth() + 1;
    var jour = today.getDate();
    if(mois < 10) {
        mois = "0"+mois;
    }
    if (jour < 10) {
        jour = "0"+jour;
    }
    console.log(today.getFullYear()+"-"+mois+"-"+jour);
    console.log(document.getElementById('selectD').value)
    //Cette fonction est appellé si jamais pendant la selection, l'utilisateur décide de changer la date
    remiseZeroCoche()
    //Recupération de la date choisi
    dateSelect = document.getElementById('selectD').value;
    //Initalise une variable date avec la date d'ajourd'hui (Date en format Unix)
    var date = Date.now();
    //Compare les deux date sous format Unix pour savoir si la date choisi est valide ou non
    //Si la date n'est pas valide le programme effectura les actions suivantes
    if (Date.parse(dateSelect) < date) {
        alert("Date déjà passer")
        alertActive = 1;
    }
    //Vérrifie si il n'y as pas l'alert d'activer et que le programme n'est pas déjà passer par ici
    if (verrif == 0 && alertActive == 0) {
        //Si ce n'est pas le cas appel cette fonction
        getBucheron();
        //Affiche la zone de selection de bucheron
        document.getElementById("selectBuch").hidden = false;
        //Initialise les variable de vérrification
        alertActive = 1;
        verrif = 1;
    }
    //Initialise les variable de vérrification
    alertActive = 0
}


//Fin du script pour le calendrier
/* ****************************************************************************************************** */


/*------------------------------------------------------------------------------------------\
|                            Script des élements de selection graphique                     |
\------------------------------------------------------------------------------------------*/

//Evenement lors d'un clique sur la zone de selection de bucheron
function cliqueBucheron() {
    selectBuch.onchange = function () {
        //Affecte une classe pour avoir la mise en forme de celle ci
        var optSel = zSelBuch.options;
        for (i = 0; i<optSel.length;i++) {
            optSel[i].classList.remove("bucheronSelect");
        }
        zSelBuch.options[zSelBuch.selectedIndex].classList.add("bucheronSelect");
        //Appel cette fonction si jamais la selection du bucheron change pendant l'affectation de tache
        remiseZeroCoche();
        //Condition pour verrifier si le programme n'as pas déjà afficher cette partie graphique
        if (callBucheron == 0) {
            //Si jamais pas déjà afficher appel la fonction suivante et initialise la varibale de verrification
            getSecteur();
            callBucheron = 1;
        }
        table = zTableTotal.childNodes[1].childNodes;
        for (i = 0; i < table.length; i++) {
            if(table[i].className == "selectionnerArbre") {
                table[i].classList.remove("selectionnerArbre");
                table[i].classList.add("ligne");
            }
        }
    }
}

//Evenement lors d'un clique sur la zone de selection de l'adresse
selectSecteur.onchange = function () {
    //Affecte une classe pour avoir la mise en forme de celle ci
    var optSel = zSelSect.options;
    for (i = 0; i<optSel.length;i++) {
        optSel[i].classList.remove("secteurSelect");
    }
    zSelSect.options[zSelSect.selectedIndex].classList.add("secteurSelect");
    //Initialise la variable avec l'adresse selectionner et appel la fonction avec cette derniere
    var secteur = zSelSect.options[zSelSect.selectedIndex].value;
    getEspece(secteur);
}

//Evenement lors d'un clique sur la zone de selection de l'espece
selectEspece.onchange = function () {
    var optSel = zAffichEspece.options;
    for (i = 0; i<optSel.length;i++) {
        optSel[i].classList.remove("especeSelect");
    }
    zAffichEspece.options[zAffichEspece.selectedIndex].classList.add("especeSelect");
    //Initialise la variable avec la valeur du nom de l'espece selectionner et appel la fonction avec cette derniere
    var id = zAffichEspece.options[zAffichEspece.selectedIndex].id;
    getArbre(id);
}

//Evenement lors de sasie d'un caractere dans le champs de recherche des especes
function cherche(catalog) {
    //Appel la methode qui charge tous les produits aveec la valeur des caratere saisie dans la zone de recherche
    searchEspece.addEventListener("keyup", function () {
        afficheEspece(catalog, searchEspece.value);
    })
}

//Fonction d'evenement sur les checkbox du tableau de selection des arbres
function ajoutEventCheckBox(list) {
    //boucle qui crée un evenement lors du click de chacune des checkbox
    for (i = 0; i < list.lesArbres.length; i++) {
        document.getElementById("check" + list.lesArbres[i].id).onclick = function () {
            //Creation d'un objet qui sert à stocker toutes les informations pour la création d'intervention dans la base de données
            var intervention = new Object();
            intervention.idBucheron = zSelBuch.options[zSelBuch.selectedIndex].value;
            intervention.idArbre = this.parentNode.parentNode.childNodes[3].childNodes[0].textContent;
            intervention.espece = zAffichEspece.options[zAffichEspece.selectedIndex].id;
            intervention.hauteurArbre = this.parentNode.parentNode.childNodes[4].childNodes[0].textContent;
            intervention.circonference = this.parentNode.parentNode.childNodes[5].childNodes[0].textContent;
            intervention.secteur = zSelSect.options[zSelSect.selectedIndex].value;
            intervention.latitude = this.parentNode.parentNode.childNodes[6].childNodes[0].textContent;
            intervention.longitude = this.parentNode.parentNode.childNodes[7].childNodes[0].textContent;
            intervention.date = dateSelect;
            intervention.dateUnix = Date.parse(dateSelect);
            //Condition si jamais le stade de developpement n'est pas précisé, rentre la valeur ND pour "Non Définie"
            if (this.parentNode.parentNode.childNodes[8].childNodes[0] == undefined) {
                intervention.stade = "ND";
            } else {
                intervention.stade = this.parentNode.parentNode.childNodes[8].childNodes[0].textContent;
            }
            //Cette condition verrifie si la checkbox où a lieur l'evenement est coché
            //Si oui, appel une fonction pour compléter l'objet intervention
            //Rentre l'intervention une fois compléter entierement dans un tableau
            //Incremente le compteur nbArbreCoche qui sert a verrifier le nombre d'arbre selectionner pour un bucheron
            //Met a jour l'historique
            if (this.checked == true) {
                createDialogBox(this, intervention);
                tableDonne.push(intervention);
                nbArbreCoche++;
                delete intervention;
                var passage = 1;
                historiqueCoche(this, passage);
            }
            //Cette condition verrifie si la checkbox où a lieur l'evenement est décoché
            //Si oui recupere la position de l'intervention décoché dans le tableau et ensuite la supprime de ce tableau
            //Désincremente le compteur nbArbreCoche qui sert a verrifier le nombre d'arbre selectionner pour un bucheron
            //Met a jour l'historique
            if (this.checked == false) {
                var position = tableDonne.indexOf(intervention);
                tableDonne.splice(position, 1);
                nbArbreCoche--;
                delete intervention;
                var passage = 0;
                historiqueCoche(this, passage);
            }
            delete intervention;
            //Appel la fonction de verrification du nombre d'arbre selectionner pour un bucheron
            verrficationNbArbreCoche();
        }
    }
}


//Fin script des élements de selection graphique 
/***********************************************************************************************************/



/*------------------------------------------------------------------------------------------\
|                      Script des différent fonction en lien direct avec php                |
\------------------------------------------------------------------------------------------*/

/*
* file correspond au chemin du fichier php 
* argument correspond au nom sous lequel sera recuperer les informations dans les script php 
* valArgument correspond a la valeur qui sera passer au php
* argumentSup correspond au potentiel ajout au besoin du programme entre le JavaScript et le php
*/


//Fonction qui recupere les différent bucherons
function getBucheron() {
    var file = "include/getBucheron.php"
    var argument = "dateI=";
    var valArgument = document.getElementById('selectD').value;
    var argumentSup = null;
    getAll(zSelBuch, file, argument, valArgument, argumentSup);
}

//Fonction qui recupere la liste d'adresse
function getSecteur() {
    var file = "include/getSecteur.php";
    var argument, valArgument, argumentSup = null;
    getAll(zSelSect, file, argument, valArgument, argumentSup);
}

//Fonction qui recupere les epepce presnte à l'adresse choisi
function getEspece(secteur) {
    var file = "include/getNom.php"
    var argument = "selectSecteur="
    argumentSup = null;
    getAll(searchEspece, file, argument, secteur, argumentSup)
}

//Fonction qui recupere les arbres à l'adresse choisi et à l'espece choisi
function getArbre(id) {
    var fichierPHP = "include/getArbre.php";
    var argument = "selectEspece=";
    var argumentSup = "&selectSecteur=" + zSelSect.options[zSelSect.selectedIndex].value + "&dateSelect=" + document.getElementById('selectD').value;
    getAll(zTableTotal, fichierPHP, argument, id, argumentSup)
}

//Fonction pour AJAX qui communique avec le php pour recuperer les informations sous formats JSON
function getAll(placeHTML, fichierPHP, argument, valArgument, argumentSup) {
    //Condition qui verifie que la zone HTML ne sois pas celle des adresses
    if (placeHTML != zSelSect) {
        placeHTML.innerHTML = "";
    }
    // Construction de la requete
    httpRequest = new XMLHttpRequest();
    // Code s'executant quand la reponse du serveur est arrivee
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            // tout va bien, une reponse a ete recue
            if (httpRequest.status === 200) {
                // Succes
                //Recupération des données sous forme JSON
                var json = JSON.parse(httpRequest.responseText);
                /* Mise de ce résultat dans une autre fonction (ce qui évite d'utiliser la fonction de base 
                 * qui effectue une requette a chaque fois*/
                var file = json;
                //Différentes condition qui verrifie la zone HTML en question
                if (placeHTML == zSelBuch) {
                    cliqueBucheron();
                    afficheBucheron(file);
                }
                if (placeHTML == zSelSect) {
                    afficheSecteur(file);
                }
                if (placeHTML == searchEspece) {
                    searchEspece.hidden = false;
                    zAffichEspece.hidden = false;
                    afficheEspece(file, searchEspece.value);
                } if (placeHTML == zTableTotal) {
                    afficheArbre(file);
                }
            } else {
                alert("Erreur, status : " + httpRequest.status);
                // il y a eu un probleme avec la requete,
                // par exemple la reponse peut etre un code 404 (Non trouvee)
                // ou 500 (Erreur interne au serveur)
            }
        } else {
            // pas encore prete
        }
    };
    // Initialisation et envoi de la requete
    httpRequest.open('POST', fichierPHP, true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //Condition qui fera en sorte d'envoyer les bons arguments en fonction des variables précisé au par avant
    if (argument == null && valArgument == null) {
        httpRequest.send();
    } else if (argumentSup == null) {
        httpRequest.send(argument + escape(valArgument));
    } else {
        httpRequest.send(argument + escape(valArgument) + argumentSup);
    }

}

//Fonction qui envoie les données en JSON au document php qui vas gerer l'insert dans la base de données
function envoieData(data) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response)
        } else {
            console.log("Erreur : problème survenue")
        }
    };

    httpRequest.open("POST", "include/envoieDonne.php", true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpRequest.send("data=" + data);
}


//Fin script des fonction en lien direct avec php
/**********************************************************************************************************************/


/*------------------------------------------------------------------------------------------\
|                Script pour l'affichage des différentes zone plus leur fonction            |
\------------------------------------------------------------------------------------------*/

//Afficahge de la zone de selection des bucherons
function afficheBucheron(listB) {
    //Initilise la varaible de vérrification d'afficahge de la zone de selection des bucherons
    verrif = 0;
    //Initialisation de la variable affiche qui contiendra tout le html a intégrer
    var options = "";
    //Boucle qui parcours la liste des bucherons
    for (var i = 0; i < listB.lesBucherons.length; i++) {
        //Recupération des informations.
        var id = listB.lesBucherons[i].id;
        var nom = listB.lesBucherons[i].nom;
        var prenom = listB.lesBucherons[i].prenom;
        var complet = nom + " " + prenom;
        //ajout du code HTML pour afficher les bucherons dans le select
        options += "<option class='optionSelect' value='" + id + "'>" + complet + "</option>;"
    }
    //Insertion de la variable dans le html
    document.getElementById("selectBuch").innerHTML = options;
}

//Afficahge de la zone de selection de l'adresse
function afficheSecteur(listS) {
    //Rend visible la zone de selection
    zSelSect.hidden = false;
    //Initialisation de la variable affiche qui contiendra tout le html a intégrer
    var options = "";
    //parcours la liste des bucherons
    for (var i = 0; i < listS.lesSecteurs.length; i++) {
        //Recupération des informations.
        var id = listS.lesSecteurs[i].id;
        var libelle = listS.lesSecteurs[i].libelle;
        //ajout du code HTML pour afficher les bucherons dans le select
        options += "<option class='optionSelect' value='" + id + "'>" + libelle + "</option>;"
    }
    //Insertion de la variable dans le html
    zSelSect.innerHTML = options;
}

//Afficahge de la zone de selection de l'espece
function afficheEspece(catalog, saisie) {
    //Appel la fonction qui permet d'avoir les caractere saisie dans la zone de recherche
    cherche(catalog);
    //Initialisation de la variable affiche qui contiendra tout le html a intégrer
    var options = "";
    //Si la zone de saisie n'est pas vide, continue la methode
    if (saisie != "") {
        //Boucle qui parcours la liste des produit
        for (var i = 0; i < catalog.lesNoms.length; i++) {
            //Si la chaine est contenue au début d'un num d'un des elements js, n'affiche que celui ci
            if (catalog.lesNoms[i].libelle.toLowerCase().indexOf(saisie.toLowerCase()) == 0) {
                //Recupération des informations.
                var idEspece = catalog.lesNoms[i].id;
                var libelle = catalog.lesNoms[i].libelle;
                var libelleNoAccent = motSansAccent(catalog.lesNoms[i].libelle);
                //Ajout du code HTML pour afficher les produits dans la variable
                opt = "<option class='optionSelect' id='" + idEspece + "' value=" + libelleNoAccent + ">" + libelle + "</option>;"
                /*Si l'id du produit est différent d'une des valeurs des balise option 
                 * présent dans zlProduit alors ajoute ce dernier dans la variable qui servira pour
                 * integrer le html dans zlProduit*/
                if (zAffichEspece.querySelectorAll("option").value != libelle) {
                    //Incrémenation de la variable
                    options += opt;
                }
            }
        }
        //Insertion de la variable dans le html
        zAffichEspece.innerHTML = options;
    } else {
        //Si la siasie n'est pas vide
        var affiche = "";
        //Boucle qui parcours la liste des noms
        for (var i = 0; i < catalog.lesNoms.length; i++) {
            //Recupération des informations
            var idEspece = catalog.lesNoms[i].id;
            var libelle = catalog.lesNoms[i].libelle;
            var libelleNoAccent = motSansAccent(catalog.lesNoms[i].libelle);
            //ajout du code HTML pour afficher les especes dans la variable
            affiche += "<option class='optionSelect' id='" + idEspece + "' value=" + libelleNoAccent + ">" + libelle + "</option>;"
            //le "+=" veux dire de prendre l'ancien résultat et de l'addition avec le nouveau
        }
        //Insertion dans le html
        zAffichEspece.innerHTML = affiche;
    }

}

//Afficahge de la zone de selection des arbres
function afficheArbre(listA) {
    //Affichage du tableau
    zTableTotal.hidden = false;
    //Initialisation de la variable affiche qui contiendra tout le html a intégrer
    var options = "";
    //Entete en HTML du tableau
    var entete = "<thead><th></th><th>Id Arbre</th><th>Hauteur</th><th>Circonférence</th><th>Latitude</th><th>Longitude</th><th>Stade Devellopemment</th></thead>";
    //Remplie le tableau a vide
    zTableTotal.innerHTML = options;
    //Boucle qui parcours la liste des bucherons
    for (var i = 0; i < listA.lesArbres.length; i++) {
        //Recupération des informations.
        var id = listA.lesArbres[i].id;
        var hauteur = listA.lesArbres[i].hauteurEnM;
        var circonference = listA.lesArbres[i].circonferenceEnCm;
        var latitude = listA.lesArbres[i].latitude;
        var longitude = listA.lesArbres[i].longitude;
        var stade = listA.lesArbres[i].stadeDeveloppement;
        //ajout du code HTML pour afficher les bucherons dans le select
        options += "<tr class='ligne'> <td><input type='checkbox' class='checkTableau' id='check" + id + "'></td> <td>" + id + "</td><td>" + hauteur + "</td><td>" + circonference + "</td><td>" + latitude + "</td><td>" + longitude + "</td><td>" + stade + "</td> </tr>";
    }
    //Insertion de la variable dans le html
    zTableTotal.innerHTML = entete + options;
    //Appel la fonction qui verrifie si l'une des coches n'as pas déjà été coché au par avant
    //Appel de la fonction pour l'ajout d'un evenement sur les checkbox du tableau
    remiseDesDonnes(listA);
    ajoutEventCheckBox(listA);
}


//Fin script pour l'affichage des différentes zone plus leur fonction
/***********************************************************************************************************************/


/*------------------------------------------------------------------------------------------\
|                Script pour la Pop Up de la selection d'action sur les arbres              |
\------------------------------------------------------------------------------------------*/

//Fonction de creation d'une pop-up pour la selection d'action a effectuer sur l'arbre selectionner
function createDialogBox(check, intervention) {
    //Code qui crée la pop-up
    var modalContainer = document.createElement('div');
    modalContainer.setAttribute('id', 'modal');
    var dialogbox = document.createElement('div');
    dialogbox.className = 'dialogBox';
    dialogbox.innerHTML = "<p>Selectionner les actions à effectuer sur l'arbre</p>";
    dialogbox.innerHTML += '<input type="checkbox" class="choixAction" value="mesure phytosanitaire"/> mesure phytosanitaire <br/>'
    dialogbox.innerHTML += '<input type="checkbox" class="choixAction" value="plantation"/> plantation <br/>'
    dialogbox.innerHTML += '<input type="checkbox" class="choixAction" value="transplantation"/> transplantation <br/>'
    dialogbox.innerHTML += '<input type="checkbox" class="choixAction" value="elagage"/> élagage <br/>'
    dialogbox.innerHTML += '<input type="checkbox" class="choixAction" value="arrosage fertilisation"/> arrosage et fertilisation <br/>'
    dialogbox.innerHTML += '<input type="checkbox" class="choixAction" value="traitements"/> traitements <br/>'
    dialogbox.innerHTML += "<input type='checkbox' class='choixAction' value='intervention urgence'/> intervention d' urgence <br/>"
    dialogbox.innerHTML += '<input type="checkbox" class="choixAction" value="gestion abattages"/> gestion des abattages <br/>'
    dialogbox.innerHTML += '<input type="checkbox" class="choixAction" value="dessouchage"/> dessouchage <br/>'
    dialogbox.innerHTML += "<input type='checkbox' class='choixAction' value='fouilles'/> fouilles d'arbres <br/>"
    dialogbox.innerHTML += '<button id="modal-submit">Valider</button>';
    dialogbox.innerHTML += '<button id="modal-close">Annuler</button>';
    modalShow(modalContainer, dialogbox, check, intervention);
}

//Fonction d'affichage et de mise en place des bouttons pour la Pop Up
function modalShow(modalContainer, dialogbox, check, intervention) {
    //Affiche la pop up
    modalContainer.appendChild(dialogbox);
    document.body.appendChild(modalContainer);

    //Evenement si appuie sur le bouton annuler de la pop up
    //Met aussi a jour l'historique
    document.getElementById('modal-close').addEventListener('click', function () {
        //Variable qui sert a identifier d'ou vients la fermeture
        var call = 0
        modalClose(modalContainer, check, intervention, call);
        historiqueCoche(check, call);
    });

    //Evenement lors de l'appuie du boutton Valider
    if (document.getElementById('modal-submit')) {
        document.getElementById('modal-submit').addEventListener('click', function () {
            recupCheckedBox(modalContainer, intervention, check);
        });
    }
}

//Fonction qui recupere les checkbox choisi dans la pop up
function recupCheckedBox(modalContainer, intervention, check) {
    var action = ""
    var listCheck = document.querySelectorAll(".choixAction");
    for (i = 0; i < listCheck.length; i++) {
        if (listCheck[i].checked == true) {
            action += "-" + listCheck[i].value;
        }
    }

    //Condition qui verrifie si il y a des checkbox coché
    //Si il n'y en a pas supprime et réaffiche la pop-up et avertie l'utilisateur qu'il n'as pas selectionner d'option
    if (action == "") {
        alert("Veuillez selectionner au moins une option");
        var call = 1;
        modalClose(modalContainer, check, intervention, call);
        createDialogBox(check, intervention);
    } else {
        //Attribut a l'intervention les taches qui doivent être effectuer et supprime la pop-ip
        intervention.tache = action;
        modalClose(modalContainer);
    }
}

//Fonction pour supprimer la pop-up
function modalClose(modalContainer, check, intervention, call) {
    //Si jamais l'appel ce fait depuis le bouton annuler effctue le code du call = 0
    if (call == 0) {
        //Recupere la checkbox coché, la décoche, supprimer l'intervention crée et désincrémente le compteur
        document.getElementById(check.id).checked = false;
        var position = tableDonne.indexOf(intervention);
        tableDonne.splice(position, 1);
        nbArbreCoche--;
    }
    while (modalContainer.hasChildNodes()) {
        //Supprime tout les enfants du conteneur de la pop up
        modalContainer.removeChild(modalContainer.firstChild);
    }
    //Supprime le conteneur de la pop up
    document.body.removeChild(modalContainer);
}

//Fin scirpt pour la Pop Up
/*******************************************************************************************************************/


/*------------------------------------------------------------------------------------------\
|              Script lier au compteur du nombre d'abre choisi pour l'intervention          |
\------------------------------------------------------------------------------------------*/


//Fonction qui verrifie le nombre de d'arbre coché et effectue des actions par rapport au compteur
function verrficationNbArbreCoche() {
    dateSelect = document.getElementById('selectD').value;
    var date = Date.now();
    //Condition qui gere si jamais la date est changer pendant la selection pour remettre a zero le compteur
    if (Date.parse(dateSelect) < date) {
        if (document.getElementById("paraphCoche") != undefined) { document.getElementById("paraphCoche").remove(); }
        if (document.getElementById("btnValider") != undefined) { document.getElementById("btnValider").remove(); }
        //Appel une fonction pour crée un message sur la page
        createMsg();
    } else {
        //Si la date est valide et que le message crée n'est pas sur la page alors suit le programme
        if (document.getElementById("titreOverDate") != undefined) { document.getElementById("titreOverDate").remove(); }
        //Verifie si le compteur est compris entre 10 et 16
        if (nbArbreCoche >= 10 && nbArbreCoche <= 16) {
            //Verrifie si le paragraphe est present sur la page si oui l'enleve
            if (document.getElementById("paraphCoche") != null) {
                document.getElementById("paraphCoche").remove()
            }
            //Si le boutton d'envoie n'existe pas encore alors appel la fonction qui le crée
            if (document.getElementById("btnValider") == null) {
                createBtn()
            }
            //Si le compteur n'est pas entre 10 et 16 alors suit le else
        } else {
            //Si le bouton est présent sur la page alors le supprime
            if (document.getElementById("btnValider") != null) {
                document.getElementById("btnValider").remove();
                //Si le paragraphe n'existe pas encore alors appel la fonction qui le crée
                if (document.getElementById("paraphCoche") == null) {
                    createParaph();
                }
                //Si le bouton n'est pas présent sur la page alors appel la fonction pour crée le paragraphe
            } else {
                if (document.getElementById("paraphCoche") == null) {
                    createParaph();
                }
            }
        }
    }
}

//Fonction pour crée un message pour prevenir que la date selectionner n'est pas valide et donc empecher l'envoie des informations
function createMsg() {
    console.log("titreOverDate")
    if (document.getElementById("titreOverDate") != null) {
        var h = document.createElement("h3");
        h.id = "titreOverDate";
        h.appendChild(document.createTextNode("SELECTIONNER UNE DATE VALIDE"))
        document.getElementById("formAffect").appendChild(h);
    }
}

//Fonction pour crée un paragraphe informant que l'utilisateur doit selectionner entre 10 et 16 arbre
function createParaph() {
    var p = document.createElement("p");
    p.id = "paraphCoche";
    p.appendChild(document.createTextNode("Veuillez choisir entre 10 et 16 Arbres"));
    document.getElementById("formAffect").appendChild(p);
}

//Fonction qui crée le bouton d'envoie des données
function createBtn() {
    const btn = document.createElement("input");
    btn.type = "submit";
    btn.id = "btnValider";
    btn.value = "VALIDER"
    //Evenement lors du click pour mettre les donneés en format JSON et appeller la fonction envoieData avec en parametre les données en JSON
    btn.onclick = function () {
        table = new Array(tableDonne.length)
        for (i = 0; i < tableDonne.length; i++) {
            table[i] = tableDonne[i];
        }
        //JSON.stringify permet de mettre en format JSON le parametre passer
        data = JSON.stringify(tableDonne);
        envoieData(data);
    }
    create = document.getElementById("formAffect").appendChild(btn);
}

//Fin script lier au compteur du nombre d'abre choisi pour l'intervention
/******************************************************************************************************************************/


/*------------------------------------------------------------------------------------------\
|            Script de fonction basique pour le bon fonctionnement de l'application         |
\------------------------------------------------------------------------------------------*/


//Fonction qui permet de remettre a zero les checkebox du tableau coché et remet a zero le tableau contenant les données pour les intervention
function remiseZeroCoche() {
    tableDonne = [];
    historique = [];
    //Effectue la remise a zero seulement si il y a des elements coché
    if (document.querySelectorAll(".checkTableau").length != 0) {
        var listCheckTable = document.querySelectorAll(".checkTableau")
        for (i = 0; i < listCheckTable.length; i++) {
            if (listCheckTable[i].checked == true) {
                listCheckTable[i].checked = false;
                nbArbreCoche = 0;
                //Appel de la fonction de veriffication pour empecher l'envoie des donneés par le boutton si jamais il était afficher
                verrficationNbArbreCoche();
            }
        }
    }
}

//Fonction qui sert a garder en memoire quelle sont les arbres selectionner
function historiqueCoche(check, passage) {
    //La variable passage défini si la checkbox a était coché ou décoché
    if (passage == 1) {
        historique.push(check.id);
        check.parentNode.parentNode.classList.remove("ligne");
        check.parentNode.parentNode.classList.add("selectionnerArbre");
    }
    if (passage == 0) {
        var position = historique.indexOf(check);
        historique.splice(position, 1);
        check.parentNode.parentNode.classList.remove("selectionnerArbre");
        check.parentNode.parentNode.classList.add("ligne");
    }
}

//Fonction qui parcours les différentes checkbox pour voir si elles sont contenu dans l'historique
//Si oui alors coche la case 
function remiseDesDonnes() {
    if (document.querySelectorAll(".checkTableau").length != 0) {
        var listCheckTable = document.getElementsByClassName("checkTableau");
        for (i = 0; i<listCheckTable.length; i++) {
            if(historique.includes(listCheckTable[i].id)) {
                listCheckTable[i].parentNode.parentNode.classList.add("selectionnerArbre");
                listCheckTable[i].checked = true;
            }
        }
    }
}

//Fonction pour enlever les accent d'une chaine de caractere passer en parametre
function motSansAccent(mot) {
    var accent = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];
    var noaccent = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];

    var str = mot;
    for (var i = 0; i < accent.length; i++) {
        str = str.replace(accent[i], noaccent[i]);
    }
    return str;
}