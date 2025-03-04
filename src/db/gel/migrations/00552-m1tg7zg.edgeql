CREATE MIGRATION m1tg7zg7ghury77jdmwlmsfy5nqga5ehppaz7qdqmfhh2wbgpcfeda
    ONTO m1w53hwzh4b4qwxudxtklb3vzorv3x754n4f2ihlfbrsp6zit7dsla
{
              ALTER TYPE sys_core::SysOrg {
      ALTER PROPERTY contactName {
          RENAME TO contactNameFirst;
      };
  };
};
