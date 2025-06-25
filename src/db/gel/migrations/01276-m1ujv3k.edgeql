CREATE MIGRATION m1ujv3kc7slpxnxlaetxesj6ekpsxs5btwqbo44sccfcl6t5shaarq
    ONTO m1jkhmag35as4px46i3jlwnpyugdizxhcudyflurgvrz7r3x3a7evq
{
  ALTER TYPE sys_core::SysDataObj {
      ALTER PROPERTY isRetrieveReadonly {
          RENAME TO isFormReadonly;
      };
  };
};
