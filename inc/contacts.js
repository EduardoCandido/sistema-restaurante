var conn = require('./db');

module.exports = {

    render(req, res, error, success){

        res.render('contacts', {
            title: 'Contato - Restaurante saboroso',
            background: 'images/img_bg_3.jpg',
            h1: 'Diga olá',
            body: req.body,
            error,
            success
          });
    },

    save(fields){

        return new Promise((resolve, reject)=>{

            conn.query(`
                INSERT INTO tb_contacts (name, email, message) 
                VALUES(?, ?, ?)
                `, [
                fields.name,
                fields.email,
                fields.message
                ], (error, results)=>{  
                    
                    if(error) reject(error);

                    resolve(results)
                }
            );

        });
    }     
}