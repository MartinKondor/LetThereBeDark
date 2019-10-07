function letThereBeDark() {
'use strict';
console.log('Let there be dark!');

/**
 * Prase hex string to be a 3 element length array.
 * @param {string} hexStr
 */
function hexToRgb(hexStr) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexStr);
    return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
}

/**
 * Prase rgbStr to be a 3 element length array.
 * @param {string} rgbStr
 */
function rgbToArray(rgbStr, hasAlpha=false) {
    var colors = ['', '', ''];
    var currentIndex = 0;

    if (hasAlpha) {
        colors = ['', '', '', ''];
    }

    for (var i = 0; i < rgbStr.length; i++) {
        if (rgbStr[i] == ',') {
            currentIndex++;
            continue;
        }
        if (rgbStr[i] == ')') {
            break;
        }
        if (rgbStr[i] != '.' && (isNaN(rgbStr[i]) || /^\s+$/.test(rgbStr[i]))) {
            continue;
        }

        colors[currentIndex] += rgbStr[i];
    }

    for (var i = 0; i < colors.length; i++) {
        colors[i] = parseFloat(colors[i]);
    }

    return colors;
}

/**
 * Make a darker color from the given one.
 * @param {3 / 4 element length rgb color array} color
 */
function nightify(color, hasAlpha=true) {
    if (color == '') {
        return '';
    }

    var luminance = 85;
    if (hasAlpha) {
        luminance = color[3] * parseFloat((color[0]*0.299 + color[1]*0.587 + color[2]*0.114) / 3);
    }
    else {
        luminance = parseFloat((color[0]*0.299 + color[1]*0.587 + color[2]*0.114) / 3);
    }
    
    if (luminance > 42.5) {
        color[0] *= 0.25;
        color[1] *= 0.25;
        color[2] *= 0.25;
    }

    return color;
}

/**
 * Sets image to be darker.
 * @param {DOM image tagNamed element} element
 */
function nightifyImage(element) {
    // element.style['background'] = '#000';
    // element.style['opacity'] = '0.75';

    element.style['filter'] = 'brightness(90%)';
}

/**
 * Make a lighter color from the given one.
 * @param {3 / 4 element length rgb color array} color
 */
function lightify(color, hasAlpha=true) {
    if (color == '') {
        return '';
    }

    var luminance = 85;
    if (hasAlpha) {
        luminance = color[3] * parseFloat((color[0]*0.299 + color[1]*0.587 + color[2]*0.114) / 3);
    }
    else {
        luminance = parseFloat((color[0]*0.299 + color[1]*0.587 + color[2]*0.114) / 3);
    }
    
    if (luminance <= 42.5) {
        color[0] *= 1.25;
        color[1] *= 1.25;
        color[2] *= 1.25;
    }

    for (var i = 0; i < color.length; i++) {
        if (color[i] > 255) {
            color[i] = 255;
        }
    }

    return color;
}

/**
 * Converts string color to [r, g, b, a] array
* @param {valid css color} color
 */
function getRgba(color) {
    if (color == '') {
        return '';
    }

    if (color.substring(0, 4) == 'rgba') {
        color = rgbToArray(color, true);
    }
    else if (color.substring(0, 3) == 'rgb') {
        color = rgbToArray(color, false);
    }
    else if (color[0] == '#') {
        color = hexToRgb(color);
    }
    else if (color.toLowerCase() in VALID_CSS_COLORS) {
        color = hexToRgb(VALID_CSS_COLORS[color.toLowerCase()]);
    }
    else {
        var tmpColor = color.toLowerCase().split(' ')[0];
        if (tmpColor in VALID_CSS_COLORS) {
            color = hexToRgb(VALID_CSS_COLORS[tmpColor]);
        }
    }

    if (color.length == 3) {
        color.push(1.0);
    }
    return color;
}

/**
 * Convert color array to valid css string.
 * @param {[r, g, b, a] array} color
 */
function rgbToString(color) {
    if (color == '') {
        return '';
    }
    return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
}


// Color properties that are checked and changed on loading the page
var COLOR_PROPERTIES = [
    //'color',
    //'background-color',
    //'background',
    'border-color',
    'border-top-color',
    'border-right-color',
    'border-bottom-color',
    'border-left-color',
    'border'
];

var TEXT_TAGS = [
    'p',
    'a',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'i',
    'strong',
    'td',
];

