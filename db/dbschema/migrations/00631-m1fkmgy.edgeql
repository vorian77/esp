CREATE MIGRATION m1fkmgyv6v5aqnw4e325jqufw7a4balrf422jtniw42peekkcyliua
    ONTO m1s26kmxoc7ukdlhv6j7gisqtnfnfv3v7nuity53v5vjv2otqiqwqa
{
  ALTER TYPE sys_core::SysCode {
      CREATE LINK owner: sys_core::ObjRoot;
  };
  ALTER TYPE sys_core::SysCode {
      DROP LINK ownerOld;
  };
};
