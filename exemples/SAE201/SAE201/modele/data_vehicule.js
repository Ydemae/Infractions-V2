import { connexion, APIsql } from "../modele/connexion.js";
var unVehic = /** @class */ (function () {
    function unVehic(immat, date, mod, mar, no) {
        if (immat === void 0) { immat = ""; }
        if (date === void 0) { date = ""; }
        if (mod === void 0) { mod = ""; }
        if (mar === void 0) { mar = ""; }
        if (no === void 0) { no = ""; }
        // initialisation à l’instanciation
        this.no_immat = immat;
        this._date_immat = date;
        this._marque = mar;
        this._modele = mod;
        this._no_permis = no;
    }
    Object.defineProperty(unVehic.prototype, "no_immat", {
        // définition des « getters » et des « setters » pour la lecture/écriture des attributs privés de la classe
        get: function () { return this._no_immat; },
        set: function (immat) { this._no_immat = immat; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(unVehic.prototype, "date_immat", {
        get: function () { return this._date_immat; },
        set: function (date) { this._date_immat = date; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(unVehic.prototype, "modele", {
        get: function () { return this._modele; },
        set: function (mod) { this._modele = mod; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(unVehic.prototype, "marque", {
        get: function () { return this._marque; },
        set: function (mar) { this._marque = mar; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(unVehic.prototype, "no_permis", {
        get: function () { return this._no_permis; },
        set: function (no) { this.no_permis = no; },
        enumerable: false,
        configurable: true
    });
    unVehic.prototype.toArray = function () {
        // pour un affichage dans une ligne d’un tableau HTML
        var tableau = {
            'no_immat': this._no_immat, 'date_immat': this._date_immat,
            'modele': this._modele, 'marque': this._marque, 'no_permis': this._no_permis
        };
        return tableau;
    };
    return unVehic;
}());
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var LesVehic = /** @class */ (function () {
    function LesVehic() {
        // rien
    }
    LesVehic.prototype.load = function (result) {
        // à partir d’un TdataSet, conversion en tableau d’objets UnDept
        var vehics = {};
        for (var i = 0; i < result.length; i++) {
            var item = result[i];
            var vehic = new unVehic(item['no_immat'], item['date_immat'], item['modele'], item['marque'], item['no_permis']);
            vehics[vehic.no_immat] = vehic; // clé d’un élément du tableau : code dépt
        }
        return vehics;
    };
    LesVehic.prototype.prepare = function (where) {
        var sql;
        sql = "SELECT no_immat, date_immat, modele, marque, no_permis FROM vehicule ";
        if (where !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    };
    LesVehic.prototype.all = function () {
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""), []));
    };
    LesVehic.prototype.byNoImmat = function (no_immat) {
        var vehic = new unVehic;
        var Vehics = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("no_immat = ?"), [no_immat]));
        var lesCles = Object.keys(Vehics);
        // affecte les clés du tableau associatif « depts » dans le tableau de chaines « lesCles »
        if (lesCles.length > 0) {
            vehic = Vehics[lesCles[0]]; // récupérer le 1er élément du tableau associatif « depts »
        }
        return vehic;
    };
    LesVehic.prototype.toArray = function (vehics) {
        // renvoie le tableau d’objets sous la forme d’un tableau de tableaux associatifs
        // pour un affichage dans un tableau HTML
        var T = [];
        for (var id in vehics) {
            T.push(vehics[id].toArray());
        }
        return T;
    };
    return LesVehic;
}());
export { connexion };
export { unVehic };
export { LesVehic };
//# sourceMappingURL=data_vehicule.js.map