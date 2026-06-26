const memberList = [];
function findAll(){
    return memberList;
}
function findByID(pID){
    for(let i = 0; i <= memberList.at(-1); i++){
        const a = new Member;
        a = memberList.at(i);
        if(a.memID == pID)
            return a;
        else
            return "Not found";
    }
}
function saveMem(pMember){
    memberList.push(pMember);
}
function deleteMem(pID){
    const b = [];
    for(let i = 0; i <= memberList.at(-1); i++){
        const a = new Member;
        a = memberList.at(i);   
        if(a.memiD == pID){
            for(let j = i; i < memberList.at(-1); i++)
                b.push(memberList.at(i))
            for(j; j >= i; j--)
                memberList.pop();
            for(i; i <= b.at(-1); i++)
                memberList.push(b.at(i));
        }
    }
}