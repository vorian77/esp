CREATE MIGRATION m1u5ilh5rphhctqf5m5mxr6y23ukccsx2k675xttosutqcndqiinda
    ONTO m1h5dk7pwi7qahwgmxy4xnsqqi63vvwphsbnpsskrnjmdhqhn65wnq
{
  ALTER TYPE sys_core::SysObjEnt {
      CREATE TRIGGER sys_user_delete
          AFTER DELETE 
          FOR EACH DO (DELETE
              default::SysPerson
          FILTER
              (.id NOT IN ((app_cm::CmClient.person.id UNION sys_core::SysObjEnt.contacts.id) UNION sys_user::SysUser.person.id))
          );
  };
  ALTER TYPE sys_user::SysUser {
      ALTER TRIGGER sys_user_delete USING (DELETE
          default::SysPerson
      FILTER
          (.id NOT IN ((app_cm::CmClient.person.id UNION sys_core::SysObjEnt.contacts.id) UNION sys_user::SysUser.person.id))
      );
  };
};
