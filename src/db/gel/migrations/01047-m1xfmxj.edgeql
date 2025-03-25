CREATE MIGRATION m1xfmxj6einmsd6vy4qnulyixsp2h26zlsh2uhspflbomgiitqiufa
    ONTO m1hqbsj2iwxii537txebvzsb2c3mfus6z4p37wmgqg3lkgrk5rm4za
{
  ALTER TYPE sys_core::SysAttrAccess {
      CREATE REQUIRED LINK codeAttrAccess: sys_core::SysCode {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
  };
  ALTER TYPE sys_core::SysAttrAccess {
      DROP LINK codeAttributeAccess;
      DROP PROPERTY hasAccess;
  };
};
