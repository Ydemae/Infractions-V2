<?php
session_start();

if (!isset($_SESSION['open'])){
    header('location: login.php');
}
else{
    if (isset($_SESSION['redirection'])){
        $temp = $_SESSION['redirection'];
        session_unset();
        session_destroy();
        header('location: ' . $temp);
    }
    session_unset();
    session_destroy();
    header('location: login.php');
}

?>