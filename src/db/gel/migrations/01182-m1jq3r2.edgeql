CREATE MIGRATION m1jq3r2ga26bylei4aeuwps6qfvpzdl3pul57de4ln4kdavwopnqpq
    ONTO m1hpkhuiplh2xqq35lumkqv2once6ibun2aypp7iwa76e7nnvzq2lq
{
  ALTER TYPE sys_user::SysUser {
      CREATE LINK codeAttrType: sys_core::SysCode {
          SET REQUIRED USING (SELECT
              sys_core::getCode('ct_sys_obj_attr_type', 'at_sys_user')
          );
      };
      CREATE LINK owner: sys_core::SysSystem {
          SET REQUIRED USING (SELECT
              sys_core::getSystemPrime('sys_system')
          );
      };
      CREATE PROPERTY name: std::str {
          SET REQUIRED USING (<std::str>{.userName});
      };
      DROP EXTENDING sys_user::Mgmt;
      EXTENDING sys_core::SysObjAttr LAST;
  };
  ALTER TYPE sys_user::SysUser {
      ALTER LINK codeAttrType {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
      ALTER LINK owner {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
      ALTER PROPERTY name {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
};
