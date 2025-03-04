CREATE MIGRATION m1hhx4xoko3xxfmidza2lolh2qorrfcymcjgtyr3lp4it2hfdmixga
    ONTO m1rrrp3tshe6jpcgfbfzzmoz5wcqyemxbu6rzyjcwbaiqz7lxddgmq
{
  ALTER TYPE sys_core::SysDataObjTable {
      ALTER LINK columnConflict {
          RENAME TO columnsConflict;
      };
  };
};
