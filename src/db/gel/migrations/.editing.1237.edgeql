CREATE MIGRATION m1dqrqjs5fm43xabnlpvfdbtci6xhz3k7gvqbst2k3vu7behflaouq
    ONTO m1mdypvjffc66blm7t4ivoifkwddb46k2uoffd5n576juqrfqm3poq
{
  ALTER TYPE sys_core::SysCode {
      CREATE LINK codeAttrType: sys_core::SysCode {
          SET REQUIRED USING (SELECT
              sys_core::getCode('ct_sys_obj_attr_type', 'at_sys_code')
          );
      };
      CREATE LINK owner: sys_core::SysSystem {
          SET REQUIRED USING (.ownerOld)
        ;
      };
      DROP EXTENDING sys_core::ObjRootCore,
      sys_user::Mgmt;
      EXTENDING sys_core::SysObjAttr LAST;
  };
  ALTER TYPE sys_core::SysCode {
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
  };
};
