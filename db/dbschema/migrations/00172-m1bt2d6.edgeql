CREATE MIGRATION m1bt2d6yfukpnykchvi4exjfxo4brmd5ahsr6ookrwnvkacvwgx45a
    ONTO m15einvo6dwomvvh4noz2iwnbzzncl3vmbzbp6oaweprkt3eqnjv7q
{
  ALTER TYPE sys_core::SysDataObjFieldListItems {
      CREATE PROPERTY exprWidth: std::str;
      CREATE PROPERTY exprWidthProperty: std::str;
  };
};
