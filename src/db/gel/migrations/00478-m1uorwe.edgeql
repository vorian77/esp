CREATE MIGRATION m1uorweof6ty7tcpwjlrybs5lbishgqoof3ah2t7sirv7sqparhp7q
    ONTO m1gwdvkmb5u2xhs2snkhx2zuck3e7vy3gh2jauwlgqy6owbbouivuq
{
              ALTER TYPE sys_core::SysDataObjActionFieldGroup {
      ALTER LINK actionItems {
          RENAME TO actionFieldItems;
      };
  };
};
