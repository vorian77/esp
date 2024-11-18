CREATE MIGRATION m1vv3kpymrnyinrq4mfvjifbtlk6hy7xlofxutefwycw5rtjcdi6va
    ONTO m1w6l4bczphqjymokm4rdr4kbppozhthbfspbmbfe3ajrh3i5k3y5a
{
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP PROPERTY isDisplayable;
  };
  ALTER TYPE sys_rep::SysRepEl {
      DROP PROPERTY isDisplayable;
  };
};
