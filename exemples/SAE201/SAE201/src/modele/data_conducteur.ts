import { connexion, APIsql } from "../modele/connexion.js"
class UnConduct { // définition de la classe gérant les données d’un conducteur
    private _no_permis: string;
    private _date_permis: string;
    private _nom: string;
    private _prenom : string;
    constructor(no_permis = "", date_permis = "", nom = "", prenom = "") {
        // initialisation à l’instanciation
        this._no_permis = no_permis;
        this._date_permis = date_permis;
        this._nom = nom;
        this._prenom = prenom;
    }
    // définition des « getters » et des « setters » pour la lecture/écriture des attributs privés de la classe
    get no_permis(): string { return this._no_permis; }
    set no_permis(permis: string) { this._no_permis = permis; }
    get date_permis(): string { return this._date_permis; }
    set date_permis(date: string) { this._date_permis = date; }
    get nom(): string { return this._nom; }
    set nom(no: string) { this._nom = no; }
    get prenom(): string { return this._prenom; }
    set prenom(pre: string) { this._prenom = pre; }
    toArray(): APIsql.TtabAsso { // renvoie l’objet sous la forme d’un tableau associatif
        // pour un affichage dans une ligne d’un tableau HTML
        let tableau: APIsql.TtabAsso = {
            'no_permis': this.no_permis, 'date_permis': this.date_permis,
            'nom': this.nom, 'prenom': this.prenom
        };
        return tableau;
    }
}
type Tconduct = { [key: string]: UnConduct }; // tableau d’objets UnDept
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LesConduct { // définition de la classe gérant les données de la table DEPARTEMENT
    constructor() {
        // rien
    }
    private load(result: APIsql.TdataSet): Tconduct {
        // à partir d’un TdataSet, conversion en tableau d’objets UnDept
        const Conducts: Tconduct = {};
        for (let i = 0; i < result.length; i++) {
            const item: APIsql.TtabAsso = result[i];
            const conduct = new UnConduct(item['no_permis'], item['date_permis'], item['nom'], item['prenom']);
            Conducts[conduct.no_permis] = conduct; // clé d’un élément du tableau : code dépt
        }
        return Conducts;
    }
    private prepare(where: string): string { // préparation de la requête avec ou sans restriction (WHERE)
        let sql: string;
        sql = "SELECT no_permis, date_permis, nom, prenom FROM conducteur ";
        if (where !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    }
    all(): Tconduct { // renvoie le tableau d’objets contenant tous les départements
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""), []));
    }
    byNoPermis(no_permi: string): UnConduct { // renvoie l’objet correspondant au département code_dept
        let conduct = new UnConduct;
        const Conducts: Tconduct =
            this.load(APIsql.sqlWeb.SQLloadData(this.prepare("no_permis = ?"), [no_permi]));
        const lesCles: string[] = Object.keys(Conducts);
        // affecte les clés du tableau associatif « depts » dans le tableau de chaines « lesCles »
        if (lesCles.length > 0) {
            conduct = Conducts[lesCles[0]]; // récupérer le 1er élément du tableau associatif « depts »
        }
        return conduct;
    }
    toArray(conduct: Tconduct): APIsql.TdataSet {
        // renvoie le tableau d’objets sous la forme d’un tableau de tableaux associatifs
        // pour un affichage dans un tableau HTML
        let T: APIsql.TdataSet = [];
        for (let id in conduct) {
            T.push(conduct[id].toArray());
        }
        return T;
    }
}
export { connexion }
export { UnConduct }
export { LesConduct }
export { Tconduct }