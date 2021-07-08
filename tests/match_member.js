const memberAliases = require('../memberAliasMap.json');

// loads memberAliasMap.json as an obj and matches the received
//member nickname to my key for memberData.
function matchMember(memberName) {
    let name;
    name = memberAliases[memberName];
    return name;
}

module.exports = { matchMember };