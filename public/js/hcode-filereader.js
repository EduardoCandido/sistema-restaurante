class HcodeFileReader{

    constructor(inputEL, imgEL){

        this.inputEL = inputEL;
        this.imgEL = imgEL;


        this.initInputEvent()
    }

    initInputEvent(){

        document.querySelector(this.inputEL).addEventListener("change", (e)=>{

            this.reader(e.target.files[0]).then(result=>{

                document.querySelector(this.imgEL).src = result
            }).catch();
        });
    }

    reader(file){

        return new Promise( (resolve, reject)=>{

            let reader = new FileReader();
        
            reader.onload = function(){
    
                console.log(reader)
                resolve(reader.result)
            }

            reader.onerror = function(){

                reject('Não foi possível ler a imagem');
            }
    
            reader.readAsDataURL(file);


        });

    }
}