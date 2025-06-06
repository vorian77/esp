CREATE MIGRATION m136hk6uwn2r2acd6yekqtmmtweytofii2xgnttwy2lfs46zzzhaza
    ONTO m1zmt7xjsba4qixqh7hxzna3zjsbk3nm2rdrprocbhkwzpni6wsqha
{
  ALTER TYPE sys_core::SysMsg {
      ALTER PROPERTY createdAt {
          RENAME TO dateMsg;
      };
  };
};
