CREATE MIGRATION m1gguzxbd2kgya5h6tzjmr3oh46kau6p7bs7lnccnjdsnynjznqoga
    ONTO m1zus4f63o525cpds4mdj2aakb5gjimju7a7uyptciipnukemlquia
{
  ALTER TYPE sys_core::SysDataObjActionFieldConfirm {
      ALTER LINK codeTriggerConfirmConditional {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
  };
};