var CONTAINER_TAGS = [
    'td',
    'p',
    'a',
    'span',
    'form',
    'div',
    'nav',
    'header',
    'footer',
    'aside',
    'main',
    'ul',
    'ol',
    'tbody',
    'thead',
    'rhead',
    'rbody',
    'tr',
    'details',
    'summary',
    'center',
    'code',
    'pre',
    'section'
];

var FORM_TAGS = [
    'input',
    'button',
    'textarea'
];

// The object of valid css colors and their hex value
var VALID_CSS_COLORS = {
    'aliceblue': '#F0F8FF',
    'antiquewhite': '#FAEBD7',
    'aqua': '#00FFFF',
    'aquamarine': '#7FFFD4',
    'azure': '#F0FFFF',
    'beige': '#F5F5DC',
    'bisque': '#FFE4C4',
    'black': '#000000',
    'blanchedalmond': '#FFEBCD',
    'blue': '#0000FF',
    'blueviolet': '#8A2BE2',
    'brown': '#A52A2A',
    'burlywood': '#DEB887',
    'cadetblue': '#5F9EA0',
    'chartreuse': '#7FFF00',
    'chocolate': '#D2691E',
    'coral': '#FF7F50',
    'cornflowerblue': '#6495ED',
    'cornsilk': '#FFF8DC',
    'crimson': '#DC143C',
    'cyan': '#00FFFF',
    'darkblue': '#00008B',
    'darkcyan': '#008B8B',
    'darkgoldenrod': '#B8860B',
    'darkgray': '#A9A9A9',
    'darkgrey': '#A9A9A9',
    'darkgreen': '#006400',
    'darkkhaki': '#BDB76B',
    'darkmagenta': '#8B008B',
    'darkolivegreen': '#556B2F',
    'darkorange': '#FF8C00',
    'darkorchid': '#9932CC',
    'darkred': '#8B0000',
    'darksalmon': '#E9967A',
    'darkseagreen': '#8FBC8F',
    'darkslateblue': '#483D8B',
    'darkslategray': '#2F4F4F',
    'darkslategrey': '#2F4F4F',
    'darkturquoise': '#00CED1',
    'darkviolet': '#9400D3',
    'deeppink': '#FF1493',
    'deepskyblue': '#00BFFF',
    'dimgray': '#696969',
    'dimgrey': '#696969',
    'dodgerblue': '#1E90FF',
    'firebrick': '#B22222',
    'floralwhite': '#FFFAF0',
    'forestgreen': '#228B22',
    'fuchsia': '#FF00FF',
    'gainsboro': '#DCDCDC',
    'ghostwhite': '#F8F8FF',
    'gold': '#FFD700',
    'goldenrod': '#DAA520',
    'gray': '#808080',
    'grey': '#808080',
    'green': '#008000',
    'greenyellow': '#ADFF2F',
    'honeydew': '#F0FFF0',
    'hotpink': '#FF69B4',
    'indianred': '#CD5C5C',
    'indigo': '#4B0082',
    'ivory': '#FFFFF0',
    'khaki': '#F0E68C',
    'lavender': '#E6E6FA',
    'lavenderblush': '#FFF0F5',
    'lawngreen': '#7CFC00',
    'lemonchiffon': '#FFFACD',
    'lightblue': '#ADD8E6',
    'lightcoral': '#F08080',
    'lightcyan': '#E0FFFF',
    'lightgoldenrodyellow': '#FAFAD2',
    'lightgray': '#D3D3D3',
    'lightgrey': '#D3D3D3',
    'lightgreen': '#90EE90',
    'lightpink': '#FFB6C1',
    'lightsalmon': '#FFA07A',
    'lightseagreen': '#20B2AA',
    'lightskyblue': '#87CEFA',
    'lightslategray': '#778899',
    'lightslategrey': '#778899',
    'lightsteelblue': '#B0C4DE',
    'lightyellow': '#FFFFE0',
    'lime': '#00FF00',
    'limegreen': '#32CD32',
    'linen': '#FAF0E6',
    'magenta': '#FF00FF',
    'maroon': '#800000',
    'mediumaquamarine': '#66CDAA',
    'mediumblue': '#0000CD',
    'mediumorchid': '#BA55D3',
    'mediumpurple': '#9370DB',
    'mediumseagreen': '#3CB371',
    'mediumslateblue': '#7B68EE',
    'mediumspringgreen': '#00FA9A',
    'mediumturquoise': '#48D1CC',
    'mediumvioletred': '#C71585',
    'midnightblue': '#191970',
    'mintcream': '#F5FFFA',
    'mistyrose': '#FFE4E1',
    'moccasin': '#FFE4B5',
    'navajowhite': '#FFDEAD',
    'navy': '#000080',
    'oldlace': '#FDF5E6',
    'olive': '#808000',
    'olivedrab': '#6B8E23',
    'orange': '#FFA500',
    'orangered': '#FF4500',
    'orchid': '#DA70D6',
    'palegoldenrod': '#EEE8AA',
    'palegreen': '#98FB98',
    'paleturquoise': '#AFEEEE',
    'palevioletred': '#DB7093',
    'papayawhip': '#FFEFD5',
    'peachpuff': '#FFDAB9',
    'peru': '#CD853F',
    'pink': '#FFC0CB',
    'plum': '#DDA0DD',
    'powderblue': '#B0E0E6',
    'purple': '#800080',
    'rebeccapurple': '#663399',
    'red': '#FF0000',
    'rosybrown': '#BC8F8F',
    'royalblue': '#4169E1',
    'saddlebrown': '#8B4513',
    'salmon': '#FA8072',
    'sandybrown': '#F4A460',
    'seagreen': '#2E8B57',
    'seashell': '#FFF5EE',
    'sienna': '#A0522D',
    'silver': '#C0C0C0',
    'skyblue': '#87CEEB',
    'slateblue': '#6A5ACD',
    'slategray': '#708090',
    'slategrey': '#708090',
    'snow': '#FFFAFA',
    'springgreen': '#00FF7F',
    'steelblue': '#4682B4',
    'tan': '#D2B48C',
    'teal': '#008080',
    'thistle': '#D8BFD8',
    'tomato': '#FF6347',
    'turquoise': '#40E0D0',
    'violet': '#EE82EE',
    'wheat': '#F5DEB3',
    'white': '#FFFFFF',
    'whitesmoke': '#F5F5F5',
    'yellow': '#FFFF00',
    'yellowgreen': '#9ACD32',
    'transparent': '#000000'
};


