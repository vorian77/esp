CREATE MIGRATION m1hqtrusrlunxtgmnqxhfaztqhyrhdat4suswiwirmfvi6u536cpja
    ONTO m1cx3gxiu2uvtdh55z3kerktewrek3dcwnoc53vlwg5s7j7dx6hzuq
{
  ALTER TYPE sys_db::SysTable {
      ALTER PROPERTY table {
          USING (((.mod ++ '::') ++ .name));
      };
  };
};
