function letThereBeDark() {
'use strict';
console.log('Let there be dark!');

// Color properties that are checked and changed on loading the page
const COLOR_PROPERTIES = [
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

const TEXT_TAGS = [
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

const CONTAINER_TAGS = [
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

const FORM_TAGS = [
    'input',
    'button',
    'textarea'
];

// The object of valid css colors and their hex value
const VALID_CSS_COLORS = {
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


class CSSColor {

    /**
     * @param {string} sourceStr valid css color
     * @param {boolean} isLight set 255 as a default color code
     */
    constructor(sourceStr, isLight) {
        this.leftString = '';
        this.r = isLight ? 255 : 0;
        this.g = isLight ? 255 : 0;
        this.b = isLight ? 255 : 0;
        this.a = 1.0;
        this.rightString = '';
        this.isSet = this.fromString(sourceStr.trim()) != null;
    }

    toString() {
        if (!this.isSet) {
            return this.leftString + ' ' + this.rightString;
        }
        return (this.leftString + ` rgba(${this.r}, ${this.g}, ${this.b}, ${this.a}) ` + this.rightString).trim();
    }

    /**
     * Make a lighter color from the class.
     */
    lightify() {
        if (!this.isSet) {
            return this;
        }

        let luminance = this.a * parseFloat((this.r*0.299 + this.g*0.587 + this.b*0.114) / 3);
        
        if (luminance <= 42.5) {
            this.r *= 1.75;
            this.g *= 1.75;
            this.b *= 1.75;
        }

        if (this.r > 255) {
            this.r = 255;
        }
        if (this.g > 255) {
            this.g = 255;
        }
        if (this.b > 255) {
            this.b = 255;
        }

        return this;
    }

    /**
     * Make a darker color from the class.
     */
    darkify() {
        if (!this.isSet) {
            return this;
        }

        let luminance = this.a * parseFloat((this.r*0.299 + this.g*0.587 + this.b*0.114) / 3);
        
        if (luminance > 42.5) {
            this.r *= 0.25;
            this.g *= 0.25;
            this.b *= 0.25;
        }

        return this;
    }

    /**
     * @param {string} sourceStr valid css color
     */
    fromString(sourceStr) {
        if (!sourceStr) {
            return null;
        }

        // Traverse the string to determine the type of color
        for (let i = 0; i < sourceStr.length; i++) {
            let leftStringArray = this.leftString.split(' ');

            if (sourceStr.substring(i, 3) == 'rgb') {
                let res = CSSColor.rgbToArray(sourceStr.substring(i, sourceStr.length));
                
                this.r = res[0];
                this.g = res[1];
                this.b = res[2];
                this.a = res[3];
                
                if (res.length > 4) {
                    this.rightString = res[4];
                }
                return res;
            }
            else if (sourceStr[i] == '#') {
                let res = CSSColor.hexToArray(sourceStr.substring(i, sourceStr.length));
                
                this.r = res[0];
                this.g = res[1];
                this.b = res[2];
                this.a = res[3];
                
                if (res.length > 4) {
                    this.rightString = res[4];
                }
                return res;
            }
            else if (this.leftString.toLowerCase() in VALID_CSS_COLORS) {
                let res = CSSColor.hexToArray(VALID_CSS_COLORS[this.leftString.toLowerCase()] + sourceStr.substring(i, sourceStr.length));
                
                this.r = res[0];
                this.g = res[1];
                this.b = res[2];
                this.a = res[3];
                
                if (res.length > 4) {
                    this.rightString = res[4];
                }
                this.leftString = '';
                return res;
            }
            else if (leftStringArray[leftStringArray.length - 1] in VALID_CSS_COLORS) {
                let res = CSSColor.hexToArray(VALID_CSS_COLORS[leftStringArray[leftStringArray.length - 1]] + sourceStr.substring(i, sourceStr.length));
                
                this.r = res[0];
                this.g = res[1];
                this.b = res[2];
                this.a = res[3];
                
                if (res.length > 4) {
                    this.rightString = res[4];
                }

                leftStringArray.pop();
                this.leftString = leftStringArray.join(' ');
                return res;
            }

            this.leftString += sourceStr[i];
        }

        return null;
    }

    /**
     * Prase rgbStr to be a 4-5 element length array.
     * @param {string} rgbStr
     */
    static rgbToArray(rgbStr) {
        let colors = ['', '', '', ''];
        let currentIndex = 0;
        let hasOtherThanRgb = -1;
        rgbStr = rgbStr.trim();

        for (let i = 0; i < rgbStr.length; i++) {
            if (rgbStr[i] == ',') {
                currentIndex++;
                continue;
            }
            if (rgbStr[i] == ')') {
                if (i != rgbStr.length - 1) {
                    hasOtherThanRgb = i + 1;
                }
                break;
            }
            if (rgbStr[i] != '.' && (isNaN(rgbStr[i]) || /^\s+$/.test(rgbStr[i]))) {
                continue;
            }

            colors[currentIndex] += rgbStr[i];
        }

        for (let i = 0; i < colors.length; i++) {
            colors[i] = parseFloat(colors[i]);
        }

        // Set alpha correctly
        if (isNaN(colors[3])) {
            colors[3] = 1.0;
        }

        if (hasOtherThanRgb != -1) {
            colors.push(rgbStr.substring(hasOtherThanRgb, rgbStr.length).trim());
        }

        return colors;
    }

    /**
     * Prase hex string to be a 4-5 element length array.
     * @param {string} hexStr
     */
    static hexToArray(hexStr) {
        let hexPart = '';
        let rightString = '';

        for (let i = 0; i < hexStr.length; i++) {
            if (hexStr[i] == ' ') {
                rightString = hexStr.substring(i, hexStr.length);
                break;
            }

            hexPart += hexStr[i];
        }

        let result = /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.exec(hexPart);
        return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16), 1.0, rightString.trim()];
    }

}

for (let element of document.getElementsByTagName('*')) {
    
    // Set background
    let newBg = new CSSColor(element.style.background).darkify().toString();
    let newBgColor = new CSSColor(element.style.backgroundColor).darkify().toString();

    if (newBg.r == 0 && newBg.g == 0 && newBg.b == 0) {
        newBg = newBgColor;
    }
    else if (newBgColor.r == 0 && newBgColor.g == 0 && newBgColor.b == 0) {
        newBgColor = newBg;
    }

    // element.style.background = newBg;
    // element.style.backgroundColor = newBgColor;
    element.style.color = new CSSColor(element.style.color, true).lightify().toString();
}

for (let imgElement of document.getElementsByTagName('img')) {
    imgElement.style.filter = 'brightness(90%)';
}

// Set a darker body background
// Determine if the body background is an image or not
/*
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
*/

}  // letThereBeDark
letThereBeDark();
document.onchange = 'letThereBeDark()';