// Set all element's colors
for (var element of document.getElementsByTagName('*')) {
    if (element.tagName == 'IMG') continue;

    element.style['color'] = rgbToString(lightify(getRgba(element.style['color']))) || 'rgb(255, 255, 255)';

    element.style['box-shadow'] = 'none';
    element.style['-moz-box-shadow'] = 'none';
    element.style['text-shadow'] = 'none';
    element.style['-moz-text-shadow'] = 'none';

    var newBg = rgbToString(nightify(getRgba(element.style['background'])));
    var newBgColor = rgbToString(nightify(getRgba(element.style['background-color'])));
    element.style['background'] = newBg || newBgColor || 'rgb(0, 0, 0)';
    element.style['background-color'] = newBgColor || newBg || 'rgb(0, 0, 0)';
    
    element.style['border-top-color'] = rgbToString(nightify(getRgba(element.style['border-top-color']))) || 'rgb(0, 0, 0)';
    element.style['border-right-color'] = rgbToString(nightify(getRgba(element.style['border-right-color']))) || 'rgb(0, 0, 0)';
    element.style['border-bottom-color'] = rgbToString(nightify(getRgba(element.style['border-bottom-color']))) || 'rgb(0, 0, 0)';
    element.style['border-left-color'] = rgbToString(nightify(getRgba(element.style['border-left-color']))) || 'rgb(0, 0, 0)';
    element.style['border-color'] = rgbToString(nightify(getRgba(element.style['border-color']))) || 'rgb(0, 0, 0)';
    element.style['border'] = rgbToString(nightify(getRgba(element.style['border']))) || 'rgb(0, 0, 0)';
}

for (var imgElement of document.getElementsByTagName('img')) {
    nightifyImage(imgElement);
}

// Set a darker body background
// Determine if the body background is an image or not
document.body.style['color'] = 'rgb(255, 255, 255)';

if (window.getComputedStyle(document.body, null).getPropertyValue('background-image') != 'none') {
    document.body.style['background-color'] = 'rgb(0, 0, 0)';

    // TODO
    document.body.style['background'] = 'rgb(0, 0, 0)';
}
else {
    document.body.style['background-color'] = 'rgb(0, 0, 0)';
    document.body.style['background'] = 'rgb(0, 0, 0)';
}

}letThereBeDark();
document.onchange = 'letThereBeDark()';
