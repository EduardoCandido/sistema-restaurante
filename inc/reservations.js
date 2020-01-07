var conn = require('./db');

module.exports= {
    
    render(req, res, error, success){

        res.render('reservation', {
            title: 'Reservas - Restaurante saboroso',
            background: 'images/img_bg_2.jpg',
            h1: 'Reserve uma Mesa!',
            body: req.body,
            error,
            success
          });
    },

    getReservations(){

        return new Promise( (resolve, reject) =>{

            conn.query(`
                SELECT * FROM tb_reservations ORDER BY date DESC
            `, (err, results)=>{

                if(err){
                reject(err);
                } 

                resolve(results);
            });
        });
    },

    save(fields){

        return new Promise((resolve, reject)=>{


            if(fields.date.indexOf('/') > -1 ){

                let date = fields.date.split('/');

                fields.date = `${date[2]}-${date[1]}-${date[0]}`;
            }


            let query;     
            let params = [
                fields.name,
                fields.email,
                fields.people,
                fields.date,
                fields.time
            ];
           
            //PAra saber se é update ou insert query e params e definido dentro do escopo do if e else
            if(parseInt(fields.id) > 0 ){

                query = `
                    UPDATE tb_reservations
                    SET
                        name = ?,
                        email = ?,
                        people = ?,
                        date = ?,
                        time = ? 
                    WHERE id = ?
                `;

                params.push(fields.id);

                conn.query(query, params, (error, results)=>{  
                    
                    if(error) reject(error);

                    resolve(results)
                });

            } else {

                query = `
                    INSERT INTO tb_reservations (name, email, people, date, time) 
                    VALUES(?, ?, ?, ?, ?)
                `;

                conn.query(query, params, (error, results)=>{  
                    
                    if(error) reject(error);

                        resolve(results)
                    }
                );
            }
        });
    },

    delete(id){

        return new Promise((resolve, reject)=>{

            conn.query(`DELETE FROM tb_reservations WHERE id = ?`, [
                id
            ], (err, results)=>{
                if(err){

                    reject(err);
                }else{

                    resolve(results);
                }
            } );
        });
    }
}