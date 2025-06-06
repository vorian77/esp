CREATE MIGRATION m1tfz52e4oox6eosz2zpwa63fwupyhj4hxl76h5trm43nr3duivtda
    ONTO m1ydxfjiao4rn2ojhoyuoiryhqp4eiqwlhpxgbptaoskx2utrjxwza
{
  CREATE TYPE sys_core::SysGridStyleTrigger {
      CREATE REQUIRED LINK codeOp: sys_core::SysCode;
      CREATE REQUIRED LINK column: sys_core::SysDataObjColumn;
      CREATE PROPERTY columnValue: std::json;
  };
  CREATE TYPE sys_core::SysGridStyle {
      CREATE LINK styleTrigger: sys_core::SysGridStyleTrigger {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE REQUIRED PROPERTY prop: std::str;
      CREATE REQUIRED PROPERTY propValue: std::str;
  };
  ALTER TYPE sys_core::SysDataObj {
      CREATE MULTI LINK gridStyles: sys_core::SysGridStyle {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  ALTER TYPE sys_core::SysDataObj {
      DROP PROPERTY exprStyle;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE MULTI LINK gridStyles: sys_core::SysGridStyle {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP PROPERTY exprStyle;
  };
};
