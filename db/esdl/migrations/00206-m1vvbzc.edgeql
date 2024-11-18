CREATE MIGRATION m1vvbzcgjdivh2rhjeptunnwukwkejklpae5c6jjukfphq6zt2uc7q
    ONTO m16r37pdrce4ebic3yziwmns6axmkrtmwunnk3qcvqfc2mc7kfmqcq
{
                  ALTER TYPE sys_core::SysDataObjAction {
      ALTER LINK codeActionEnable {
          RENAME TO codeTriggerEnable;
      };
  };
};
