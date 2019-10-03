import { padStart } from 'lodash';

export function getDateToString(dateToParse) {
    var year = dateToParse.getFullYear().toString();
    var month = ((dateToParse.getMonth() + 1).toString()).length == 1 ? '0' + (dateToParse.getMonth() + 1).toString() : (dateToParse.getMonth() + 1);
    var day = (dateToParse.getDate().toString()).length == 1 ? '0' + dateToParse.getDate().toString() : dateToParse.getDate().toString();
    var date = day + "/" + month + "/" + year;

    return date;
}

export function getTimeToString(date){
    return padStart(date.getHours().toString(), 2, '0') + ":" + padStart(date.getMinutes().toString(), 2, '0');
}

export function getDatePersonalized(date) {
    return date.getDate().toString() + " " + getMonthName(date.getMonth()).substring(0,3) + " - " + padStart(date.getHours().toString(), 2, '0') + ":" + padStart(date.getMinutes().toString(), 2, '0');
}

//TODO: los meses los tiene que sacar del language, no de constants, ni hardcodeados
function getMonthName(monthNumber) {
    switch (monthNumber) {
        case 0:
            return "ENERO"
        case 1:
            return "FEBRERO"
        case 2:
            return "MARZO"
        case 3:
            return "ABRIL"
        case 4:
            return "MAYO"
        case 5:
            return "JUNIO"
        case 6:
            return "JULIO"
        case 7:
            return "AGOSTO"
        case 8:
            return "SEPTIEMBRE"
        case 9:
            return "OCTUBRE"
        case 10:
            return "NOVIEMBRE"
        case 11:
            return "DICIEMBRE"
        default:
            return null;
    }
}