CREATE MIGRATION m1pt3amrqxkbqwg5tn4xy5li2lu44zc57yzleuncxll7t3jbrwswya
    ONTO m1ff37m2wxlle65cnosps6clmnqbxhk6gdpbiyochueu2o4cqnofyq
{
      CREATE TYPE sys_rep::SysAnalyticStatus EXTENDING sys_user::Mgmt {
      CREATE LINK codeStatus: sys_core::SysCode;
      CREATE PROPERTY comment: std::str;
      CREATE PROPERTY expr: std::str;
  };
  CREATE TYPE sys_rep::SysAnalytic EXTENDING sys_core::SysObj {
      CREATE MULTI LINK statuses: sys_rep::SysAnalyticStatus {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE PROPERTY description: std::str;
  };
};
