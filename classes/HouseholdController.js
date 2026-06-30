function getCurrentHousehold(){
    const a = new Household;
    a = household.at;
    return a;
}
function getHouseholdCode(){
    const a = new Household;
    a = getCurrentHousehold;
    return a.housename;
}
function updateHouseholdName(pName, pHausID){
    for(let i = 0; i <= household.at(-1); i++){
        const a = new Household;
        a = household.at(i);
        if(a.household == pHausID)
            a.housename = pName;
            household.at(i) = a;
    }
}