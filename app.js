class Player{
    constructor (shooting, rebounding, finishing, passing, defense, handling){
        this.shooting = shooting;
        this.rebounding = rebounding;
        this.finishing = finishing;
        this.passing = passing;
        this.defense = defense;
        this.handling = handling;
    }
}


class UI {

    static display(){
        const player = Storage.getPlayer();
        UI.updateProgress(player);
        UI.overall(player);
        UI.preview(player);
    }

    static updateProgress(player){
        const shootingBar = document.querySelector('#shooting-progress');
        const shootingUpdate = player.shooting;
        shootingBar.style.width = `${shootingUpdate}%`;

        const reboundingBar = document.querySelector('#rebounding-progress');
        const reboundingUpdate = player.rebounding;
        reboundingBar.style.width = `${reboundingUpdate}%`;
        
        const finishingBar = document.querySelector('#finishing-progress');
        const finishingUpdate = player.finishing;
        finishingBar.style.width = `${finishingUpdate}%`;

        const passingBar = document.querySelector('#passing-progress');
        const passingUpdate = player.passing;
        passingBar.style.width = `${passingUpdate}%`;

        const defenseBar = document.querySelector('#defense-progress');
        const defenseUpdate = player.defense;
        defenseBar.style.width = `${defenseUpdate}%`;

        const handlingBar = document.querySelector('#handling-progress');
        const handlingUpdate = player.handling;
        handlingBar.style.width = `${handlingUpdate}%`;
    }

    static overall(player){
        const overallDOM = document.querySelector('#overall');

        const shootingInt = parseInt(player.shooting, 10);
        const reboundingInt = parseInt(player.rebounding, 10);
        const finishingInt = parseInt(player.finishing, 10);
        const passingInt = parseInt(player.passing, 10);
        const defenseInt = parseInt(player.defense, 10);
        const handlingInt = parseInt(player.handling, 10);

        const update = Math.round((shootingInt + reboundingInt + finishingInt + passingInt + defenseInt + handlingInt) /6);

        overallDOM.textContent = update.toString();
    }

    static preview (player){
        document.querySelector('#shooting').placeholder = player.shooting;
        document.querySelector('#rebounding').placeholder = player.rebounding;
        document.querySelector('#finishing').placeholder = player.finishing;
        document.querySelector('#passing').placeholder = player.passing;
        document.querySelector('#defense').placeholder = player.defense;
        document.querySelector('#handling').placeholder = player.handling;

    }
}

class Storage {

    static storePlayer(player){
        const storedPlayer = player;
        localStorage.setItem('player', JSON.stringify(storedPlayer));
    }

    static getPlayer(){
        let player;
        if (localStorage.getItem('player') === null){
            player = new Player("50","50","50","50","50","50");

        }else{
            player = JSON.parse(localStorage.getItem('player'));
        }
        return player;
    }
}


// Event: doc loaded
document.addEventListener('DOMContentLoaded' , UI.display);

// Event: form submit
const updateForm = document.querySelector('#update');
updateForm.addEventListener("submit",(e) =>{

    //prevent default
    e.preventDefault();

    //form values
    const shooting = document.querySelector('#shooting').value;
    const rebounding = document.querySelector('#rebounding').value;
    const finishing = document.querySelector('#finishing').value;
    const passing = document.querySelector('#passing').value;
    const defense = document.querySelector('#defense').value;
    const handling = document.querySelector('#handling').value;

    //instatiate player
    const player = new Player (shooting, rebounding, finishing, passing, defense, handling);

    //store player
    Storage.storePlayer(player);

    //update progress bars
    UI.updateProgress(player);

    //update overall
    UI.overall(player);

});
