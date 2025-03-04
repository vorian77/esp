CREATE MIGRATION m1mlc4zrncued7vdjrxdqknqunrt5xptd4tdjd6fz53jbk2e5ioz7a
    ONTO m1rpzoerkxjii3pgq53pbvqcz4hlotjqjs4wjljisanrlfic2euota
{
          ALTER TYPE sys_core::ObjRoot {
      CREATE LINK codeIcon: sys_core::SysCode;
  };
};
