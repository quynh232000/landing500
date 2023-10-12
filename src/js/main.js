const dataListCoin= ` <div class="token-item">
<div class="token-item-name">
    <div class="token-name-left">
        <img src="./src/images/coin-bnb.png" alt="" class="token-img">
        <span>BNB</span>
    </div>
    <div class="token-name-right">
        BNB
    </div>
</div>
<div class="token-price">
   $ 205.69
</div>
<div class="token-value">
    $0
</div>
</div>

<div class="token-item">
<div class="token-item-name">
    <div class="token-name-left">
        <img src="./src/images/coin-xrp.png" alt="" class="token-img">
        <span>XRP</span>
    </div>
    <div class="token-name-right">
        XRP
    </div>
</div>
<div class="token-price">
   $ 0.4862
</div>
<div class="token-value">
    $0
</div>
</div>

<div class="token-item">
<div class="token-item-name">
    <div class="token-name-left">
        <img src="./src/images/coin-sol.png" alt="" class="token-img">
        <span>Solana</span>
    </div>
    <div class="token-name-right">
        SOL
    </div>
</div>
<div class="token-price">
   $ 21.66
</div>
<div class="token-value">
    $0
</div>
</div>

<div class="token-item">
<div class="token-item-name">
    <div class="token-name-left">
        <img src="./src/images/coin-ada.png" alt="" class="token-img">
        <span>Cardano</span>
    </div>
    <div class="token-name-right">
        ADA
    </div>
</div>
<div class="token-price">
   $ 0.2464
</div>
<div class="token-value">
    $0
</div>
</div>`
// function===================
const openModal=()=>{
    $(".modal").css("display","flex")
}
const closeModal=()=>{
    $(".modal").css("display","none")
}
function toast({ title = "", message = "", type = "info", duration = 3000 }) {
    const main = document.getElementById("toast");
    if (main) {
      const toast = document.createElement("div");
  
      // Auto remove toast
      const autoRemoveId = setTimeout(function () {
        main.removeChild(toast);
      }, duration + 1000);
  
      // Remove toast when clicked
      toast.onclick = function (e) {
        if (e.target.closest(".toast__close")) {
          main.removeChild(toast);
          clearTimeout(autoRemoveId);
        }
      };
     
      const icons = {
        success: "fa-solid fa-circle-check",
        info: "fas fa-info-circle",
        warning: "fas fa-exclamation-circle",
        error: "fa-solid fa-circle-exclamation"
      };
      const icon = icons[type];
      const delay = (duration / 1000).toFixed(2);
  
      toast.classList.add("toast", `toast--${type}`);
      toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
       
      toast.innerHTML = `
                      <div class="toast__icon">
                          <i class="${icon}"></i>
                      </div>
                      <div class="toast__body">
                         <h3 class="toast__title">${title}</h3>
                          <p class="toast__msg">${message}</p>
                      </div>
                      <div class="toast__close">
                          <i class="fas fa-times"></i>
                      </div>
                  `;
      main.appendChild(toast);
    }
}
function activeForm(type){
    $(".modal-switch-item").each(function(){$(this).removeClass("active")})
    $(`.modal-switch-item[data-type='${type}']`).addClass("active")
    if(type){
        $(".modal-title").text(type.toUpperCase())
        $(".modal-body").each(function(){$(this).removeClass("active")})
        $(`.modal-body[data-type='${type}']`).addClass("active")
    }
}
function checkForm(element){
    let check =true
    let data={}
    $(element).each(function(){
        if(!$(this).val()){
            check= false
            return {check:false}
        }else{
            data={
                ...data,
                [$(this).attr("name")]:$(this).val()
            }
        }
    })
    return {check:check,data:data}
}
// ============ready====================//
$().ready(function(){
    if($(".btn-login").length){
        $(".btn-login").click(()=>{
            openModal()
        })
    }
    if($(".btn-close").length){
        $(".btn-close").click(()=>{
            closeModal()
        })
    }
    if($(".modal").length){
        $(".modal").click(()=>{
            closeModal()
        })
    }
    if($(".modal-wrapper").length){
        $(".modal-wrapper").click(function(event){
            event.stopPropagation();
        })
    }
    $(".modal-switch-item").click(function(){
        activeForm($(this).attr("data-type"))
    })
    $(".btn-account").click(function(){
        activeForm($(this).attr("data-type"))
    })
    $(".btn-view-more").click(function(){
        $(".token-list").append(dataListCoin)
    })
    //login
    $("#form-login").submit(function(e){
        e.preventDefault()
        const res = checkForm("#form-login input")
        if(res.check){
            localStorage.setItem("USERINFO",JSON.stringify(res.data))
            toast({
                title: "Success !",
                message: "Login successfully!",
                type: "success"
            });
            setTimeout(()=>{
                location.reload()
            },5000)
        }else{
            toast({
                title: "Noti !",
                message: "Please enter all fields!!",
                type: "warning"
            });
        }
    })

    //register
    $("#form-register").submit(function(e){
        e.preventDefault()
        const res = checkForm("#form-register input")
        if(res.check){
            localStorage.setItem("USERINFO",JSON.stringify(res.data))
            toast({
                title: "Success !",
                message: "Login successfully!",
                type: "success"
            });
            setTimeout(()=>{
                location.reload()
            },5000)
        }else{
            toast({
                title: "Noty !",
                message: "Please enter all fields!!",
                type: "warning"
            });
        }
    })
})
