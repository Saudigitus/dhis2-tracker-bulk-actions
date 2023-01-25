const getRelativeTime = (timestamp) => {

    // Convert to a positive integer
    var time = Math.abs(timestamp);

    // Define humanTime and units
    var humanTime, units;

    // If there are years
    if (time > (1000 * 60 * 60 * 24 * 365)) {
        humanTime = parseInt(time / (1000 * 60 * 60 * 24 * 365), 10);
        humanTime=== 1?units='ano':units ='anos';
    }

    // If there are months
    else if (time > (1000 * 60 * 60 * 24 * 30)) {
        humanTime = parseInt(time / (1000 * 60 * 60 * 24 * 30), 10);
        humanTime=== 1?units='semana':units ='semanas';
    }

    // If there are weeks
    else if (time > (1000 * 60 * 60 * 24 * 7)) {
        humanTime = parseInt(time / (1000 * 60 * 60 * 24 * 7), 10);
        humanTime=== 1?units='mês':units ='meses';
    }

    // If there are days
    else if (time > (1000 * 60 * 60 * 24)) {
        humanTime = parseInt(time / (1000 * 60 * 60 * 24), 10);
        humanTime=== 1?units='dia':units ='dias';
    }

    // If there are hours
    else if (time > (1000 * 60 * 60)) {
        humanTime = parseInt(time / (1000 * 60 * 60), 10);
        humanTime===1?units = 'hora':units ='horas';
    }

    // If there are minutes
    else if (time > (1000 * 60)) {
        humanTime = parseInt(time / (1000 * 60), 10);
        humanTime===1?units = 'minuto':units ='minutos';
    }

    // Otherwise, use seconds
    else {
        humanTime = parseInt(time / (1000), 10);
        humanTime===1?units = 'segundo':units ='segundos';
    }

    return humanTime + ' ' + units;

};

export {getRelativeTime}