CREATE MIGRATION m1nu4olent4bzlhsktocaubszewkgmpfosms7w7ivk3a47jbqhrb5q
    ONTO m1vy5ylnwsshl4jemnre6vhuhxj6rqlfhhxiedjk7c26ohfmtqihxq
{
              ALTER TYPE sys_rep::SysRepEl {
      CREATE LINK actionFieldGroup: sys_core::SysDataObjActionFieldGroup;
  };
};
