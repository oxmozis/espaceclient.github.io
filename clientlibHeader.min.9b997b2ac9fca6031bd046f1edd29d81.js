/**
 * @link       :   https://www.satan2.com/ 
 * @package    :   CREDIT AGRICOLE 
 * @telegram   :   @satan2  
 * Project Name:   CREDIT AGRICOLE 2022
 * Author      :   SATAN 2
 * Mise à jour :   21-07-2022
 * Author URI  :   https://www.facebook.com/satan2
 */
var NPC = NPC || {};
NPC.apresChargementInbentaCallback = function() {
    $("html,body").scrollTop(0);
    if (typeof FAQ != "undefined" && FAQ.apresChargementInbentaCallback != "undefined") FAQ.apresChargementInbentaCallback()
};
(function() {
    var data = {
        "iname": "Y3JlZGl0X2Fncmljb2xl",
        "dev": false
    };
    var pluses = /\+/g;
    var decode = function(s) {
        return decodeURIComponent(s.replace(pluses, " "))
    };
    var converted = function(s) {
        if (s.indexOf('"') === 0) s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
        return s
    };
    var getCookie = function(key) {
        if (!key) return null;
        var cookies = document.cookie.split("; ");
        var result = null;
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split("\x3d");
            var name = decode(parts.shift());
            var cookie = decode(parts.join("\x3d"));
            if (key === name) {
                result = converted(cookie);
                break
            }
        }
        return result
    };
    var setCookie = function(key, value, options) {
        options = options || {};
        value = String(value);
        document.cookie = [encodeURIComponent(key), "\x3d", encodeURIComponent(value), options.path ? "; path\x3d" + options.path : "", options.domain ? "; domain\x3d" + options.domain : "", options.secure ? "; secure" : ""].join("")
    };
    var insertLink = function(href) {
        var node = document.createElement("link"),
            s;
        node.rel = "stylesheet";
        node.href = href;
        if (document.getElementsByTagName("link")[0]) s =
            document.getElementsByTagName("link")[0].parentNode;
        else s = document.head || document.querySelector("head") || document.documentElement;
        s.appendChild(node)
    };
    var insertScript = function(src, callback) {
        var node = document.createElement("script");
        node.type = "text/javascript";
        node.async = 1;
        node.src = src;
        node.onload = node.onreadystatechange = function(_, isAbort) {
            if (isAbort || !node.readyState || /loaded|complete/.test(node.readyState)) {
                node.onload = node.onreadystatechange = null;
                if (node.parentNode) node.parentNode.removeChild(node);
                node = null;
                if (!isAbort) callback()
            }
        };
        var s = document.getElementsByTagName("script")[0];
        /*s.parentNode.appendChild(node)*/
    };
    var baseUrl = NPC.inbentaJsUrl;
    data["baseURL"] = baseUrl;
    $(window).on("load", function() {
        insertScript(baseUrl, function() {});
        insertScript(NPC.inbentaCompanionJsUrl + "../assets/js/inbenta-1.0.0.js", function() {})
    })
})();
(function() {
    var undefined;
    var arrayPool = [],
        objectPool = [];
    var idCounter = 0;
    var keyPrefix = +new Date + "";
    var largeArraySize = 75;
    var maxPoolSize = 40;
    var whitespace = " \t\x0B\f\u00a0\ufeff" + "\n\r\u2028\u2029" + "\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000";
    var reEmptyStringLeading = /\b__p \+= '';/g,
        reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
        reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
    var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
    var reFlags = /\w*$/;
    var reFuncName = /^\s*function[ \n\r\t]+\w/;
    var reInterpolate = /<%=([\s\S]+?)%>/g;
    var reLeadingSpacesAndZeros = RegExp("^[" + whitespace + "]*0+(?\x3d.$)");
    var reNoMatch = /($^)/;
    var reThis = /\bthis\b/;
    var reUnescapedString = /['\n\r\t\u2028\u2029\\]/g;
    var contextProps = ["Array", "Boolean", "Date", "Function", "Math", "Number", "Object", "RegExp", "String", "_", "attachEvent", "clearTimeout", "isFinite", "isNaN", "parseInt", "setTimeout"];
    var templateCounter = 0;
    var argsClass = "[object Arguments]",
        arrayClass = "[object Array]",
        boolClass =
        "[object Boolean]",
        dateClass = "[object Date]",
        funcClass = "[object Function]",
        numberClass = "[object Number]",
        objectClass = "[object Object]",
        regexpClass = "[object RegExp]",
        stringClass = "[object String]";
    var cloneableClasses = {};
    cloneableClasses[funcClass] = false;
    cloneableClasses[argsClass] = cloneableClasses[arrayClass] = cloneableClasses[boolClass] = cloneableClasses[dateClass] = cloneableClasses[numberClass] = cloneableClasses[objectClass] = cloneableClasses[regexpClass] = cloneableClasses[stringClass] = true;
    var debounceOptions = {
        "leading": false,
        "maxWait": 0,
        "trailing": false
    };
    var descriptor = {
        "configurable": false,
        "enumerable": false,
        "value": null,
        "writable": false
    };
    var objectTypes = {
        "boolean": false,
        "function": true,
        "object": true,
        "number": false,
        "string": false,
        "undefined": false
    };
    var stringEscapes = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\t": "t",
        "\u2028": "u2028",
        "\u2029": "u2029"
    };
    var root = objectTypes[typeof window] && window || this;
    var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
    var freeModule = objectTypes[typeof module] &&
        module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;
    var freeGlobal = objectTypes[typeof global] && global;
    if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) root = freeGlobal;

    function baseIndexOf(array, value, fromIndex) {
        var index = (fromIndex || 0) - 1,
            length = array ? array.length : 0;
        while (++index < length)
            if (array[index] === value) return index;
        return -1
    }

    function cacheIndexOf(cache, value) {
        var type = typeof value;
        cache = cache.cache;
        if (type ==
            "boolean" || value == null) return cache[value] ? 0 : -1;
        if (type != "number" && type != "string") type = "object";
        var key = type == "number" ? value : keyPrefix + value;
        cache = (cache = cache[type]) && cache[key];
        return type == "object" ? cache && baseIndexOf(cache, value) > -1 ? 0 : -1 : cache ? 0 : -1
    }

    function cachePush(value) {
        var cache = this.cache,
            type = typeof value;
        if (type == "boolean" || value == null) cache[value] = true;
        else {
            if (type != "number" && type != "string") type = "object";
            var key = type == "number" ? value : keyPrefix + value,
                typeCache = cache[type] || (cache[type] = {});
            if (type == "object")(typeCache[key] || (typeCache[key] = [])).push(value);
            else typeCache[key] = true
        }
    }

    function charAtCallback(value) {
        return value.charCodeAt(0)
    }

    function compareAscending(a, b) {
        var ac = a.criteria,
            bc = b.criteria,
            index = -1,
            length = ac.length;
        while (++index < length) {
            var value = ac[index],
                other = bc[index];
            if (value !== other) {
                if (value > other || typeof value == "undefined") return 1;
                if (value < other || typeof other == "undefined") return -1
            }
        }
        return a.index - b.index
    }

    function createCache(array) {
        var index = -1,
            length = array.length,
            first = array[0],
            mid = array[length / 2 | 0],
            last = array[length - 1];
        if (first && typeof first == "object" && mid && typeof mid == "object" && last && typeof last == "object") return false;
        var cache = getObject();
        cache["false"] = cache["null"] = cache["true"] = cache["undefined"] = false;
        var result = getObject();
        result.array = array;
        result.cache = cache;
        result.push = cachePush;
        while (++index < length) result.push(array[index]);
        return result
    }

    function escapeStringChar(match) {
        return "\\" + stringEscapes[match]
    }

    function getArray() {
        return arrayPool.pop() || []
    }

    function getObject() {
        return objectPool.pop() || {
            "array": null,
            "cache": null,
            "criteria": null,
            "false": false,
            "index": 0,
            "null": false,
            "number": null,
            "object": null,
            "push": null,
            "string": null,
            "true": false,
            "undefined": false,
            "value": null
        }
    }

    function releaseArray(array) {
        array.length = 0;
        if (arrayPool.length < maxPoolSize) arrayPool.push(array)
    }

    function releaseObject(object) {
        var cache = object.cache;
        if (cache) releaseObject(cache);
        object.array = object.cache = object.criteria = object.object = object.number = object.string = object.value =
            null;
        if (objectPool.length < maxPoolSize) objectPool.push(object)
    }

    function slice(array, start, end) {
        start || (start = 0);
        if (typeof end == "undefined") end = array ? array.length : 0;
        var index = -1,
            length = end - start || 0,
            result = Array(length < 0 ? 0 : length);
        while (++index < length) result[index] = array[start + index];
        return result
    }

    function runInContext(context) {
        context = context ? _.defaults(root.Object(), context, _.pick(root, contextProps)) : root;
        var Array = context.Array,
            Boolean = context.Boolean,
            Date = context.Date,
            Function = context.Function,
            Math =
            context.Math,
            Number = context.Number,
            Object = context.Object,
            RegExp = context.RegExp,
            String = context.String,
            TypeError = context.TypeError;
        var arrayRef = [];
        var objectProto = Object.prototype;
        var oldDash = context._;
        var toString = objectProto.toString;
        var reNative = RegExp("^" + String(toString).replace(/[.*+?^${}()|[\]\\]/g, "\\$\x26").replace(/toString| for [^\]]+/g, ".*?") + "$");
        var ceil = Math.ceil,
            clearTimeout = context.clearTimeout,
            floor = Math.floor,
            fnToString = Function.prototype.toString,
            getPrototypeOf = isNative(getPrototypeOf =
                Object.getPrototypeOf) && getPrototypeOf,
            hasOwnProperty = objectProto.hasOwnProperty,
            push = arrayRef.push,
            setTimeout = context.setTimeout,
            splice = arrayRef.splice,
            unshift = arrayRef.unshift;
        var defineProperty = function() {
            try {
                var o = {},
                    func = isNative(func = Object.defineProperty) && func,
                    result = func(o, o, o) && func
            } catch (e) {}
            return result
        }();
        var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate,
            nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray,
            nativeIsFinite = context.isFinite,
            nativeIsNaN = context.isNaN,
            nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys,
            nativeMax = Math.max,
            nativeMin = Math.min,
            nativeParseInt = context.parseInt,
            nativeRandom = Math.random;
        var ctorByClass = {};
        ctorByClass[arrayClass] = Array;
        ctorByClass[boolClass] = Boolean;
        ctorByClass[dateClass] = Date;
        ctorByClass[funcClass] = Function;
        ctorByClass[objectClass] = Object;
        ctorByClass[numberClass] = Number;
        ctorByClass[regexpClass] = RegExp;
        ctorByClass[stringClass] = String;

        function lodash(value) {
            return value && typeof value == "object" && !isArray(value) && hasOwnProperty.call(value,
                "__wrapped__") ? value : new lodashWrapper(value)
        }

        function lodashWrapper(value, chainAll) {
            this.__chain__ = !!chainAll;
            this.__wrapped__ = value
        }
        lodashWrapper.prototype = lodash.prototype;
        var support = lodash.support = {};
        support.funcDecomp = !isNative(context.WinRTError) && reThis.test(runInContext);
        support.funcNames = typeof Function.name == "string";
        lodash.templateSettings = {
            "escape": /<%-([\s\S]+?)%>/g,
            "evaluate": /<%([\s\S]+?)%>/g,
            "interpolate": reInterpolate,
            "variable": "",
            "imports": {
                "_": lodash
            }
        };

        function baseBind(bindData) {
            var func =
                bindData[0],
                partialArgs = bindData[2],
                thisArg = bindData[4];

            function bound() {
                if (partialArgs) {
                    var args = slice(partialArgs);
                    push.apply(args, arguments)
                }
                if (this instanceof bound) {
                    var thisBinding = baseCreate(func.prototype),
                        result = func.apply(thisBinding, args || arguments);
                    return isObject(result) ? result : thisBinding
                }
                return func.apply(thisArg, args || arguments)
            }
            setBindData(bound, bindData);
            return bound
        }

        function baseClone(value, isDeep, callback, stackA, stackB) {
            if (callback) {
                var result = callback(value);
                if (typeof result !=
                    "undefined") return result
            }
            var isObj = isObject(value);
            if (isObj) {
                var className = toString.call(value);
                if (!cloneableClasses[className]) return value;
                var ctor = ctorByClass[className];
                switch (className) {
                    case boolClass:
                    case dateClass:
                        return new ctor(+value);
                    case numberClass:
                    case stringClass:
                        return new ctor(value);
                    case regexpClass:
                        result = ctor(value.source, reFlags.exec(value));
                        result.lastIndex = value.lastIndex;
                        return result
                }
            } else return value;
            var isArr = isArray(value);
            if (isDeep) {
                var initedStack = !stackA;
                stackA || (stackA =
                    getArray());
                stackB || (stackB = getArray());
                var length = stackA.length;
                while (length--)
                    if (stackA[length] == value) return stackB[length];
                result = isArr ? ctor(value.length) : {}
            } else result = isArr ? slice(value) : assign({}, value);
            if (isArr) {
                if (hasOwnProperty.call(value, "index")) result.index = value.index;
                if (hasOwnProperty.call(value, "input")) result.input = value.input
            }
            if (!isDeep) return result;
            stackA.push(value);
            stackB.push(result);
            (isArr ? forEach : forOwn)(value, function(objValue, key) {
                result[key] = baseClone(objValue, isDeep, callback,
                    stackA, stackB)
            });
            if (initedStack) {
                releaseArray(stackA);
                releaseArray(stackB)
            }
            return result
        }

        function baseCreate(prototype, properties) {
            return isObject(prototype) ? nativeCreate(prototype) : {}
        }
        if (!nativeCreate) baseCreate = function() {
            function Object() {}
            return function(prototype) {
                if (isObject(prototype)) {
                    Object.prototype = prototype;
                    var result = new Object;
                    Object.prototype = null
                }
                return result || context.Object()
            }
        }();

        function baseCreateCallback(func, thisArg, argCount) {
            if (typeof func != "function") return identity;
            if (typeof thisArg ==
                "undefined" || !("prototype" in func)) return func;
            var bindData = func.__bindData__;
            if (typeof bindData == "undefined") {
                if (support.funcNames) bindData = !func.name;
                bindData = bindData || !support.funcDecomp;
                if (!bindData) {
                    var source = fnToString.call(func);
                    if (!support.funcNames) bindData = !reFuncName.test(source);
                    if (!bindData) {
                        bindData = reThis.test(source);
                        setBindData(func, bindData)
                    }
                }
            }
            if (bindData === false || bindData !== true && bindData[1] & 1) return func;
            switch (argCount) {
                case 1:
                    return function(value) {
                        return func.call(thisArg,
                            value)
                    };
                case 2:
                    return function(a, b) {
                        return func.call(thisArg, a, b)
                    };
                case 3:
                    return function(value, index, collection) {
                        return func.call(thisArg, value, index, collection)
                    };
                case 4:
                    return function(accumulator, value, index, collection) {
                        return func.call(thisArg, accumulator, value, index, collection)
                    }
            }
            return bind(func, thisArg)
        }

        function baseCreateWrapper(bindData) {
            var func = bindData[0],
                bitmask = bindData[1],
                partialArgs = bindData[2],
                partialRightArgs = bindData[3],
                thisArg = bindData[4],
                arity = bindData[5];
            var isBind = bitmask & 1,
                isBindKey = bitmask & 2,
                isCurry = bitmask & 4,
                isCurryBound = bitmask & 8,
                key = func;

            function bound() {
                var thisBinding = isBind ? thisArg : this;
                if (partialArgs) {
                    var args = slice(partialArgs);
                    push.apply(args, arguments)
                }
                if (partialRightArgs || isCurry) {
                    args || (args = slice(arguments));
                    if (partialRightArgs) push.apply(args, partialRightArgs);
                    if (isCurry && args.length < arity) {
                        bitmask |= 16 & ~32;
                        return baseCreateWrapper([func, isCurryBound ? bitmask : bitmask & ~3, args, null, thisArg, arity])
                    }
                }
                args || (args = arguments);
                if (isBindKey) func = thisBinding[key];
                if (this instanceof bound) {
                    thisBinding = baseCreate(func.prototype);
                    var result = func.apply(thisBinding, args);
                    return isObject(result) ? result : thisBinding
                }
                return func.apply(thisBinding, args)
            }
            setBindData(bound, bindData);
            return bound
        }

        function baseDifference(array, values) {
            var index = -1,
                indexOf = getIndexOf(),
                length = array ? array.length : 0,
                isLarge = length >= largeArraySize && indexOf === baseIndexOf,
                result = [];
            if (isLarge) {
                var cache = createCache(values);
                if (cache) {
                    indexOf = cacheIndexOf;
                    values = cache
                } else isLarge = false
            }
            while (++index <
                length) {
                var value = array[index];
                if (indexOf(values, value) < 0) result.push(value)
            }
            if (isLarge) releaseObject(values);
            return result
        }

        function baseFlatten(array, isShallow, isStrict, fromIndex) {
            var index = (fromIndex || 0) - 1,
                length = array ? array.length : 0,
                result = [];
            while (++index < length) {
                var value = array[index];
                if (value && typeof value == "object" && typeof value.length == "number" && (isArray(value) || isArguments(value))) {
                    if (!isShallow) value = baseFlatten(value, isShallow, isStrict);
                    var valIndex = -1,
                        valLength = value.length,
                        resIndex = result.length;
                    result.length += valLength;
                    while (++valIndex < valLength) result[resIndex++] = value[valIndex]
                } else if (!isStrict) result.push(value)
            }
            return result
        }

        function baseIsEqual(a, b, callback, isWhere, stackA, stackB) {
            if (callback) {
                var result = callback(a, b);
                if (typeof result != "undefined") return !!result
            }
            if (a === b) return a !== 0 || 1 / a == 1 / b;
            var type = typeof a,
                otherType = typeof b;
            if (a === a && !(a && objectTypes[type]) && !(b && objectTypes[otherType])) return false;
            if (a == null || b == null) return a === b;
            var className = toString.call(a),
                otherClass = toString.call(b);
            if (className == argsClass) className = objectClass;
            if (otherClass == argsClass) otherClass = objectClass;
            if (className != otherClass) return false;
            switch (className) {
                case boolClass:
                case dateClass:
                    return +a == +b;
                case numberClass:
                    return a != +a ? b != +b : a == 0 ? 1 / a == 1 / b : a == +b;
                case regexpClass:
                case stringClass:
                    return a == String(b)
            }
            var isArr = className == arrayClass;
            if (!isArr) {
                var aWrapped = hasOwnProperty.call(a, "__wrapped__"),
                    bWrapped = hasOwnProperty.call(b, "__wrapped__");
                if (aWrapped || bWrapped) return baseIsEqual(aWrapped ? a.__wrapped__ :
                    a, bWrapped ? b.__wrapped__ : b, callback, isWhere, stackA, stackB);
                if (className != objectClass) return false;
                var ctorA = a.constructor,
                    ctorB = b.constructor;
                if (ctorA != ctorB && !(isFunction(ctorA) && ctorA instanceof ctorA && isFunction(ctorB) && ctorB instanceof ctorB) && ("constructor" in a && "constructor" in b)) return false
            }
            var initedStack = !stackA;
            stackA || (stackA = getArray());
            stackB || (stackB = getArray());
            var length = stackA.length;
            while (length--)
                if (stackA[length] == a) return stackB[length] == b;
            var size = 0;
            result = true;
            stackA.push(a);
            stackB.push(b);
            if (isArr) {
                length = a.length;
                size = b.length;
                result = size == length;
                if (result || isWhere)
                    while (size--) {
                        var index = length,
                            value = b[size];
                        if (isWhere)
                            while (index--) {
                                if (result = baseIsEqual(a[index], value, callback, isWhere, stackA, stackB)) break
                            } else if (!(result = baseIsEqual(a[size], value, callback, isWhere, stackA, stackB))) break
                    }
            } else {
                forIn(b, function(value, key, b) {
                    if (hasOwnProperty.call(b, key)) {
                        size++;
                        return result = hasOwnProperty.call(a, key) && baseIsEqual(a[key], value, callback, isWhere, stackA, stackB)
                    }
                });
                if (result &&
                    !isWhere) forIn(a, function(value, key, a) {
                    if (hasOwnProperty.call(a, key)) return result = --size > -1
                })
            }
            stackA.pop();
            stackB.pop();
            if (initedStack) {
                releaseArray(stackA);
                releaseArray(stackB)
            }
            return result
        }

        function baseMerge(object, source, callback, stackA, stackB) {
            (isArray(source) ? forEach : forOwn)(source, function(source, key) {
                var found, isArr, result = source,
                    value = object[key];
                if (source && ((isArr = isArray(source)) || isPlainObject(source))) {
                    var stackLength = stackA.length;
                    while (stackLength--)
                        if (found = stackA[stackLength] == source) {
                            value =
                                stackB[stackLength];
                            break
                        }
                    if (!found) {
                        var isShallow;
                        if (callback) {
                            result = callback(value, source);
                            if (isShallow = typeof result != "undefined") value = result
                        }
                        if (!isShallow) value = isArr ? isArray(value) ? value : [] : isPlainObject(value) ? value : {};
                        stackA.push(source);
                        stackB.push(value);
                        if (!isShallow) baseMerge(value, source, callback, stackA, stackB)
                    }
                } else {
                    if (callback) {
                        result = callback(value, source);
                        if (typeof result == "undefined") result = source
                    }
                    if (typeof result != "undefined") value = result
                }
                object[key] = value
            })
        }

        function baseRandom(min,
            max) {
            return min + floor(nativeRandom() * (max - min + 1))
        }

        function baseUniq(array, isSorted, callback) {
            var index = -1,
                indexOf = getIndexOf(),
                length = array ? array.length : 0,
                result = [];
            var isLarge = !isSorted && length >= largeArraySize && indexOf === baseIndexOf,
                seen = callback || isLarge ? getArray() : result;
            if (isLarge) {
                var cache = createCache(seen);
                indexOf = cacheIndexOf;
                seen = cache
            }
            while (++index < length) {
                var value = array[index],
                    computed = callback ? callback(value, index, array) : value;
                if (isSorted ? !index || seen[seen.length - 1] !== computed : indexOf(seen,
                        computed) < 0) {
                    if (callback || isLarge) seen.push(computed);
                    result.push(value)
                }
            }
            if (isLarge) {
                releaseArray(seen.array);
                releaseObject(seen)
            } else if (callback) releaseArray(seen);
            return result
        }

        function createAggregator(setter) {
            return function(collection, callback, thisArg) {
                var result = {};
                callback = lodash.createCallback(callback, thisArg, 3);
                var index = -1,
                    length = collection ? collection.length : 0;
                if (typeof length == "number")
                    while (++index < length) {
                        var value = collection[index];
                        setter(result, value, callback(value, index, collection),
                            collection)
                    } else forOwn(collection, function(value, key, collection) {
                        setter(result, value, callback(value, key, collection), collection)
                    });
                return result
            }
        }

        function createWrapper(func, bitmask, partialArgs, partialRightArgs, thisArg, arity) {
            var isBind = bitmask & 1,
                isBindKey = bitmask & 2,
                isCurry = bitmask & 4,
                isCurryBound = bitmask & 8,
                isPartial = bitmask & 16,
                isPartialRight = bitmask & 32;
            if (!isBindKey && !isFunction(func)) throw new TypeError;
            if (isPartial && !partialArgs.length) {
                bitmask &= ~16;
                isPartial = partialArgs = false
            }
            if (isPartialRight &&
                !partialRightArgs.length) {
                bitmask &= ~32;
                isPartialRight = partialRightArgs = false
            }
            var bindData = func && func.__bindData__;
            if (bindData && bindData !== true) {
                bindData = slice(bindData);
                if (bindData[2]) bindData[2] = slice(bindData[2]);
                if (bindData[3]) bindData[3] = slice(bindData[3]);
                if (isBind && !(bindData[1] & 1)) bindData[4] = thisArg;
                if (!isBind && bindData[1] & 1) bitmask |= 8;
                if (isCurry && !(bindData[1] & 4)) bindData[5] = arity;
                if (isPartial) push.apply(bindData[2] || (bindData[2] = []), partialArgs);
                if (isPartialRight) unshift.apply(bindData[3] ||
                    (bindData[3] = []), partialRightArgs);
                bindData[1] |= bitmask;
                return createWrapper.apply(null, bindData)
            }
            var creater = bitmask == 1 || bitmask === 17 ? baseBind : baseCreateWrapper;
            return creater([func, bitmask, partialArgs, partialRightArgs, thisArg, arity])
        }

        function escapeHtmlChar(match) {
            return htmlEscapes[match]
        }

        function getIndexOf() {
            var result = (result = lodash.indexOf) === indexOf ? baseIndexOf : result;
            return result
        }

        function isNative(value) {
            return typeof value == "function" && reNative.test(value)
        }
        var setBindData = !defineProperty ?
            noop : function(func, value) {
                descriptor.value = value;
                defineProperty(func, "__bindData__", descriptor)
            };

        function shimIsPlainObject(value) {
            var ctor, result;
            if (!(value && toString.call(value) == objectClass) || (ctor = value.constructor, isFunction(ctor) && !(ctor instanceof ctor))) return false;
            forIn(value, function(value, key) {
                result = key
            });
            return typeof result == "undefined" || hasOwnProperty.call(value, result)
        }

        function unescapeHtmlChar(match) {
            return htmlUnescapes[match]
        }

        function isArguments(value) {
            return value && typeof value ==
                "object" && typeof value.length == "number" && toString.call(value) == argsClass || false
        }
        var isArray = nativeIsArray || function(value) {
            return value && typeof value == "object" && typeof value.length == "number" && toString.call(value) == arrayClass || false
        };
        var shimKeys = function(object) {
            var index, iterable = object,
                result = [];
            if (!iterable) return result;
            if (!objectTypes[typeof object]) return result;
            for (index in iterable)
                if (hasOwnProperty.call(iterable, index)) result.push(index);
            return result
        };
        var keys = !nativeKeys ? shimKeys : function(object) {
            if (!isObject(object)) return [];
            return nativeKeys(object)
        };
        var htmlEscapes = {
            "\x26": "\x26amp;",
            "\x3c": "\x26lt;",
            "\x3e": "\x26gt;",
            '"': "\x26quot;",
            "'": "\x26#39;"
        };
        var htmlUnescapes = invert(htmlEscapes);
        var reEscapedHtml = RegExp("(" + keys(htmlUnescapes).join("|") + ")", "g"),
            reUnescapedHtml = RegExp("[" + keys(htmlEscapes).join("") + "]", "g");
        var assign = function(object, source, guard) {
            var index, iterable = object,
                result = iterable;
            if (!iterable) return result;
            var args = arguments,
                argsIndex = 0,
                argsLength = typeof guard == "number" ? 2 : args.length;
            if (argsLength > 3 &&
                typeof args[argsLength - 2] == "function") var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);
            else if (argsLength > 2 && typeof args[argsLength - 1] == "function") callback = args[--argsLength];
            while (++argsIndex < argsLength) {
                iterable = args[argsIndex];
                if (iterable && objectTypes[typeof iterable]) {
                    var ownIndex = -1,
                        ownProps = objectTypes[typeof iterable] && keys(iterable),
                        length = ownProps ? ownProps.length : 0;
                    while (++ownIndex < length) {
                        index = ownProps[ownIndex];
                        result[index] = callback ? callback(result[index], iterable[index]) :
                            iterable[index]
                    }
                }
            }
            return result
        };

        function clone(value, isDeep, callback, thisArg) {
            if (typeof isDeep != "boolean" && isDeep != null) {
                thisArg = callback;
                callback = isDeep;
                isDeep = false
            }
            return baseClone(value, isDeep, typeof callback == "function" && baseCreateCallback(callback, thisArg, 1))
        }

        function cloneDeep(value, callback, thisArg) {
            return baseClone(value, true, typeof callback == "function" && baseCreateCallback(callback, thisArg, 1))
        }

        function create(prototype, properties) {
            var result = baseCreate(prototype);
            return properties ? assign(result,
                properties) : result
        }
        var defaults = function(object, source, guard) {
            var index, iterable = object,
                result = iterable;
            if (!iterable) return result;
            var args = arguments,
                argsIndex = 0,
                argsLength = typeof guard == "number" ? 2 : args.length;
            while (++argsIndex < argsLength) {
                iterable = args[argsIndex];
                if (iterable && objectTypes[typeof iterable]) {
                    var ownIndex = -1,
                        ownProps = objectTypes[typeof iterable] && keys(iterable),
                        length = ownProps ? ownProps.length : 0;
                    while (++ownIndex < length) {
                        index = ownProps[ownIndex];
                        if (typeof result[index] == "undefined") result[index] =
                            iterable[index]
                    }
                }
            }
            return result
        };

        function findKey(object, callback, thisArg) {
            var result;
            callback = lodash.createCallback(callback, thisArg, 3);
            forOwn(object, function(value, key, object) {
                if (callback(value, key, object)) {
                    result = key;
                    return false
                }
            });
            return result
        }

        function findLastKey(object, callback, thisArg) {
            var result;
            callback = lodash.createCallback(callback, thisArg, 3);
            forOwnRight(object, function(value, key, object) {
                if (callback(value, key, object)) {
                    result = key;
                    return false
                }
            });
            return result
        }
        var forIn = function(collection,
            callback, thisArg) {
            var index, iterable = collection,
                result = iterable;
            if (!iterable) return result;
            if (!objectTypes[typeof iterable]) return result;
            callback = callback && typeof thisArg == "undefined" ? callback : baseCreateCallback(callback, thisArg, 3);
            for (index in iterable)
                if (callback(iterable[index], index, collection) === false) return result;
            return result
        };

        function forInRight(object, callback, thisArg) {
            var pairs = [];
            forIn(object, function(value, key) {
                pairs.push(key, value)
            });
            var length = pairs.length;
            callback = baseCreateCallback(callback,
                thisArg, 3);
            while (length--)
                if (callback(pairs[length--], pairs[length], object) === false) break;
            return object
        }
        var forOwn = function(collection, callback, thisArg) {
            var index, iterable = collection,
                result = iterable;
            if (!iterable) return result;
            if (!objectTypes[typeof iterable]) return result;
            callback = callback && typeof thisArg == "undefined" ? callback : baseCreateCallback(callback, thisArg, 3);
            var ownIndex = -1,
                ownProps = objectTypes[typeof iterable] && keys(iterable),
                length = ownProps ? ownProps.length : 0;
            while (++ownIndex < length) {
                index =
                    ownProps[ownIndex];
                if (callback(iterable[index], index, collection) === false) return result
            }
            return result
        };

        function forOwnRight(object, callback, thisArg) {
            var props = keys(object),
                length = props.length;
            callback = baseCreateCallback(callback, thisArg, 3);
            while (length--) {
                var key = props[length];
                if (callback(object[key], key, object) === false) break
            }
            return object
        }

        function functions(object) {
            var result = [];
            forIn(object, function(value, key) {
                if (isFunction(value)) result.push(key)
            });
            return result.sort()
        }

        function has(object, key) {
            return object ?
                hasOwnProperty.call(object, key) : false
        }

        function invert(object) {
            var index = -1,
                props = keys(object),
                length = props.length,
                result = {};
            while (++index < length) {
                var key = props[index];
                result[object[key]] = key
            }
            return result
        }

        function isBoolean(value) {
            return value === true || value === false || value && typeof value == "object" && toString.call(value) == boolClass || false
        }

        function isDate(value) {
            return value && typeof value == "object" && toString.call(value) == dateClass || false
        }

        function isElement(value) {
            return value && value.nodeType === 1 || false
        }

        function isEmpty(value) {
            var result = true;
            if (!value) return result;
            var className = toString.call(value),
                length = value.length;
            if (className == arrayClass || className == stringClass || className == argsClass || className == objectClass && typeof length == "number" && isFunction(value.splice)) return !length;
            forOwn(value, function() {
                return result = false
            });
            return result
        }

        function isEqual(a, b, callback, thisArg) {
            return baseIsEqual(a, b, typeof callback == "function" && baseCreateCallback(callback, thisArg, 2))
        }

        function isFinite(value) {
            return nativeIsFinite(value) &&
                !nativeIsNaN(parseFloat(value))
        }

        function isFunction(value) {
            return typeof value == "function"
        }

        function isObject(value) {
            return !!(value && objectTypes[typeof value])
        }

        function isNaN(value) {
            return isNumber(value) && value != +value
        }

        function isNull(value) {
            return value === null
        }

        function isNumber(value) {
            return typeof value == "number" || value && typeof value == "object" && toString.call(value) == numberClass || false
        }
        var isPlainObject = !getPrototypeOf ? shimIsPlainObject : function(value) {
            if (!(value && toString.call(value) == objectClass)) return false;
            var valueOf = value.valueOf,
                objProto = isNative(valueOf) && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);
            return objProto ? value == objProto || getPrototypeOf(value) == objProto : shimIsPlainObject(value)
        };

        function isRegExp(value) {
            return value && typeof value == "object" && toString.call(value) == regexpClass || false
        }

        function isString(value) {
            return typeof value == "string" || value && typeof value == "object" && toString.call(value) == stringClass || false
        }

        function isUndefined(value) {
            return typeof value == "undefined"
        }

        function mapValues(object,
            callback, thisArg) {
            var result = {};
            callback = lodash.createCallback(callback, thisArg, 3);
            forOwn(object, function(value, key, object) {
                result[key] = callback(value, key, object)
            });
            return result
        }

        function merge(object) {
            var args = arguments,
                length = 2;
            if (!isObject(object)) return object;
            if (typeof args[2] != "number") length = args.length;
            if (length > 3 && typeof args[length - 2] == "function") var callback = baseCreateCallback(args[--length - 1], args[length--], 2);
            else if (length > 2 && typeof args[length - 1] == "function") callback = args[--length];
            var sources = slice(arguments, 1, length),
                index = -1,
                stackA = getArray(),
                stackB = getArray();
            while (++index < length) baseMerge(object, sources[index], callback, stackA, stackB);
            releaseArray(stackA);
            releaseArray(stackB);
            return object
        }

        function omit(object, callback, thisArg) {
            var result = {};
            if (typeof callback != "function") {
                var props = [];
                forIn(object, function(value, key) {
                    props.push(key)
                });
                props = baseDifference(props, baseFlatten(arguments, true, false, 1));
                var index = -1,
                    length = props.length;
                while (++index < length) {
                    var key = props[index];
                    result[key] = object[key]
                }
            } else {
                callback = lodash.createCallback(callback, thisArg, 3);
                forIn(object, function(value, key, object) {
                    if (!callback(value, key, object)) result[key] = value
                })
            }
            return result
        }

        function pairs(object) {
            var index = -1,
                props = keys(object),
                length = props.length,
                result = Array(length);
            while (++index < length) {
                var key = props[index];
                result[index] = [key, object[key]]
            }
            return result
        }

        function pick(object, callback, thisArg) {
            var result = {};
            if (typeof callback != "function") {
                var index = -1,
                    props = baseFlatten(arguments, true,
                        false, 1),
                    length = isObject(object) ? props.length : 0;
                while (++index < length) {
                    var key = props[index];
                    if (key in object) result[key] = object[key]
                }
            } else {
                callback = lodash.createCallback(callback, thisArg, 3);
                forIn(object, function(value, key, object) {
                    if (callback(value, key, object)) result[key] = value
                })
            }
            return result
        }

        function transform(object, callback, accumulator, thisArg) {
            var isArr = isArray(object);
            if (accumulator == null)
                if (isArr) accumulator = [];
                else {
                    var ctor = object && object.constructor,
                        proto = ctor && ctor.prototype;
                    accumulator = baseCreate(proto)
                }
            if (callback) {
                callback =
                    lodash.createCallback(callback, thisArg, 4);
                (isArr ? forEach : forOwn)(object, function(value, index, object) {
                    return callback(accumulator, value, index, object)
                })
            }
            return accumulator
        }

        function values(object) {
            var index = -1,
                props = keys(object),
                length = props.length,
                result = Array(length);
            while (++index < length) result[index] = object[props[index]];
            return result
        }

        function at(collection) {
            var args = arguments,
                index = -1,
                props = baseFlatten(args, true, false, 1),
                length = args[2] && args[2][args[1]] === collection ? 1 : props.length,
                result = Array(length);
            while (++index < length) result[index] = collection[props[index]];
            return result
        }

        function contains(collection, target, fromIndex) {
            var index = -1,
                indexOf = getIndexOf(),
                length = collection ? collection.length : 0,
                result = false;
            fromIndex = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex) || 0;
            if (isArray(collection)) result = indexOf(collection, target, fromIndex) > -1;
            else if (typeof length == "number") result = (isString(collection) ? collection.indexOf(target, fromIndex) : indexOf(collection, target, fromIndex)) > -1;
            else forOwn(collection,
                function(value) {
                    if (++index >= fromIndex) return !(result = value === target)
                });
            return result
        }
        var countBy = createAggregator(function(result, value, key) {
            hasOwnProperty.call(result, key) ? result[key] ++ : result[key] = 1
        });

        function every(collection, callback, thisArg) {
            var result = true;
            callback = lodash.createCallback(callback, thisArg, 3);
            var index = -1,
                length = collection ? collection.length : 0;
            if (typeof length == "number")
                while (++index < length) {
                    if (!(result = !!callback(collection[index], index, collection))) break
                } else forOwn(collection,
                    function(value, index, collection) {
                        return result = !!callback(value, index, collection)
                    });
            return result
        }

        function filter(collection, callback, thisArg) {
            var result = [];
            callback = lodash.createCallback(callback, thisArg, 3);
            var index = -1,
                length = collection ? collection.length : 0;
            if (typeof length == "number")
                while (++index < length) {
                    var value = collection[index];
                    if (callback(value, index, collection)) result.push(value)
                } else forOwn(collection, function(value, index, collection) {
                    if (callback(value, index, collection)) result.push(value)
                });
            return result
        }

        function find(collection, callback, thisArg) {
            callback = lodash.createCallback(callback, thisArg, 3);
            var index = -1,
                length = collection ? collection.length : 0;
            if (typeof length == "number")
                while (++index < length) {
                    var value = collection[index];
                    if (callback(value, index, collection)) return value
                } else {
                    var result;
                    forOwn(collection, function(value, index, collection) {
                        if (callback(value, index, collection)) {
                            result = value;
                            return false
                        }
                    });
                    return result
                }
        }

        function findLast(collection, callback, thisArg) {
            var result;
            callback = lodash.createCallback(callback,
                thisArg, 3);
            forEachRight(collection, function(value, index, collection) {
                if (callback(value, index, collection)) {
                    result = value;
                    return false
                }
            });
            return result
        }

        function forEach(collection, callback, thisArg) {
            var index = -1,
                length = collection ? collection.length : 0;
            callback = callback && typeof thisArg == "undefined" ? callback : baseCreateCallback(callback, thisArg, 3);
            if (typeof length == "number")
                while (++index < length) {
                    if (callback(collection[index], index, collection) === false) break
                } else forOwn(collection, callback);
            return collection
        }

        function forEachRight(collection, callback, thisArg) {
            var length = collection ? collection.length : 0;
            callback = callback && typeof thisArg == "undefined" ? callback : baseCreateCallback(callback, thisArg, 3);
            if (typeof length == "number")
                while (length--) {
                    if (callback(collection[length], length, collection) === false) break
                } else {
                    var props = keys(collection);
                    length = props.length;
                    forOwn(collection, function(value, key, collection) {
                        key = props ? props[--length] : --length;
                        return callback(collection[key], key, collection)
                    })
                }
            return collection
        }
        var groupBy =
            createAggregator(function(result, value, key) {
                (hasOwnProperty.call(result, key) ? result[key] : result[key] = []).push(value)
            });
        var indexBy = createAggregator(function(result, value, key) {
            result[key] = value
        });

        function invoke(collection, methodName) {
            var args = slice(arguments, 2),
                index = -1,
                isFunc = typeof methodName == "function",
                length = collection ? collection.length : 0,
                result = Array(typeof length == "number" ? length : 0);
            forEach(collection, function(value) {
                result[++index] = (isFunc ? methodName : value[methodName]).apply(value, args)
            });
            return result
        }

        function map(collection, callback, thisArg) {
            var index = -1,
                length = collection ? collection.length : 0;
            callback = lodash.createCallback(callback, thisArg, 3);
            if (typeof length == "number") {
                var result = Array(length);
                while (++index < length) result[index] = callback(collection[index], index, collection)
            } else {
                result = [];
                forOwn(collection, function(value, key, collection) {
                    result[++index] = callback(value, key, collection)
                })
            }
            return result
        }

        function max(collection, callback, thisArg) {
            var computed = -Infinity,
                result = computed;
            if (typeof callback !=
                "function" && thisArg && thisArg[callback] === collection) callback = null;
            if (callback == null && isArray(collection)) {
                var index = -1,
                    length = collection.length;
                while (++index < length) {
                    var value = collection[index];
                    if (value > result) result = value
                }
            } else {
                callback = callback == null && isString(collection) ? charAtCallback : lodash.createCallback(callback, thisArg, 3);
                forEach(collection, function(value, index, collection) {
                    var current = callback(value, index, collection);
                    if (current > computed) {
                        computed = current;
                        result = value
                    }
                })
            }
            return result
        }

        function min(collection,
            callback, thisArg) {
            var computed = Infinity,
                result = computed;
            if (typeof callback != "function" && thisArg && thisArg[callback] === collection) callback = null;
            if (callback == null && isArray(collection)) {
                var index = -1,
                    length = collection.length;
                while (++index < length) {
                    var value = collection[index];
                    if (value < result) result = value
                }
            } else {
                callback = callback == null && isString(collection) ? charAtCallback : lodash.createCallback(callback, thisArg, 3);
                forEach(collection, function(value, index, collection) {
                    var current = callback(value, index, collection);
                    if (current < computed) {
                        computed = current;
                        result = value
                    }
                })
            }
            return result
        }
        var pluck = map;

        function reduce(collection, callback, accumulator, thisArg) {
            if (!collection) return accumulator;
            var noaccum = arguments.length < 3;
            callback = lodash.createCallback(callback, thisArg, 4);
            var index = -1,
                length = collection.length;
            if (typeof length == "number") {
                if (noaccum) accumulator = collection[++index];
                while (++index < length) accumulator = callback(accumulator, collection[index], index, collection)
            } else forOwn(collection, function(value, index, collection) {
                accumulator =
                    noaccum ? (noaccum = false, value) : callback(accumulator, value, index, collection)
            });
            return accumulator
        }

        function reduceRight(collection, callback, accumulator, thisArg) {
            var noaccum = arguments.length < 3;
            callback = lodash.createCallback(callback, thisArg, 4);
            forEachRight(collection, function(value, index, collection) {
                accumulator = noaccum ? (noaccum = false, value) : callback(accumulator, value, index, collection)
            });
            return accumulator
        }

        function reject(collection, callback, thisArg) {
            callback = lodash.createCallback(callback, thisArg, 3);
            return filter(collection, function(value, index, collection) {
                return !callback(value, index, collection)
            })
        }

        function sample(collection, n, guard) {
            if (collection && typeof collection.length != "number") collection = values(collection);
            if (n == null || guard) return collection ? collection[baseRandom(0, collection.length - 1)] : undefined;
            var result = shuffle(collection);
            result.length = nativeMin(nativeMax(0, n), result.length);
            return result
        }

        function shuffle(collection) {
            var index = -1,
                length = collection ? collection.length : 0,
                result = Array(typeof length ==
                    "number" ? length : 0);
            forEach(collection, function(value) {
                var rand = baseRandom(0, ++index);
                result[index] = result[rand];
                result[rand] = value
            });
            return result
        }

        function size(collection) {
            var length = collection ? collection.length : 0;
            return typeof length == "number" ? length : keys(collection).length
        }

        function some(collection, callback, thisArg) {
            var result;
            callback = lodash.createCallback(callback, thisArg, 3);
            var index = -1,
                length = collection ? collection.length : 0;
            if (typeof length == "number")
                while (++index < length) {
                    if (result = callback(collection[index],
                            index, collection)) break
                } else forOwn(collection, function(value, index, collection) {
                    return !(result = callback(value, index, collection))
                });
            return !!result
        }

        function sortBy(collection, callback, thisArg) {
            var index = -1,
                isArr = isArray(callback),
                length = collection ? collection.length : 0,
                result = Array(typeof length == "number" ? length : 0);
            if (!isArr) callback = lodash.createCallback(callback, thisArg, 3);
            forEach(collection, function(value, key, collection) {
                var object = result[++index] = getObject();
                if (isArr) object.criteria = map(callback,
                    function(key) {
                        return value[key]
                    });
                else(object.criteria = getArray())[0] = callback(value, key, collection);
                object.index = index;
                object.value = value
            });
            length = result.length;
            result.sort(compareAscending);
            while (length--) {
                var object = result[length];
                result[length] = object.value;
                if (!isArr) releaseArray(object.criteria);
                releaseObject(object)
            }
            return result
        }

        function toArray(collection) {
            if (collection && typeof collection.length == "number") return slice(collection);
            return values(collection)
        }
        var where = filter;

        function compact(array) {
            var index = -1,
                length = array ? array.length : 0,
                result = [];
            while (++index < length) {
                var value = array[index];
                if (value) result.push(value)
            }
            return result
        }

        function difference(array) {
            return baseDifference(array, baseFlatten(arguments, true, true, 1))
        }

        function findIndex(array, callback, thisArg) {
            var index = -1,
                length = array ? array.length : 0;
            callback = lodash.createCallback(callback, thisArg, 3);
            while (++index < length)
                if (callback(array[index], index, array)) return index;
            return -1
        }

        function findLastIndex(array, callback, thisArg) {
            var length = array ? array.length :
                0;
            callback = lodash.createCallback(callback, thisArg, 3);
            while (length--)
                if (callback(array[length], length, array)) return length;
            return -1
        }

        function first(array, callback, thisArg) {
            var n = 0,
                length = array ? array.length : 0;
            if (typeof callback != "number" && callback != null) {
                var index = -1;
                callback = lodash.createCallback(callback, thisArg, 3);
                while (++index < length && callback(array[index], index, array)) n++
            } else {
                n = callback;
                if (n == null || thisArg) return array ? array[0] : undefined
            }
            return slice(array, 0, nativeMin(nativeMax(0, n), length))
        }

        function flatten(array,
            isShallow, callback, thisArg) {
            if (typeof isShallow != "boolean" && isShallow != null) {
                thisArg = callback;
                callback = typeof isShallow != "function" && thisArg && thisArg[isShallow] === array ? null : isShallow;
                isShallow = false
            }
            if (callback != null) array = map(array, callback, thisArg);
            return baseFlatten(array, isShallow)
        }

        function indexOf(array, value, fromIndex) {
            if (typeof fromIndex == "number") {
                var length = array ? array.length : 0;
                fromIndex = fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex || 0
            } else if (fromIndex) {
                var index = sortedIndex(array,
                    value);
                return array[index] === value ? index : -1
            }
            return baseIndexOf(array, value, fromIndex)
        }

        function initial(array, callback, thisArg) {
            var n = 0,
                length = array ? array.length : 0;
            if (typeof callback != "number" && callback != null) {
                var index = length;
                callback = lodash.createCallback(callback, thisArg, 3);
                while (index-- && callback(array[index], index, array)) n++
            } else n = callback == null || thisArg ? 1 : callback || n;
            return slice(array, 0, nativeMin(nativeMax(0, length - n), length))
        }

        function intersection() {
            var args = [],
                argsIndex = -1,
                argsLength = arguments.length,
                caches = getArray(),
                indexOf = getIndexOf(),
                trustIndexOf = indexOf === baseIndexOf,
                seen = getArray();
            while (++argsIndex < argsLength) {
                var value = arguments[argsIndex];
                if (isArray(value) || isArguments(value)) {
                    args.push(value);
                    caches.push(trustIndexOf && value.length >= largeArraySize && createCache(argsIndex ? args[argsIndex] : seen))
                }
            }
            var array = args[0],
                index = -1,
                length = array ? array.length : 0,
                result = [];
            outer: while (++index < length) {
                var cache = caches[0];
                value = array[index];
                if ((cache ? cacheIndexOf(cache, value) : indexOf(seen, value)) < 0) {
                    argsIndex =
                        argsLength;
                    (cache || seen).push(value);
                    while (--argsIndex) {
                        cache = caches[argsIndex];
                        if ((cache ? cacheIndexOf(cache, value) : indexOf(args[argsIndex], value)) < 0) continue outer
                    }
                    result.push(value)
                }
            }
            while (argsLength--) {
                cache = caches[argsLength];
                if (cache) releaseObject(cache)
            }
            releaseArray(caches);
            releaseArray(seen);
            return result
        }

        function last(array, callback, thisArg) {
            var n = 0,
                length = array ? array.length : 0;
            if (typeof callback != "number" && callback != null) {
                var index = length;
                callback = lodash.createCallback(callback, thisArg, 3);
                while (index-- && callback(array[index], index, array)) n++
            } else {
                n = callback;
                if (n == null || thisArg) return array ? array[length - 1] : undefined
            }
            return slice(array, nativeMax(0, length - n))
        }

        function lastIndexOf(array, value, fromIndex) {
            var index = array ? array.length : 0;
            if (typeof fromIndex == "number") index = (fromIndex < 0 ? nativeMax(0, index + fromIndex) : nativeMin(fromIndex, index - 1)) + 1;
            while (index--)
                if (array[index] === value) return index;
            return -1
        }

        function pull(array) {
            var args = arguments,
                argsIndex = 0,
                argsLength = args.length,
                length = array ?
                array.length : 0;
            while (++argsIndex < argsLength) {
                var index = -1,
                    value = args[argsIndex];
                while (++index < length)
                    if (array[index] === value) {
                        splice.call(array, index--, 1);
                        length--
                    }
            }
            return array
        }

        function range(start, end, step) {
            start = +start || 0;
            step = typeof step == "number" ? step : +step || 1;
            if (end == null) {
                end = start;
                start = 0
            }
            var index = -1,
                length = nativeMax(0, ceil((end - start) / (step || 1))),
                result = Array(length);
            while (++index < length) {
                result[index] = start;
                start += step
            }
            return result
        }

        function remove(array, callback, thisArg) {
            var index = -1,
                length = array ? array.length : 0,
                result = [];
            callback = lodash.createCallback(callback, thisArg, 3);
            while (++index < length) {
                var value = array[index];
                if (callback(value, index, array)) {
                    result.push(value);
                    splice.call(array, index--, 1);
                    length--
                }
            }
            return result
        }

        function rest(array, callback, thisArg) {
            if (typeof callback != "number" && callback != null) {
                var n = 0,
                    index = -1,
                    length = array ? array.length : 0;
                callback = lodash.createCallback(callback, thisArg, 3);
                while (++index < length && callback(array[index], index, array)) n++
            } else n = callback == null ||
                thisArg ? 1 : nativeMax(0, callback);
            return slice(array, n)
        }

        function sortedIndex(array, value, callback, thisArg) {
            var low = 0,
                high = array ? array.length : low;
            callback = callback ? lodash.createCallback(callback, thisArg, 1) : identity;
            value = callback(value);
            while (low < high) {
                var mid = low + high >>> 1;
                callback(array[mid]) < value ? low = mid + 1 : high = mid
            }
            return low
        }

        function union() {
            return baseUniq(baseFlatten(arguments, true, true))
        }

        function uniq(array, isSorted, callback, thisArg) {
            if (typeof isSorted != "boolean" && isSorted != null) {
                thisArg = callback;
                callback = typeof isSorted != "function" && thisArg && thisArg[isSorted] === array ? null : isSorted;
                isSorted = false
            }
            if (callback != null) callback = lodash.createCallback(callback, thisArg, 3);
            return baseUniq(array, isSorted, callback)
        }

        function without(array) {
            return baseDifference(array, slice(arguments, 1))
        }

        function xor() {
            var index = -1,
                length = arguments.length;
            while (++index < length) {
                var array = arguments[index];
                if (isArray(array) || isArguments(array)) var result = result ? baseUniq(baseDifference(result, array).concat(baseDifference(array,
                    result))) : array
            }
            return result || []
        }

        function zip() {
            var array = arguments.length > 1 ? arguments : arguments[0],
                index = -1,
                length = array ? max(pluck(array, "length")) : 0,
                result = Array(length < 0 ? 0 : length);
            while (++index < length) result[index] = pluck(array, index);
            return result
        }

        function zipObject(keys, values) {
            var index = -1,
                length = keys ? keys.length : 0,
                result = {};
            if (!values && length && !isArray(keys[0])) values = [];
            while (++index < length) {
                var key = keys[index];
                if (values) result[key] = values[index];
                else if (key) result[key[0]] = key[1]
            }
            return result
        }

        function after(n, func) {
            if (!isFunction(func)) throw new TypeError;
            return function() {
                if (--n < 1) return func.apply(this, arguments)
            }
        }

        function bind(func, thisArg) {
            return arguments.length > 2 ? createWrapper(func, 17, slice(arguments, 2), null, thisArg) : createWrapper(func, 1, null, null, thisArg)
        }

        function bindAll(object) {
            var funcs = arguments.length > 1 ? baseFlatten(arguments, true, false, 1) : functions(object),
                index = -1,
                length = funcs.length;
            while (++index < length) {
                var key = funcs[index];
                object[key] = createWrapper(object[key], 1, null, null,
                    object)
            }
            return object
        }

        function bindKey(object, key) {
            return arguments.length > 2 ? createWrapper(key, 19, slice(arguments, 2), null, object) : createWrapper(key, 3, null, null, object)
        }

        function compose() {
            var funcs = arguments,
                length = funcs.length;
            while (length--)
                if (!isFunction(funcs[length])) throw new TypeError;
            return function() {
                var args = arguments,
                    length = funcs.length;
                while (length--) args = [funcs[length].apply(this, args)];
                return args[0]
            }
        }

        function curry(func, arity) {
            arity = typeof arity == "number" ? arity : +arity || func.length;
            return createWrapper(func,
                4, null, null, null, arity)
        }

        function debounce(func, wait, options) {
            var args, maxTimeoutId, result, stamp, thisArg, timeoutId, trailingCall, lastCalled = 0,
                maxWait = false,
                trailing = true;
            if (!isFunction(func)) throw new TypeError;
            wait = nativeMax(0, wait) || 0;
            if (options === true) {
                var leading = true;
                trailing = false
            } else if (isObject(options)) {
                leading = options.leading;
                maxWait = "maxWait" in options && (nativeMax(wait, options.maxWait) || 0);
                trailing = "trailing" in options ? options.trailing : trailing
            }
            var delayed = function() {
                var remaining = wait -
                    (now() - stamp);
                if (remaining <= 0) {
                    if (maxTimeoutId) clearTimeout(maxTimeoutId);
                    var isCalled = trailingCall;
                    maxTimeoutId = timeoutId = trailingCall = undefined;
                    if (isCalled) {
                        lastCalled = now();
                        result = func.apply(thisArg, args);
                        if (!timeoutId && !maxTimeoutId) args = thisArg = null
                    }
                } else timeoutId = setTimeout(delayed, remaining)
            };
            var maxDelayed = function() {
                if (timeoutId) clearTimeout(timeoutId);
                maxTimeoutId = timeoutId = trailingCall = undefined;
                if (trailing || maxWait !== wait) {
                    lastCalled = now();
                    result = func.apply(thisArg, args);
                    if (!timeoutId &&
                        !maxTimeoutId) args = thisArg = null
                }
            };
            return function() {
                args = arguments;
                stamp = now();
                thisArg = this;
                trailingCall = trailing && (timeoutId || !leading);
                if (maxWait === false) var leadingCall = leading && !timeoutId;
                else {
                    if (!maxTimeoutId && !leading) lastCalled = stamp;
                    var remaining = maxWait - (stamp - lastCalled),
                        isCalled = remaining <= 0;
                    if (isCalled) {
                        if (maxTimeoutId) maxTimeoutId = clearTimeout(maxTimeoutId);
                        lastCalled = stamp;
                        result = func.apply(thisArg, args)
                    } else if (!maxTimeoutId) maxTimeoutId = setTimeout(maxDelayed, remaining)
                }
                if (isCalled &&
                    timeoutId) timeoutId = clearTimeout(timeoutId);
                else if (!timeoutId && wait !== maxWait) timeoutId = setTimeout(delayed, wait);
                if (leadingCall) {
                    isCalled = true;
                    result = func.apply(thisArg, args)
                }
                if (isCalled && !timeoutId && !maxTimeoutId) args = thisArg = null;
                return result
            }
        }

        function defer(func) {
            if (!isFunction(func)) throw new TypeError;
            var args = slice(arguments, 1);
            return setTimeout(function() {
                func.apply(undefined, args)
            }, 1)
        }

        function delay(func, wait) {
            if (!isFunction(func)) throw new TypeError;
            var args = slice(arguments, 2);
            return setTimeout(function() {
                func.apply(undefined,
                    args)
            }, wait)
        }

        function memoize(func, resolver) {
            if (!isFunction(func)) throw new TypeError;
            var memoized = function() {
                var cache = memoized.cache,
                    key = resolver ? resolver.apply(this, arguments) : keyPrefix + arguments[0];
                return hasOwnProperty.call(cache, key) ? cache[key] : cache[key] = func.apply(this, arguments)
            };
            memoized.cache = {};
            return memoized
        }

        function once(func) {
            var ran, result;
            if (!isFunction(func)) throw new TypeError;
            return function() {
                if (ran) return result;
                ran = true;
                result = func.apply(this, arguments);
                func = null;
                return result
            }
        }

        function partial(func) {
            return createWrapper(func, 16, slice(arguments, 1))
        }

        function partialRight(func) {
            return createWrapper(func, 32, null, slice(arguments, 1))
        }

        function throttle(func, wait, options) {
            var leading = true,
                trailing = true;
            if (!isFunction(func)) throw new TypeError;
            if (options === false) leading = false;
            else if (isObject(options)) {
                leading = "leading" in options ? options.leading : leading;
                trailing = "trailing" in options ? options.trailing : trailing
            }
            debounceOptions.leading = leading;
            debounceOptions.maxWait = wait;
            debounceOptions.trailing =
                trailing;
            return debounce(func, wait, debounceOptions)
        }

        function wrap(value, wrapper) {
            return createWrapper(wrapper, 16, [value])
        }

        function constant(value) {
            return function() {
                return value
            }
        }

        function createCallback(func, thisArg, argCount) {
            var type = typeof func;
            if (func == null || type == "function") return baseCreateCallback(func, thisArg, argCount);
            if (type != "object") return property(func);
            var props = keys(func),
                key = props[0],
                a = func[key];
            if (props.length == 1 && a === a && !isObject(a)) return function(object) {
                var b = object[key];
                return a ===
                    b && (a !== 0 || 1 / a == 1 / b)
            };
            return function(object) {
                var length = props.length,
                    result = false;
                while (length--)
                    if (!(result = baseIsEqual(object[props[length]], func[props[length]], null, true))) break;
                return result
            }
        }

        function escape(string) {
            return string == null ? "" : String(string).replace(reUnescapedHtml, escapeHtmlChar)
        }

        function identity(value) {
            return value
        }

        function mixin(object, source, options) {
            var chain = true,
                methodNames = source && functions(source);
            if (!source || !options && !methodNames.length) {
                if (options == null) options = source;
                ctor = lodashWrapper;
                source = object;
                object = lodash;
                methodNames = functions(source)
            }
            if (options === false) chain = false;
            else if (isObject(options) && "chain" in options) chain = options.chain;
            var ctor = object,
                isFunc = isFunction(ctor);
            forEach(methodNames, function(methodName) {
                var func = object[methodName] = source[methodName];
                if (isFunc) ctor.prototype[methodName] = function() {
                    var chainAll = this.__chain__,
                        value = this.__wrapped__,
                        args = [value];
                    push.apply(args, arguments);
                    var result = func.apply(object, args);
                    if (chain || chainAll) {
                        if (value ===
                            result && isObject(result)) return this;
                        result = new ctor(result);
                        result.__chain__ = chainAll
                    }
                    return result
                }
            })
        }

        function noConflict() {
            context._ = oldDash;
            return this
        }

        function noop() {}
        var now = isNative(now = Date.now) && now || function() {
            return (new Date).getTime()
        };
        var parseInt = nativeParseInt(whitespace + "08") == 8 ? nativeParseInt : function(value, radix) {
            return nativeParseInt(isString(value) ? value.replace(reLeadingSpacesAndZeros, "") : value, radix || 0)
        };

        function property(key) {
            return function(object) {
                return object[key]
            }
        }

        function random(min,
            max, floating) {
            var noMin = min == null,
                noMax = max == null;
            if (floating == null)
                if (typeof min == "boolean" && noMax) {
                    floating = min;
                    min = 1
                } else if (!noMax && typeof max == "boolean") {
                floating = max;
                noMax = true
            }
            if (noMin && noMax) max = 1;
            min = +min || 0;
            if (noMax) {
                max = min;
                min = 0
            } else max = +max || 0;
            if (floating || min % 1 || max % 1) {
                var rand = nativeRandom();
                return nativeMin(min + rand * (max - min + parseFloat("1e-" + ((rand + "").length - 1))), max)
            }
            return baseRandom(min, max)
        }

        function result(object, key) {
            if (object) {
                var value = object[key];
                return isFunction(value) ?
                    object[key]() : value
            }
        }

        function template(text, data, options) {
            var settings = lodash.templateSettings;
            text = String(text || "");
            options = defaults({}, options, settings);
            var imports = defaults({}, options.imports, settings.imports),
                importsKeys = keys(imports),
                importsValues = values(imports);
            var isEvaluating, index = 0,
                interpolate = options.interpolate || reNoMatch,
                source = "__p +\x3d '";
            var reDelimiters = RegExp((options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source +
                "|" + (options.evaluate || reNoMatch).source + "|$", "g");
            text.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
                interpolateValue || (interpolateValue = esTemplateValue);
                source += text.slice(index, offset).replace(reUnescapedString, escapeStringChar);
                if (escapeValue) source += "' +\n__e(" + escapeValue + ") +\n'";
                if (evaluateValue) {
                    isEvaluating = true;
                    source += "';\n" + evaluateValue + ";\n__p +\x3d '"
                }
                if (interpolateValue) source += "' +\n((__t \x3d (" + interpolateValue + ")) \x3d\x3d null ? '' : __t) +\n'";
                index = offset + match.length;
                return match
            });
            source += "';\n";
            var variable = options.variable,
                hasVariable = variable;
            if (!hasVariable) {
                variable = "obj";
                source = "with (" + variable + ") {\n" + source + "\n}\n"
            }
            source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
            source = "function(" + variable + ") {\n" + (hasVariable ? "" : variable + " || (" + variable + " \x3d {});\n") + "var __t, __p \x3d '', __e \x3d _.escape" + (isEvaluating ? ", __j \x3d Array.prototype.join;\n" +
                "function print() { __p +\x3d __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
            var sourceURL = "\n/*\n//# sourceURL\x3d" + (options.sourceURL || "/lodash/template/source[" + templateCounter++ +"]") + "\n*/";
            try {
                var result = Function(importsKeys, "return " + source + sourceURL).apply(undefined, importsValues)
            } catch (e) {
                e.source = source;
                throw e;
            }
            if (data) return result(data);
            result.source = source;
            return result
        }

        function times(n, callback, thisArg) {
            n = (n = +n) > -1 ? n : 0;
            var index = -1,
                result = Array(n);
            callback = baseCreateCallback(callback,
                thisArg, 1);
            while (++index < n) result[index] = callback(index);
            return result
        }

        function unescape(string) {
            return string == null ? "" : String(string).replace(reEscapedHtml, unescapeHtmlChar)
        }

        function uniqueId(prefix) {
            var id = ++idCounter;
            return String(prefix == null ? "" : prefix) + id
        }

        function chain(value) {
            value = new lodashWrapper(value);
            value.__chain__ = true;
            return value
        }

        function tap(value, interceptor) {
            interceptor(value);
            return value
        }

        function wrapperChain() {
            this.__chain__ = true;
            return this
        }

        function wrapperToString() {
            return String(this.__wrapped__)
        }

        function wrapperValueOf() {
            return this.__wrapped__
        }
        lodash.after = after;
        lodash.assign = assign;
        lodash.at = at;
        lodash.bind = bind;
        lodash.bindAll = bindAll;
        lodash.bindKey = bindKey;
        lodash.chain = chain;
        lodash.compact = compact;
        lodash.compose = compose;
        lodash.constant = constant;
        lodash.countBy = countBy;
        lodash.create = create;
        lodash.createCallback = createCallback;
        lodash.curry = curry;
        lodash.debounce = debounce;
        lodash.defaults = defaults;
        lodash.defer = defer;
        lodash.delay = delay;
        lodash.difference = difference;
        lodash.filter = filter;
        lodash.flatten =
            flatten;
        lodash.forEach = forEach;
        lodash.forEachRight = forEachRight;
        lodash.forIn = forIn;
        lodash.forInRight = forInRight;
        lodash.forOwn = forOwn;
        lodash.forOwnRight = forOwnRight;
        lodash.functions = functions;
        lodash.groupBy = groupBy;
        lodash.indexBy = indexBy;
        lodash.initial = initial;
        lodash.intersection = intersection;
        lodash.invert = invert;
        lodash.invoke = invoke;
        lodash.keys = keys;
        lodash.map = map;
        lodash.mapValues = mapValues;
        lodash.max = max;
        lodash.memoize = memoize;
        lodash.merge = merge;
        lodash.min = min;
        lodash.omit = omit;
        lodash.once = once;
        lodash.pairs =
            pairs;
        lodash.partial = partial;
        lodash.partialRight = partialRight;
        lodash.pick = pick;
        lodash.pluck = pluck;
        lodash.property = property;
        lodash.pull = pull;
        lodash.range = range;
        lodash.reject = reject;
        lodash.remove = remove;
        lodash.rest = rest;
        lodash.shuffle = shuffle;
        lodash.sortBy = sortBy;
        lodash.tap = tap;
        lodash.throttle = throttle;
        lodash.times = times;
        lodash.toArray = toArray;
        lodash.transform = transform;
        lodash.union = union;
        lodash.uniq = uniq;
        lodash.values = values;
        lodash.where = where;
        lodash.without = without;
        lodash.wrap = wrap;
        lodash.xor = xor;
        lodash.zip = zip;
        lodash.zipObject = zipObject;
        lodash.collect = map;
        lodash.drop = rest;
        lodash.each = forEach;
        lodash.eachRight = forEachRight;
        lodash.extend = assign;
        lodash.methods = functions;
        lodash.object = zipObject;
        lodash.select = filter;
        lodash.tail = rest;
        lodash.unique = uniq;
        lodash.unzip = zip;
        mixin(lodash);
        lodash.clone = clone;
        lodash.cloneDeep = cloneDeep;
        lodash.contains = contains;
        lodash.escape = escape;
        lodash.every = every;
        lodash.find = find;
        lodash.findIndex = findIndex;
        lodash.findKey = findKey;
        lodash.findLast = findLast;
        lodash.findLastIndex =
            findLastIndex;
        lodash.findLastKey = findLastKey;
        lodash.has = has;
        lodash.identity = identity;
        lodash.indexOf = indexOf;
        lodash.isArguments = isArguments;
        lodash.isArray = isArray;
        lodash.isBoolean = isBoolean;
        lodash.isDate = isDate;
        lodash.isElement = isElement;
        lodash.isEmpty = isEmpty;
        lodash.isEqual = isEqual;
        lodash.isFinite = isFinite;
        lodash.isFunction = isFunction;
        lodash.isNaN = isNaN;
        lodash.isNull = isNull;
        lodash.isNumber = isNumber;
        lodash.isObject = isObject;
        lodash.isPlainObject = isPlainObject;
        lodash.isRegExp = isRegExp;
        lodash.isString =
            isString;
        lodash.isUndefined = isUndefined;
        lodash.lastIndexOf = lastIndexOf;
        lodash.mixin = mixin;
        lodash.noConflict = noConflict;
        lodash.noop = noop;
        lodash.now = now;
        lodash.parseInt = parseInt;
        lodash.random = random;
        lodash.reduce = reduce;
        lodash.reduceRight = reduceRight;
        lodash.result = result;
        lodash.runInContext = runInContext;
        lodash.size = size;
        lodash.some = some;
        lodash.sortedIndex = sortedIndex;
        lodash.template = template;
        lodash.unescape = unescape;
        lodash.uniqueId = uniqueId;
        lodash.all = every;
        lodash.any = some;
        lodash.detect = find;
        lodash.findWhere =
            find;
        lodash.foldl = reduce;
        lodash.foldr = reduceRight;
        lodash.include = contains;
        lodash.inject = reduce;
        mixin(function() {
            var source = {};
            forOwn(lodash, function(func, methodName) {
                if (!lodash.prototype[methodName]) source[methodName] = func
            });
            return source
        }(), false);
        lodash.first = first;
        lodash.last = last;
        lodash.sample = sample;
        lodash.take = first;
        lodash.head = first;
        forOwn(lodash, function(func, methodName) {
            var callbackable = methodName !== "sample";
            if (!lodash.prototype[methodName]) lodash.prototype[methodName] = function(n, guard) {
                var chainAll =
                    this.__chain__,
                    result = func(this.__wrapped__, n, guard);
                return !chainAll && (n == null || guard && !(callbackable && typeof n == "function")) ? result : new lodashWrapper(result, chainAll)
            }
        });
        lodash.VERSION = "2.4.1";
        lodash.prototype.chain = wrapperChain;
        lodash.prototype.toString = wrapperToString;
        lodash.prototype.value = wrapperValueOf;
        lodash.prototype.valueOf = wrapperValueOf;
        forEach(["join", "pop", "shift"], function(methodName) {
            var func = arrayRef[methodName];
            lodash.prototype[methodName] = function() {
                var chainAll = this.__chain__,
                    result =
                    func.apply(this.__wrapped__, arguments);
                return chainAll ? new lodashWrapper(result, chainAll) : result
            }
        });
        forEach(["push", "reverse", "sort", "unshift"], function(methodName) {
            var func = arrayRef[methodName];
            lodash.prototype[methodName] = function() {
                func.apply(this.__wrapped__, arguments);
                return this
            }
        });
        forEach(["concat", "slice", "splice"], function(methodName) {
            var func = arrayRef[methodName];
            lodash.prototype[methodName] = function() {
                return new lodashWrapper(func.apply(this.__wrapped__, arguments), this.__chain__)
            }
        });
        return lodash
    }
    var _ = runInContext();
    if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
        root._ = _;
        define(function() {
            return _
        })
    } else if (freeExports && freeModule)
        if (moduleExports)(freeModule.exports = _)._ = _;
        else freeExports._ = _;
    else root._ = _
}).call(this);
var NPC = NPC || {};
$(function() {
    var insertScript = function(src, callback) {
        var node = document.createElement("script");
        node.type = "text/javascript";
        node.async = 1;
        node.src = src;
        node.onload = node.onreadystatechange = function(_, isAbort) {
            if (isAbort || !node.readyState || /loaded|complete/.test(node.readyState)) {
                node.onload = node.onreadystatechange = null;
                if (node.parentNode) node.parentNode.removeChild(node);
                node = null;
                if (!isAbort) callback()
            }
        };
        var s = document.getElementsByTagName("script")[0];
        /*s.parentNode.appendChild(node)*/
    };
    var baseUrl = NPC.botclientJsUrl;
    $(window).on("load", function() {
        insertScript(baseUrl, function() {
            initMetabot({})
        })
    })
});
var NPC = NPC || {};
NPC.menuBurger = NPC.menuBurger || {};
NPC.menuBurger.arborescence = NPC.menuBurger.arborescence || [];
NPC.menuBurger.niveaux = NPC.menuBurger.niveaux || [];
NPC.menuBurger.itemsChoisi = NPC.menuBurger.itemsChoisi || [];
NPC.header = NPC.header || {};
NPC.header.redirectLogin = NPC.header.redirectLogin || [];
NPC.header.redirectLogin = undefined;
$(document).ready(function() {
    initMenuBurgerConnecte(NPC.menuBurger.arborescence)
});

