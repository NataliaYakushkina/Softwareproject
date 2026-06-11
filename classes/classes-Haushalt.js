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
    get taskID() {
        return this.taskID;
    }
    get title() {
        return this.title;
    }
    get description() {
        return this.description;
    }
    get status() {
        return this.status;
    }
    get week() {
        return this.week;
    }
    get assignmenedTo() {
        return this.assignmenedto;
    }
    get createdBy() {
        return this.createdby;
    }
    get createdAt() {
        return this.createdat;
    }
    get completedAt() {
        return this.completedat;
    }
}

class HouseholdSettings {
    constructor(pID, pName){
        this.household = pID;
        this.housename = pName;
    }
    get name() {
        return this.housename;
    }
}

class Household {
    constructor(pID, pName, pCreateAt){
        this.household = pID;
        this.housename = pName;
        this.createdat = pCreateAt;
    }
    get housename() {
        return this.housename;
    }
    get createdAt() {
        return this.createdat;
    }
}