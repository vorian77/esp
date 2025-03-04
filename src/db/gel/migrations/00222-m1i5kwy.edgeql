CREATE MIGRATION m1i5kwylpilrl4kcfxomaic4ri3yyx3pwo7xlqrue5gm2nswdmgqtq
    ONTO m1e26rn4crm2n4frujnhw5yypdhsbivkhv7ntnhfitl5izibw44loq
{
                              ALTER TYPE sys_core::SysDataObjColumn {
      DROP PROPERTY customElement;
  };
  CREATE TYPE sys_core::SysDataObjColumnCustom {
      CREATE REQUIRED LINK codeType: sys_core::SysCode;
      CREATE PROPERTY actionMethod: std::str;
      CREATE PROPERTY actionType: std::str;
      CREATE PROPERTY actionValue: std::str;
      CREATE PROPERTY align: std::str;
      CREATE PROPERTY color: std::str;
      CREATE REQUIRED PROPERTY label: std::str;
      CREATE PROPERTY prefix: std::str;
      CREATE PROPERTY size: std::str;
      CREATE PROPERTY source: std::str;
      CREATE PROPERTY sourceKey: std::str;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE LINK customElement: sys_core::SysDataObjColumnCustom;
  };
};
