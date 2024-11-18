CREATE MIGRATION m1p55wdwbdtd67euvsuvctvf3csdmjuxcfgiedylvd6rqxesmcoogq
    ONTO m1nwm6w6uowkgs26ebavdelao4mhybuualvaarbgh45lfyzh3xfs4q
{
  ALTER TYPE sys_rep::SysRepEl {
      CREATE PROPERTY isExcludeDisplayAlt: std::bool;
  };
};
