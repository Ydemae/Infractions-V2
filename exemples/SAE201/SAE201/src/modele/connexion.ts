import * as APIsql from "../modele/sqlWeb.js"

APIsql.sqlWeb.init("https://devweb.iutmetz.univ-lorraine.fr/~maloron1u/IHM/SAE/SAE201/vue/","https://devweb.iutmetz.univ-lorraine.fr/~nitschke5/ihm/IHM_API/")

class Connexion {
	constructor() {
		this.init();
	}
	init():void {
		// à adapter avec voter nom de base et vos identifiants de connexion
		APIsql.sqlWeb.bdOpen('devbdd.iutmetz.univ-lorraine.fr','3306','maloron1u_infractions', 'maloron1u_appli','32201222', 'utf8');
	}
}
let connexion = new Connexion; 

export {connexion, APIsql}

