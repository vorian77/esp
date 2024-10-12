CREATE MIGRATION m1bw4gvrctimeliyowkgaoswechg74ilavrmotboburbjznr6ni4ca
    ONTO m1em7jsh4hxsdn2ckv723jiwvrykox5nenlbjt2mxkdv76d32kqofa
{
  ALTER TYPE sys_core::SysObj {
      ALTER LINK ownerOld {
          RENAME TO owner;
      };
  };
};
