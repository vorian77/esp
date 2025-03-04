CREATE MIGRATION m12odc2z5mvxrztb7ckzf3dcm64q4no5vt32mhwce7cbtlovy3cx6q
    ONTO m1hdbad64nk27zphhxzfvr6zu6s3nbtiajlsftaqvhwi2cvbhfzpaq
{
  CREATE TYPE sys_core::SysObjEnt EXTENDING sys_core::SysObj {
      CREATE LINK codeState: sys_core::SysCode;
      CREATE MULTI LINK contacts: default::SysPerson {
          ON TARGET DELETE ALLOW;
      };
      CREATE PROPERTY addr1: std::str;
      CREATE PROPERTY addr2: std::str;
      CREATE PROPERTY city: std::str;
      CREATE PROPERTY email: std::str;
      CREATE PROPERTY website: std::str;
      CREATE PROPERTY zip: std::str;
  };
  ALTER TYPE app_cm::CmPartner {
      CREATE LINK createdBy: sys_user::SysUser {
          SET REQUIRED USING (<sys_user::SysUser>{});
      };
  };
  ALTER TYPE app_cm::CmPartner {
      CREATE LINK modifiedBy: sys_user::SysUser {
          SET REQUIRED USING (<sys_user::SysUser>{});
      };
  };
  ALTER TYPE app_cm::CmPartner {
      CREATE LINK owner: sys_core::SysSystem {
          SET REQUIRED USING (<sys_core::SysSystem>{});
      };
  };
  ALTER TYPE app_cm::CmPartner {
      DROP PROPERTY idMigration;
  };
  ALTER TYPE app_cm::CmPartner {
      CREATE PROPERTY name: std::str {
          SET REQUIRED USING (<std::str>{});
      };
      DROP EXTENDING sys_core::ObjRoot;
      EXTENDING sys_core::SysObjEnt LAST;
      ALTER LINK owner {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
  ALTER TYPE app_cm::CmPartner {
      ALTER LINK createdBy {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
      ALTER LINK modifiedBy {
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
