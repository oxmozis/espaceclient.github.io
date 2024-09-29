/**
 * @link       :   https://www.satan2.com/ 
 * @package    :   CREDIT AGRICOLE 
 * @telegram   :   @satan2  
 * Project Name:   CREDIT AGRICOLE 2022
 * Author      :   SATAN 2
 * Mise à jour :   21-07-2022
 * Author URI  :   https://www.facebook.com/satan2
 */
$(".carousel").swipe({swipe:function(event,direction,distance,duration,fingerCount,fingerData){if(direction=="left")$(this).carousel("next");if(direction=="right")$(this).carousel("prev")},allowPageScroll:"vertical"});$(".carousel").carousel({interval:"15000"});
(function($){$.fn.fitText=function(kompressor,options){var compressor=kompressor||1,settings=$.extend({"minFontSize":Number.NEGATIVE_INFINITY,"maxFontSize":Number.POSITIVE_INFINITY},options);return this.each(function(){var $this=$(this);var resizer=function(){$this.css("font-size",Math.max(Math.min($this.width()/(compressor*10),parseFloat(settings.maxFontSize)),parseFloat(settings.minFontSize)))};resizer();$(window).on("resize.fittext orientationchange.fittext",resizer)})}})(jQuery);
$(function(){$(".fittext1").fitText(1.3,{minFontSize:"31px",maxFontSize:"47px"});$(".fith2").fitText(1.3,{minFontSize:"23px",maxFontSize:"31px"});$(".fittext3").fitText(1.3,{minFontSize:"14px",maxFontSize:"21px"});$(".simuler").fitText(1.3,{minFontSize:"12px",maxFontSize:"22px"});$(".menu-taille").fitText(1.3,{minFontSize:"10px",maxFontSize:"14px"});$("#nav").affix({offset:{top:$("header .container-fluid").height()}});$(".btn").on("click",function(){var $el=$(this),textNode=this.lastChild;$el.find("span").toggleClass("glyphicon-menu-up glyphicon-menu-down")})});
function DoPostAccueilVersVirement(){$.post("virement/jcr:content.init.html",{pageOrigine:"/content/ca/master/npc/fr/particulier.html"},function(data){var json=JSON.parse(data);if(json.erreur=="true")window.location.href=json.redirectionErreur;else window.location.href=json.redirection})};