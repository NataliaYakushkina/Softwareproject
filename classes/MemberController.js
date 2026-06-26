function getMembers(){
    return findAll();
}
function createMember(pName, pID, pHausID, pDate){
    const member = new Member(pName, pID, pHausID, pDate);
    saveMem(member);
}