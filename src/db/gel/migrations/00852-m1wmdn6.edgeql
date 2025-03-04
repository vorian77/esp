CREATE MIGRATION m1wmdn6uc7dh6znnah7nxnscgynj5mmmxnllpoobcyelrwh24sjtra
    ONTO m1szzjm3ck4szyf6gxrevbhqyljuh36yaeydlbtas2gvrfvsa3whnq
{
      ALTER TYPE app_cm::CmClient {
      ALTER LINK person {
          RENAME TO personOld;
      };
  };
  CREATE TYPE default::SysPerson EXTENDING sys_core::SysObjEnt {
      CREATE LINK codeDisabilityStatus: sys_core::SysCode;
      CREATE LINK codeEthnicity: sys_core::SysCode;
      CREATE LINK codeGender: sys_core::SysCode;
      CREATE LINK codeRace: sys_core::SysCode;
      ALTER PROPERTY avatar {
          SET OWNED;
          SET TYPE std::json;
      };
      CREATE PROPERTY birthDate: cal::local_date;
      ALTER PROPERTY email {
          SET OWNED;
          SET TYPE std::str;
      };
      CREATE PROPERTY favFood: std::str;
      CREATE REQUIRED PROPERTY firstName: default::Name;
      CREATE REQUIRED PROPERTY lastName: default::Name;
      CREATE PROPERTY fullName := (((.firstName ++ ' ') ++ .lastName));
      CREATE PROPERTY idMigration: std::uuid;
      CREATE PROPERTY isLegalAgreed: std::bool;
      CREATE PROPERTY middleName: default::Name;
      CREATE PROPERTY phoneAlt: std::str;
      CREATE PROPERTY phoneMobile: std::str;
      CREATE PROPERTY ssn: std::str;
      CREATE PROPERTY title: std::str;
      ALTER PROPERTY zip {
          SET OWNED;
          SET TYPE std::str;
      };
  };
  ALTER TYPE sys_core::ObjRoot {
      ALTER LINK contacts {
          SET TYPE default::SysPerson USING (.contacts[IS default::SysPerson]);
      };
  };
  ALTER TYPE sys_core::SysObjEnt {
      ALTER LINK contacts {
          RESET CARDINALITY;
          DROP OWNED;
      };
  };
  ALTER TYPE sys_user::SysUser {
      ALTER LINK person {
          RENAME TO personOld;
      };
  };
};
