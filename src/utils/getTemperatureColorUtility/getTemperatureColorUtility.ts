interface RgbValue {
    red: number;
    green: number;
    blue: number;
}

const getTemperatureColorUtility = (deg: number, component?: 'border') => {
    let rgbValue: RgbValue;
    if (deg > 35) {
        if (component) return '#cf3d0c';
        return '255, 112, 3';
    }

    if (deg >= 30 && deg < 35) {
        if (component) return `#d63e02`;

        rgbValue = {
            red: 220,
            green: 130,
            blue: 55
        };

        if (deg > 20) {
            let i = 20;
            while (i < deg) {
                rgbValue.red += 5;
                rgbValue.blue -= 11;
                i++;
            }
        }
        return `${rgbValue.red}, ${rgbValue.green}, ${rgbValue.blue}`;
    }

    if (deg >= 20 && deg < 30) {
        if (component) return '#eb7d1c';

        rgbValue = {
            red: 225,
            green: 155,
            blue: 50
        };

        if (deg > 20) {
            let i = 20;
            while (i < deg) {
                rgbValue.red += 5;
                rgbValue.blue -= 10;
                i++;
            }
        }
        return `${rgbValue.red}, ${rgbValue.green}, ${rgbValue.blue}`;
    }

    if (deg >= 15 && deg < 20) {
        if (component) return 'orange';

        rgbValue = {
            red: 250,
            green: 200,
            blue: 70
        };

        if (deg > 15) {
            let i = 15;
            while (i < deg) {
                rgbValue.red += 5;
                rgbValue.blue -= 14;
                i++;
            }
        }
        return `${rgbValue.red}, ${rgbValue.green}, ${rgbValue.blue}`;
    }

    if (deg >= 10 && deg < 15) {
        if (component) return '#deaa0d';

        rgbValue = {
            red: 240,
            green: 210,
            blue: 95
        };

        if (deg > 10) {
            let i = 10;
            while (i < deg) {
                rgbValue.red += 5;
                rgbValue.blue -= 5;
                i++;
            }
        }
        return `${rgbValue.red}, ${rgbValue.green}, ${rgbValue.blue}`;
    }

    if (deg >= 3 && deg < 10) {
        if (component) return '#dec010';

        rgbValue = {
            red: 240,
            green: 210,
            blue: 95
        };

        if (deg < 9) {
            let i = 9;
            while (i > deg) {
                rgbValue.red += 2;
                rgbValue.green += 3.5;
                rgbValue.blue += 8;
                i--;
            }
        }
        return `${rgbValue.red}, ${rgbValue.green}, ${rgbValue.blue}`;
    }

    if (deg < 3 && deg >= -11) {
        if (component) return '#4fc6e0';

        rgbValue = {
            red: 200,
            green: 250,
            blue: 255
        };

        if (deg < 2) {
            let i = 1;
            while (i > deg) {
                rgbValue.red -= 5;
                rgbValue.green -= 1.3;
                rgbValue.blue += 0.3;
                i--;
            }
        }
        return `${rgbValue.red}, ${rgbValue.green}, ${rgbValue.blue}`;
    }

    if (deg < -11) {
        if (component) return '#068ebf';

        return '21, 170, 194';
    }
};

export default getTemperatureColorUtility;
