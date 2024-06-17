CREATE MIGRATION m1qezr2igs2b4wzio2g55keq7f4xh7nideqgr446zzqy6saanklaca
    ONTO m14wsyackezohdtgoivupxtbf26kv3qa7hso66u3ksd3xsxxbvl2zq
{
  ALTER TYPE sys_core::SysDataObjActionConfirm {
      ALTER LINK codeTriggerConfirm {
          RENAME TO codeConditionalConfirmTrigger;
      };
  };
};
