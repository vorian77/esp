CREATE MIGRATION m1xtvoygtuegygz5turpkxst7xdjzc62ebdc5bqwootwzea5lagi3q
    ONTO m13kksexko5c42m2cdzq76zesa2j7votbuv6rqqyas6z5kjpx5fmsa
{
  ALTER TYPE sys_core::SysDataObj {
      CREATE LINK selectListItems: sys_core::SysDataObjFieldListItems;
      CREATE PROPERTY selectListItemsParmValue: std::str;
  };
};
