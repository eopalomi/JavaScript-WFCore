var valpagJson = new ValpagJson();

switch(CO_PAGREG) {
    case 200: {
        var regImportePagado       = LS_ALLREG.co_regist_150;    // Importe<br>Pagado
        var regImportePagoTotal    = LS_ALLREG.co_regist_130;    // Importe Total
        var varSimulImportPend     = (regImportePagoTotal - regImportePagado) - VA_PAGREG;

        var rowx = new Row();
        rowx.add(new Reg({co_pagreg : 220, va_pagreg: varSimulImportPend, ti_estreg: 'L'}));

        valpagJson.addRow(rowx);
        return valpagJson;
        break;
    }
}
    
return valpagJson;