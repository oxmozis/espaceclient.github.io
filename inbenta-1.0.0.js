/**
 * @link       :   https://www.satan2.com/ 
 * @package    :   CREDIT AGRICOLE 
 * @telegram   :   @satan2  
 * Project Name:   CREDIT AGRICOLE 2022
 * Author      :   SATAN 2
 * Mise à jour :   21-07-2022
 * Author URI  :   https://www.facebook.com/satan2
 */
(function()
{
  var data = {"iname":"Y3JlZGl0X2Fncmljb2xl","dev":false};
  var pluses = /\+/g;

  var decode = function(s)
  {
    return decodeURIComponent(s.replace(pluses, ' '));
  };

  var converted = function(s)
  {
    if (s.indexOf('"') === 0) {
      // This is a quoted cookie as according to RFC2068, unescape
      s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }
    return s;
  };

  var getCookie = function(key)
  {
    if (!key) return null;

    var cookies = document.cookie.split('; ');
    var result = null;
    for (var i = 0, l = cookies.length; i < l; i++) {
      var parts = cookies[i].split('=');
      var name = decode(parts.shift());
      var cookie = decode(parts.join('='));

      if (key === name) {
        result = converted(cookie);
        break;
      }
    }

    return result;
  };

  var setCookie = function(key, value, options)
  {
    options = options || {};

    value = String(value);

    document.cookie = [
      encodeURIComponent(key),
      '=',
      encodeURIComponent(value),
      options.path ? '; path=' + options.path : '',
      options.domain ? '; domain=' + options.domain : '',
      options.secure ? '; secure' : ''
    ].join('');
  };

  var insertLink = function(href) {
      var node = document.createElement('link'), s;
      node.rel = 'stylesheet';
      node.href = href;

      if (document.getElementsByTagName('link')[0]) {
        s = (document.getElementsByTagName('link')[0]).parentNode;
      } else {
        s = document.head || document.querySelector('head') || document.documentElement;
      }

      s.appendChild(node);
  };

  var insertScript = function(src, callback)
  {
    var node = document.createElement('script');
    node.type = 'text/javascript';
    node.async = 1;
    node.src = src;
    node.onload = node.onreadystatechange = function(_, isAbort)
    {
      if (isAbort || !node.readyState || /loaded|complete/.test(node.readyState)) {
        // Handle memory leak in IE
        node.onload = node.onreadystatechange = null;
        // Remove the node
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }

        // Dereference the node
        node = null;

        // Callback if not abort
        if (!isAbort) {
          callback();
        }
      }
    };

    var s = document.getElementsByTagName('script')[0];
    s.parentNode.appendChild(node);
  };

  var baseUrl = 'https://credit-agricole.inbenta.com/';

  
  data['baseURL'] = baseUrl;

  insertScript(baseUrl+'assets/js/inbenta-1.0.0.js', function()
  {
    window.Inbenta.baseURL = baseUrl;
    main(data);
  });
})();
