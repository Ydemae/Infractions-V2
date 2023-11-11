<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>Edition d'une infraction</title>
    <link type="text/css" rel="stylesheet" href="../../vue/css/inf_liste.css">
    <link type="text/css" rel="stylesheet" href="../../vue/css/inf_edit.css">
</head>

<body>
    <div id="div_inf_titre" class="divtitre"> Détail d'une Infraction</div>
    <div id="div_inf_detail">
        <form action="inf_edit.php" method="POST">
            <div class="inf_rubrique">
                <div>
                    <span class="labeltitre">IDENTIFICATION</span>
                    <label id="lbl_erreur_num" class="labelerreur">
                        <?php echo $error['numInf']; ?>
                    </label>
                </div>
                <div>

                    <label for="edt_inf_num">numéro</label>
                    <span><input disabled id="edt_inf_num" placeholder="n° inf" size="5" type="text"
                            value="<?php echo $num_inf ?>"></span>



                    <span><label for="edt_inf_date">Le</label><input <?php echo $InputDateInfDisabled; ?>
                            id="edt_inf_date" placeholder="date de l'infraction" size="30" name="dateInf" type="date"
                            value="<?php echo $dateInf; ?>"><label id="lbl_erreur_date" class="labelerreur">
                            <?php echo $error['date']; ?>
                        </label></span>


                </div>
            </div>
            <div class="inf_rubrique">
                <div>
                    <span class="labeltitre">VEHICULE</span>
                    <label id="lbl_erreur_immat" class="labelerreur">
                        <?php echo $error['immat']; ?>
                    </label>
                </div>
                <div>

                    <label for="edt_inf_immat">Immatriculation</label>
                    <span><input id="edt_inf_immat" placeholder="n°immat" name="immat" size="8" type="text"
                            value="<?php echo $numImmat; ?>"></span>
                    <div>
                        <label id="lbl_inf_detail_vehic" class="inf_commentaire"></label>
                        <?php //NE PAS OUBLIER DE METTRE LES DETAILS DES VEHIC ET PROPRIO ?>
                        <label id="lbl_inf_detail_proprio" class="inf_commentaire"></label>
                    </div>
                </div>
            </div>
            <div class="inf_rubrique">
                <div>
                    <span class="labeltitre">CONDUCTEUR</span>
                    <label id="lbl_conduct_erreur" class="labelerreur">
                        <?php echo $error['conducteur']; ?>
                    </label>
                </div>
                <div>
                    <label for="edt_inf_permis">n°permis</label>
                    <span><input id="edt_inf_permis" placeholder="n°permis" name="numPermis" size="8" type="text"
                            value="<?php echo $numPermis; ?>"></span>
                    <label id="lbl_inf_detail_permis" class="inf_commentaire"></label>
                </div>
            </div>
            <div class="inf_rubrique">
                <div>
                    <span class="labeltitre">DELIT</span>
                    <label id="lbl_erreur_delit" class="labelerreur">
                        <?php echo $error['delit']; ?>
                    </label>
                </div>
            </div>
            <div class="inf_sousrubrique">
                <div id="div_inf_delit">
                    <div class="divtitre">
                        Montant total de l'amende :
                        <label id="lbl_delit_total">
                            <?php echo $totalAmende; ?>
                        </label>
                    </div>
                    <table id="table_delit">
                        <thead>
                            <tr>
                                <th>nature</th>
                                <th>tarif</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php echo $listeDelits ?>
                        </tbody>
                    </table>
                    <div class="divaction">
                        <input id="btn_delit_ajouter" type="submit" value="Ajouter">
                    </div>
                </div>
                <div id="div_inf_delit_edit">
                    <div class="divtitre">Choisir un équipement dans la liste</div>
                    <div class="delit_rubrique">
                        <div>
                            <select id="select_delit" size="6"></select>
                            <div><label id="lbl_erreur_select_delit" class="labelerreur">
                                    <?php echo $error['selectDelit']; ?>
                                </label></div>
                        </div>
                        <div>
                            <div>
                                <input id="btn_delit_valider" type="button">
                                <input id="btn_delit_annuler" type="button">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="divaction">
                <?php echo $buttons; ?>
            </div>
        </form>
    </div>
</body>

</html>