CREATE MIGRATION m1k3stw7ipxgfoncegdkhq2t372zn77btn3ruaay6ybgnzjf4qropq
    ONTO m1hrcqdlxabd7ffgm24fnyher62jnvwmxgmqvilugaba4iv3hv7f5q
{
  ALTER TYPE sys_user::SysUser {
      DROP EXTENDING sys_core::SysObjAttr;
      EXTENDING sys_core::SysObjOrg LAST;
  };
};
