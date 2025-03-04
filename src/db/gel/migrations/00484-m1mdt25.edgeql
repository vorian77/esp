CREATE MIGRATION m1mdt25qtxtuti34w3i4m35twowg3ipoul6i4wia2d6hhqqlyjdmea
    ONTO m1awwpymm7pxnk4lymi6hczpv6ijhojfwwlyaepu6dhsadcizbqpbq
{
              ALTER TYPE sys_core::SysDataObj {
      CREATE PROPERTY isAlwaysRetrieveDataObject: std::bool;
  };
};
