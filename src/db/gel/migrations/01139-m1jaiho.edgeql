CREATE MIGRATION m1jaihon7ghp4hk453ig4ohq4xay6l5ej5g7vh6gbaxkbi5kkoruua
    ONTO m1ywtj2i6tqj7ny5dungv2yjt5bo76op3ir2dntl6eu7izfb6he3oq
{
  CREATE TYPE sys_core::SysObjAttrEnt EXTENDING sys_core::SysObj {
      CREATE MULTI LINK contacts: default::SysPerson {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE REQUIRED LINK codeEntType: sys_core::SysCode;
      CREATE LINK codeState: sys_core::SysCode;
      CREATE MULTI LINK notes: sys_core::SysObjNote {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE PROPERTY addr1: std::str;
      CREATE PROPERTY addr2: std::str;
      CREATE PROPERTY city: std::str;
      CREATE PROPERTY email: std::str;
      CREATE PROPERTY phoneOffice: std::str;
      CREATE PROPERTY website: std::str;
      CREATE PROPERTY zip: std::str;
      CREATE TRIGGER sys_user_delete
          AFTER DELETE 
          FOR EACH DO (DELETE
              default::SysPerson
          FILTER
              (.id NOT IN ((app_cm::CmClient.person.id UNION sys_core::SysObjAttrEnt.contacts.id) UNION sys_user::SysUser.person.id))
          );
  };
  ALTER TYPE app_cm::CmClient {
      ALTER TRIGGER cm_client_delete USING (DELETE
          default::SysPerson
      FILTER
          (.id NOT IN ((app_cm::CmClient.person.id UNION sys_core::SysObjAttrEnt.contacts.id) UNION sys_user::SysUser.person.id))
      );
  };
  ALTER TYPE app_cm::CmPartner {
      DROP EXTENDING sys_core::SysObjEnt;
      EXTENDING sys_core::SysObjAttrEnt LAST;
  };
  ALTER TYPE app_crm::CrmClient {
      DROP EXTENDING sys_core::SysObjEnt;
      EXTENDING sys_core::SysObjAttrEnt LAST;
  };
  ALTER TYPE sys_core::SysAttrObj {
      DROP EXTENDING sys_core::SysObjEnt;
      EXTENDING sys_core::SysObjAttrEnt LAST;
  };
  ALTER TYPE sys_core::SysObjEnt {
      DROP LINK codeEntType;
      DROP LINK codeState;
      DROP TRIGGER sys_user_delete;
  };
  ALTER TYPE sys_user::SysUser {
      ALTER TRIGGER sys_user_delete USING (DELETE
          default::SysPerson
      FILTER
          (.id NOT IN ((app_cm::CmClient.person.id UNION sys_core::SysObjAttrEnt.contacts.id) UNION sys_user::SysUser.person.id))
      );
  };
  ALTER TYPE sys_core::SysObjEnt {
      DROP LINK contacts;
      DROP LINK notes;
      DROP PROPERTY addr1;
      DROP PROPERTY addr2;
      DROP PROPERTY city;
      DROP PROPERTY email;
      DROP PROPERTY phoneOffice;
      DROP PROPERTY website;
      DROP PROPERTY zip;
  };
  DROP TYPE sys_core::SysAttrObjActionObj;
  DROP TYPE sys_core::SysObjEnt;
};
