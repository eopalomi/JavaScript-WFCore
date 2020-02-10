/*PARAMETROS*/
var paramClasificacion  = COALESCE(LS_CONPAR.co_conpar_1, '');
var paramBancoBusqueda  = COALESCE(LS_CONPAR.co_conpar_2, '');
var paramTipoMoneda     = COALESCE(LS_CONPAR.co_conpar_3, '');
var paramTipoProducto   = COALESCE(LS_CONPAR.co_conpar_4, null);
var paramDatoBusqueda   = COALESCE(LS_CONPAR.co_conpar_5, '');
var paramFormaPago      = COALESCE(LS_CONPAR.co_conpar_6, 1);
var paramBancoCargo     = COALESCE(LS_CONPAR.co_conpar_7, '');
var paramMonedaCargo    = COALESCE(LS_CONPAR.co_conpar_8, '');
var paramNroCtaCargo    = COALESCE(LS_CONPAR.co_conpar_9, '');
var paramMedioPago      = COALESCE(LS_CONPAR.co_conpar_10, 4);

/*LOGICA*/
var valpagJson = new ValpagJson();

var v_tx_query = `
   SELECT * FROM pagos.pblistar_pagos_no_tradicionales()
   WHERE (
      case id_estpag 
         when 1 then id_blopag is null 
         when 3 then true 
      end
   )
   AND id_clacon = ${paramClasificacion}
   AND ( 
      '${paramDatoBusqueda}' = '' or
      cast(co_expedi as varchar) ilike '%' || '${paramDatoBusqueda}' || '%' or
      nu_docide ilike '%' ||'${paramDatoBusqueda}'|| '%' or
      no_benefi ilike '%' || '${paramDatoBusqueda}' || '%' or
      nu_refere ilike '%' || '${paramDatoBusqueda}' || '%'
   )
   AND (
      case ${paramFormaPago}
         when 5 then true 
         else id_bancos = ${paramBancoBusqueda}
      end
   )
   AND (
      '${paramTipoMoneda}' = '' or
      cast(id_tipmon as varchar) = '${paramTipoMoneda}'
   ) 
   AND (
      ${paramTipoProducto} is null or
      id_tippro = ${paramTipoProducto}
   )
`;

var v_va_resqry = DATA.SQL('wfacr', v_tx_query, 10);  // REGISTRAR EMPRESA

v_va_resqry.result.forEach(function(rs){
   var row = new Row();
   row.addReg(new Reg({co_pagreg: 10, va_pagreg: null})); // N°
   row.addReg(new Reg({co_pagreg: 11, va_pagreg: rs.id_detabo})); // Código(id_detabo)
   row.addReg(new Reg({co_pagreg: 12, va_pagreg: rs.id_bancos})); // Código(id_bancos)
   row.addReg(new Reg({co_pagreg: 13, va_pagreg: rs.co_docide})); // Código(co_docide)

   row.addReg(new Reg({co_pagreg: 200, va_pagreg: rs.nu_refere})); // Crédito
   row.addReg(new Reg({co_pagreg: 210, va_pagreg: rs.no_tippro})); // Producto
   row.addReg(new Reg({co_pagreg: 220, va_pagreg: rs.fe_desemb})); // Fecha Desembolso
   row.addReg(new Reg({co_pagreg: 230, va_pagreg: rs.no_clacre})); // Clase Crédito
   
   row.addReg(new Reg({co_pagreg: 300, va_pagreg: rs.nu_docide})); // Nro. Documento
   row.addReg(new Reg({co_pagreg: 310, va_pagreg: rs.no_benefi})); // Nombre

   row.addReg(new Reg({co_pagreg: 400, va_pagreg: rs.no_bancos})); // Banco
   row.addReg(new Reg({co_pagreg: 410, va_pagreg: rs.no_tipmon})); // Moneda
   row.addReg(new Reg({co_pagreg: 420, va_pagreg: rs.im_tipcam})); // Tipo Cambio
   row.addReg(new Reg({co_pagreg: 430, va_pagreg: rs.nu_ctaban})); // Cuenta Bancaria
   row.addReg(new Reg({co_pagreg: 440, va_pagreg: rs.nu_ctacci})); // CuentaBancaria
   row.addReg(new Reg({co_pagreg: 450, va_pagreg: rs.im_tottes})); // Monto Total
   row.addReg(new Reg({co_pagreg: 460, va_pagreg: rs.im_pagado})); // Monto Pagado
   row.addReg(new Reg({co_pagreg: 470, va_pagreg: rs.im_pendie})); // Monto Pendiente
   row.addReg(new Reg({co_pagreg: 480, va_pagreg: rs.im_abonar})); // Monto Transferir
   row.addReg(new Reg({co_pagreg: 490, va_pagreg: null}));         // Monto Pendiente

   row.addReg(new Reg({co_pagreg: 500, va_pagreg: null}));
   valpagJson.addRow(row);
});

DO_POST_LOAD_DATA = function () {
   SHOWINFO(true);
   AUTODYNAMIC(true);
   var acc = document.getElementsByName("BTNG1")[0].style.width = "90px";
   //window.parent.container(CO_PAGINA).css('width','605px');
   //document.getElementById('PAG'+CO_PAGINA).setAttribute('class',document.getElementById('PAG'+CO_PAGINA).getAttribute('class')+'2');
   //var dat = document.body.innerHTML.replace('Search:', 'hi');
   //alert(acc);

   CFGDATATABLE({
      searching:  true,    //no buscar
      ordering:   false,   //no ordenable
      paging:  true,    //no paginacion
      pageLength: 50,
      "scrollX":  true,    // ver scroll horizontal
      "scrollY":  true,    //altura maxima de tabla  - "400px"
      select:  true,    //se puede seleccionar,
      // fixedHeader: true,
      "sDom":  '<"H"Cfr>t<"F"ip>'
   });
};

VALPAGJS = valpagJson;