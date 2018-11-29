const starterBlack=document.querySelectorAll(".startBlack");
const starterWhite=document.querySelectorAll(".startWhite");
const start=document.querySelector("button.start");

const pawnBlack =[];
const pawnWhite = [];

const draw = function(){
    starterBlack.forEach(item=>{
        const pawn=document.createElement("div");
        pawn.classList.add("pawn");
        pawn.classList.add("black");        
        item.appendChild(pawn);
        pawnBlack.push(pawn);
    })
    
    starterWhite.forEach(item=>{
        const pawn=document.createElement("div");
        pawn.classList.add("pawn");
        pawn.classList.add("white"); 
        pawnWhite.push(pawn);      
        item.appendChild(pawn);
    })




    pawnBlack.forEach((item)=>{
        item.addEventListener("click", ()=>{
            pawnBlack.forEach((item2)=>{
                if(item2.classList.contains("active"))
                {
                    item2.classList.remove("active");
                }
            })
            item.classList.toggle("active");
            
        })
    })

    pawnWhite.forEach((item)=>{
        item.addEventListener("click", ()=>{
            pawnWhite.forEach((item2)=>{
                if(item2.classList.contains("active"))
                {
                    item2.classList.remove("active");
                }
            })
            item.classList.toggle("active");
            
        })
    })



    console.log(this)
    this.removeEventListener("click",draw)
}



start.addEventListener("click",draw);


