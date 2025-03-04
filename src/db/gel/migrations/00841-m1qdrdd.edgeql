CREATE MIGRATION m1qdrddcc2qelk6shfydqh5u7xzvzp6qgysdzde5pbksnzv57to5qa
    ONTO m1n5asf5so5msd6m4omgko5fmdg3d4lmy7iuhj2fnyc6m5epawvphq
{
          ALTER TYPE sys_user::SysTask {
      ALTER LINK sourceDataObj {
          RENAME TO targetDataObj;
      };
  };
  ALTER TYPE sys_user::SysTask {
      ALTER LINK sourceNodeObj {
          RENAME TO targetNodeObj;
      };
  };
};
