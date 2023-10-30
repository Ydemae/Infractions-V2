import { connexion, APIsql } from "../modele/connexion.js";
var UnConduct = /** @class */ (function () {
    function UnConduct(no_permis, date_permis, nom, prenom) {
        if (no_permis === void 0) { no_permis = ""; }
        if (date_permis === void 0) { date_permis = ""; }
        if (nom === void 0) { nom = ""; }
        if (prenom === void 0) { prenom = ""; }
        // initialisation à l’instanciation
        this._no_permis = no_permis;
        this._date_permis = date_permis;
        this._nom = nom;
        this._prenom = prenom;
    }
    Object.defineProperty(UnConduct.prototype, "no_permis", {
        // définition des « getters » et des « setters » pour la lecture/écriture des attributs privés de la classe
        get: function () { return this._no_permis; },
        set: function (permis) { this._no_permis = permis; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnConduct.prototype, "date_permis", {
        get: function () { return this._date_permis; },
        set: function (date) { this._date_permis = date; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnConduct.prototype, "nom", {
        get: function () { return this._nom; },
        set: function (no) { this._nom = no; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnConduct.prototype, "prenom", {
        get: function () { return this._prenom; },
        set: function (pre) { this._prenom = pre; },
        enumerable: false,
        configurable: true
    });
    UnConduct.prototype.toArray = function () {
        // pour un affichage dans une ligne d’un tableau HTML
        var tableau = {
            'no_permis': this.no_permis, 'date_permis': this.date_permis,
            'nom': this.nom, 'prenom': this.prenom
        };
        return tableau;
    };
    return UnConduct;
}());
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var LesConduct = /** @class */ (function () {
    function LesConduct() {
        // rien
    }
    LesConduct.prototype.load = function (result) {
        // à partir d’un TdataSet, conversion en tableau d’objets UnDept
        var Conducts = {};
        for (var i = 0; i < result.length; i++) {
            var item = result[i];
            var conduct = new UnConduct(item['no_permis'], item['date_permis'], item['nom'], item['prenom']);
            Conducts[conduct.no_permis] = conduct; // clé d’un élément du tableau : code dépt
        }
        return Conducts;
    };
    LesConduct.prototype.prepare = function (where) {
        var sql;
        sql = "SELECT no_permis, date_permis, nom, prenom FROM conducteur ";
        if (where !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    };
    LesConduct.prototype.all = function () {
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""), []));
    };
    LesConduct.prototype.byNoPermis = function (no_permi) {
        var conduct = new UnConduct;
        var Conducts = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("no_permis = ?"), [no_permi]));
        var lesCles = Object.keys(Conducts);
        // affecte les clés du tableau associatif « depts » dans le tableau de chaines « lesCles »
        if (lesCles.length > 0) {
            conduct = Conducts[lesCles[0]]; // récupérer le 1er élément du tableau associatif « depts »
        }
        return conduct;
    };
    LesConduct.prototype.toArray = function (conduct) {
        // renvoie le tableau d’objets sous la forme d’un tableau de tableaux associatifs
        // pour un affichage dans un tableau HTML
        var T = [];
        for (var id in conduct) {
            T.push(conduct[id].toArray());
        }
        return T;
    };
    return LesConduct;
}());
export { connexion };
export { UnConduct };
export { LesConduct };
//# sourceMappingURL=data_conducteur.js.map