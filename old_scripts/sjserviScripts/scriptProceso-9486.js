var r_nu_docume = NULLIF(LS_REGIST.co_regist_20,''); // Numero de documento
var r_no_razsoc = NULLIF(LS_REGIST.co_regist_30,''); // Razon Social
arrayCliente =[];

var ObjetoCliente = new Object();
ObjetoCliente["tipoPersona"] = "J";
ObjetoCliente["numeroDocumento"] = "";
ObjetoCliente["apellidoPaterno"] = "";
ObjetoCliente["apellidoMaterno"] = "";
ObjetoCliente["nombres"] = "";
ObjetoCliente["tipoDocumento"] = "1";
ObjetoCliente["codigoNacionalidad"] = "1";
ObjetoCliente["fechaNacimiento"] = "1990-10-10";
ObjetoCliente["generoPersona"] = "";
ObjetoCliente["estadoCivil"] = "";
ObjetoCliente["documentoTributario"] = r_nu_docume;
ObjetoCliente["razonSocial"] = r_no_razsoc;
ObjetoCliente["nombreComercial"] = r_no_razsoc;
arrayCliente.push(ObjetoCliente);

var query = `
    select clientx.mantenedor_cliente(
        'R',
        null,
        '${JSON.stringify(ObjetoCliente)}',
        null,
        null,
        null
    );
`;

//MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA',"Ingrese nombre de Personal Autorizado"+query);
var v_de_detall = DATA.SQL('wfacr', query, 10);

var pag_to_refresh = new List();
pag_to_refresh.add(9486);
pag_to_refresh.add(9487);
return OK('REFRESH', null, null, pag_to_refresh);


