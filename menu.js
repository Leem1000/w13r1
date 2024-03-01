//mostrar y desaparecer menu
const menuh = document.querySelector('#menuh');
const ulmenu = document.querySelector('#ulmenu');

menuh.addEventListener('click', function(){
    ulmenu.classList.toggle('mostrar')

})

//mostrar y desaparecer SUBMENU >768

const aPafondo = document.querySelectorAll('.aPafondo');

for(let i=0; i<aPafondo.length; i++){

    aPafondo[i].addEventListener('click', function(){

        if(window.innerWidth<768){

        const submenu = this.nextElementSibling;
        const H = submenu.scrollHeight;

        if(submenu.getAttribute('style')){
            submenu.removeAttribute('style')
            ulsubmenu.classList.add('reduced')
          


        }else{

            submenu.style.height = H +"px";
            ulsubmenu.classList.add('reduced')
           
        }

    }




    })




}

//MOSTRAR DESAPARECER SUBMENU >768PX

const ulsubmenu = document.querySelectorAll('.ulsubmenu')

for(let x=0; x<ulsubmenu.length; x++){

    ulsubmenu[x].addEventListener('click', function(){

        if(window.innerWidth>768){

        if(ulsubmenu[x].classList.contains('hide')){
            ulsubmenu[x].classList.remove('hide')

        }else{
            ulsubmenu[x].classList.add('hide')
        }
    }
    })
}

const aPasublink = document.querySelectorAll('.aPasublink')

for(let x=0; x<aPasublink.length; x++ ){

    aPasublink[x].addEventListener('mouseover', function(){

        ulsubmenu[x].classList.remove('hide');
       
    })

    if(innerWidth<768){
        aPasublink[x].addEventListener('click', ()=>{
            ulsubmenu[x].classList.remove('hide')
        })
    }

  

}

//desaparecer Menu <768px

const header = document.querySelector('.header');

header.addEventListener('click', (e) =>{


        if(e.target.classList.contains('alink')){
            ulmenu.classList.remove('mostrar') 
        }

    

})

for (let x=0; x<ulsubmenu.length; x++){

    window.addEventListener('resize', ()=>{
        if(window.innerWidth > 768){
            ulsubmenu[x].classList.add('reduced');
          
           
        }
    })};

