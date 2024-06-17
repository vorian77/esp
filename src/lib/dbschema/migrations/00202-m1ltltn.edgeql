CREATE MIGRATION m1ltltnmy5rbt4ochwdugwybwl7pbqcne65kv544lyoplqk4t6kodq
    ONTO m12322lhkczyevnqavedyd57ef3t75uxzyf5n7wzzm4qnd6u5xhboa
{
  ALTER TYPE sys_core::SysDataObjActionConfirm {
      ALTER LINK codeActionShow {
          RENAME TO codeTriggerRender;
      };
  };
};
