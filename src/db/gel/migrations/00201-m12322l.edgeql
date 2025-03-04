CREATE MIGRATION m12322lhkczyevnqavedyd57ef3t75uxzyf5n7wzzm4qnd6u5xhboa
    ONTO m1zenrjw4dvlacjsoe4madtvgogggg6ju42kysn6fek7piofva6z7a
{
                              ALTER TYPE sys_core::SysDataObjActionConfirm {
      CREATE LINK codeTriggerConfirm: sys_core::SysCode;
  };
};
