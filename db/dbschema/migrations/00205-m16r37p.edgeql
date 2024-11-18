CREATE MIGRATION m16r37pdrce4ebic3yziwmns6axmkrtmwunnk3qcvqfc2mc7kfmqcq
    ONTO m1qezr2igs2b4wzio2g55keq7f4xh7nideqgr446zzqy6saanklaca
{
  ALTER TYPE sys_core::SysDataObjActionShow {
      ALTER LINK codeActionShow {
          RENAME TO codeTriggerShow;
      };
  };
};
