CREATE MIGRATION m1um3v3olwxsym6iaxxrkiajbmfg4byfl3xx6qzpzv3yjpbvf4ymtq
    ONTO m1sk53eoi3jfdnfeqrhi47nd7odqxepfk5fedfmdjho2277uvlaqoa
{
          ALTER TYPE sys_core::SysDataObjFieldListItems {
      ALTER LINK props {
          RESET ON SOURCE DELETE;
          RESET ON TARGET DELETE;
      };
  };
};
