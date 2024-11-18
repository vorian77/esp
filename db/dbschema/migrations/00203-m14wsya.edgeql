CREATE MIGRATION m14wsyackezohdtgoivupxtbf26kv3qa7hso66u3ksd3xsxxbvl2zq
    ONTO m1ltltnmy5rbt4ochwdugwybwl7pbqcne65kv544lyoplqk4t6kodq
{
  ALTER TYPE sys_core::SysDataObjActionConfirm {
      ALTER LINK codeTriggerRender {
          RENAME TO codeConfirmType;
      };
  };
};
