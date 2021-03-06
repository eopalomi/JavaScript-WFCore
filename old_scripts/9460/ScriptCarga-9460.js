//PARAMETROS
var p_id_tippag = COALESCE(LS_CONPAR.co_conpar_1, null);
var p_id_blopag = COALESCE(LS_CONPAR.co_conpar_2, null);

//LOGICA
if (p_id_tippag != 3){ // ENTREGA A RENDIR - SI NO ES
    return OK('NONE', null, null, null);
};

//VARIABLES
var valpagJson = new ValpagJson();

if (p_id_blopag != null) {
    var v_tx_query = `SELECT * FROM pagos.pbblopag_detalle_listar(${p_id_blopag})`;
    var v_va_resqry = DATA.SQL('wfacr', v_tx_query, 10); 

    v_va_resqry.result.forEach(function(rs){
        var rowx = new Row();
        rowx.add(new Reg({co_pagreg:  10, va_pagreg: null}));
        rowx.add(new Reg({co_pagreg:  20, va_pagreg: rs.co_entdet}));
        rowx.add(new Reg({co_pagreg:  30, va_pagreg: rs.nu_entren}));
        rowx.add(new Reg({co_pagreg:  40, va_pagreg: rs.fe_movimi}));
        rowx.add(new Reg({co_pagreg:  50, va_pagreg: rs.fe_visado}));
        rowx.add(new Reg({co_pagreg:  60, va_pagreg: rs.hr_visado}));
        rowx.add(new Reg({co_pagreg:  70, va_pagreg: rs.no_estado}));
        rowx.add(new Reg({co_pagreg:  80, va_pagreg: rs.no_tipent}));
        rowx.add(new Reg({co_pagreg:  90, va_pagreg: rs.ca_pladia}));
        rowx.add(new Reg({co_pagreg: 100, va_pagreg: rs.no_oficin}));
        rowx.add(new Reg({co_pagreg: 110, va_pagreg: rs.no_person}));
        rowx.add(new Reg({co_pagreg: 120, va_pagreg: rs.no_banabo}));
        rowx.add(new Reg({co_pagreg: 130, va_pagreg: rs.nu_ctaabo}));
        rowx.add(new Reg({co_pagreg: 140, va_pagreg: rs.no_descri}));
        rowx.add(new Reg({co_pagreg: 150, va_pagreg: rs.im_abodol}));
        rowx.add(new Reg({co_pagreg: 160, va_pagreg: rs.im_totabo}));
        rowx.add(new Reg({co_pagreg: 170, va_pagreg: rs.ti_cambio}));
        rowx.add(new Reg({co_pagreg: 180, va_pagreg: rs.co_moneda}));
        rowx.add(new Reg({co_pagreg: 185, va_pagreg: rs.no_moneda}));
        rowx.add(new Reg({co_pagreg: 190, va_pagreg: rs.no_peraut}));
        rowx.add(new Reg({co_pagreg: 200, va_pagreg: rs.no_glosae}));
        rowx.add(new Reg({co_pagreg: 210, va_pagreg: rs.no_glosae}));
        rowx.add(new Reg({co_pagreg: 220, va_pagreg: p_id_tippag}));
        rowx.add(new Reg({co_pagreg: 230, va_pagreg: p_id_blopag}));
        valpagJson.addRow(rowx);
    });
};

DO_POST_LOAD_DATA = function () {
    SHOWINFO(true);
};

VALPAGJS = valpagJson;