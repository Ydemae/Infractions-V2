import { connexion, APIsql } from "../modele/connexion.js"
class UnTypDelit {
    private _id_delit: string;
    private _nature: string;
    private _tarif: string;
    constructor(id_del = "", nat = "", tar = "") { // initialisation à l’instanciation
        this._id_delit = id_del;
        this._nature = nat;
        this._tarif = tar;
    }
    // définition des « getters » et des « setters » pour les attributs privés de la classe
    get id_delit(): string { return this._id_delit; }
    set id_delit(id_del: string) { this._id_delit = id_del; }
    get nature(): string { return this._nature; }
    set nature(nat: string) { this._nature = nat; }
    get tarif(): string { return this._tarif; }
    set tarif(tar: string) { this._tarif = tar; }
    toArray(): APIsql.TtabAsso {
        // renvoie l’objet sous la forme d’un tableau associatif
        // pour un affichage dans une ligne d’un tableau HTML
        let tableau: APIsql.TtabAsso = {
            'id_delit': this._id_delit, 'nature': this._nature
            , 'tarif': this._tarif
        };
        return tableau;
    }
}
type TTypDelit = { [key: string]: UnTypDelit }; // tableau d’objets UnTypDelit
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LesTypDelit { // définition de la classe gérant les données de la table TYPE_EQUIPT
    constructor() {
        // rien
    }
    private load(result: APIsql.TdataSet): TTypDelit {
        // à partir d’un TdataSet, conversion en tableau d’objets UnTypEquipt
        let TypDelit: TTypDelit = {};
        for (let i = 0; i < result.length; i++) {
            const item: APIsql.TtabAsso = result[i];
            const typDelits = new UnTypDelit(item['id_delit'], item['nature'], item['tarif']);
            TypDelit[typDelits.id_delit] = typDelits;// clé d’un élément du tableau : id equipt
        }
        return TypDelit;
    }
    private prepare(where: string): string { // préparation de la requête avec ou sans restriction (WHERE)
        let sql: string;
        sql = "SELECT id_delit, nature, tarif";
        sql += " FROM delit"
        if (where.trim() !== "") {
            sql += " WHERE " + where;
        }
        sql += " ORDER BY id_delit ASC ";
        return sql;
    }
    all(): TTypDelit { // renvoie le tableau d’objets contenant tous les équipements
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""), []));
    }
    byIdDelit(id_del: string): UnTypDelit { // renvoie l’objet correspondant à l’équipement id_equipt
        let typDel = new UnTypDelit;
        const typDels: TTypDelit = this.load(APIsql.sqlWeb.SQLloadData
            (this.prepare("id_delit = ?"), [id_del]));
        const lesCles: string[] = Object.keys(typDels);
        // affecte les clés du tableau associatif « typEquipts » dans le tableau de chaines « lesCles »
        if (lesCles.length > 0) {
            typDel = typDels[lesCles[0]]; // récupérer le 1er élément du tableau associatif « typEquipts »
        }
        return typDel;
    }
    toArray(typDel: TTypDelit): APIsql.TdataSet { // renvoie le tableau d’objets sous la forme
        // d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
        let T: APIsql.TdataSet = [];
        for (let id in typDel) {
            T.push(typDel[id].toArray());
        }
        return T;
    }
}
class UnTypDelitByInf {
    private _unTypDel: UnTypDelit;
    constructor(unTypDel: UnTypDelit = null) {
        this._unTypDel = unTypDel;
    }
    // définition des « getters » et des « setters » pour les attributs privés de la classe
    get unTypDel(): UnTypDelit { return this._unTypDel; }
    set unTypDel(unTypD: UnTypDelit) { this._unTypDel = unTypD; }
    toArray(): APIsql.TtabAsso {
        // renvoie l’objet sous la forme d’un tableau associatif
        // pour un affichage dans une ligne d’un tableau HTML
        let tableau = this.unTypDel.toArray(); // appel de la méthode « toArray » de « UnTypEquipt »
        return tableau;
    }
}
type TTypDelByInf = { [key: string]: UnTypDelitByInf };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LesTypeDelsByInf {
    constructor() {
        // rien
    }
    private load(result: APIsql.TdataSet): TTypDelByInf {
        // à partir d’un TdataSet, conversion en tableau d’objets UnTypEquiptBySalle
        const typDelsByInf: TTypDelByInf = {};
        const lesTypDel = new LesTypDelit();
        for (let i = 0; i < result.length; i++) {
            const item: APIsql.TtabAsso = result[i];
            const UnTypDel = lesTypDel.byIdDelit(item['id_delit']);
            const typDelbyInf = new UnTypDelitByInf(UnTypDel);
            typDelsByInf[typDelbyInf.unTypDel.id_delit] = typDelbyInf;
        }
        return typDelsByInf;
    }
    private prepare(where: string): string {
        let sql: string;
        sql = "SELECT id_delit ";
        sql += " FROM comprend";
        if (where.trim() !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    }
    byNumInf(id_inf: string): TTypDelByInf {
        // renvoie le tableau d’objets contenant tous les délits de l'infraction id_inf
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare("id_inf = ?"), [id_inf]));
    }
    byIdInfIdDel(id_inf: string, id_del: string): UnTypDelitByInf {
        // renvoie l’objet de l’équipement id_equipt contenu dans la salle num_salle
        let typDelbyInf = new UnTypDelitByInf;
        let typDelsbyInf: TTypDelByInf = this.load(APIsql.sqlWeb.SQLloadData
            (this.prepare("id_inf = ? and id_delit = ?"), [id_inf, id_del]));
        if (!typDelsbyInf[0] === undefined) {
            typDelbyInf = typDelsbyInf[0];
        }
        return typDelbyInf;
    }
    toArray(typDels: TTypDelByInf): APIsql.TdataSet {
        let T: APIsql.TdataSet = [];
        for (let id in typDels) {
            T.push(typDels[id].toArray());
            delete T[T.length - 1].commentaire; // pas besoin du commentaire pour l'affichage dans le tableau
        }
        return T;
    }
    getTotalNbDel(typDels: TTypDelByInf): string {
        // renvoie la quantité totale de délits d’une infraction
        let total = 0;
        for (let i in typDels) {
            total += Number(typDels[i].unTypDel.tarif);
        }
        return total.toString();
    }
    delete(id_inf: string): boolean { // requête de suppression des délits d’une infraction dans «contient»
        let sql: string;
        sql = "DELETE FROM comprend WHERE id_inf = ?";
        return APIsql.sqlWeb.SQLexec(sql, [id_inf]); // requête de manipulation : utiliser SQLexec
    }
    insert(id_inf: string, typDels: TTypDelByInf): boolean {
        // requête d’ajout des équipements avec une quantité dans « contient » installé dans « num_salle »
        let sql: string;
        let separateur = "";
        sql = "INSERT INTO comprend(id_inf,id_delit) VALUES ";
        for (let cle in typDels) {
            sql += separateur + "('" + id_inf + "','" + typDels[cle].unTypDel.id_delit + "')";
            separateur = ",";
        }
        return APIsql.sqlWeb.SQLexec(sql, []);
    }
}
export { connexion }
export { UnTypDelit }
export { LesTypDelit }
export { TTypDelit }
export { UnTypDelitByInf }
export { LesTypeDelsByInf }
export { TTypDelByInf }