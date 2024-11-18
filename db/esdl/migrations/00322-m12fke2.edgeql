CREATE MIGRATION m12fke2i4uowexykoukxzv54bhbo77vlip6l6zeoyxltmoxp7ukxsa
    ONTO m1pt3amrqxkbqwg5tn4xy5li2lu44zc57yzleuncxll7t3jbrwswya
{
      ALTER TYPE sys_rep::SysAnalyticStatus {
      ALTER LINK codeStatus {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
  };
  ALTER TYPE sys_rep::SysRep {
      CREATE MULTI LINK tables: sys_core::SysDataObjTable {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
