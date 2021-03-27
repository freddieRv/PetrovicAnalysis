var C1 = 192;
var C2 = 7;

$(document).ready(function() {
    $("#btn_limpiar").click(limpiar);
    $("#btn_calcular").click(calcular);
    $("#inp_sna").focus();
});

function limpiar() {
    $("input[type=number]").each((i, item) => {

        if (i == 0) {
            $(item).focus();
        }

        $(item).removeClass("is-invalid");
        $(item).removeClass("is-valid");
        $(item).val("");
    });
    
    $("#inp_diagnostico").val("");
}

function calcDiagnostico(t1, t2, t3) {
    if (true) {
        
    } else if (true) {
        
    } else {
        
    }
}

function calcular() {
    if (validarFormulario()) {
        return;
    }
    
    let sna    = $("#inp_sna").val();
    let snb    = $("#inp_snb").val();
    let anb    = $("#inp_anb").val();
    let ml_nsl = $("#inp_ml_nsl").val();
    let nl_nsl = $("#inp_nl_nsl").val();
    
    t1 = (C1 - (snb * 2)) - ml_nsl;
    t2 = (ml_nsl / 2) - C2 - nl_nsl;
    t3 = anb * 1;
    
    console.log(t1, t2, t3);
    
    $("#inp_diagnostico").val(calcDiagnostico(t1, t2, t3));
}

function validarFormulario() {
    let error = 0;
    
    $("input[type=number]").each((i, item) => {
        if ($(item).val() == "") {
            $(item).addClass("is-invalid");
            error = 1;
        } else {
            $(item).removeClass("is-invalid");
            $(item).addClass("is-valid");
        }
    });
    
    return error;
}
