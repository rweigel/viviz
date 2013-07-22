function error (msg,clear) {if (clear) {$('#error').html(msg)} else {$('#error').append(msg)};}
function warning (msg,clear) {if (clear) {$('#warning').html(msg)} else {spacer="";if ($('#warning').text().length > 0) {spacer=" | ";};$('#warning').append(spacer + msg)};}
