CREATE MIGRATION m1ccq4xfa5bwfbf7fjchotgrzrdw7hhmsoztd7acwsw3pn7ntrbz5q
    ONTO m1vozbkt55w4ui3b2rl7pvaoonohwllbe2zvvlritxh2egr3br4fba
{
  DROP FUNCTION sys_core::getDataObjFieldListConfig(name: std::str);
  DROP FUNCTION sys_core::getDataObjFieldListSelect(name: std::str);
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP LINK fieldListConfig;
      DROP LINK fieldListSelect;
  };
  DROP TYPE sys_core::SysDataObjFieldListConfig;
  DROP TYPE sys_core::SysDataObjFieldListSelect;
};
