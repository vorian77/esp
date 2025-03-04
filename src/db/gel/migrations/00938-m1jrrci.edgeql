CREATE MIGRATION m1jrrcin4flypx4xuso3vszkrtwdp2az2at5xjwuckfkfksdehqrta
    ONTO m1vk4r6ds73vidkrvdwbttsf2qv35r3mwmgmxiynyvaxjlrk7ruc3q
{
  ALTER TYPE app_cm::CmClient {
      ALTER LINK person {
          ON SOURCE DELETE ALLOW;
      };
      CREATE TRIGGER cm_client_delete
          AFTER DELETE 
          FOR EACH DO (DELETE
              default::SysPerson
          FILTER
              (.id NOT IN (app_cm::CmClient.person.id UNION sys_user::SysUser.person.id))
          );
  };
};
