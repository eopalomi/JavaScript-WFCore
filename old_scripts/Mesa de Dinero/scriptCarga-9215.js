var cacheCalc = CACHE.CREATEIF('PAG_DETALLES'+21274, -1); // RECUPERAR CACHÉ
var data_detalles = cacheCalc.get(21274+'detalles'); // OBTENER DE CACHE GUARDADA DE LA PAGINA 21274

MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA', JSON.stringify(data_detalles), 20142, true);

var catalogoCargoBase = DATA.SQL({no_conexi:'dblogist', no_consul: `select co_carbas, concat(nu_cuecon,' - ',no_carbas) as no_carbas from gesalm.tccarbas`, sg_timout: 5}).result;

function buscarCargoBase(codigoCargoBase) {
    for (var value of catalogoCargoBase) {
        if (value["co_carbas"] == codigoCargoBase){return value["no_carbas"]}
    }
};


var valpagJson  = new ValpagJson();

if(data_detalles == null){ 
	var rowx = new Row();
        rowx.addReg(new Reg({co_pagreg:  10, va_pagreg: null}));
        rowx.addReg(new Reg({co_pagreg:  20, va_pagreg: null})); 
        rowx.addReg(new Reg({co_pagreg:  30, va_pagreg: null}));    
        rowx.addReg(new Reg({co_pagreg:  40, va_pagreg: null})); 
        rowx.addReg(new Reg({co_pagreg:  50, va_pagreg: null}));
    valpagJson.addRow(rowx); 
}
if(data_detalles == ''){
    var rowx = new Row();
        rowx.addReg(new Reg({co_pagreg:  10, va_pagreg: null}));
        rowx.addReg(new Reg({co_pagreg:  20, va_pagreg: null})); 
        rowx.addReg(new Reg({co_pagreg:  30, va_pagreg: null}));    
        rowx.addReg(new Reg({co_pagreg:  40, va_pagreg: null})); 
        rowx.addReg(new Reg({co_pagreg:  50, va_pagreg: null}));
    valpagJson.addRow(rowx); 
}
if(data_detalles != null){ 
    for each( var rs in data_detalles){ 
       /*
        var v_li_unimed = `
            select co_unimed co_compag, no_unimed no_compag 
            from gesalm.listar_unidad_medida() where co_unimed = ${rs.codigoUnidadMedida};
        `;
        var data_li_data50 = DATA.SQL('dblogist', v_li_unimed, 1);         
		*/
        var rowx = new Row();
            rowx.addReg(new Reg({co_pagreg:  10, va_pagreg: buscarCargoBase(rs.CargoBase)}));
            rowx.addReg(new Reg({co_pagreg:  20, va_pagreg: rs.CargoOtros})); 
            rowx.addReg(new Reg({co_pagreg:  30, va_pagreg: rs.TipoCompra}));    
            rowx.addReg(new Reg({co_pagreg:  40, va_pagreg: rs.MontoBase})); 
            rowx.addReg(new Reg({co_pagreg:  50, va_pagreg: rs.MontoTotal}));           
        valpagJson.addRow(rowx); 
    };
}

DO_POST_LOAD_DATA = function () {
	SHOWINFO(true);
    document.getElementById('PAG' + CO_PAGINA).setAttribute('class',document.getElementById('PAG' + CO_PAGINA).getAttribute('class') + '1');
};

VALPAGJS = valpagJson;