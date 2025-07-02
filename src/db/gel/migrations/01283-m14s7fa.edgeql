CREATE MIGRATION m14s7fasmt5fzdhzv5fccgv4cxnetzmuotfej2l3mdngduu7ak3i4q
    ONTO m1yab32umdiwypxgipwfhz7rhvnpqx3veq35b2valsox2ftauw3ozq
{
  ALTER TYPE sys_core::SysObjOrg {
      DROP CONSTRAINT std::exclusive ON ((.owner, .name));
      ALTER LINK owner {
          RESET OPTIONALITY;
      };
  };
};
