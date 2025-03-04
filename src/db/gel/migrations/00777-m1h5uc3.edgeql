CREATE MIGRATION m1h5uc3jc72sikfxgkraehnsqumjcsn7vpuuclnlt24c5a742aop5q
    ONTO m1cailsklrkhlgpoyi3ptppzpvphjlhkbtdp63bw4fizigq35uywmq
{
          ALTER TYPE sys_core::SysDataObjFieldListItems {
      DROP LINK props;
  };
};
