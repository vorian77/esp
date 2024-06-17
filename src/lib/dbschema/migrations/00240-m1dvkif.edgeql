CREATE MIGRATION m1dvkifmja7t7zpl5zrlulrp7g2aqvdleaybl3ajnh3cxi4mfqel7q
    ONTO m1zkuhexfmuip2edxjqc7lhrsfmftw22qqfembrtlzg3smmgcojcmq
{
  ALTER TYPE sys_core::SysDataObjActionFieldConfirm {
      ALTER LINK codeConditionalConfirmTrigger {
          RENAME TO codeTriggerConfirmConditional;
      };
  };
};
