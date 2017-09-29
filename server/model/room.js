'use restrict'

class Room {
    constructor(room){
        this.name = room.name;
        this.id = room.id;
        this.free = false    
    }

    setFree(free){
        this.free = free
    }


    getName(){
        return this.name;
    }

    getId(){
        return this.id;
    }

    getState(){
        return this.free ? 'FREE' : 'BUSY';
    }

    getRoom (){
        return this
    }
}