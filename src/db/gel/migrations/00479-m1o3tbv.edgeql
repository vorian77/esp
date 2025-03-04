CREATE MIGRATION m1o3tbvecemtiapvdw75lc6vu65ivhvkhw54pu5pfhr2nqxqep6bha
    ONTO m1uorweof6ty7tcpwjlrybs5lbishgqoof3ah2t7sirv7sqparhp7q
{
              ALTER TYPE sys_core::SysDataObj {
      ALTER LINK actionsFieldGroup {
          RENAME TO actionFieldGroup;
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldEmbedListConfig {
      ALTER LINK actionsFieldGroup {
          RENAME TO actionFieldGroup;
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldEmbedListSelect {
      ALTER LINK actionsFieldGroup {
          RENAME TO actionFieldGroup;
      };
  };
};
