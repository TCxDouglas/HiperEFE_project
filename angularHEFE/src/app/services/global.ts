import { FormControl } from '@angular/forms';

export var Global = {

    validar_clave(contrasenna){
        if (contrasenna.length >= 8) {
            var mayuscula = false;
            var minuscula = false;
            var numero = false;
            var caracter_raro = false;
            for (var i = 0; i < contrasenna.length; i++) {
                if (contrasenna.charCodeAt(i) >= 65 && contrasenna.charCodeAt(i) <= 90) {
                    mayuscula = true;
                }
                else if (contrasenna.charCodeAt(i) >= 97 && contrasenna.charCodeAt(i) <= 122) {
                    minuscula = true;
                }
                else if (contrasenna.charCodeAt(i) >= 48 && contrasenna.charCodeAt(i) <= 57) {
                    numero = true;
                }
                else {
                    caracter_raro = true;
                }
            }
            if (mayuscula == true && minuscula == true && caracter_raro == true && numero == true) {
                return true;
            }
        }
        return false;
    },


    validPassword(control: FormControl): { [key: string]: boolean } | null {

        const resp = Global.validar_clave(control.value);
        if (!resp) {
            //console.log(resp);
            
            return { validPASS: true };
        }
        //console.log(resp);
        return null;
    },

    url: 'https://backend-hiperefe.herokuapp.com/',
    urlDev: 'http://localhost:3900/',

    generarNumero(minimo, maximo) {
        return Math.floor(Math.random() * (maximo - minimo + 1) + minimo);
    },

    report: ['porno', 'pvta', 'pvto','quiero violar', 'quiero matar', 'quiero violarte', 'quiero verte desnuda', 'envia nudes', 'pornografia', 'sexo', 'marihuana', 'te mato', 'sos estupido', 'eres estupido', 'estupido negro', 'negro imbecil', 'puto', 'puta', 'te violo', 'te voy a violar' ]

}