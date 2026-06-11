class Member {
    constructor(pName, pID, pHausID, pDate){
        this.name = pName;
        this.memiD = pID;
        this.household = pHausID;
        this.joined = pDate;
    }
}

class Admin extends Member {
    constructor(pAdminID){
        super();
        this.AdminID = pAdminID;
    }
}

class Task {
    constructor(pID, pTitle, pDescr, pStatus, pWeek, pAssignMemID, pCreateByMemID, pCreateAt, pCompleteAt){
        this.taskID = pID;
        this.title = pTitle;
        this.description = pDescr;
        this.status = pStatus;
        this.week = pWeek;
        this.assignmenedto = pAssignMemID;
        this.createdby = pCreateByMemID;
        this.createdat = pCreateAt;
        this.completedat = pCompleteAt;  
    }
}

class HouseholdSettings {
    constructor(pID, pName){
        this.household = pID;
        this.housename = pName;
    }
}

class Household {
    constructor(pID, pName, pCreateAt){
        this.household = pID;
        this.housename = pName;
        this.createdat = pCreateAt;
    }
}