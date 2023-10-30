import { UneInf, LesInfs, Tinfs } from "../modele/data_infraction.js"
import { LesConduct } from "../modele/data_conducteur.js"
import { LesTypeDelsByInf } from "../modele/data_delit.js"
// déclaration de l’ensemble des zones de saisie et d’affichage nécessaires à la gestion du formulaire type
type TinfListeForm = {
    divTitre: HTMLElement, btnAjouter: HTMLInputElement, tableinfs: HTMLTableElement
}
class VueInfListe {
    private _form: TinfListeForm;
    get form(): TinfListeForm { return this._form }
    init(form: TinfListeForm): void {
        this._form = form;
        const lesInfs = new LesInfs();
        const lesConduct = new LesConduct();
        const lesDelByInf = new LesTypeDelsByInf();
        const data = lesInfs.all();
        this.form.divTitre.textContent = 'Liste des infractions'; // construction du titre
        for (let num in data) {
            const uneInf: UneInf = data[num];
            const tr = this.form.tableinfs.insertRow(); // création nlle ligne dans tableau
            let balisea: HTMLAnchorElement; // déclaration balise <a>
            // création balise <a> pour appel page visualisation du détail de la salle
            balisea = document.createElement("a")
            balisea.classList.add('img_visu') // définition class contenant l’image (voir css)
            balisea.onclick = function (): void { vueInfListe.detailInfClick(uneInf.id_inf); }
            tr.insertCell().appendChild(balisea) // création nlle cellule dans ligne
            tr.insertCell().textContent = uneInf.id_inf;
            tr.insertCell().textContent = new Date(uneInf.date_inf).toLocaleDateString("fr");
            tr.insertCell().textContent = uneInf.no_immat;
            tr.insertCell().textContent = uneInf.no_permis+ " "+ lesConduct.byNoPermis(uneInf.no_permis).nom+ " "+ lesConduct.byNoPermis(uneInf.no_permis).prenom;
            tr.insertCell().textContent = 
                lesDelByInf.getTotalNbDel(lesDelByInf.byNumInf(num)) + " €";
            // création balise <a> pour appel page modification du détail de la salle
            balisea = document.createElement("a")
            balisea.classList.add('img_modification') // définition class contenant l’image (voir css)
            balisea.onclick = function (): void { vueInfListe.modifierInfClick(uneInf.id_inf); }
            tr.insertCell().appendChild(balisea)
            // création balise <a> pour appel page suppression d'une salle
            balisea = document.createElement("a")
            balisea.classList.add('img_corbeille') // définition class contenant l’image (voir css)
            balisea.onclick = function (): void { vueInfListe.supprimerInfClick(uneInf.id_inf); }
            tr.insertCell().appendChild(balisea)
        }
        // définition événement onclick sur bouton "ajouter"
        this.form.btnAjouter.onclick = function (): void { vueInfListe.ajouterInfClick(); }
    }
    detailInfClick(num: string): void {
        // redirection vers « salle_edit.html »avec indication du statut « affi » et du numéro de salle
        location.href = "inf_edit.html?affi&" + encodeURIComponent(num);
    }
    modifierInfClick(num: string): void {
        // redirection vers « salle_edit.html »avec indication du statut « modif » et du numéro de salle
        location.href = "inf_edit.html?modif&" + encodeURIComponent(num)
    }
    supprimerInfClick(num: string): void {
        // redirection vers « salle_edit.html »avec indication du statut »suppr » et du numéro de salle
        location.href = "inf_edit.html?suppr&" + encodeURIComponent(num)
    }
    ajouterInfClick(): void {
        // redirection vers « salle_edit.html »avec indication du statut « ajout »
        location.href = "inf_edit.html?ajout"
    }
}
let vueInfListe = new VueInfListe();
export { vueInfListe }