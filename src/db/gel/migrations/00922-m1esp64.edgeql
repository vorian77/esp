CREATE MIGRATION m1esp64unbydu6ol4af7wgtk2wdc653gibsopfcf7nct44wng56r4a
    ONTO m1gfb3s6r3j3kkxaycti5go4aygalftwton6zej5kb5h45t5jq4hua
{
  ALTER TYPE sys_core::ObjRootCore {
      DROP LINK testCodeMulti;
      DROP LINK testCodeSingle;
      DROP PROPERTY testBool;
      DROP PROPERTY testDate;
      DROP PROPERTY testDateTime;
      DROP PROPERTY testNumberFloat;
      DROP PROPERTY testNumberInt;
      DROP PROPERTY testText;
  };
};
