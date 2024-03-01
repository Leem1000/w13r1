const contProd = document.querySelector('.contenedor-productos');
const contDetalles = document.querySelector('.container-detalles');
const contCart = document.querySelector('#carrito-body')
const contFootCarrito = document.querySelector('#footer-carrito-tabla')

function mostrarProductos(){
    products.forEach( item =>{
        contProd.innerHTML += ` 

        <article class="cartola" >
        <!-- imagen del producto -->
        <div class="contenedor-img">
            <img src="${item.imagesSrc}" alt="">
        </div>
        <!-- Nombre y descripción del producto -->
        <div class="div-info">
            <h2 class="nombre-prod">${item.name}</h2>
            <hr class="separador">
            <p class="descripcion-prod">${item.description}</p>
        </div>
        <!-- Precio del producto y boton para mas detalles y boton para agregar al carrito -->
        <div class="div-precio">
            <p class="precio">${item.price}</p>
        </div>
        <div class="div-botones">
            <button class="boton detalles-button" onclick="masDetalles(${item.id})" >Mas Informacion</button>
            <button class="boton agregarCarrito"  onclick= "addToCart(${item.id})">Agregar al Carrito</button>

        </div>
          </article>
        
        
        
        `
    })
}
mostrarProductos();

// mostrar detalles de cada producto








// agregar items al carrito

let cart= [];
function addToCart(id){

    if(cart.some(item =>item.id ==id)){
        // alert('this product already exists')
        changeQuantity('plus', id)

    }else{
        const item = products.find(pro => pro.id ===id)
        cart.push({
            ...item,
            numberOfUnits: 1,
        })
        // console.log(item)
        // cart.push(item)
        console.log(cart)

    }
    updateCart();
}

function updateCart(){
    renderProducts();
     mostrarTotal();
}

function renderProducts(){
    contCart.innerHTML = ''
    cart.forEach(prod =>{
        contCart.innerHTML += `

        <tr class="carrito-prod">
        <!-- celda de imagen de producto en el carrito -->
        <td class="imgCarrito">
            <div class="contenedor-img">
            <img src="${prod.imagesSrc}" alt="">
        </div>
        </td>
        <td id="producto">${prod.name}</td> 

        <td> <button class="button menos"  onclick="changeQuantity('minus', ${prod.id} )">-</button>
        <span class= "number">${prod.numberOfUnits}</span>
        <button class="button mas" onclick="changeQuantity('plus' , ${prod.id} )">+</button>  </td>
        <td class="precio-tabla" id="precio-uni">${prod.price}</td>
        <td class="precio-tabla" id="precio-total-prod">${ (prod.price*prod.numberOfUnits).toFixed(2)   }</td>
        <td>  <button  class=" btn-danger" type="button" onclick= "removeItemfromCart(${prod.id})"> <img src="images/tachito.png" alt=""></button></td>
          </tr>
        
        `
    })

}
function changeQuantity(accion, id){
    cart= cart.map(item =>{
        let numberOfUnits = item.numberOfUnits
        if(item.id ===id){
            if(accion==="minus" && numberOfUnits >1){
                numberOfUnits--
            }else if(accion ==="plus" && numberOfUnits < item.instock){
                numberOfUnits++
            }
        }
        return{
            ...item,
            numberOfUnits,
        }
    } )
    updateCart()
}

function mostrarTotal(){
    let totalPrice = 0;
    let totalItems = 0;
    cart.forEach(item =>{
        totalPrice += item.price*item.numberOfUnits;
        totalItems += item.numberOfUnits
        console.log(totalPrice, totalItems)
    })
    contFootCarrito.innerHTML = `

    <tr class="none">
    <td class="border-bottom-left"colspan=2 > <button id="vaciar-tabla" class="button" onclick= "vaciarCarrito()">Vaciar Carrito</button>      </td>
    <td class="cantidadTotal"colspan=1 >${ totalItems}</td>
    <td class="negrita">Precio Total</td>
    <td id="total-a-pagar" class="precio-tabla border-bottom-right negrita">${ totalPrice.toFixed(2)}</td>
    <td class="border-bottom-right negrita"</td>

    </tr>
    `
    document.querySelector('.cartContador .cantidadTotal').innerHTML = totalItems
}

function removeItemfromCart(id){
    cart = cart.filter(item => item.id !==id)
    updateCart()
}

function vaciarCarrito(){
    cart=[];
    document.querySelector('.cartContador .cantidadTotal').innerHTML = 0
    updateCart();
}



let det= [];

function setCantidadInicial(){
    products.forEach(item => {
        item.quantity = 1;
    });
   
    masDetalles();
   
   
}
function aumentarCantidad(id){
    const item = products.find(p=> p.id === id);
    if(item){
        item.quantity++;
       
        mostrarDetItem();
    }
  }

  function disminuirCantidad(id){
    const item = products.find(p=> p.id === id);
    if(item && item.quantity > 1){
        item.quantity--;
      
        mostrarDetItem();
        
    }
  }





function masDetalles(id){
   // console.log(id);
    const item = products.find(item => item.id ===id )
    console.log(id)
    det.push(item)
    console.log(det)
    mostrarDetItem()
}

function mostrarDetItem(){
    contDetalles.innerHTML = ''
    det.forEach(item =>{
        contDetalles.innerHTML+= `

        <div class="preview">
             
        <div class="detalles">
           
            <button class="closeDet" onclick="removeItem(${item ? item.id : null})">x</button>
          
           <div class="bloques">
               <div class="bloque1">

                    <!-- imagen del producto -->
                    <div class="contenedorimg">
                     <img src="${item.imagesSrc}" alt="">
                     <h2 class="nombre-prod">${item.name}</h2>
                    </div> 
                    <!-- Nombre y descripción del producto -->


                    <!-- <div class="divinfo">
                     <h2 class="nombre-prod">Nombre Producto</h2>
                    <hr class="separador">
                    </div> -->

               </div>
               <div class="bloque2"> 

                   <p class="descripcion-prod">${item.description}</p>
                     <!-- Precio del producto y boton para mas detalles y boton para agregar al carrito -->
                     <div class="divprecio-boton">
                   <p class="precio">${item.price}</p>
                   </div>

                   <div>
                   <button class="aumenDismi" onclick="disminuirCantidad(${item.id})">-</button>
                   ${item.quantity}
                   <button class="aumenDismi" onclick="aumentarCantidad(${item.id})">+</button>
                   </div>

                   
                   <div class="precio-tabla" id="precio-total-prod">${ (item.price*item.quantity).toFixed(2)   }</div>
               </div> 

           </div>


           <div class="botoness">
               <button class="boton MasInfo" onclick= "continuarComprando(${item.id})">continuar comprando</button>
               <button class="boton agregarCarrito" onclick= "addFromDetToCart(${item.id})">Agregar al Carrito</button>
               </div> 

             </div>

   </div>
        
        `
    })
    contDetalles.style.display = 'flex'
    setCantidadInicial();
   
   

}



function removeItem(id){
    console.log(id)
    det = det.filter(item => item && item.id !== id)
    contDetalles.style.display = 'none';
   
  
  
  
}

function addFromDetToCart(id){

    addToCart(id);
    removeItem(id)

}

function continuarComprando(id){
    removeItem(id)
}
