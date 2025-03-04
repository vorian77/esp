CREATE MIGRATION m14sykmzp6xo2mghvlxxwnm6yawiwfpjlpegi2473n3aelgjko3i2a
    ONTO m16fd4zsq6yznw3f5muatdq6y7nqorwrqfcyesnkqi2uf6oqmeymca
{
          ALTER TYPE sys_user::SysTask {
      ALTER LINK codeColorFrom {
          RENAME TO codeStatusObj;
      };
  };
  ALTER TYPE sys_user::SysTask {
      DROP LINK codeColorTo;
  };
  ALTER TYPE sys_user::SysTask {
      DROP LINK codeTaskStatusObj;
  };
  ALTER TYPE sys_user::SysTask {
      ALTER LINK codeTaskType {
          RENAME TO codeCategory;
      };
  };
  ALTER TYPE sys_user::SysTask {
      DROP LINK objectTask;
  };
  ALTER TYPE sys_user::SysTask {
      CREATE LINK sourceDataObj: sys_core::SysDataObj;
  };
  ALTER TYPE sys_user::SysTask {
      CREATE LINK sourceNodeObj: sys_core::SysNodeObj;
  };
};
