import { UneInf, LesInfs } from "../modele/data_infraction";
import { LesConduct } from "../modele/data_conducteur";
import { LesVehic } from "../modele/data_vehicule";
import { UnTypDelitByInf, LesTypeDelsByInf, LesTypDelit } from "../modele/data_delit";
var VueInfEdit = /** @class */ (function () {
    function VueInfEdit() {
    }
    Object.defineProperty(VueInfEdit.prototype, "form", {
        get: function () { return this._form; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VueInfEdit.prototype, "params", {
        get: function () { return this._params; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VueInfEdit.prototype, "grille", {
        get: function () { return this._grille; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VueInfEdit.prototype, "erreur", {
        get: function () { return this._erreur; },
        enumerable: false,
        configurable: true
    });
    VueInfEdit.prototype.initMsgErreur = function () {
        // les erreurs "champ vide", "valeur inconnue", "doublon"
        //sont les trois principales erreurs dans un formulaire
        // pour chaque champ à contrôler (événement onChange),
        //création des 3 messages d'erreur + message pour correct
        // avec chaîne vide si pas d'erreur générée pour un type d'erreur potentielle
        this._erreur = {
            edtNum: {
                statut: 'vide',
                msg: {
                    correct: "",
                    vide: "Le numéro d'infraction doit être renseigné.",
                    inconnu: "Le numéro ne peut contenir que des chiffres.",
                    doublon: "Le numéro d'infraction est déjà attribué."
                }
            },
            edtPermos: {
                statut: 'correct',
                msg: {
                    correct: "",
                    vide: "",
                    inconnu: "",
                    doublon: ""
                }
            }, edtPermis: {
                statut: 'correct',
                msg: {
                    correct: "",
                    vide: "",
                    inconnu: "conducteur inconnu",
                    doublon: ""
                }
            },
            delit: {
                statut: 'vide',
                msg: {
                    correct: "",
                    vide: "L'infraction doit contenir au moins un délit.",
                    inconnu: "",
                    doublon: ""
                }
            },
            listeDelit: {
                statut: 'vide',
                msg: {
                    correct: "",
                    vide: "Aucun délit choisi",
                    inconnu: "",
                    doublon: ""
                }
            },
            edtImmat: {
                statut: 'vide',
                msg: {
                    correct: "",
                    vide: "Le numéro d'immatriculation doit etre renseigné",
                    inconnu: "véhicule inconnu",
                    doublon: ""
                }
            },
            edtProprio: {
                statut: 'vide',
                msg: {
                    correct: "",
                    vide: "",
                    inconnu: "",
                    doublon: ""
                }
            },
            edtDel: {
                statut: 'vide',
                msg: {
                    correct: "",
                    vide: "L'infraction doit contenir au moins un délit",
                    inconnu: "",
                    doublon: ""
                }
            },
            edtDate: {
                statut: 'vide',
                msg: {
                    correct: "",
                    vide: "Une infraction doit avoir une date associée",
                    inconnu: "",
                    doublon: "La date d'infraction doit être antérieure ou égale à la date du jour"
                }
            }
        };
    };
    VueInfEdit.prototype.init = function (form) {
        var _this = this;
        this._form = form;
        this._params = location.search.substring(1).split('&');
        // params[0] : mode affi, modif, suppr, ajout
        // params[1] : id en mode affi, modif, suppr
        this.form.divInfDelEdit.hidden = true;
        this.initMsgErreur();
        var titre;
        switch (this.params[0]) {
            case 'suppr':
                titre = "Suppression d'une infraction";
                break;
            case 'ajout':
                titre = "Nouvelle infraction";
                break;
            case 'modif':
                titre = "Modification d'une infraction";
                break;
            default: titre = "Détail d'une infraction";
        }
        this.form.divTitre.textContent = titre;
        var lesInfs = new LesInfs;
        var affi = this.params[0] === 'affi';
        if (this.params[0] !== 'ajout') { // affi ou modif ou suppr
            var inf = lesInfs.byIdInf(this._params[1]);
            this.form.edtNum.value = inf.id_inf;
            this.form.edtDate.value = inf.date_inf;
            this.form.edtImmat.value = inf.no_immat;
            this.form.edtPermis.value = inf.no_permis;
            this.form.edtNum.readOnly = true;
            this.form.edtDate.readOnly = true;
            this.form.edtImmat.readOnly = affi;
            this.form.edtPermis.readOnly = affi;
            this.erreur.edtNum.statut = "correct";
            this.detailPermis(inf.no_permis);
            this.detailProprio(inf.no_immat);
            this.detailVehicule(inf.no_immat);
        }
        this.affiDelit();
        if (this.params[0] === 'suppr') {
            // temporisation 1 seconde pour afficher les données de la salle avant demande de confirmation de la supression
            setTimeout(function () { _this.supprimer(_this.params[1]); }, 1000);
        }
        else if (this.params[0] === 'ajout') {
            var lesinfs = new LesInfs;
            this.form.edtNum.readOnly = true;
            var swit = 0;
            var chaine = void 0;
            while (swit !== 1) {
                var num = Math.floor(Math.random() * 100);
                chaine = String(num).trim();
                if (!lesInfs.idExiste(chaine)) {
                    swit = 1;
                }
            }
            this.form.edtNum.value = chaine;
            var date = new Date();
            var mydate = String(date.getFullYear() + "-" + ("0" + ((date.getMonth() + 1).toString().slice(-2))) + "-" + date.getDate());
            this.form.edtDate.value = mydate;
        }
        this.form.btnRetour.hidden = !affi;
        this.form.btnValider.hidden = affi;
        this.form.btnAnnuler.hidden = affi;
        this.form.btnAjouterDelit.hidden = affi;
        // définition des événements
        this.form.edtPermis.onchange = function () {
            vueInfEdit.detailPermis(vueInfEdit.form.edtPermis.value);
        };
        this.form.edtImmat.onchange = function () {
            vueInfEdit.detailVehicule(vueInfEdit.form.edtImmat.value);
            vueInfEdit.detailProprio(vueInfEdit.form.edtImmat.value);
        };
        this.form.btnRetour.onclick = function () { vueInfEdit.retourClick(); };
        this.form.btnAnnuler.onclick = function () { vueInfEdit.retourClick(); };
        this.form.btnValider.onclick = function () { vueInfEdit.validerClick(); };
        this.form.btnAjouterDelit.onclick = function () { vueInfEdit.ajouterDelitClick(); };
        this.form.btnValiderDelit.onclick = function () { vueInfEdit.validerDelitClick(); };
        this.form.btnAnnulerDelit.onclick = function () { vueInfEdit.annulerDelitClick(); };
    };
    VueInfEdit.prototype.detailProprio = function (immat) {
        var err = this.erreur.edtProprio;
        var lesVehic = new LesVehic;
        var permis = lesVehic.byNoImmat(immat).no_permis;
        var lesConduct = new LesConduct;
        var detail = this.form.lblDetailProprio;
        detail.textContent = "";
        err.statut = "correct";
        var chaine = permis.trim();
        if (chaine.length > 0) {
            var permos = lesConduct.byNoPermis(chaine);
            if (permos.no_permis !== "") {
                var permosdate = new Date(permos.date_permis).toLocaleDateString("fr");
                detail.textContent
                    = "Propriétaire : \r\n" + permos.nom + " " + permos.prenom + "\r\n" + "Permis obtenu le : " + permosdate;
            }
            else {
                err.statut = 'inconnu';
                detail.textContent = err.msg.inconnu;
            }
        }
        else
            err.statut = 'vide';
    };
    VueInfEdit.prototype.detailVehicule = function (immat) {
        var err = this.erreur.edtImmat;
        var lesVehic = new LesVehic;
        var detail = this.form.lblDetailVehic;
        detail.textContent = "";
        err.statut = "correct";
        var chaine = immat.trim();
        if (chaine.length > 0) {
            var veh = lesVehic.byNoImmat(chaine);
            if (veh.no_immat !== "") { // département trouvé
                var vehicDate = new Date(veh.date_immat).toLocaleDateString("fr");
                detail.textContent
                    = veh.marque + " " + veh.modele + "\r\n" + "immatriculé le  : " + vehicDate;
            }
            else {
                err.statut = 'inconnu';
                detail.textContent = err.msg.inconnu;
            }
        }
        else
            err.statut = 'vide';
    };
    VueInfEdit.prototype.detailPermis = function (permis) {
        var err = this.erreur.edtPermis;
        var lesConduct = new LesConduct;
        var detail = this.form.lblDetailPermis;
        detail.textContent = "";
        err.statut = "correct";
        var chaine = permis.trim();
        if (chaine.length > 0) {
            var permos = lesConduct.byNoPermis(chaine);
            if (permos.no_permis !== "") { // département trouvé
                var permosdate = new Date(permos.date_permis).toLocaleDateString("fr");
                detail.textContent
                    = permos.nom + " " + permos.prenom + "\r\n" + "Permis obtenu le : " + permosdate;
            }
            else {
                err.statut = 'inconnu';
                detail.textContent = err.msg.inconnu;
            }
        }
        else
            err.statut = 'vide';
    };
    VueInfEdit.prototype.affiDelit = function () {
        var lesTypdelByinf = new LesTypeDelsByInf();
        this._grille = lesTypdelByinf.byNumInf(this.params[1]);
        this.affiGrilleDelit();
    };
    VueInfEdit.prototype.affiGrilleDelit = function () {
        while (this.form.tableDelit.rows.length > 1) {
            this.form.tableDelit.rows[1].remove();
        }
        var total = 0;
        var _loop_1 = function (id) {
            var untypdelbyinf = this_1.grille[id];
            var tr = this_1.form.tableDelit.insertRow();
            tr.insertCell().textContent = untypdelbyinf.unTypDel.nature;
            tr.insertCell().textContent = untypdelbyinf.unTypDel.tarif + " € ";
            var affi = this_1.params[0] === 'affi';
            if (!affi) {
                var balisea = void 0; // déclaration balise <a>
                // création balise <a> pour appel suppression équipement dans salle
                balisea = document.createElement("a");
                balisea.classList.add('img_corbeille');
                balisea.onclick = function () { vueInfEdit.supprimerDelitClick(id); };
                tr.insertCell().appendChild(balisea);
            }
            total += Number(untypdelbyinf.unTypDel.tarif);
        };
        var this_1 = this;
        for (var id in this._grille) {
            _loop_1(id);
        }
        this.form.lblTotal.textContent = total.toString() + " € ";
    };
    VueInfEdit.prototype.supprimer = function (idInf) {
        if (confirm("Confirmez-vous la suppression de l'infraction n°" + idInf + " ?")) {
            var lestypdelbyinf = new LesTypeDelsByInf();
            lestypdelbyinf["delete"](idInf); // suppression dans la base des equipements de la salle
            var lesInfs = new LesInfs;
            lesInfs["delete"](idInf); // suppression dans la base de la salle
        }
        this.retourClick();
    };
    VueInfEdit.prototype.verifNum = function (valeur) {
        var lesInfs = new LesInfs;
        var err = this.erreur.edtNum;
        err.statut = "correct";
        var chaine = valeur.trim();
        if (chaine.length > 0) {
            if (!chaine.match(/^([a-zA-Z0-9]+)$/)) {
                // expression régulière qui teste si la chaîne ne contient rien d'autre
                // que des caractères alphabétiques minuscules ou majuscules et des chiffres
                this.erreur.edtNum.statut = 'inconnu';
            }
            else if ((this.params[0] === 'ajout') && (lesInfs.idExiste(chaine))) {
                this.erreur.edtNum.statut = 'doublon';
            }
        }
        else
            err.statut = 'vide';
    };
    VueInfEdit.prototype.verifImmat = function (valeur) {
        var err = this.erreur.edtImmat;
        err.statut = "correct";
        var chaine = valeur.trim();
        if (chaine.length === 0) {
            err.statut = 'vide';
        }
    };
    VueInfEdit.prototype.verifDate = function (valeur) {
        var err = this.erreur.edtDate;
        err.statut = "correct";
        var chaine = valeur.trim();
        if (chaine.length === 0) {
            err.statut = 'vide';
        }
        else if (chaine > String(new Date().getFullYear() + "-" + ("0" + ((new Date().getMonth() + 1).toString().slice(-2))) + "-" + new Date().getDate())) {
            err.statut = 'doublon';
        }
    };
    VueInfEdit.prototype.traiteErreur = function (uneErreur, zone) {
        var correct = true;
        zone.textContent = "";
        if (uneErreur.statut !== "correct") { // non correct ==> erreur
            if (uneErreur.msg[uneErreur.statut] !== '') { // erreur
                zone.textContent = uneErreur.msg[uneErreur.statut];
                correct = false;
            }
        }
        return correct;
    };
    VueInfEdit.prototype.validerClick = function () {
        var correct = true;
        this.verifNum(this._form.edtNum.value);
        this.verifDate(this._form.edtDate.value);
        this.verifImmat(this._form.edtImmat.value);
        if (JSON.stringify(this.grille) === '{}') {
            this._erreur.edtDel.statut = 'vide';
        }
        else
            this._erreur.edtDel.statut = "correct";
        correct = this.traiteErreur(this._erreur.edtDel, this.form.lblDelitErreur) && correct;
        correct = this.traiteErreur(this._erreur.edtNum, this.form.lblNumErreur) && correct;
        correct = this.traiteErreur(this._erreur.edtDate, this.form.lblDateErreur) && correct;
        correct = this.traiteErreur(this._erreur.edtImmat, this.form.lblImmatErreur) && correct;
        correct = this.traiteErreur(this._erreur.edtPermos, this.form.lblPermisErreur) && correct;
        var lesInfs = new LesInfs;
        var inf = new UneInf;
        if (correct) {
            inf.id_inf = this.form.edtNum.value;
            inf.date_inf = this.form.edtDate.value;
            inf.no_immat = this.form.edtImmat.value;
            inf.no_permis = this.form.edtPermis.value;
            if (this._params[0] === 'ajout') {
                lesInfs.insert(inf);
            }
            else {
                lesInfs.update(inf);
            }
            var lestypdelbyinf = new LesTypeDelsByInf;
            lestypdelbyinf["delete"](inf.id_inf);
            lestypdelbyinf.insert(inf.id_inf, this.grille);
            this.retourClick();
        }
    };
    VueInfEdit.prototype.retourClick = function () {
        location.href = "inf_liste.html";
    };
    // gestion des équipements de la salle
    VueInfEdit.prototype.modifierDelitClick = function (id) {
        this.afficherDelitEdit();
        var lestypdel = new LesTypDelit();
        var untypdel = lestypdel.byIdDelit(id);
        this.form.listeDelit.length = 0;
        this.form.listeDelit.options.add(new Option(untypdel.nature, id)); // text, value = 0;
        this.form.listeDelit.selectedIndex = 0;
    };
    VueInfEdit.prototype.ajouterDelitClick = function () {
        this.afficherDelitEdit();
        // réinitialiser la liste des délits à choisir
        this.form.listeDelit.length = 0;
        var lestypdel = new LesTypDelit;
        var data = lestypdel.all();
        var idDel = [];
        for (var i in this._grille) {
            idDel.push(this._grille[i].unTypDel.id_delit);
        }
        for (var i in data) {
            var id = data[i].id_delit;
            if (idDel.indexOf(id) === -1) { // pas dans la liste des délits déjà dans l'infraction
                this._form.listeDelit.options.add(new Option(data[i].nature, id)); // text, value
            }
        }
    };
    VueInfEdit.prototype.supprimerDelitClick = function (id) {
        if (confirm("Confirmez-vous le retrait du délit de l'infraction ")) {
            delete (this._grille[id]);
            this.affiGrilleDelit();
        }
    };
    VueInfEdit.prototype.afficherDelitEdit = function () {
        this.form.divInfDelEdit.hidden = false;
        this.form.divDetail.style.pointerEvents = 'none';
        this.form.divInfDelEdit.style.pointerEvents = 'auto';
        this.form.btnAjouterDelit.hidden = true;
        this.form.btnAnnuler.hidden = true;
        this.form.btnValider.hidden = true;
    };
    VueInfEdit.prototype.cacherDelitEdit = function () {
        this.form.divInfDelEdit.hidden = true;
        this.form.divDetail.style.pointerEvents = 'auto';
        this.form.btnAjouterDelit.hidden = false;
        this.form.btnAnnuler.hidden = false;
        this.form.btnValider.hidden = false;
    };
    VueInfEdit.prototype.verifListeDelit = function () {
        var err = this._erreur.listeDelit;
        err.statut = "correct";
        var cible = this._form.listeDelit;
        if (cible.value === "") {
            err.statut = 'vide';
        }
    };
    VueInfEdit.prototype.validerDelitClick = function () {
        var correct = true;
        this.verifListeDelit();
        correct = this.traiteErreur(this._erreur.listeDelit, this.form.lblSelectDelitErreur) && correct;
        //correct = this.traiteErreur(this._erreur.edtQte, this.form.lblQteErreur) && correct;
        if (correct) {
            var lestypdel = new LesTypDelit;
            // ajout visuel de la ligne dans la grille tabulaire de la liste des équipements d'une salle
            var untypdel = lestypdel.byIdDelit(this._form.listeDelit.value);
            var untypdelbyinf = new UnTypDelitByInf(untypdel);
            this._grille[untypdel.id_delit] = untypdelbyinf;
            this.affiGrilleDelit();
            this.annulerDelitClick();
        }
    };
    VueInfEdit.prototype.annulerDelitClick = function () {
        this.cacherDelitEdit();
    };
    return VueInfEdit;
}());
var vueInfEdit = new VueInfEdit;
export { vueInfEdit };
//# sourceMappingURL=class_inf_edit.js.map