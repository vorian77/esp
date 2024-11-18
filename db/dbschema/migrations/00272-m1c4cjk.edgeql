CREATE MIGRATION m1c4cjkbegnnw4koajndsmjjky3hldjqutwg6cqn4xeu2jsjr7fsxa
    ONTO m1nhljmwcdinbgm32tmxcr3oyv27z2guj6k2m5czu55ppj67khlnlq
{
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE MULTI LINK linkColumns: sys_db::SysColumn;
  };
};
