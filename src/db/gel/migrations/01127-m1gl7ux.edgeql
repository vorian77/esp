CREATE MIGRATION m1gl7uxw6b6nwvwzarh6fdb2r72jtfdut7mblsndlt2xaejgp4baea
    ONTO m1zjthnfrdkuv6cc2lyb6kxj467o5m2ntpwavdvr2f5sxjrvwkr47a
{
  ALTER TYPE sys_core::SysDataObjFieldListItems {
      DROP EXTENDING sys_core::SysObj;
      EXTENDING sys_core::SysObjDb LAST;
      ALTER PROPERTY exprFilter {
          DROP OWNED;
          RESET TYPE;
      };
      ALTER PROPERTY exprSort {
          DROP OWNED;
          RESET TYPE;
      };
      ALTER PROPERTY exprWith {
          DROP OWNED;
          RESET TYPE;
      };
  };
};
