CREATE MIGRATION m1cailsklrkhlgpoyi3ptppzpvphjlhkbtdp63bw4fizigq35uywmq
    ONTO m1ct627bfbuv4de5zidvuv64rvwdcnxbjq7r7tlqcwxocacgnn3xbq
{
          ALTER TYPE sys_core::SysDataObjFieldListItems {
      CREATE MULTI LINK props: sys_core::SysDataObjFieldListItemsProp {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
