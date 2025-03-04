CREATE MIGRATION m1fx2etukzqlm52ny5eyt3rfbnqe4qoroudm2cercamkljg5yhcwxq
    ONTO m1ydx3zdcksvvn6yzfrrmefrzhahgpyrfg4mttlh6evggs5iktrmha
{
          DROP FUNCTION sys_core::getDataObjFieldListItems(name: std::str);
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP LINK fieldListItems;
  };
  DROP TYPE sys_core::SysDataObjFieldListItems;
};
