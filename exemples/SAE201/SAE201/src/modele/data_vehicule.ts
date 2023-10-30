import { connexion, APIsql } from "../modele/connexion.js"
class unVehic { // définition de la classe gérant les données d’un véhicule
    private _no_immat: string;
    private _date_immat: string;
    private _modele: string;
    private _marque: string;
    private _no_permis: string;
    constructor(immat = "", date = "", mod = "", mar = "", no = "") {
        // initialisation à l’instanciation
        this.no_immat = immat;
        this._date_immat = date;
        this._marque = mar;
        this._modele = mod;
        this._no_permis = no;
    }
    // définition des « getters » et des « setters » pour la lecture/écriture des attributs privés de la classe
    get no_immat(): string { return this._no_immat; }
    set no_immat(immat: string) { this._no_immat = immat}
    get date_immat(): string { return this._date_immat; }
    set date_immat(date: string) { this._date_immat = date}
    get modele(): string { return this._modele; }
    set modele(mod: string) { this._modele = mod}
    get marque(): string { return this._marque; }
    set marque(mar: string) { this._marque = mar }
    get no_permis(): string { return this._no_permis; }
    set no_permis(no: string) {this.no_permis = no}
    toArray(): APIsql.TtabAsso { // renvoie l’objet sous la forme d’un tableau associatif
        // pour un affichage dans une ligne d’un tableau HTML
        let tableau: APIsql.TtabAsso = {
            'no_immat': this._no_immat, 'date_immat': this._date_immat,
            'modele': this._modele, 'marque' : this._marque, 'no_permis' : this._no_permis
        };
        return tableau;
    }
}
type Tvehic = { [key: string]: unVehic }; // tableau d’objets UnDept
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LesVehic { // définition de la classe gérant les données de la table DEPARTEMENT
    constructor() {
        // rien
    }
    private load(result: APIsql.TdataSet): Tvehic {
        // à partir d’un TdataSet, conversion en tableau d’objets UnDept
        const vehics: Tvehic = {};
        for (let i = 0; i < result.length; i++) {
            const item: APIsql.TtabAsso = result[i];
            const vehic = new unVehic(item['no_immat'], item['date_immat'], item['modele'], item['marque'], item['no_permis']);
            vehics[vehic.no_immat] = vehic; // clé d’un élément du tableau : code dépt
        }
        return vehics;
    }
    private prepare(where: string): string { // préparation de la requête avec ou sans restriction (WHERE)
        let sql: string;
        sql = "SELECT no_immat, date_immat, modele, marque, no_permis FROM vehicule ";
        if (where !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    }
    all(): Tvehic { // renvoie le tableau d’objets contenant tous les départements
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""), []));
    }
    byNoImmat(no_immat: string): unVehic { // renvoie l’objet correspondant au département code_dept
        let vehic = new unVehic;
        const Vehics: Tvehic =
            this.load(APIsql.sqlWeb.SQLloadData(this.prepare("no_immat = ?"), [no_immat]));
        const lesCles: string[] = Object.keys(Vehics);
        // affecte les clés du tableau associatif « depts » dans le tableau de chaines « lesCles »
        if (lesCles.length > 0) {
            vehic = Vehics[lesCles[0]]; // récupérer le 1er élément du tableau associatif « depts »
        }
        return vehic;
    }
    toArray(vehics: Tvehic): APIsql.TdataSet {
        // renvoie le tableau d’objets sous la forme d’un tableau de tableaux associatifs
        // pour un affichage dans un tableau HTML
        let T: APIsql.TdataSet = [];
        for (let id in vehics) {
            T.push(vehics[id].toArray());
        }
        return T;
    }
}
export { connexion }
export { unVehic }
export { LesVehic }
export { Tvehic }