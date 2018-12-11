const starterBlack = document.querySelectorAll(".startBlack");
const starterWhite = document.querySelectorAll(".startWhite");
const start = document.querySelector("button.start");
const blackPostion = document.querySelectorAll("div.black");


const pawnBlack = [];
const pawnWhite = [];
let pawnsAll = null;




class Pawn {
    constructor(figure, postion = 1, decision = true, lastPostion = null) {
        this.figure = figure;
        this.postion = postion;
        this.lastPostion = lastPostion;
        this.decision = decision
        this.nextPostions = [];
        this.block = true;

    }

    move(item, pawnsAll) {
        if (item.childNodes.length == 0) {
            const thisPostion = parseInt(item.dataset.num);
            if (this.nextPostions.indexOf(thisPostion) != -1) {
                this.lastPostion = this.postion;
                this.postion = thisPostion;
                item.appendChild(this.figure);
                this.attach(this.postion, this.decision);
                this.figure.classList.remove("active");
                   

                if (this.figure.classList.contains("black")) {
                    pawnsAll.forEach(element => {
                        if (element.figure.classList.contains("black")) {
                            element.block = false;
                        } else {
                            element.block = true;
                        }
                    })
                } else {

                    pawnsAll.forEach(element => {
                        if (element.figure.classList.contains("white")) {
                            element.block = false;
                        } else {
                            element.block = true;
                        }
                    })
                }

            }
        }
    }

    attach(item, decision = true) {
        const parseDate = parseInt(item);
        let tmp = 1;
        if (decision == false) {
            tmp = -tmp;
        }

        if (Math.floor(parseDate / 4.1) % 2 === 0) {

            if ((parseDate % 4) !== 1) {

                this.nextPostions = [];
                this.nextPostions.push(parseDate + (tmp * 4));
                this.nextPostions.push(parseDate + (tmp * 4) - 1);
            } else {
                this.nextPostions = [];
                this.nextPostions.push(parseDate + (tmp * 4));
            }
        } else {
            if ((parseDate % 4) !== 0) {
                this.nextPostions = [];
                this.nextPostions.push(parseDate + (tmp * 4));
                this.nextPostions.push(parseDate + (tmp * 4) + 1);
            } else {
                this.nextPostions = [];
                this.nextPostions.push(parseDate + (tmp * 4));
            }
        }
    }


    hits(pawnArray, mainArray, ifWhite = false) {
        const removeArray = [];
        let tmp = 1;
        
        if (ifWhite) {
            tmp = -tmp;
        }
        this.nextPostions.forEach(item => {
            pawnArray.forEach(element => {
                if (item === element.postion) {
                    if (Math.floor(element.postion / 4.1) % 2 == 0) {
                        if (Math.floor(element.postion % 4) !== 1) {
                            removeArray.push(element.postion);
                            let dif = Math.abs(this.postion - element.postion);                        
                            
                            if (dif === 3)
                                this.nextPostions.push(element.postion + (tmp * 4));
                            if (dif === 4)
                                this.nextPostions.push(element.postion + (tmp * 3));
                            if (dif === 5)
                                this.nextPostions.push(element.postion + (tmp * 4));
                        }


                    }
                    if (Math.floor(element.postion / 4.1) % 2 == 1) {

                        if (Math.floor(element.postion % 4) !== 0) {
                            removeArray.push(element.postion);
                            let dif = Math.abs(this.postion - element.postion)                     
                            
                            if (dif === 3)
                                this.nextPostions.push(element.postion + (tmp * 4));
                            if (dif === 4)
                                this.nextPostions.push(element.postion + (tmp * 3));
                            if (dif === 5)
                                this.nextPostions.push(element.postion + (tmp * 4));
                        }
                    }

                }
            })
        })
        console.log(removeArray);
        for (let i = 0; i < removeArray.length; i++) {
            const index = this.nextPostions.indexOf(removeArray[i]);
            this.nextPostions.splice(index, 1);
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
            pawnWhite.forEach(element => {
                if (element.figure.classList.contains("active")) {
                    pawn = element;
                }

            })

            if (pawn != null) {
                if (pawn.figure.classList.contains("black")) {
                    pawn.hits(pawnWhite,blackPostion);                    
                    pawn.move(item, pawnsAll);
                } else if (pawn.figure.classList.contains("white")) {
                    pawn.hits(pawnBlack, blackPostion, true);                    
                    pawn.move(item, pawnsAll,);

                }
            }
            console.log(pawn);
        })

    })

    starterBlack.forEach(item => {
        const prote = document.createElement("div");
        prote.classList.add("pawn");
        prote.classList.add("black");
        const parseDate = parseInt(item.dataset.num);
        const pawn = new Pawn(prote, parseDate, true);
        pawn.attach(item.dataset.num, true);
        item.appendChild(pawn.figure);
        pawnBlack.push(pawn);
    })

    starterWhite.forEach(item => {
        const prote = document.createElement("div");
        prote.classList.add("pawn");
        prote.classList.add("white");
        const parseDate = parseInt(item.dataset.num);
        const pawn = new Pawn(prote, parseDate, false);
        pawn.attach(item.dataset.num, false);
        item.appendChild(pawn.figure);
        pawnWhite.push(pawn);

    })




    pawnBlack.forEach((item) => {
        item.figure.addEventListener("click", function () {
            if (item.block) {
                pawnBlack.forEach((item2) => {
                    if (item2.figure.classList.contains("active")) {
                        item2.figure.classList.remove("active");
                    }
                })
                item.figure.classList.toggle("active");

                item.attach(item.figure.parentNode.dataset.num, true);
            }
        })

    })

    pawnWhite.forEach((item) => {
        item.figure.addEventListener("click", function () {
            if (item.block) {
                pawnWhite.forEach((item2) => {
                    if (item2.figure.classList.contains("active")) {
                        item2.figure.classList.remove("active");

                    }
                })

                item.figure.classList.toggle("active");
                item.attach(item.figure.parentNode.dataset.num, false);

            }
        })
    })
    pawnsAll = pawnBlack.concat(pawnWhite);
    console.log()
    this.removeEventListener("click", draw)
}




start.addEventListener("click", draw);