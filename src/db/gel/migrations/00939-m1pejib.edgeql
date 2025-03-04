CREATE MIGRATION m1pejibfisiqa2qjdji6hjsoylqi27w6223wrnpkqioxkmpra5foua
    ONTO m1jrrcin4flypx4xuso3vszkrtwdp2az2at5xjwuckfkfksdehqrta
{
  ALTER TYPE sys_user::SysUser {
      ALTER LINK person {
          ON SOURCE DELETE ALLOW;
      };
      CREATE TRIGGER sys_user_delete
          AFTER DELETE 
          FOR EACH DO (DELETE
              default::SysPerson
          FILTER
              (.id NOT IN (app_cm::CmClient.person.id UNION sys_user::SysUser.person.id))
          );
  };
};
