const starterBlack = document.querySelectorAll(".startBlack");
const starterWhite = document.querySelectorAll(".startWhite");
const start = document.querySelector("button.start");
const blackPostion = document.querySelectorAll("div.black");


const pawnBlack = [];
const pawnWhite = [];



const draw = function () {

    let i = 1;
    blackPostion.forEach(item => {
        item.dataset.num = i;
        i++;
        item.addEventListener("click", function () {
            const pawn = document.querySelector(".active");
            if (pawn != null) {
                if (pawn.classList.contains("black")) {
                    move(item, pawn, true);
                } else if (pawn.classList.contains("white")) {
                    move(item, pawn, false);
                }
            }
        })

    })

    starterBlack.forEach(item => {
        const pawn = document.createElement("div");
        pawn.classList.add("pawn");
        pawn.classList.add("black");
        item.appendChild(pawn);
        pawnBlack.push(pawn);
    })

    starterWhite.forEach(item => {
        const pawn = document.createElement("div");
        pawn.classList.add("pawn");
        pawn.classList.add("white");
        pawnWhite.push(pawn);
        item.appendChild(pawn);
    })




    pawnBlack.forEach((item) => {
        item.addEventListener("click", function () {
            pawnBlack.forEach((item2) => {
                if (item2.classList.contains("active")) {
                    item2.classList.remove("active");
                }
            })
            item.classList.toggle("active");
            console.log(item.parentElement.dataset.num);
            console.log(this);

        })
    })

    pawnWhite.forEach((item) => {
        item.addEventListener("click", function () {
            pawnWhite.forEach((item2) => {
                if (item2.classList.contains("active")) {
                    item2.classList.remove("active");
                }
            })
            item.classList.toggle("active");
            console.log(item.parentElement.dataset.num);
            console.log(this);

        })
    })




    console.log(this)
    this.removeEventListener("click", draw)
}



const move = (item, pawn, decision) => {
    if (item.childNodes.length == 0) {
        const thisPostion = parseInt(item.dataset.num);
        const pawnPostion = parseInt(pawn.parentElement.dataset.num);
        let tmp = 1;
        if (!decision) {
            tmp = -tmp;
        }
        if (pawnPostion + tmp * 4 === thisPostion)
            item.appendChild(pawn);
    }
}
start.addEventListener("click", draw);