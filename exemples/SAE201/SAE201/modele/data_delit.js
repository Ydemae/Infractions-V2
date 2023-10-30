import { connexion, APIsql } from "../modele/connexion.js";
var UnTypDelit = /** @class */ (function () {
    function UnTypDelit(id_del, nat, tar) {
        if (id_del === void 0) { id_del = ""; }
        if (nat === void 0) { nat = ""; }
        if (tar === void 0) { tar = ""; }
        this._id_delit = id_del;
        this._nature = nat;
        this._tarif = tar;
    }
    Object.defineProperty(UnTypDelit.prototype, "id_delit", {
        // définition des « getters » et des « setters » pour les attributs privés de la classe
        get: function () { return this._id_delit; },
        set: function (id_del) { this._id_delit = id_del; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnTypDelit.prototype, "nature", {
        get: function () { return this._nature; },
        set: function (nat) { this._nature = nat; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnTypDelit.prototype, "tarif", {
        get: function () { return this._tarif; },
        set: function (tar) { this._tarif = tar; },
        enumerable: false,
        configurable: true
    });
    UnTypDelit.prototype.toArray = function () {
        // renvoie l’objet sous la forme d’un tableau associatif
        // pour un affichage dans une ligne d’un tableau HTML
        var tableau = {
            'id_delit': this._id_delit, 'nature': this._nature,
            'tarif': this._tarif
        };
        return tableau;
    };
    return UnTypDelit;
}());
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var LesTypDelit = /** @class */ (function () {
    function LesTypDelit() {
        // rien
    }
    LesTypDelit.prototype.load = function (result) {
        // à partir d’un TdataSet, conversion en tableau d’objets UnTypEquipt
        var TypDelit = {};
        for (var i = 0; i < result.length; i++) {
            var item = result[i];
            var typDelits = new UnTypDelit(item['id_delit'], item['nature'], item['tarif']);
            TypDelit[typDelits.id_delit] = typDelits; // clé d’un élément du tableau : id equipt
        }
        return TypDelit;
    };
    LesTypDelit.prototype.prepare = function (where) {
        var sql;
        sql = "SELECT id_delit, nature, tarif";
        sql += " FROM delit";
        if (where.trim() !== "") {
            sql += " WHERE " + where;
        }
        sql += " ORDER BY id_delit ASC ";
        return sql;
    };
    LesTypDelit.prototype.all = function () {
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""), []));
    };
    LesTypDelit.prototype.byIdDelit = function (id_del) {
        var typDel = new UnTypDelit;
        var typDels = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("id_delit = ?"), [id_del]));
        var lesCles = Object.keys(typDels);
        // affecte les clés du tableau associatif « typEquipts » dans le tableau de chaines « lesCles »
        if (lesCles.length > 0) {
            typDel = typDels[lesCles[0]]; // récupérer le 1er élément du tableau associatif « typEquipts »
        }
        return typDel;
    };
    LesTypDelit.prototype.toArray = function (typDel) {
        // d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
        var T = [];
        for (var id in typDel) {
            T.push(typDel[id].toArray());
        }
        return T;
    };
    return LesTypDelit;
}());
var UnTypDelitByInf = /** @class */ (function () {
    function UnTypDelitByInf(unTypDel) {
        if (unTypDel === void 0) { unTypDel = null; }
        this._unTypDel = unTypDel;
    }
    Object.defineProperty(UnTypDelitByInf.prototype, "unTypDel", {
        // définition des « getters » et des « setters » pour les attributs privés de la classe
        get: function () { return this._unTypDel; },
        set: function (unTypD) { this._unTypDel = unTypD; },
        enumerable: false,
        configurable: true
    });
    UnTypDelitByInf.prototype.toArray = function () {
        // renvoie l’objet sous la forme d’un tableau associatif
        // pour un affichage dans une ligne d’un tableau HTML
        var tableau = this.unTypDel.toArray(); // appel de la méthode « toArray » de « UnTypEquipt »
        return tableau;
    };
    return UnTypDelitByInf;
}());
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var LesTypeDelsByInf = /** @class */ (function () {
    function LesTypeDelsByInf() {
        // rien
    }
    LesTypeDelsByInf.prototype.load = function (result) {
        // à partir d’un TdataSet, conversion en tableau d’objets UnTypEquiptBySalle
        var typDelsByInf = {};
        var lesTypDel = new LesTypDelit();
        for (var i = 0; i < result.length; i++) {
            var item = result[i];
            var UnTypDel = lesTypDel.byIdDelit(item['id_delit']);
            var typDelbyInf = new UnTypDelitByInf(UnTypDel);
            typDelsByInf[typDelbyInf.unTypDel.id_delit] = typDelbyInf;
        }
        return typDelsByInf;
    };
    LesTypeDelsByInf.prototype.prepare = function (where) {
        var sql;
        sql = "SELECT id_delit ";
        sql += " FROM comprend";
        if (where.trim() !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    };
    LesTypeDelsByInf.prototype.byNumInf = function (id_inf) {
        // renvoie le tableau d’objets contenant tous les délits de l'infraction id_inf
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare("id_inf = ?"), [id_inf]));
    };
    LesTypeDelsByInf.prototype.byIdInfIdDel = function (id_inf, id_del) {
        // renvoie l’objet de l’équipement id_equipt contenu dans la salle num_salle
        var typDelbyInf = new UnTypDelitByInf;
        var typDelsbyInf = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("id_inf = ? and id_delit = ?"), [id_inf, id_del]));
        if (!typDelsbyInf[0] === undefined) {
            typDelbyInf = typDelsbyInf[0];
        }
        return typDelbyInf;
    };
    LesTypeDelsByInf.prototype.toArray = function (typDels) {
        var T = [];
        for (var id in typDels) {
            T.push(typDels[id].toArray());
            delete T[T.length - 1].commentaire; // pas besoin du commentaire pour l'affichage dans le tableau
        }
        return T;
    };
    LesTypeDelsByInf.prototype.getTotalNbDel = function (typDels) {
        // renvoie la quantité totale de délits d’une infraction
        var total = 0;
        for (var i in typDels) {
            total += Number(typDels[i].unTypDel.tarif);
        }
        return total.toString();
    };
    LesTypeDelsByInf.prototype["delete"] = function (id_inf) {
        var sql;
        sql = "DELETE FROM comprend WHERE id_inf = ?";
        return APIsql.sqlWeb.SQLexec(sql, [id_inf]); // requête de manipulation : utiliser SQLexec
    };
    LesTypeDelsByInf.prototype.insert = function (id_inf, typDels) {
        // requête d’ajout des équipements avec une quantité dans « contient » installé dans « num_salle »
        var sql;
        var separateur = "";
        sql = "INSERT INTO comprend(id_inf,id_delit) VALUES ";
        for (var cle in typDels) {
            sql += separateur + "('" + id_inf + "','" + typDels[cle].unTypDel.id_delit + "')";
            separateur = ",";
        }
        return APIsql.sqlWeb.SQLexec(sql, []);
    };
    return LesTypeDelsByInf;
}());
export { connexion };
export { UnTypDelit };
export { LesTypDelit };
export { UnTypDelitByInf };
export { LesTypeDelsByInf };
//# sourceMappingURL=data_delit.js.map