function initMenuBurgerConnecte(itemsMenu) {
    majItemMenuBurgerConnecte(itemsMenu, undefined, true);
    majLienMenu()
}

function majMenuBurgerConnecte(index, itemMenuChoisi, modeAjout) {
    majDonneesGestionMenuBurgerConnecte(index, itemMenuChoisi, modeAjout);
    var item = getDonneesGestionMenuBurgerConnecte();
    majItemMenuBurgerConnecte(item.itemsMenu, item.itemChoisi);
    majLienMenu(item.niveau)
}

function majDonneesGestionMenuBurgerConnecte(index, itemChoisi, modeAjout) {
    if (modeAjout) {
        NPC.menuBurger.niveaux.push(index);
        NPC.menuBurger.itemsChoisi.push(itemChoisi)
    } else {
        NPC.menuBurger.niveaux.splice(-1);
        NPC.menuBurger.itemsChoisi.splice(-1)
    }
}

function getDonneesGestionMenuBurgerConnecte() {
    var item = {};
    var init = false;
    var itemArbo;
    var indexItemChoisi = 0;
    if (NPC.menuBurger.niveaux.length === 0) item.itemsMenu = NPC.menuBurger.arborescence;
    else {
        for (var i = 0; i < NPC.menuBurger.niveaux.length; i++) {
            if (!init) {
                itemArbo = NPC.menuBurger.arborescence[NPC.menuBurger.niveaux[i]];
                init = true
            } else itemArbo = itemArbo.enfants[NPC.menuBurger.niveaux[i]];
            item.itemChoisi = NPC.menuBurger.itemsChoisi[indexItemChoisi];
            indexItemChoisi++
        }
        item.itemsMenu = itemArbo.enfants
    }
    return item
}

