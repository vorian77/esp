CREATE MIGRATION m1orclkzxhq5zt7we7cvccsfkjdn56motutl2zec57xmlx2ifhs7uq
    ONTO m14odtmdius4yxhmy2ppnzdlwsp4fr7qlh4lb2fcm4zpmtfcaxkpcq
{
      ALTER TYPE sys_core::SysDataObjFieldListItems {
      CREATE PROPERTY exprPropDisplay: std::str;
      CREATE PROPERTY exprPropOther: std::str;
  };
};
