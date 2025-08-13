CREATE MIGRATION m16xacrud2h3gbem5bukr5pcrttkjk7hhja27isospw7n3pynk66wq
    ONTO m137alqa323dzk5iey5ar2ec4zcqaqd3zi2pg4hefaqokbadr4g5qa
{
  ALTER TYPE sys_user::SysUserAction {
      DROP PROPERTY exprClass;
  };
};
