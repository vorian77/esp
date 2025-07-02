CREATE MIGRATION m1eeqltcpxx723eo5dyepskamre5xf4ucd5ei4ht332v2fa2okicda
    ONTO m1yy7ptjmz2sgnwglesrqw6khmzgjpy6tzifxlcukce2s77n2slk5a
{
  ALTER TYPE sys_core::SysObjOrg {
      CREATE LINK owner: sys_core::SysOrg;
  };
};
