var valpagJson = new ValpagJson();
//print('ENTRO A DINAMISMO');
var v_id_bancos = LS_ALLREG.co_regist_115;
var v_co_ctaban = LS_ALLREG.co_regist_130;

switch(CO_PAGREG) {
    case 200: {
        var row = new Row();  
        switch(VA_PAGREG) {
        	case '1': { // GIRO
            	var v_query = " and  bn.va_bancos in ('N', 'W') ";
                //row.add(new Reg({co_pagreg : 230,  va_pagreg: '', ti_estreg: 'E'}));
                row.add(new Reg({co_pagreg : 225,  va_pagreg: null, ti_pagreg: 34, ti_estreg: 'E', ur_pagreg: '../wfl?co_conten=8183'}));
                break;
            }
            case '2': { // OTRAS TRANSFERENCIAS
            	var v_query = " ";
                //row.add(new Reg({co_pagreg : 230,  va_pagreg: '', ti_estreg: 'E'}));
                row.add(new Reg({co_pagreg : 225,  va_pagreg: null, ti_pagreg: 34, ti_estreg: 'E', ur_pagreg: '../wfl?co_conten=8183'}));
                break;
            }
            case '3': { // TRANSFERENCIAS
                //var data225 = DATA.SQL('wfacr', 'select id_bancos as co_compag, no_bancos as no_compag from pagos.tcbancos where il_estado order by no_bancos desc', 1).result; // BANCOS

            	var v_query = "and ct.id_bancos = " + v_id_bancos + " ";
                //row.add(new Reg({co_pagreg : 230,  va_pagreg: v_co_ctaban, ti_estreg: 'E'}));
                row.add(new Reg({co_pagreg : 225,  va_pagreg: null, ti_pagreg: 1, ti_estreg: 'L'}));
                break;
            }
            case '4': { // EFECTIVO
            	var v_query = "and ct.id_bancos = -1 ";
                //row.add(new Reg({co_pagreg : 230,  va_pagreg: '', ti_estreg: 'E'}));
                row.add(new Reg({co_pagreg : 225,  va_pagreg: null, ti_pagreg: 34, ti_estreg: 'E', ur_pagreg: '../wfl?co_conten=8183'}));
                break;
            }
            case '5': { // CHQUE
            	var v_query = "and  bn.va_bancos in ('C', 'W', 'R', 'K') ";
                //row.add(new Reg({co_pagreg : 230,  va_pagreg: '', ti_estreg: 'E'}));
                row.add(new Reg({co_pagreg : 225,  va_pagreg: null, ti_pagreg: 34, ti_estreg: 'E', ur_pagreg: '../wfl?co_conten=8183'}));
                break;
            }
        }
        
        var data210 = DATA.SQL('wfacr', 
            "select ct.id_bancos as co_compag, bn.no_bancos as no_compag " +
            "from pagos.tcctaban ct, pagos.tcbancos bn " +
            "where bn.id_bancos = ct.id_bancos " +
            v_query +
            " group by ct.id_bancos, bn.no_bancos "+
            "order by bn.no_bancos", 1).result;
	print('-------->'+'wfacr//'+ 
            "select ct.id_bancos as co_compag, bn.no_bancos as no_compag " +
            "from pagos.tcctaban ct, pagos.tcbancos bn " +
            "where bn.id_bancos = ct.id_bancos " +
            v_query +
            " group by ct.id_bancos, bn.no_bancos "+
            "order by bn.no_bancos");
        
        row.add(new Reg({co_pagreg : 210,  va_pagreg: v_id_bancos, ob_dindat: data210}));
        
        valpagJson.addRow(row);
        return valpagJson;
        break;
    }
    case 210: {
        if(VA_PAGREG != null && VA_PAGREG != undefined  && VA_PAGREG.length > 0){
            var data220 = DATA.SQL('wfacr',"select id_ctaban as co_compag, va_ctaban || ' | ' || no_ctaban as no_compag from pagos.tcctaban where id_bancos = " + VA_PAGREG, 1);
            //.result;
            var row = new Row();
            if( data220.status== 'OK'){
                row.add(new Reg({co_pagreg : 220, ob_dindat: data220.result}));
            }       
            
            valpagJson.addRow(row);    
        }/*else{
            print('El valor de va_pagreg no es coherente:'+ VA_PAGREG);
        }*/
        
        return valpagJson;
        break;
    }
}

//valpagJson.add(row);
return valpagJson;