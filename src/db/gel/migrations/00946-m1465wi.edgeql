CREATE MIGRATION m1465wizxlf4yup66kwqaxsjht623fbrm5i4jemiz7gl6e3dbgsm3q
    ONTO m1ikekcteyjqi25zagjkhpbruca74of53hqgi44xj32fm6f23igukq
{
  CREATE TYPE sys_core::SysObjEntAttr EXTENDING sys_core::SysObjEnt;
  ALTER TYPE sys_core::SysAttr {
      ALTER LINK obj {
          SET TYPE sys_core::SysObjEntAttr USING (.obj[IS sys_core::SysObjEntAttr]);
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE LINK codeAttributeType: sys_core::SysCode;
      CREATE MULTI LINK exprSaveAttributes: sys_core::SysObjEntAttr;
      CREATE PROPERTY attributeAccess: std::bool;
  };
};
