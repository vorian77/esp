CREATE MIGRATION m1nhtfvazlgzpxq5ygykwwoubxmu23s47q25l63kpd7luuysy4kfiq
    ONTO m1wkobzazw53cbdqvbswylrimxcnh7dymi52bfao2nmy45jnepszuq
{
  ALTER TYPE sys_core::SysDataObjColumnTriggerTarget RENAME TO sys_core::SysDataObjColumnItemChange;
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK itemChangeTargets {
          RENAME TO itemChanges;
      };
  };
};
