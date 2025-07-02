CREATE MIGRATION m1mjcfpavrlfxbswiifvt4scwunoqizu7olnmp4scd6uy6egcvi6ua
    ONTO m1z3tmyt2zvjoimkgoi32s5d46frllmjv7qiwlwjfz57cnbhgg4mqq
{
  ALTER TYPE sys_rep::SysRep {
      CREATE CONSTRAINT std::exclusive ON ((.owner, .name));
  };
  ALTER TYPE sys_user::SysApp {
      CREATE CONSTRAINT std::exclusive ON ((.owner, .name));
  };
  ALTER TYPE sys_user::SysTask {
      CREATE CONSTRAINT std::exclusive ON ((.owner, .name));
  };
  ALTER TYPE sys_user::SysUserAction {
      CREATE CONSTRAINT std::exclusive ON ((.owner, .name));
  };
};
