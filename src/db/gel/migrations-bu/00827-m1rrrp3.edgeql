CREATE MIGRATION m1rrrp3tshe6jpcgfbfzzmoz5wcqyemxbu6rzyjcwbaiqz7lxddgmq
    ONTO m1dqedzxrtrhkyep7mc5fxvke3iumap7ofptojfheomrrjeu2ala3q
{
  ALTER TYPE sys_core::SysDataObjTable {
      CREATE MULTI LINK columnConflict: sys_db::SysColumn;
  };
};
