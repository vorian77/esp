CREATE MIGRATION m1m4y2cz27rqxmi7unqa3vj53heucqyzicpqs4ci7co24lgo5pekda
    ONTO m15p3f46c7tdek5r5ntukjr3bwqg7e4ldsivsdazkala3r4f5ejsxa
{
              ALTER TYPE sys_user::SysUserType {
      CREATE LINK users := (.<userTypes[IS sys_user::SysUser]);
  };
};
