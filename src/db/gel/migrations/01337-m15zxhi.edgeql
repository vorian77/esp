CREATE MIGRATION m15zxhiqxonp7az3k4fhcmghotchphh3gmahbk6bvdascjbux6gbxq
    ONTO m1cbx6nezzmcoeersnd2cxjdt6op2rb7625ghbiki5a7xl3cibggta
{
  ALTER TYPE sys_core::SysObjOrg {
      ALTER LINK owner {
          RENAME TO ownerOrg;
      };
  };
};
