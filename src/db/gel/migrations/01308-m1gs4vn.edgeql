CREATE MIGRATION m1gs4vnxgtzmttwxwbefme6ox3hac5w6sruwgxt5srfwse5n6cdwcq
    ONTO m1haru6ws7pgymfexrll2rxzctwia66oebeqdwtwbnvckjp6bilmkq
{
  ALTER TYPE sys_user::SysUserType {
      CREATE LINK users := (.<userTypes[IS sys_user::SysUser]);
  };
};
