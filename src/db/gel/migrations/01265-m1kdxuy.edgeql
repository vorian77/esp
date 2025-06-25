CREATE MIGRATION m1kdxuythr55jqa5uz54keqgjdsleqpgf3vd6km4aqajwn5ts4wk5q
    ONTO m1h75ht6rtwmpsf73duk6iiu6wbs32pmad2dyxnibzhre6csku7fuq
{
  ALTER TYPE sys_user::SysTask {
      ALTER LINK codeStatusObj {
          RENAME TO codeTaskStatusObj;
      };
  };
};