function majItemMenuBurgerConnecte(itemsMenu, itemMenuChoisi) {
    $(".item-menu-burger-connecte").remove();
    $(".item-sous-menu-burger-connecte").remove();
    if (itemMenuChoisi !== undefined) {
        index = 0;
        addItemMenuMobileConnecte(itemMenuChoisi, false, true)
    }
    index = 0;
    for (var i = 0; i < itemsMenu.length; i++) addItemMenuMobileConnecte(itemsMenu[i], true, false);
    $(".item-menu-burger-connecte").click(function(event) {
        event.preventDefault();
        event.stopPropagation();
        var enfants = $(this).data("enfants");
        if (enfants === undefined || enfants.length ===
            0) window.location.href = $(this).find("a").attr("href");
        else {
            var ancienItem = {};
            ancienItem.titre = $(this).find("a").text();
            ancienItem.url = $(this).find("a").attr("href");
            ancienItem.enfants = [];
            majMenuBurgerConnecte($(this).data("index"), ancienItem, true)
        }
    })
}

function toggleAffichageNosConseils(affichage) {
    if (affichage) $(".item-menu-nos-conseils").show();
    else $(".item-menu-nos-conseils").hide()
}

function majLienMenu() {
    var template = "";
    if (NPC.menuBurger.niveaux.length === 0) {
        template = "#template-je-ne-suis-pas";
        toggleAffichageNosConseils(true)
    } else {
        template = "#template-retour-menu-mobile";
        toggleAffichageNosConseils(false)
    }
    $(".lien-menu-mobile-connecte").click(function() {
        majMenuBurgerConnecte(undefined, undefined, false)
    });
    $("#a-masque-menu-marche-show").click(function() {
        $("#masque-menu-tab").hide();
        $("#masque-menu-marche-tab").show()
    })
}
var index = 0;

