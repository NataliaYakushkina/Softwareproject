class MemberRepository {
    constructor(){
        this.memberList = [];
    }
    findAll(){
        return this.memberList;
    }
    findByID(pID){
        for(let i = 0; i <= this.memberList.at(-1); i++){
            if(this.memberList.at(i).memID == pID)
                return this.memberList.at(i);
            else
                return "Not found";
        }
    }
    save(pMember){
        this.memberList.push(pMember);
    }
    delete(pID){
        this.findByID;
        this.memberList.pop();
    }
}

class MemberController {
    getMembers(){
        return;
    }
    createMember(pName, pID, pHausID, pDate){
        const member = new Member(pName, pID, pHausID, pDate);
        return member;
    }
}