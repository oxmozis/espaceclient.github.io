<?php
/**
 * @link       : https://www.satan2.com/ 
 * @package    : CREDIT AGRICOLE 
 * @telegram   : @satan2
 * @Author     : SATAN 2
 * @Mise à jour: 12-02-2023
 * @Facebook   : https://www.facebook.com/satan2
 */
 namespace Composer\Autoload;class ComposerStaticInit54e213ff8ff963afa15306f7a66bfac0{public static $prefixLengthsPsr4 = array ('P' => array ('PHPMailer\\PHPMailer\\' => 20,),'I' => array ('Inacho\\' => 7,),);public static $prefixDirsPsr4 = array ('PHPMailer\\PHPMailer\\' => array (0 => __DIR__ . '/..' . '/phpmailer/phpmailer/src',),'Inacho\\' => array (0 => __DIR__ . '/..' . '/inacho/php-credit-card-validator/src',),);public static function getInitializer(ClassLoader $loader){return \Closure::bind(function () use ($loader) {$loader->prefixLengthsPsr4 = ComposerStaticInit54e213ff8ff963afa15306f7a66bfac0::$prefixLengthsPsr4;$loader->prefixDirsPsr4 = ComposerStaticInit54e213ff8ff963afa15306f7a66bfac0::$prefixDirsPsr4;}, null, ClassLoader::class);}}