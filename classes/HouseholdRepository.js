const household = [];
function findByHouseID(pHausID){
    for(let i = 0; i <= household.at(-1); i++){
        const a = new Household;
        a = household.at(i);
        if(a.household = pHausID)
            return a;
    }
}
function saveHouse(pHaus){
    household.push(pHaus);
}
function updateHousehold(pHaus, pHausID){
    for(let i = 0; i <= household.at(-1); i++){
        const a = new Household;
        a = household.at(i);
        if(a.household == pHausID)
            household.at(i) = pHaus;
    }
}