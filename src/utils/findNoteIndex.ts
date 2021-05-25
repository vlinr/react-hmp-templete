 const findNoteIndex = (data:Array<any>,id:number,key:string = 'note_id'):number=>{
    for(let i:number = 0; i<data.length; ++i){
        if(data[i][key] === id)return i;
    }
    return -1;
}
export default findNoteIndex;