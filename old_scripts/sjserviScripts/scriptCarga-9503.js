/*PARAMETROS*/
var p_fe_objpas = COALESCE(LS_CONPAR.co_conpar_1,'');
var p_ti_objpas = COALESCE(LS_CONPAR.co_conpar_2,'');

/*LOGICA*/
var valpagJson = new ValpagJson();

var rowx = new Row();
rowx.addReg(new Reg(10, null, null, null, null, null, null));
rowx.addReg(new Reg(20, null, null, null, null, null, null));
rowx.addReg(new Reg(30, null, null, null, null, null, null));
rowx.addReg(new Reg(40, null, null, null, null, null, null));
rowx.addReg(new Reg(50, null, null, null, null, null, null));
valpagJson.addRow(rowx);

/*DOM: Luego de cargar datos ejecutar:*/
DO_POST_LOAD_DATA = function () {
    document.getElementById('PAG'+ CO_PAGINA).setAttribute('class',document.getElementById('PAG'+ CO_PAGINA).getAttribute('class')+'2');
    SHOWINFO(true);
    CFGDATATABLE({
        searching:false, 
        ordering:false, 
        paging:false
        //pageLength: 5, 
        //scrollX:true,
        //scrollY:true
        //fixedHeader: true
        //"sDom":'<"H"Cfr>t<"F"ip>'
    });
};

/*RETORNO*/
VALPAGJS = valpagJson;