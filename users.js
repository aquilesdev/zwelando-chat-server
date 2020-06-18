const users = [];

const addUser = ({id, name, room}) => {

    
    name = `${name}`.trim().toLowerCase();
    room = `${room}`.trim().toLowerCase();


    const exists = users.find(user => user.name == name && user.room == room);

    if(exists){
        return {error: 'username already taken'};
    }

    const user = {id,name, room};

    users.push(user);

    return {user}
}

const removeUser = (id) => {

    const index = users.findIndex(user => user.id == id);

    const removedItems = users.splice(index,1);
    
    if(removedItems && removedItems.length>0){
        return removedItems[0]
    }

    return null;
}

const getUser = (id) => users.find(user => user.id == id);

const getUsersInRoom = (room) => users.filter(user => user.room == room);

module.exports = {addUser, removeUser, getUser, getUsersInRoom};