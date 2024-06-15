class Privilege{
    name; // PK;
    level; // 1 ... 100
    status; // PrivilegeStatus.Inactive (enum)
};

module.exports = Privilege;