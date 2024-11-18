CREATE MIGRATION m1awwpymm7pxnk4lymi6hczpv6ijhojfwwlyaepu6dhsadcizbqpbq
    ONTO m1tcukeggiuegsng4e3ofkqb2o2onpsf7b7ydxzzhrvecilbl65wja
{
  ALTER TYPE sys_core::SysDataObj {
      ALTER PROPERTY isRetrievedPrevent {
          RENAME TO isAlwaysRetrieveData;
      };
  };
};