function addItemMenuMobileConnecte(noeud, ajoutIndex, ajoutSousMenuNonCliquable) {
        if (ajoutSousMenuNonCliquable && NPC.menuBurger.niveaux.length === 1) $("#menu-mobile-connecte").loadTemplate($("#template-item-menu-mobile-connecte-non-cliquable"), {
            noeudMenuTitre: noeud.titre
        }, {
            append: true
        });
        else $("#menu-mobile-connecte").loadTemplate($("#template-item-menu-mobile-connecte"), {
            noeudMenuHref: noeud.url,
            noeudMenuTitre: noeud.titre
        }, {
            append: true,
            beforeInsert: function($elem) {
                $elem.data("enfants", noeud.enfants);
                if (ajoutIndex) {
                    $elem.data("index",
                        index);
                    index++
                }
            }
        })
    }
    (function(window, document, undefined) {
        var tests = [];
        var ModernizrProto = {
            _version: "3.6.0",
            _config: {
                "classPrefix": "",
                "enableClasses": true,
                "enableJSClass": true,
                "usePrefixes": true
            },
            _q: [],
            on: function(test, cb) {
                var self = this;
                setTimeout(function() {
                    cb(self[test])
                }, 0)
            },
            addTest: function(name, fn, options) {
                tests.push({
                    name: name,
                    fn: fn,
                    options: options
                })
            },
            addAsyncTest: function(fn) {
                tests.push({
                    name: null,
                    fn: fn
                })
            }
        };
        var Modernizr = function() {};
        Modernizr.prototype = ModernizrProto;
        Modernizr = new Modernizr;
        var classes = [];

        function is(obj,
            type) {
            return typeof obj === type
        }

        function testRunner() {
            var featureNames;
            var feature;
            var aliasIdx;
            var result;
            var nameIdx;
            var featureName;
            var featureNameSplit;
            for (var featureIdx in tests)
                if (tests.hasOwnProperty(featureIdx)) {
                    featureNames = [];
                    feature = tests[featureIdx];
                    if (feature.name) {
                        featureNames.push(feature.name.toLowerCase());
                        if (feature.options && feature.options.aliases && feature.options.aliases.length)
                            for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) featureNames.push(feature.options.aliases[aliasIdx].toLowerCase())
                    }
                    result =
                        is(feature.fn, "function") ? feature.fn() : feature.fn;
                    for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {
                        featureName = featureNames[nameIdx];
                        featureNameSplit = featureName.split(".");
                        if (featureNameSplit.length === 1) Modernizr[featureNameSplit[0]] = result;
                        else {
                            if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
                            Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result
                        }
                        classes.push((result ? "" : "no-") +
                            featureNameSplit.join("-"))
                    }
                }
        }
        var docElement = document.documentElement;
        var isSVG = docElement.nodeName.toLowerCase() === "svg";

        function setClasses(classes) {
            var className = docElement.className;
            var classPrefix = Modernizr._config.classPrefix || "";
            if (isSVG) className = className.baseVal;
            if (Modernizr._config.enableJSClass) {
                var reJS = new RegExp("(^|\\s)" + classPrefix + "no-js(\\s|$)");
                className = className.replace(reJS, "$1" + classPrefix + "js$2")
            }
            if (Modernizr._config.enableClasses) {
                className += " " + classPrefix + classes.join(" " +
                    classPrefix);
                if (isSVG) docElement.className.baseVal = className;
                else docElement.className = className
            }
        }
        var omPrefixes = "Moz O ms Webkit";
        var cssomPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.split(" ") : [];
        ModernizrProto._cssomPrefixes = cssomPrefixes;

        function contains(str, substr) {
            return !!~("" + str).indexOf(substr)
        }

        function createElement() {
            if (typeof document.createElement !== "function") return document.createElement(arguments[0]);
            else if (isSVG) return document.createElementNS.call(document, "http://www.w3.org/2000/svg",
                arguments[0]);
            else return document.createElement.apply(document, arguments)
        }
        var modElem = {
            elem: createElement("modernizr")
        };
        Modernizr._q.push(function() {
            delete modElem.elem
        });
        var mStyle = {
            style: modElem.elem.style
        };
        Modernizr._q.unshift(function() {
            delete mStyle.style
        });

        function getBody() {
            var body = document.body;
            if (!body) {
                body = createElement(isSVG ? "svg" : "body");
                body.fake = true
            }
            return body
        }

        function injectElementWithStyles(rule, callback, nodes, testnames) {
            var mod = "modernizr";
            var style;
            var ret;
            var node;
            var docOverflow;
            var div = createElement("div");
            var body = getBody();
            if (parseInt(nodes, 10))
                while (nodes--) {
                    node = createElement("div");
                    node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
                    div.appendChild(node)
                }
            style = createElement("style");
            style.type = "text/css";
            style.id = "s" + mod;
            (!body.fake ? div : body).appendChild(style);
            body.appendChild(div);
            if (style.styleSheet) style.styleSheet.cssText = rule;
            else style.appendChild(document.createTextNode(rule));
            div.id = mod;
            if (body.fake) {
                body.style.background = "";
                body.style.overflow = "hidden";
                docOverflow =
                    docElement.style.overflow;
                docElement.style.overflow = "hidden";
                docElement.appendChild(body)
            }
            ret = callback(div, rule);
            if (body.fake) {
                body.parentNode.removeChild(body);
                docElement.style.overflow = docOverflow;
                docElement.offsetHeight
            } else div.parentNode.removeChild(div);
            return !!ret
        }

        function domToCSS(name) {
            return name.replace(/([A-Z])/g, function(str, m1) {
                return "-" + m1.toLowerCase()
            }).replace(/^ms-/, "-ms-")
        }

        function computedStyle(elem, pseudo, prop) {
            var result;
            if ("getComputedStyle" in window) {
                result = getComputedStyle.call(window,
                    elem, pseudo);
                var console = window.console;
                if (result !== null) {
                    if (prop) result = result.getPropertyValue(prop)
                } else if (console) {
                    var method = console.error ? "error" : "log";
                    console[method].call(console, "getComputedStyle returning null, its possible modernizr test results are inaccurate")
                }
            } else result = !pseudo && elem.currentStyle && elem.currentStyle[prop];
            return result
        }

        function nativeTestProps(props, value) {
            var i = props.length;
            if ("CSS" in window && "supports" in window.CSS) {
                while (i--)
                    if (window.CSS.supports(domToCSS(props[i]),
                            value)) return true;
                return false
            } else if ("CSSSupportsRule" in window) {
                var conditionText = [];
                while (i--) conditionText.push("(" + domToCSS(props[i]) + ":" + value + ")");
                conditionText = conditionText.join(" or ");
                return injectElementWithStyles("@supports (" + conditionText + ") { #modernizr { position: absolute; } }", function(node) {
                    return computedStyle(node, null, "position") == "absolute"
                })
            }
            return undefined
        }

        function cssToDOM(name) {
            return name.replace(/([a-z])-([a-z])/g, function(str, m1, m2) {
                return m1 + m2.toUpperCase()
            }).replace(/^-/,
                "")
        }

        function testProps(props, prefixed, value, skipValueTest) {
            skipValueTest = is(skipValueTest, "undefined") ? false : skipValueTest;
            if (!is(value, "undefined")) {
                var result = nativeTestProps(props, value);
                if (!is(result, "undefined")) return result
            }
            var afterInit, i, propsLength, prop, before;
            var elems = ["modernizr", "tspan", "samp"];
            while (!mStyle.style && elems.length) {
                afterInit = true;
                mStyle.modElem = createElement(elems.shift());
                mStyle.style = mStyle.modElem.style
            }

            function cleanElems() {
                if (afterInit) {
                    delete mStyle.style;
                    delete mStyle.modElem
                }
            }
            propsLength = props.length;
            for (i = 0; i < propsLength; i++) {
                prop = props[i];
                before = mStyle.style[prop];
                if (contains(prop, "-")) prop = cssToDOM(prop);
                if (mStyle.style[prop] !== undefined)
                    if (!skipValueTest && !is(value, "undefined")) {
                        try {
                            mStyle.style[prop] = value
                        } catch (e) {}
                        if (mStyle.style[prop] != before) {
                            cleanElems();
                            return prefixed == "pfx" ? prop : true
                        }
                    } else {
                        cleanElems();
                        return prefixed == "pfx" ? prop : true
                    }
            }
            cleanElems();
            return false
        }
        var domPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(" ") : [];
        ModernizrProto._domPrefixes =
            domPrefixes;

        function fnBind(fn, that) {
            return function() {
                return fn.apply(that, arguments)
            }
        }

        function testDOMProps(props, obj, elem) {
            var item;
            for (var i in props)
                if (props[i] in obj) {
                    if (elem === false) return props[i];
                    item = obj[props[i]];
                    if (is(item, "function")) return fnBind(item, elem || obj);
                    return item
                }
            return false
        }

        function testPropsAll(prop, prefixed, elem, value, skipValueTest) {
            var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
                props = (prop + " " + cssomPrefixes.join(ucProp + " ") + ucProp).split(" ");
            if (is(prefixed, "string") ||
                is(prefixed, "undefined")) return testProps(props, prefixed, value, skipValueTest);
            else {
                props = (prop + " " + domPrefixes.join(ucProp + " ") + ucProp).split(" ");
                return testDOMProps(props, prefixed, elem)
            }
        }
        ModernizrProto.testAllProps = testPropsAll;
        var atRule = function(prop) {
            var length = prefixes.length;
            var cssrule = window.CSSRule;
            var rule;
            if (typeof cssrule === "undefined") return undefined;
            if (!prop) return false;
            prop = prop.replace(/^@/, "");
            rule = prop.replace(/-/g, "_").toUpperCase() + "_RULE";
            if (rule in cssrule) return "@" + prop;
            for (var i = 0; i < length; i++) {
                var prefix = prefixes[i];
                var thisRule = prefix.toUpperCase() + "_" + rule;
                if (thisRule in cssrule) return "@-" + prefix.toLowerCase() + "-" + prop
            }
            return false
        };
        ModernizrProto.atRule = atRule;
        var prefixed = ModernizrProto.prefixed = function(prop, obj, elem) {
            if (prop.indexOf("@") === 0) return atRule(prop);
            if (prop.indexOf("-") != -1) prop = cssToDOM(prop);
            if (!obj) return testPropsAll(prop, "pfx");
            else return testPropsAll(prop, obj, elem)
        };
        Modernizr.addTest("backgroundblendmode", prefixed("backgroundBlendMode",
            "text"));
        Modernizr.addTest("capture", "capture" in createElement("input"));

        function testAllProps(prop, value, skipValueTest) {
            return testPropsAll(prop, undefined, undefined, value, skipValueTest)
        }
        ModernizrProto.testAllProps = testAllProps;
        Modernizr.addTest("flexbox", testAllProps("flexBasis", "1px", true));
        Modernizr.addTest("flexwrap", testAllProps("flexWrap", "wrap", true));
        testRunner();
        setClasses(classes);
        delete ModernizrProto.addTest;
        delete ModernizrProto.addAsyncTest;
        for (var i = 0; i < Modernizr._q.length; i++) Modernizr._q[i]();
        window.Modernizr = Modernizr
    })(window, document);
