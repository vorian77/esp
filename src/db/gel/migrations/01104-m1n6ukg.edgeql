CREATE MIGRATION m1n6ukgz5hpmy6f7g3f62kw5qlhwb57vaibqtqx2afpkjlvaunbx3q
    ONTO m1cay5ot27vviq6pkzbsqw5tpblnniheau6ol25wzp7aidhstroyla
{
  ALTER TYPE sys_core::SysDataObj {
      ALTER LINK tables {
          RENAME TO tablesOld;
      };
  };
};
