CREATE MIGRATION m1fh46rjpsfbs26i24kugtkg67hbtjvk3ncstly7avgzuje4fa2l6a
    ONTO m1x3btjwwl6zcy5jnjkcohrx63catliupforncwewzhyimdxk7fgwq
{
              ALTER TYPE sys_core::SysOrg {
      CREATE PROPERTY orderDefine: default::nonNegative;
  };
};
