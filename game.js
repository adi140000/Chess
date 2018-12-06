const starterBlack = document.querySelectorAll(".startBlack");
const starterWhite = document.querySelectorAll(".startWhite");
const start = document.querySelector("button.start");
const blackPostion = document.querySelectorAll("div.black");


const pawnBlack = [];
const pawnWhite = [];


class Pawn {
    constructor(figure, postion, lastPostion = null) {
        this.figure = figure;
        this.postion = postion;
        this.lastPostion = lastPostion
    }

    move(item, decision) {
        if (item.childNodes.length == 0) {
            const thisPostion = parseInt(item.dataset.num);            
            let tmp = 1;
            if (!decision) {
                tmp = -tmp;
            }
            if (this.postion + tmp * 4 === thisPostion)
            {
                this.lastPostion=this.postion;
                this.postion=this.postion + tmp * 4 ;
                item.appendChild(this.figure);
            }
        }
    }
}



const draw = function () {

    let i = 1;
    blackPostion.forEach(item => {
        item.dataset.num = i;
        i++;
        item.addEventListener("click", function () {
            let pawn = null;
            pawnBlack.forEach(element => {
                if (element.figure.classList.contains("active")) {
                    pawn = element;
                }

            })
            console.log(pawn);
            if (pawn != null) {
                if (pawn.figure.classList.contains("black")) {
                    pawn.move(item, true);
                } else if (pawn.figure.classList.contains("white")) {
                    pawn.move(item, false);
                }
            }
        })

    })

    starterBlack.forEach(item => {
        const prote = document.createElement("div");
        prote.classList.add("pawn");
        prote.classList.add("black");
        const pawn = new Pawn(prote, parseInt(item.dataset.num));
        item.appendChild(pawn.figure);
        pawnBlack.push(pawn);
    })

    starterWhite.forEach(item => {
        const prote = document.createElement("div");
        prote.classList.add("pawn");
        prote.classList.add("white");
        const pawn = new Pawn(prote, parseInt(item.dataset.num));
        item.appendChild(pawn.figure);
        pawnWhite.push(pawn);

    })




    pawnBlack.forEach((item) => {
        item.figure.addEventListener("click", function () {
            pawnBlack.forEach((item2) => {
                if (item2.figure.classList.contains("active")) {
                    item2.figure.classList.remove("active");
                }
            })
            item.figure.classList.toggle("active");
            console.log(item.figure.parentElement.dataset.num);

        })
    })

    pawnWhite.forEach((item) => {
        item.figure.addEventListener("click", function () {
            pawnWhite.forEach((item2) => {
                if (item2.figure.classList.contains("active")) {
                    item2.figure.classList.remove("active");
                }
            })
            item.figure.classList.toggle("active");
            console.log(item.figure.parentElement.dataset.num);
            console.log(this);

        })
    })

    this.removeEventListener("click", draw)
}




start.addEventListener("click", draw);