import { connexion, APIsql } from "../modele/connexion.js"

class UneInf {
    private _id_inf: string;
    private _date_inf: string;
    private _no_immat: string;
    private _no_permis: string;
    constructor(id_inf = "", date_inf = "", no_immat = "", no_permis = "") {
        this._id_inf = id_inf;
        this._date_inf = date_inf;
        this._no_immat = no_immat;
        this._no_permis = no_permis;
    }
    // définition des « getters » et des « setters » pour les attributs privés de la classe
    get id_inf(): string { return this._id_inf; }
    set id_inf(id_inf: string) { if(Number.isInteger((Number(id_inf)))){this._id_inf = id_inf;} else {throw new Error("L'id doit etre un entier.")} }
    get date_inf(): string { return this._date_inf; }
    set date_inf(date_inf: string) { this._date_inf = date_inf; }
    get no_immat(): string { return this._no_immat; }
    set no_immat(immat: string) { this._no_immat = immat; }
    get no_permis(): string { return this._no_permis; }
    set no_permis(permis: string) { this._no_permis = permis; }
    toArray(): APIsql.TtabAsso {
        // renvoie l’objet sous la forme d’un tableau associatif
        // pour un affichage dans une ligne d’un tableau HTML
        const tableau: APIsql.TtabAsso = {
            'id_inf': this._id_inf, 'date_inf': this.date_inf
            , 'no_immat': this._no_immat, 'no_permis': this.no_permis
        };
        return tableau;
    }
}
type Tinfs = { [key: string]: UneInf }; // tableau d’objets UneSalle
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LesInfs{ // définition de la classe gérant les données de la table SALLE
    constructor() { // rien
    }
    idExiste(id_inf: string): boolean {
        // renvoie le test d’existence d’une salle dans la table
        // sert pour l’ajout d’une nouvelle salle
        return (APIsql.sqlWeb.SQLloadData("SELECT id_inf FROM infraction WHERE id_inf=?"
            , [id_inf]).length > 0);
    }
    private load(result: APIsql.TdataSet): Tinfs {
        // à partir d’un TdataSet, conversion en tableau d’objets UneSalle
        let infs: Tinfs = {};
        for (let i = 0; i < result.length; i++) {
            const item: APIsql.TtabAsso = result[i];
            const inf = new UneInf(item['id_inf'], item['date_inf'], item['no_immat'], item['no_permis']);
            infs[inf.id_inf] = inf; // clé d’un élément du tableau : num salle
        }
        return infs;
    }
    private prepare(where: string): string { // préparation de la requête avec ou sans restriction (WHERE)
        let sql: string;
        sql = "SELECT id_inf, date_inf, no_immat, no_permis ";
        sql += " FROM infraction";
        if (where !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    }
    all(): Tinfs { // renvoie le tableau d’objets contenant toutes les salles
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""), []));
    }
    byIdInf(id_inf: string): UneInf { // renvoie l’objet correspondant à l'infraction id_inf
        let inf = new UneInf;
        const infs: Tinfs = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("id_inf = ?")
            , [id_inf]));
        const lesCles: string[] = Object.keys(infs);
        // affecte les clés du tableau associatif « salles » dans le tableau de chaines « lesCles »
        if (lesCles.length > 0) {
            inf = infs[lesCles[0]]; // récupérer le 1er élément du tableau associatif « salles »
        }
        return inf;
    }
    toArray(infs: Tinfs): APIsql.TdataSet { // renvoie le tableau d’objets sous la forme
        // d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
        let T: APIsql.TdataSet = [];
        for (let id in infs) {
            T.push(infs[id].toArray());
        }
        return T;
    }
    delete(id_inf: string): boolean { // requête de suppression d’une salle dans la table
        let sql: string;
        sql = "DELETE FROM infraction WHERE id_inf = ?";
        return APIsql.sqlWeb.SQLexec(sql, [id_inf]); // requête de manipulation : utiliser SQLexec
    }
    insert(inf: UneInf): boolean { // requête d’ajout d’une salle dans la table
        let sql: string; // requête de manipulation : utiliser SQLexec
        sql = "INSERT INTO infraction(id_inf, date_inf, no_immat, no_permis ) VALUES (?, ?, ?, ?)";
        return APIsql.sqlWeb.SQLexec(sql, [inf.id_inf, inf.date_inf, inf.no_immat, inf.no_permis]);
    }
    update(inf: UneInf): boolean { // requête de modification d’une salle dans la table
        let sql: string;
        sql = "UPDATE infraction SET date_inf = ?, no_immat = ?, no_permis = ? ";
        sql += " WHERE id_inf = ?"; // requête de manipulation : utiliser SQLexec
        return APIsql.sqlWeb.SQLexec(sql, [inf.date_inf, inf.no_immat, inf.no_permis, inf.id_inf]);
    }
}
export { connexion }
export { UneInf }
export { LesInfs }
export { Tinfs }