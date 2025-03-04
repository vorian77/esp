CREATE MIGRATION m1ixiy75qxu3nk5z3xp3ik2vg3fohie7sxvvwvmbrfktwwrhr6tbfq
    ONTO m1um3v3olwxsym6iaxxrkiajbmfg4byfl3xx6qzpzv3yjpbvf4ymtq
{
          ALTER TYPE sys_core::SysDataObjFieldListItems {
      DROP LINK props;
  };
  DROP TYPE sys_core::SysDataObjFieldListItemsProp;
};
