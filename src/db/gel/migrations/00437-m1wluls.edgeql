CREATE MIGRATION m1wlulsvbqbbyhqhivfyqho6froglico4gsvrdvfbpnomcva24iojq
    ONTO m1vv3kpymrnyinrq4mfvjifbtlk6hy7xlofxutefwycw5rtjcdi6va
{
              ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY orderDefine {
          SET REQUIRED USING (<default::nonNegative>{});
      };
  };
  ALTER TYPE sys_rep::SysRepEl {
      DROP PROPERTY isDisplay;
  };
  ALTER TYPE sys_rep::SysRepEl {
      CREATE PROPERTY orderDisplay: default::nonNegative;
  };
};
