/**
 * @link       :   https://www.satan2.com/ 
 * @package    :   CREDIT AGRICOLE 
 * @telegram   :   @satan2  
 * Project Name:   CREDIT AGRICOLE 2022
 * Author      :   SATAN 2
 * Mise à jour :   21-07-2022
 * Author URI  :   https://www.facebook.com/satan2
 */
if (window.ContextHub && ContextHub.SegmentEngine) {
var S = ContextHub.SegmentEngine.Segment;
var SR = ContextHub.SegmentEngine.SegmentReference;
var P = ContextHub.SegmentEngine.Property;
var O = ContextHub.SegmentEngine.Operator;
var FR = ContextHub.SegmentEngine.ScriptReference;
var D = '/conf/ca/settings/wcm/segments/national/';

new S(["audience\u002Ddefaut",D+"audience\u002Ddefaut",0],new O('and',new O('less\u002Dthan.number',new P("client\/age"),"0")));

}
