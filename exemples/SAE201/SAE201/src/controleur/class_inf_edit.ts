import { UneInf, LesInfs } from "../modele/data_infraction"
import { UnConduct, LesConduct } from "../modele/data_conducteur"
import { unVehic, LesVehic } from "../modele/data_vehicule"
import {
    UnTypDelitByInf, LesTypeDelsByInf, TTypDelByInf, UnTypDelit,
    LesTypDelit
} from "../modele/data_delit"
type TStatutValeur = 'correct' | 'vide' | 'inconnu' | 'doublon'
type TErreur = { statut: TStatutValeur, msg: { [key in TStatutValeur]: string } }
type TinfEditForm = {
    divDetail: HTMLElement, divTitre: HTMLElement
    , edtNum: HTMLInputElement, edtDate: HTMLInputElement
    , edtImmat: HTMLInputElement, edtPermis: HTMLInputElement
    , btnRetour: HTMLInputElement, btnValider: HTMLInputElement, btnAnnuler: HTMLInputElement
    , lblDetailVehic: HTMLLabelElement, lblDetailProprio: HTMLLabelElement, lblDetailPermis: HTMLLabelElement
    , lblNumErreur: HTMLLabelElement, lblImmatErreur: HTMLLabelElement, lblDateErreur : HTMLLabelElement, lblPermisErreur : HTMLLabelElement, lblDelitErreur : HTMLLabelElement
    , divInfDelit: HTMLDivElement, divInfDelEdit: HTMLDivElement
    , btnAjouterDelit: HTMLInputElement
    , lblTotal: HTMLLabelElement, tableDelit: HTMLTableElement
    , listeDelit: HTMLSelectElement
    , btnValiderDelit: HTMLInputElement, btnAnnulerDelit: HTMLInputElement
    , lblSelectDelitErreur: HTMLLabelElement
}
class VueInfEdit {
    private _form: TinfEditForm
    private _params: string[]; // paramètres reçus par le fichier HTML
    // tel que params[0] : mode affi, modif, suppr, ajout
    // params[1] : id en mode affi, modif, suppr
    private _grille: TTypDelByInf; // tableau des équipements de la salle
    private _erreur: {
        // tableau contenant les messages d'erreur pour chaque type d'erreur pour chaque zone de saisie à vérifier
        [key: string]: TErreur
    }
    get form(): TinfEditForm { return this._form }
    get params(): string[] { return this._params }
    get grille(): TTypDelByInf { return this._grille }
    get erreur(): { [key: string]: TErreur } { return this._erreur }
    initMsgErreur(): void {
        // les erreurs "champ vide", "valeur inconnue", "doublon"
        //sont les trois principales erreurs dans un formulaire
        // pour chaque champ à contrôler (événement onChange),
        //création des 3 messages d'erreur + message pour correct
        // avec chaîne vide si pas d'erreur générée pour un type d'erreur potentielle
        this._erreur = {
            edtNum: {
                statut: 'vide'
                , msg: {
                    correct: ""
                    , vide: "Le numéro d'infraction doit être renseigné."
                    , inconnu: "Le numéro ne peut contenir que des chiffres."
                    , doublon: "Le numéro d'infraction est déjà attribué."
                }
            }
            , edtPermos: {
                statut: 'correct'
                , msg: {
                    correct: ""
                    , vide: ""
                    , inconnu: ""
                    , doublon: ""
                }
            },edtPermis: {
                statut: 'correct'
                , msg: {
                    correct: ""
                    , vide: ""
                    , inconnu: "conducteur inconnu"
                    , doublon: ""
                }
            }
            , delit: {
                statut: 'vide'
                , msg: {
                    correct: ""
                    , vide: "L'infraction doit contenir au moins un délit."
                    , inconnu: ""
                    , doublon: ""
                }
            }
            , listeDelit: {
                statut: 'vide'
                , msg: {
                    correct: ""
                    , vide: "Aucun délit choisi"
                    , inconnu: ""
                    , doublon: ""
                }
            },
            edtImmat: {
                statut: 'vide'
                , msg: {
                    correct: ""
                    , vide: "Le numéro d'immatriculation doit etre renseigné"
                    , inconnu: "véhicule inconnu"
                    , doublon: ""
                }
            },
            edtProprio: {
                statut: 'vide'
                , msg: {
                    correct: ""
                    , vide: ""
                    , inconnu: ""
                    , doublon: ""
                }
            },
            edtDel: {
                statut: 'vide'
                , msg: {
                    correct: ""
                    , vide: "L'infraction doit contenir au moins un délit"
                    , inconnu: ""
                    , doublon: ""
                }
            },
            edtDate: {
                statut: 'vide'
                , msg: {
                    correct: ""
                    , vide: "Une infraction doit avoir une date associée"
                    , inconnu: ""
                    , doublon: "La date d'infraction doit être antérieure ou égale à la date du jour"
                }
            }
        }
    }
    init(form: TinfEditForm): void {
        this._form = form;
        this._params = location.search.substring(1).split('&');
        // params[0] : mode affi, modif, suppr, ajout
        // params[1] : id en mode affi, modif, suppr
        this.form.divInfDelEdit.hidden = true;
        this.initMsgErreur();
        let titre: string;
        switch (this.params[0]) {
            case 'suppr': titre = "Suppression d'une infraction"; break;
            case 'ajout': titre = "Nouvelle infraction"; break;
            case 'modif': titre = "Modification d'une infraction"; break;
            default: titre = "Détail d'une infraction";
        }
        this.form.divTitre.textContent = titre;
        const lesInfs = new LesInfs;
        const affi = this.params[0] === 'affi';
        if (this.params[0] !== 'ajout') { // affi ou modif ou suppr
            const inf = lesInfs.byIdInf(this._params[1]);
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
            setTimeout(() => { this.supprimer(this.params[1]) }, 1000);
        }
        else if (this.params[0] === 'ajout' ){
            const lesinfs = new LesInfs;
            this.form.edtNum.readOnly = true;
            let swit = 0;
            let chaine : string;
            while ( swit !== 1 ){
                let num = Math.floor(Math.random() * 100);
                chaine = String(num).trim();
                if(!lesInfs.idExiste(chaine)) {
                    swit = 1;
                }
            }
            this.form.edtNum.value = chaine;
            let date = new Date() ;
            let mydate = String(date.getFullYear()+ "-" + ("0" +((date.getMonth() + 1).toString().slice(-2))) + "-" + date.getDate());
            this.form.edtDate.value = mydate ;
        }
        this.form.btnRetour.hidden = !affi;
        this.form.btnValider.hidden = affi;
        this.form.btnAnnuler.hidden = affi;
        this.form.btnAjouterDelit.hidden = affi;
        // définition des événements
        this.form.edtPermis.onchange = function (): void {
            vueInfEdit.detailPermis(vueInfEdit.form.edtPermis.value);
        }
        this.form.edtImmat.onchange = function (): void {
            vueInfEdit.detailVehicule(vueInfEdit.form.edtImmat.value);
            vueInfEdit.detailProprio(vueInfEdit.form.edtImmat.value);
        }
        this.form.btnRetour.onclick = function (): void { vueInfEdit.retourClick(); }
        this.form.btnAnnuler.onclick = function (): void { vueInfEdit.retourClick(); }
        this.form.btnValider.onclick = function (): void { vueInfEdit.validerClick(); }
        this.form.btnAjouterDelit.onclick = function (): void { vueInfEdit.ajouterDelitClick(); }
        this.form.btnValiderDelit.onclick = function (): void { vueInfEdit.validerDelitClick(); }
        this.form.btnAnnulerDelit.onclick = function (): void { vueInfEdit.annulerDelitClick(); }
    }
    detailProprio(immat: string): void {
        const err = this.erreur.edtProprio
        const lesVehic = new LesVehic;
        const permis = lesVehic.byNoImmat(immat).no_permis;
        const lesConduct = new LesConduct;
        const detail = this.form.lblDetailProprio;
        detail.textContent = "";
        err.statut = "correct";
        const chaine: string = permis.trim();
        if (chaine.length > 0) {
            const permos: UnConduct = lesConduct.byNoPermis(chaine);
            if (permos.no_permis !== "") {
                let permosdate = new Date(permos.date_permis).toLocaleDateString("fr");
                detail.textContent
                    = "Propriétaire : \r\n" + permos.nom + " " + permos.prenom + "\r\n" + "Permis obtenu le : " + permosdate;
            }
            else {
                err.statut = 'inconnu';
                detail.textContent = err.msg.inconnu;
            }
        }
        else err.statut = 'vide';
    }
    detailVehicule(immat: string): void {
        const err = this.erreur.edtImmat
        const lesVehic = new LesVehic;
        const detail = this.form.lblDetailVehic;
        detail.textContent = "";
        err.statut = "correct";
        const chaine: string = immat.trim();
        if (chaine.length > 0) {
            const veh: unVehic = lesVehic.byNoImmat(chaine);
            if (veh.no_immat !== "") { // département trouvé
                let vehicDate = new Date(veh.date_immat).toLocaleDateString("fr");
                detail.textContent
                    = veh.marque + " " + veh.modele + "\r\n" + "immatriculé le  : " + vehicDate;
            }
            else {
                err.statut = 'inconnu';
                detail.textContent = err.msg.inconnu;
            }
        }
        else err.statut = 'vide';
    }
    detailPermis(permis: string): void {
        const err = this.erreur.edtPermis
        const lesConduct = new LesConduct;
        const detail = this.form.lblDetailPermis;
        detail.textContent = "";
        err.statut = "correct";
        const chaine: string = permis.trim();
        if (chaine.length > 0) {
            const permos: UnConduct = lesConduct.byNoPermis(chaine);
            if (permos.no_permis !== "") { // département trouvé
                let permosdate = new Date(permos.date_permis).toLocaleDateString("fr");
                detail.textContent
                    = permos.nom + " " + permos.prenom + "\r\n" + "Permis obtenu le : " + permosdate;
            }
            else {
                err.statut = 'inconnu';
                detail.textContent = err.msg.inconnu;
            }
        }
        else err.statut = 'vide';
    }
    affiDelit(): void {
        const lesTypdelByinf = new LesTypeDelsByInf();
        this._grille = lesTypdelByinf.byNumInf(this.params[1]);
        this.affiGrilleDelit();
    }
    affiGrilleDelit(): void {
        while (this.form.tableDelit.rows.length > 1) { this.form.tableDelit.rows[1].remove(); }
        let total = 0;
        for (let id in this._grille) {
            const untypdelbyinf: UnTypDelitByInf = this.grille[id];
            const tr = this.form.tableDelit.insertRow();
            tr.insertCell().textContent = untypdelbyinf.unTypDel.nature;
            tr.insertCell().textContent = untypdelbyinf.unTypDel.tarif + " € ";
            const affi = this.params[0] === 'affi';
            if (!affi) {
                let balisea: HTMLAnchorElement; // déclaration balise <a>
                // création balise <a> pour appel suppression équipement dans salle
                balisea = document.createElement("a")
                balisea.classList.add('img_corbeille')
                balisea.onclick = function (): void { vueInfEdit.supprimerDelitClick(id); }
                tr.insertCell().appendChild(balisea)
            }
            total += Number(untypdelbyinf.unTypDel.tarif)
        }
        this.form.lblTotal.textContent = total.toString() + " € ";
    }
    supprimer(idInf: string): void {
        if (confirm("Confirmez-vous la suppression de l'infraction n°" + idInf + " ?")) {
            let lestypdelbyinf: LesTypeDelsByInf = new LesTypeDelsByInf();
            lestypdelbyinf.delete(idInf); // suppression dans la base des equipements de la salle
            const lesInfs = new LesInfs;
            lesInfs.delete(idInf); // suppression dans la base de la salle
        }
        this.retourClick();
    }
    verifNum(valeur: string): void {
        const lesInfs = new LesInfs;
        const err = this.erreur.edtNum
        err.statut = "correct";
        const chaine: string = valeur.trim();
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
        else err.statut = 'vide';
    }
    verifImmat(valeur: string): void {
        const err = this.erreur.edtImmat
        err.statut = "correct";
        const chaine: string = valeur.trim();
        if (chaine.length === 0) {
            err.statut = 'vide';
        }
    }
    verifDate(valeur: string): void {
        const err = this.erreur.edtDate
        err.statut = "correct";
        const chaine: string = valeur.trim();
        if (chaine.length === 0) {
            err.statut = 'vide';
        }
        else if (chaine > String(new Date().getFullYear()+ "-" + ("0" +((new Date().getMonth() + 1).toString().slice(-2))) + "-" + new Date().getDate())){
            err.statut = 'doublon';
        }
    }
    traiteErreur(uneErreur: TErreur, zone: HTMLElement): boolean {
        let correct = true;
        zone.textContent = "";
        if (uneErreur.statut !== "correct") { // non correct ==> erreur
            if (uneErreur.msg[uneErreur.statut] !== '') { // erreur
                zone.textContent = uneErreur.msg[uneErreur.statut];
                correct = false;
            }
        }
        return correct;
    }
    validerClick(): void {
        let correct = true;
        this.verifNum(this._form.edtNum.value);
        this.verifDate(this._form.edtDate.value);
        this.verifImmat(this._form.edtImmat.value);
        if (JSON.stringify(this.grille) === '{}') { this._erreur.edtDel.statut = 'vide' }
        else this._erreur.edtDel.statut = "correct";
        correct = this.traiteErreur(this._erreur.edtDel, this.form.lblDelitErreur) && correct;
        correct = this.traiteErreur(this._erreur.edtNum, this.form.lblNumErreur) && correct;
        correct = this.traiteErreur(this._erreur.edtDate, this.form.lblDateErreur) && correct;
        correct = this.traiteErreur(this._erreur.edtImmat, this.form.lblImmatErreur) && correct;
        correct = this.traiteErreur(this._erreur.edtPermos, this.form.lblPermisErreur) && correct;
        const lesInfs = new LesInfs;
        const inf = new UneInf;
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
            const lestypdelbyinf: LesTypeDelsByInf = new LesTypeDelsByInf;
            lestypdelbyinf.delete(inf.id_inf);
            lestypdelbyinf.insert(inf.id_inf, this.grille);
            this.retourClick();
        }
    }
    retourClick(): void {
        location.href = "inf_liste.html";
    }
    // gestion des équipements de la salle
    modifierDelitClick(id: string): void {
        this.afficherDelitEdit();
        const lestypdel = new LesTypDelit();
        const untypdel: UnTypDelit = lestypdel.byIdDelit(id);
        this.form.listeDelit.length = 0;
        this.form.listeDelit.options.add(new Option(untypdel.nature, id)); // text, value = 0;
        this.form.listeDelit.selectedIndex = 0;
    }
    ajouterDelitClick(): void {
        this.afficherDelitEdit();
        // réinitialiser la liste des délits à choisir
        this.form.listeDelit.length = 0;
        const lestypdel = new LesTypDelit;
        const data = lestypdel.all();
        const idDel = [];
        for (let i in this._grille) {
            idDel.push(this._grille[i].unTypDel.id_delit);
        }
        for (let i in data) {
            const id = data[i].id_delit;
            if (idDel.indexOf(id) === -1) { // pas dans la liste des délits déjà dans l'infraction
                this._form.listeDelit.options.add(new Option(data[i].nature, id)); // text, value
            }
        }
    }
    supprimerDelitClick(id: string): void {
        if (confirm("Confirmez-vous le retrait du délit de l'infraction ")) {
            delete (this._grille[id]);
            this.affiGrilleDelit();
        }
    }
    afficherDelitEdit(): void {
        this.form.divInfDelEdit.hidden = false;
        this.form.divDetail.style.pointerEvents = 'none';
        this.form.divInfDelEdit.style.pointerEvents = 'auto';
        this.form.btnAjouterDelit.hidden = true;
        this.form.btnAnnuler.hidden = true;
        this.form.btnValider.hidden = true;
    }
    cacherDelitEdit(): void {
        this.form.divInfDelEdit.hidden = true;
        this.form.divDetail.style.pointerEvents = 'auto';
        this.form.btnAjouterDelit.hidden = false;
        this.form.btnAnnuler.hidden = false;
        this.form.btnValider.hidden = false;
    }
    verifListeDelit(): void {
        const err = this._erreur.listeDelit;
        err.statut = "correct";
        const cible = this._form.listeDelit;
        if (cible.value === "") {
            err.statut = 'vide'
        }
    }
    validerDelitClick(): void {
        let correct = true;
        this.verifListeDelit();
        correct = this.traiteErreur(this._erreur.listeDelit, this.form.lblSelectDelitErreur) && correct;
        //correct = this.traiteErreur(this._erreur.edtQte, this.form.lblQteErreur) && correct;
        if (correct) {
            const lestypdel = new LesTypDelit;
            // ajout visuel de la ligne dans la grille tabulaire de la liste des équipements d'une salle
            const untypdel: UnTypDelit = lestypdel.byIdDelit(this._form.listeDelit.value);
            const untypdelbyinf: UnTypDelitByInf
                = new UnTypDelitByInf(untypdel);
            this._grille[untypdel.id_delit] = untypdelbyinf;
            this.affiGrilleDelit();
            this.annulerDelitClick();
        }
    }
    annulerDelitClick(): void {
        this.cacherDelitEdit();
    }
}
let vueInfEdit = new VueInfEdit;
export { vueInfEdit }