CREATE MIGRATION m1rcbpphcz3r6epjwtjlyfujbglv7zvjehwvqliuc3ziwc2qwxmxna
    ONTO m1fnbyjhr2t7doqc2mkx2ms7aqxwhmbgp6cz42uk2dyscbmiesrxca
{
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE LINK customCodeType: sys_core::SysCode;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP LINK customElement;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY customActionMethod: std::str;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY customActionType: std::str;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY customActionValue: std::str;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY customAlign: std::str;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY customCourceKey: std::str;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY customLabel: std::str;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY customPrefix: std::str;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY customSize: std::str;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY customSource: std::str;
  };
  DROP TYPE sys_core::SysDataObjColumnCustom;
};
