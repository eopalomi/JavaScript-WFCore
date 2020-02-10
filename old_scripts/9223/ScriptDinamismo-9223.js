var valpagJson = new ValpagJson();
var row = new Row();

switch(CO_PAGREG) {
    case 35: {
        if (VA_PAGREG == 'D') { // DNI
            //D-> DNI
            row.add(new Reg({co_pagreg : 40, ti_pagreg:22, ca_caract: 8, ls_styles:['font-weight:400', 'color: black','text-transform: uppercase']})); 
        } else  if (VA_PAGREG == 'E') {
            //E-> Carnet de extranjeria o T->Pasaporte
            row.add(new Reg({co_pagreg : 40, ti_pagreg:22, ca_caract: 11, ls_styles:['font-weight:400', 'color: black','text-transform: uppercase']})); 
        } else {
            //E-> Carnet de extranjeria o T->Pasaporte
            row.add(new Reg({co_pagreg : 40, ti_pagreg:1,  ca_caract: 20, ls_styles:['font-weight:400', 'color: black','text-transform: uppercase']})); 
        }
        break;
    }
}

valpagJson.add(row);
return valpagJson;