CREATE MIGRATION m1gwdvkmb5u2xhs2snkhx2zuck3e7vy3gh2jauwlgqy6owbbouivuq
    ONTO m1yu7vyolqnjuh5nkajoaz6xz6vsqq7jt4gtmt6ovnxpm3j7es5pla
{
  ALTER TYPE sys_core::SysDataObjActionFieldGroup {
      ALTER LINK actions {
          RENAME TO actionItems;
      };
  };
};