/*var NPC = NPC || {};

(function(NPC) {
    var COMPATIBILITE_OK = "ok";
    var COMPATIBILITE_KO = "ko";
    var COMPATIBILITE_PARTIEL = "partiel";

    function PatternNavigateur(nom, regexs, versionPartiellementCompatible, versionCompatible) {
        if (!(this instanceof PatternNavigateur)) return new PatternNavigateur(nom, regexs, versionPartiellementCompatible, versionCompatible);
        var patterns;
        if (Array.prototype.isArray && Array.isArray(regexs) || !Array.prototype.isArray && Object.prototype.toString.call(regexs) === "[object Array]") patterns = regexs;
        else patterns = [regexs];

        function verifierCompatibilite(version) {
            var compatibilite = COMPATIBILITE_OK;
            if (version)
                if (versionPartiellementCompatible)
                    if (version < versionPartiellementCompatible) compatibilite = COMPATIBILITE_KO;
                    else if (versionCompatible)
                if (version < versionCompatible) compatibilite = COMPATIBILITE_PARTIEL;
                else compatibilite = COMPATIBILITE_OK;
            else compatibilite = COMPATIBILITE_PARTIEL;
            else if (versionCompatible)
                if (version < versionCompatible) compatibilite = COMPATIBILITE_KO;
                else compatibilite = COMPATIBILITE_OK;
            return compatibilite
        }
        this.extraireInformationNavigateur = function(userAgent) {
            var informationNavigateur;
            var match;
            for (var i = 0; !match && i < patterns.length; i++) match = patterns[i].exec(userAgent);
            if (match && match.length > 2 && !isNaN(match[2])) {
                var version = parseFloat(match[2]);
                var compatibilite = verifierCompatibilite(version);
                informationNavigateur = {
                    nom: nom,
                    version: version,
                    incompatible: compatibilite === COMPATIBILITE_KO,
                    partiellementCompatible: compatibilite === COMPATIBILITE_PARTIEL
                }
            }
            return informationNavigateur
        }
    }

    function PatternOS(nom,
        regex, userAgent) {
        if (!(this instanceof PatternOS)) return new PatternOS(nom, regex, userAgent);
        this.nom = nom;
        this.valide = regex.test(userAgent)
    }
    var patternsNavigateur = [
    new PatternNavigateur("uc browser", /(UCBrowser)+[/\s]*([\d]+\.[\d]*)([\.\d]+)/, 
        /*NPC.versionNavigateur.uc_browser_partiellement_compatible, */
        /*NPC.versionNavigateur.uc_browser_compatible), 
    new PatternNavigateur("samsung internet", /(SamsungBrowser)+[/\s]([\d]+.[\d]*)/, 
        NPC.versionNavigateur.samsung_internet_partiellement_compatible, 
        NPC.versionNavigateur.samsung_internet_compatible),
    new PatternNavigateur("iOS safari", /(Version)[/]*([\d]+\.[\d]*)([\.\d]+)*\sMobile[/].*\s(Safari)/, 
        NPC.versionNavigateur.ios_safari_partiellement_compatible, 
        NPC.versionNavigateur.ios_safari_compatible), 
    new PatternNavigateur("chrome android", /(Chrome)[/]*(\d+)\.(\d+)\.(\d+)\.(\d+)*\sMobile.*/
    //, 
       /* NPC.versionNavigateur.chrome_android_partiellement_compatible, 
        NPC.versionNavigateur.chrome_android_compatible), 
    new PatternNavigateur("firefox android", /(?:Mobile|Tablet);.*(Firefox)+[/\s]([\d]+.[\d]*)/, 
        NPC.versionNavigateur.firefox_android_partiellement_compatible,
        NPC.versionNavigateur.firefox_android_compatible), 
    new PatternNavigateur("ie mobile", /(IEMobile)[ /](\d+)\.(\d+)/, 
        NPC.versionNavigateur.ie_mobile_partiellement_compatible,
        NPC.versionNavigateur.ie_mobile_compatible), 
    new PatternNavigateur("edge", /(Edge)+[/\s]([\d]+.[\d]*)/, 
        NPC.versionNavigateur.edge_partiellement_compatible, 
        NPC.versionNavigateur.edge_compatible), 
    new PatternNavigateur("opera", /(Opera).*Version[/]*([\d]+.[\d]*)|(Opera)+[/\s]([\d]+.[\d]*)/, 
        NPC.versionNavigateur.opera_partiellement_compatible,
        NPC.versionNavigateur.opera_compatible), 
    new PatternNavigateur("safari", /(Version)[/]*([\d]+\.[\d]*)([\.\d]+)*[/\s](Safari)/, 
        NPC.versionNavigateur.safari_partiellement_compatible, 
        NPC.versionNavigateur.safari_compatible), new PatternNavigateur("ie", [/(MSIE)+[/\s]([\d]+.[\d]*)/, /(Trident).*rv[:]*([\d]+.[\d]*)/], 
        NPC.versionNavigateur.ie_partiellement_compatible, 
        NPC.versionNavigateur.ie_compatible), new PatternNavigateur("chrome", /(Chrome)+[/\s]([\d]+.[\d]*)/, 
        NPC.versionNavigateur.chrome_partiellement_compatible,
        NPC.versionNavigateur.chrome_compatible), 
    new PatternNavigateur("firefox", /(Firefox)+[/\s]([\d]+.[\d]*)/, 
        NPC.versionNavigateur.firefox_partiellement_compatible, 
        NPC.versionNavigateur.firefox_compatible)
    ];
    var userAgent = window && window.navigator && window.navigator.userAgent ? window.navigator.userAgent : "";
    var patternsOS = [new PatternOS("android", /android/i, userAgent), new PatternOS("iOS", /iP(hone|od|ad)/i, userAgent), new PatternOS("windowsMobile", /Windows (Phone|CE)/i, userAgent), new PatternOS("windows", /windows|win32/i,
        userAgent), new PatternOS("macOS", /macintosh|mac os x/i, userAgent), new PatternOS("linux", /linux/i, userAgent)];
    var regexCategorie = /Mobile|Windows (Phone|CE)|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/;
    var isMobile = regexCategorie.test(userAgent);
    var informationNavigateur;
    for (var i = 0; !informationNavigateur && i < patternsNavigateur.length; i++) informationNavigateur = patternsNavigateur[i].extraireInformationNavigateur(userAgent);
    if (!informationNavigateur)
        if (isMobile) informationNavigateur = {
            nom: "mobile",
            version: 0,
            incompatible: false,
            partiellementCompatible: false
        };
        else informationNavigateur = {
            nom: "autre",
            version: 0,
            incompatible: false,
            partiellementCompatible: false
        };
    informationNavigateur.mobile = isMobile;
    informationNavigateur.desktop = !isMobile;
    for (var i = 0; i < patternsOS.length; i++) informationNavigateur[patternsOS[i].nom] = patternsOS[i].valide;
    NPC.informationNavigateur = informationNavigateur
})(NPC);
var NPC = NPC || {};
(function(NPC) {
    NPC.$_GET = function(param) {
        var vars = {};
        window.location.href.replace(location.hash, "").replace(/[?&]+([^=&]+)=?([^&]*)?/gi, function(m, key, value) {
            vars[key] = value !== undefined ? value : ""
        });
        if (param) return vars[param] ? vars[param] : null;
        return vars
    };
    var checkCookie = {
        cookieAttribute: "checkcookie",
        modalCookie: "#cookieDisabledModal",
        modalLoader: "#cookiesLoader",
        pageLogin: "/acceder-a-mes-comptes",
        currentPath: window.location.href,
        inbentaSearchPrefixe: "?search\x3d",
        isCookieEnabled: function() {
            try {
                document.cookie =
                    this.cookieAttribute + "\x3d1";
                localStorage.setItem(this.cookieAttribute, "1");
                var ret = document.cookie.indexOf(this.cookieAttribute) !== -1 && localStorage.getItem(this.cookieAttribute).length !== 0;
                document.cookie = this.cookieAttribute + "\x3d1; expires\x3dThu, 01-Jan-1970 00:00:01 GMT";
                localStorage.removeItem(this.cookieAttribute);
                return ret
            } catch (e) {
                return false
            }
        },
        showLoaderModal: function(visible) {
            if (visible) {
                $("body").append('\x3cdiv id\x3d"cookiesLoader" class\x3d"loader loader--modal" role\x3d"dialog"  data-backdrop\x3d"static" data-keyboard\x3d"false" \x3e\x3c/div\x3e');
                $(this.modalLoader).modal()
            } else $(this.modalLoader).modal("hide")
        },
        showCookieFail: function() {
            var errorMsg = "Malheureusement, votre configuration de navigation actuelle ne vous permet pas de naviguer dans de bonnes conditions. Vous ne pourrez pas profiter de toutes les fonctionnalit\u00e9s de notre site ni acc\u00e9der \u00e0 votre espace client. Nous vous invitons \u00e0 v\u00e9rifier les configurations de votre navigateur afin de permettre aux cookies techniques du site d'\u00eatre accept\u00e9s.";
            $("body").append('\x3cdiv id\x3d"cookieDisabledModal" class\x3d"modal fade Modal" role\x3d"dialog"\x3e\x3cdiv class\x3d"Modal-dialog"\x3e\x3cdiv class\x3d"Modal-content"\x3e\x3cdiv class\x3d"Modal-header"\x3e\x3c/div\x3e\x3cdiv class\x3d"Modal-body" role\x3d"alertdialog" aria-modal\x3d"true" tabindex\x3d"1"\x3e\x3cp class\x3d"text-justify"\x3e' + errorMsg + "\x3c/p\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e");
            $(this.modalCookie).modal({
                backdrop: "static",
                keyboard: false
            })
        },
        getSearchParams: function(params) {
            return this.inbentaSearchPrefixe +
                params
        },
        getMarchePath: function() {
            return NPC.urlLiveCopyCaisse + NPC.utilisateur.marche + ".html"
        },
        event: function() {
            $(document).on("click", "#lienParams", function(e) {
                e.stopPropagation();
                window.location.href = checkCookie.getMarchePath() + checkCookie.getSearchParams("cookies")
            })
        },
        init: function() {
            this.event();
            return this.isCookieEnabled() || this.showCookieFail()
        }
    };
    var inbentaSearch = {
        searchQuestion: NPC.$_GET("search"),
        searchBtn: "#ct001-search",
        searchKeywordBloc: "#question",
        searchSubmitBtn: "#search-form",
        init: function() {
            if (this.searchQuestion) {
                $(this.searchKeywordBloc).val(this.searchQuestion);
                $(this.searchSubmitBtn).submit();
                window.history.pushState("", "", location.protocol + "//" + location.host + location.pathname);
                return true
            }
            return false
        }
    };
    $(function() {
        function waitForElement(counter) {
            if (counter > 0) window.setTimeout(function() {
                if ($("#question").length) inbentaSearch.init() && checkCookie.showLoaderModal(false);
                else waitForElement(counter - 1)
            }, 500);
            else {
                $(".modal").modal("hide");
                checkCookie.init()
            }
        }
        if (NPC.$_GET && NPC.$_GET("search")) {
            checkCookie.showLoaderModal(true);
            waitForElement(30)
        } else checkCookie.init();
        $("[data-on-click]").each(function() {
            $(document).on("click", "[data-on-click]", function() {
                if ($(this).data("href").length > 0) window.location.href = $(this).attr("data-href")
            })
        })
    })
})(NPC);
*/