import { LesInfs } from "../modele/data_infraction.js";
import { LesConduct } from "../modele/data_conducteur.js";
import { LesTypeDelsByInf } from "../modele/data_delit.js";
var VueInfListe = /** @class */ (function () {
    function VueInfListe() {
    }
    Object.defineProperty(VueInfListe.prototype, "form", {
        get: function () { return this._form; },
        enumerable: false,
        configurable: true
    });
    VueInfListe.prototype.init = function (form) {
        this._form = form;
        var lesInfs = new LesInfs();
        var lesConduct = new LesConduct();
        var lesDelByInf = new LesTypeDelsByInf();
        var data = lesInfs.all();
        this.form.divTitre.textContent = 'Liste des infractions'; // construction du titre
        var _loop_1 = function (num) {
            var uneInf = data[num];
            var tr = this_1.form.tableinfs.insertRow(); // création nlle ligne dans tableau
            var balisea = void 0; // déclaration balise <a>
            // création balise <a> pour appel page visualisation du détail de la salle
            balisea = document.createElement("a");
            balisea.classList.add('img_visu'); // définition class contenant l’image (voir css)
            balisea.onclick = function () { vueInfListe.detailInfClick(uneInf.id_inf); };
            tr.insertCell().appendChild(balisea); // création nlle cellule dans ligne
            tr.insertCell().textContent = uneInf.id_inf;
            tr.insertCell().textContent = new Date(uneInf.date_inf).toLocaleDateString("fr");
            tr.insertCell().textContent = uneInf.no_immat;
            tr.insertCell().textContent = uneInf.no_permis + " " + lesConduct.byNoPermis(uneInf.no_permis).nom + " " + lesConduct.byNoPermis(uneInf.no_permis).prenom;
            tr.insertCell().textContent =
                lesDelByInf.getTotalNbDel(lesDelByInf.byNumInf(num)) + " €";
            // création balise <a> pour appel page modification du détail de la salle
            balisea = document.createElement("a");
            balisea.classList.add('img_modification'); // définition class contenant l’image (voir css)
            balisea.onclick = function () { vueInfListe.modifierInfClick(uneInf.id_inf); };
            tr.insertCell().appendChild(balisea);
            // création balise <a> pour appel page suppression d'une salle
            balisea = document.createElement("a");
            balisea.classList.add('img_corbeille'); // définition class contenant l’image (voir css)
            balisea.onclick = function () { vueInfListe.supprimerInfClick(uneInf.id_inf); };
            tr.insertCell().appendChild(balisea);
        };
        var this_1 = this;
        for (var num in data) {
            _loop_1(num);
        }
        // définition événement onclick sur bouton "ajouter"
        this.form.btnAjouter.onclick = function () { vueInfListe.ajouterInfClick(); };
    };
    VueInfListe.prototype.detailInfClick = function (num) {
        // redirection vers « salle_edit.html »avec indication du statut « affi » et du numéro de salle
        location.href = "inf_edit.html?affi&" + encodeURIComponent(num);
    };
    VueInfListe.prototype.modifierInfClick = function (num) {
        // redirection vers « salle_edit.html »avec indication du statut « modif » et du numéro de salle
        location.href = "inf_edit.html?modif&" + encodeURIComponent(num);
    };
    VueInfListe.prototype.supprimerInfClick = function (num) {
        // redirection vers « salle_edit.html »avec indication du statut »suppr » et du numéro de salle
        location.href = "inf_edit.html?suppr&" + encodeURIComponent(num);
    };
    VueInfListe.prototype.ajouterInfClick = function () {
        // redirection vers « salle_edit.html »avec indication du statut « ajout »
        location.href = "inf_edit.html?ajout";
    };
    return VueInfListe;
}());
var vueInfListe = new VueInfListe();
export { vueInfListe };
//# sourceMappingURL=class_inf_liste.js.map