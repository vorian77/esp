CREATE MIGRATION m1ehzwturdl7wawcrwx5lwgkivxcbkpgtwsedqvo6m4ah6mu4ezrfa
    ONTO m1z4qzzdtyd24huiyboldyykcrxyezgi7ltddhofbd4csjdjylqoca
{
  ALTER TYPE sys_core::SysMsg {
      CREATE MULTI LINK readers: default::SysPerson;
  };
};
