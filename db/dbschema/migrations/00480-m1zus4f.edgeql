CREATE MIGRATION m1zus4f63o525cpds4mdj2aakb5gjimju7a7uyptciipnukemlquia
    ONTO m1o3tbvecemtiapvdw75lc6vu65ivhvkhw54pu5pfhr2nqxqep6bha
{
  ALTER TYPE sys_core::SysDataObjActionField {
      ALTER LINK actionConfirms {
          RENAME TO actionFieldConfirms;
      };
  };
  ALTER TYPE sys_core::SysDataObjActionField {
      ALTER LINK actionShows {
          RENAME TO actionFieldShows;
      };
  };
  ALTER TYPE sys_core::SysDataObjActionField {
      ALTER LINK codeActionType {
          RENAME TO codeActionFieldTriggerEnable;
      };
  };
  ALTER TYPE sys_core::SysDataObjActionField {
      ALTER LINK codeTriggerEnable {
          RENAME TO codeActionFieldType;
      };
  };
};
