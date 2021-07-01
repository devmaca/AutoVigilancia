function estPost(req, res, next) {
  try {
    console.log('apiREST params', req.params);
    console.log('apiREST query', req.query);
    console.log('apiREST body', req.body);
    var msg = "ESTUDIANTE REGISTRADO EXITOSAMENTE!"
    if(req.body.nomb==""){
        msg = "no dejar en blanco";
      }
    let error = valEst(req.body);
    if (error) {
      console.log ("MENSAJES DE VALIDACIONES:");
      console.log(error)
      res.status(422).send({
        finalizado: true,
        mensaje: 'Campos imcompletos',
        error: error,
      });
      return;
    }
    // Si no hay errores se puede insertar los datos

    let sql4 = 'SELECT * FROM personas WHERE ci=?';
    let sql3="SELECT * FROM tutor WHERE ci=?"
    let fecha=req.body.dia+"-"+req.body.mes+"-"+req.body.aa;
    con.query(sql4,[req.body.ci], function(err,result2){
      if(!result2[0]){
        console.log('se puede guardar!!')
        con.query(sql3,[req.body.citut], function(err,result){ 
                if(err){throw err;}
                if(!result[0]){//no existe tutor
                  console.log('no existe')
                  res.status(200).send({
                    finalizado: true,
                    mensaje: 'no existe tutor',
                    datos: result[0],
                    dato2: req.body.citut,
                    ms:msg
                  });
                }else{//si existe tutor
                  console.log(result[0])
                  res.status(200).send({
                    finalizado: true,
                    mensaje: 'si existe tutor',
                    datos: result[0],
                    ms:msg
                  });
                }
        })
      }else{
              res.status(200).send({
                finalizado: true,
                mensaje: 'post ok',
                duplicado: result2[0],
                ms:'YA EXISTE UN CI CON ESE NUMERO INGRESE OTRO CI'
              });
      }
    })

  } catch(e) {
    console.log('ERROR', e);
    res.status(501).send({
      finalizado: true,
      mensaje: 'post Error',
    });
  }
}

module.exports.conductores ={
  estPost
}