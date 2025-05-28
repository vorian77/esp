CREATE MIGRATION m1uryjn4j74retrrwovi2iclfuii3xasqzn4qolthmbt62dob42ysa
    ONTO m17zgpk5clflgsbbdgzpjfksojoldtsimaiml4z5kconaoextpwp4a
{
  DROP FUNCTION sys_user::getUserType(userTypeName: std::str);
  DROP FUNCTION sys_user::getUserTypeResource(ownerName: std::str, name: std::str);
  CREATE TYPE sys_core::SysAttrObjActionObj EXTENDING sys_core::SysAttrObj;
  ALTER TYPE sys_rep::SysRep {
      CREATE LINK codeEntType: sys_core::SysCode {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
      DROP EXTENDING sys_user::SysUserTypeResource;
      EXTENDING sys_core::SysAttrObj LAST;
  };
  ALTER TYPE sys_rep::SysRep {
      ALTER LINK codeEntType {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
  ALTER TYPE sys_user::SysApp {
      CREATE LINK codeEntType: sys_core::SysCode {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
      DROP EXTENDING sys_user::SysUserTypeResource;
      EXTENDING sys_core::SysAttrObj LAST;
  };
  ALTER TYPE sys_user::SysApp {
      ALTER LINK codeEntType {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
  ALTER TYPE sys_user::SysTask {
      CREATE LINK codeEntType: sys_core::SysCode {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
      DROP EXTENDING sys_user::SysUserTypeResource;
      EXTENDING sys_core::SysAttrObj LAST;
  };
  ALTER TYPE sys_user::SysTask {
      ALTER LINK codeEntType {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
  ALTER TYPE sys_user::SysUserType {
      DROP LINK users;
      DROP CONSTRAINT std::exclusive ON (.name);
      DROP LINK resources;
      DROP LINK tags;
      DROP PROPERTY isSelfSignup;
  };
  ALTER TYPE sys_user::SysUser {
      DROP LINK userTypes;
  };
  ALTER TYPE sys_user::SysUserAction {
      CREATE LINK codeEntType: sys_core::SysCode {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
      DROP EXTENDING sys_core::SysObj;
      EXTENDING sys_core::SysAttrObj LAST;
  };
  ALTER TYPE sys_user::SysUserAction {
      ALTER LINK codeEntType {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
  DROP TYPE sys_user::SysUserType;
  DROP TYPE sys_user::SysUserTypeResource;
};
