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

function calcDiagnostico(T1, T2, T3) {
    diagnostico = "";
    
    if (T1 > 6) {
        if (T2 > 3) {
            if (T3 <= 1.5) {
                diagnostico = "A3MOB";
            } else if (T3 <= 5.5) { // FIXME: is this comparision right?
                diagnostico = "A1NOB";
            } else if (T3 <= 8.5) {
                diagnostico = "A1DOB";
            } else {
                diagnostico = "A2DOB";
            }
        } else if (T2 >= 0) {
            if (T3 <= 0) {
                diagnostico = "A3MN";
            } else if (T3 <= 4) {
                diagnostico = "A1NN";
            } else if (T3 <= 7) {
                diagnostico = "A1DN";
            } else {
                diagnostico = "A2DN";
            }
        } else {
            // FIXME: this case is the exact same as the one above
            if (T3 <= 0) {
                diagnostico = "A3MN";
            } else if (T3 <= 4) {
                diagnostico = "A1NN";
            } else if (T3 <= 7) {
                diagnostico = "A1DN";
            } else {
                diagnostico = "A2DN";
            }
        }
    } else if (T1 >= 0) {
        if (T2 > 3) {
            if (T3 <= 1) {
                diagnostico = "R3MOB";
            } else if (T3 <= 5) {
                diagnostico = "R1NOB";
            } else {
                diagnostico = "R2DOB";
            }
        } else if (T2 >= 0) {
            if (T3 <= 0) {
                diagnostico = "R3MN";
            } else if (T3 <= 3) { // Next comparission is 5 < T3, which would leave range 4 <= T3 <= 5
                diagnostico = "R1NN";
            } else {
                diagnostico = "R2DOB";
            }
        } else {
            if (T3 <= -1) {
                diagnostico = "R3MDB";
            } else if (T3 <= 3) {
                diagnostico = "R1NDB";
            } else {
                diagnostico = "R2DDB";
            }
        }
    } else {
        if (T2 > 3) {
            if (T3 >= 5.5) {
                diagnostico = "P2NOB";
            } else if (T3 >= 1) {
                diagnostico = "P1NOB";
            } else if (T3 >= -6) { // Assuming the minus sign
                diagnostico = "P1MOB";
            } else {
                diagnostico = "A2DOB";
            }
        } else if (T2 >= 0) {
            if (T3 >= 4) {
                diagnostico = "P2DN";
            } else if (T3 >= 0) {
                diagnostico = "P1NN";
            } else if (T3 >= -7) { // Assuming the minus sign
                diagnostico = "P1MN";
            } else {
                diagnostico = "A2DOB";
            }
        } else {
            if (T3 >= 3) {
                diagnostico = "P2DDB";
            } else if (T3 >= -1) { // Assuming the minus sign
                diagnostico = "P1NDB";
            } else if (T3 >= -8) { // Assuming the minus sign
                diagnostico = "P1MDB";
            } else {
                diagnostico = "P3MDB";
            }
        }
    }
    
    return diagnostico;
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
    
    let T1 = (C1 - (snb * 2)) - ml_nsl;
    let T2 = (ml_nsl / 2) - C2 - nl_nsl;
    let T3 = anb * 1;
    
    console.log(T1, T2, T3);
    
    $("#inp_diagnostico").val(calcDiagnostico(T1, T2, T3));
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
