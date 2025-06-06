CREATE MIGRATION m1zmt7xjsba4qixqh7hxzna3zjsbk3nm2rdrprocbhkwzpni6wsqha
    ONTO m1w2ity5yl7xoisbulhnk6x4fbvar6bunyqneylmsmcgh44kxeaw6q
{
  ALTER TYPE sys_user::SysUserAction {
      DROP LINK codeTriggerEnable;
  };
  ALTER TYPE sys_user::SysUserAction {
      CREATE PROPERTY exprEnable: std::str;
  };
};
