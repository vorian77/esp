CREATE MIGRATION m1haru6ws7pgymfexrll2rxzctwia66oebeqdwtwbnvckjp6bilmkq
    ONTO m1tnj474rbapcinx7v3jxdziro2xhldeday3gld4c3ehnuikhjne5a
{
  ALTER TYPE sys_user::SysUser {
      CREATE TRIGGER sys_user_delete
          AFTER DELETE 
          FOR EACH DO (DELETE
              default::SysPerson
          FILTER
              (.id NOT IN ((app_cm::CmClient.person.id UNION sys_core::SysObjAttrEnt.contacts.id) UNION sys_user::SysUser.person.id))
          );
  };
};
