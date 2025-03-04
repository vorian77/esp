CREATE MIGRATION m1xiqnirymtpsshf3l36kxwqj64iaxybwmy3nnmvtgk2kyponhmhya
    ONTO m1rkcjjbrheihpnvaobvl62uuchkpt3e2w2vqvkaosmbef676ynfha
{
          ALTER TYPE sys_user::SysTask {
      CREATE LINK codeColorFrom: sys_core::SysCode;
  };
  ALTER TYPE sys_user::SysTask {
      CREATE LINK codeColorTo: sys_core::SysCode;
  };
  ALTER TYPE sys_user::SysTask {
      ALTER LINK obj {
          RENAME TO objectTask;
      };
  };
  ALTER TYPE sys_user::SysTask {
      DROP PROPERTY colorFrom;
      DROP PROPERTY colorTo;
  };
};
