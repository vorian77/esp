CREATE MIGRATION m1o4tfm3ndrxj3zj6324mn6mbk2rvqnrkf365yklbg7hjafns3tgyq
    ONTO m14qsvimbekv63ttznby4lwudfc3ya7t4lmdfbglk62l3juxy6lrdq
{
  CREATE TYPE sys_core::SysAttrSource EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK codeAttrsAccessSource: sys_core::SysCode;
      CREATE MULTI LINK codeAttrsType: sys_core::SysCode;
  };
  ALTER TYPE sys_core::ObjRoot {
      CREATE MULTI LINK attrsSource: sys_core::SysAttrSource {
          ON SOURCE DELETE DELETE TARGET;
      };
  };
  ALTER TYPE sys_core::SysAttrAccess {
      CREATE REQUIRED LINK codeAttrsAccessSource: sys_core::SysCode {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
  };
  ALTER TYPE sys_core::SysAttrAccess {
      CREATE MULTI LINK codeAttrsType: sys_core::SysCode;
  };
  ALTER TYPE sys_core::SysAttrAccess {
      DROP LINK objs;
  };
};
