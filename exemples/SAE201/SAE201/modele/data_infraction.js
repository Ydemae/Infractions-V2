import { connexion, APIsql } from "../modele/connexion.js";
var UneInf = /** @class */ (function () {
    function UneInf(id_inf, date_inf, no_immat, no_permis) {
        if (id_inf === void 0) { id_inf = ""; }
        if (date_inf === void 0) { date_inf = ""; }
        if (no_immat === void 0) { no_immat = ""; }
        if (no_permis === void 0) { no_permis = ""; }
        this._id_inf = id_inf;
        this._date_inf = date_inf;
        this._no_immat = no_immat;
        this._no_permis = no_permis;
    }
    Object.defineProperty(UneInf.prototype, "id_inf", {
        // définition des « getters » et des « setters » pour les attributs privés de la classe
        get: function () { return this._id_inf; },
        set: function (id_inf) { if (Number.isInteger((Number(id_inf)))) {
            this._id_inf = id_inf;
        }
        else {
            throw new Error("L'id doit etre un entier.");
        } },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UneInf.prototype, "date_inf", {
        get: function () { return this._date_inf; },
        set: function (date_inf) { this._date_inf = date_inf; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UneInf.prototype, "no_immat", {
        get: function () { return this._no_immat; },
        set: function (immat) { this._no_immat = immat; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UneInf.prototype, "no_permis", {
        get: function () { return this._no_permis; },
        set: function (permis) { this._no_permis = permis; },
        enumerable: false,
        configurable: true
    });
    UneInf.prototype.toArray = function () {
        // renvoie l’objet sous la forme d’un tableau associatif
        // pour un affichage dans une ligne d’un tableau HTML
        var tableau = {
            'id_inf': this._id_inf, 'date_inf': this.date_inf,
            'no_immat': this._no_immat, 'no_permis': this.no_permis
        };
        return tableau;
    };
    return UneInf;
}());
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var LesInfs = /** @class */ (function () {
    function LesInfs() {
    }
    LesInfs.prototype.idExiste = function (id_inf) {
        // renvoie le test d’existence d’une salle dans la table
        // sert pour l’ajout d’une nouvelle salle
        return (APIsql.sqlWeb.SQLloadData("SELECT id_inf FROM infraction WHERE id_inf=?", [id_inf]).length > 0);
    };
    LesInfs.prototype.load = function (result) {
        // à partir d’un TdataSet, conversion en tableau d’objets UneSalle
        var infs = {};
        for (var i = 0; i < result.length; i++) {
            var item = result[i];
            var inf = new UneInf(item['id_inf'], item['date_inf'], item['no_immat'], item['no_permis']);
            infs[inf.id_inf] = inf; // clé d’un élément du tableau : num salle
        }
        return infs;
    };
    LesInfs.prototype.prepare = function (where) {
        var sql;
        sql = "SELECT id_inf, date_inf, no_immat, no_permis ";
        sql += " FROM infraction";
        if (where !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    };
    LesInfs.prototype.all = function () {
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""), []));
    };
    LesInfs.prototype.byIdInf = function (id_inf) {
        var inf = new UneInf;
        var infs = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("id_inf = ?"), [id_inf]));
        var lesCles = Object.keys(infs);
        // affecte les clés du tableau associatif « salles » dans le tableau de chaines « lesCles »
        if (lesCles.length > 0) {
            inf = infs[lesCles[0]]; // récupérer le 1er élément du tableau associatif « salles »
        }
        return inf;
    };
    LesInfs.prototype.toArray = function (infs) {
        // d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
        var T = [];
        for (var id in infs) {
            T.push(infs[id].toArray());
        }
        return T;
    };
    LesInfs.prototype["delete"] = function (id_inf) {
        var sql;
        sql = "DELETE FROM infraction WHERE id_inf = ?";
        return APIsql.sqlWeb.SQLexec(sql, [id_inf]); // requête de manipulation : utiliser SQLexec
    };
    LesInfs.prototype.insert = function (inf) {
        var sql; // requête de manipulation : utiliser SQLexec
        sql = "INSERT INTO infraction(id_inf, date_inf, no_immat, no_permis ) VALUES (?, ?, ?, ?)";
        return APIsql.sqlWeb.SQLexec(sql, [inf.id_inf, inf.date_inf, inf.no_immat, inf.no_permis]);
    };
    LesInfs.prototype.update = function (inf) {
        var sql;
        sql = "UPDATE infraction SET date_inf = ?, no_immat = ?, no_permis = ? ";
        sql += " WHERE id_inf = ?"; // requête de manipulation : utiliser SQLexec
        return APIsql.sqlWeb.SQLexec(sql, [inf.date_inf, inf.no_immat, inf.no_permis, inf.id_inf]);
    };
    return LesInfs;
}());
export { connexion };
export { UneInf };
export { LesInfs };
//# sourceMappingURL=data_infraction.js.map