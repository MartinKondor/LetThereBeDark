(function () {
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
function nightify(color, hasAlpha=false) {
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


// Color properties that are checked and changed on loading the page
var COLOR_PROPERTIES = [
    'color',
    'background-color',
    'background'
];

var TEXT_TAGS = [
    'p',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    // 'i',
    'strong',
    'a'
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
};


// Get every element from the DOM
for (var element of document.body.getElementsByTagName('*')) {

    var isElementDarkened = false;

    if (element.tagName.toLowerCase() == 'img') {
        nightifyImage(element);
        continue;
    }

    // Get every style attribute of each element
    for (var cssProperty of element.style) {

        // Check if the element's color can be changed
        if (COLOR_PROPERTIES.indexOf(cssProperty) == -1) {
            continue;   
        }
        else if (cssProperty == 'color') {  // Set every text to white
            element.style[cssProperty] = `rgb(255, 255, 255)`;
            continue; 
        }

        var hasAlpha = false;
        var value = element.style[cssProperty];

        // Determine color type
        if (value.substring(0, 4) == 'rgba') {
            hasAlpha = true;
            value = rgbToArray(value, true);
        }
        else if (value.substring(0, 3) == 'rgb') {
            value = rgbToArray(value);
        }
        else if (value[0] == '#') {
            value = hexToRgb(value);
        }
        else if (value.toLowerCase() in VALID_CSS_COLORS) {
            value = hexToRgb(VALID_CSS_COLORS[value.toLowerCase()]);
        }

        // Nightify the color, and set the css property for this color
        var rgbArray = nightify(value, hasAlpha);
        
        if (hasAlpha) {
            element.style[cssProperty] = `rgba(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]}, ${rgbArray[3]})`;
        }
        else {
            element.style[cssProperty] = `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;
        }
        isElementDarkened = true;

    }

    // Darken the not darkened element according to it's tag name
    if (!isElementDarkened) {
        var elementTagName = element.tagName.toLowerCase();

        if (TEXT_TAGS.indexOf(elementTagName) != -1) {
            element.style['color'] = 'rgb(255, 255, 255)';
        }
        else if (elementTagName == 'div') {
            element.style['background-color'] = 'rgb(0, 0, 0)';
            element.style['color'] = 'rgb(255, 255, 255)';
        }
    }

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

/*
// Set the body background color too
var bodyColor = document.body.style.background;

if (bodyColor == '') {
    bodyColor = 'rgb(255,255,255)';
}
else if (bodyColor.substring(0, 3) == 'rgb') {
    bodyColor = rgbToArray(bodyColor);
}
else if (bodyColor[0] == '#') {
    bodyColor = hexToRgb(bodyColor);
}

bodyColor = nightify(rgbToArray(bodyColor));
console.log(`rgb(${bodyColor[0]}, ${bodyColor[1]}, ${bodyColor[2]});`);
document.body.style.background = `rgb(${bodyColor[0]}, ${bodyColor[1]}, ${bodyColor[2]});`;
*/

})();
    