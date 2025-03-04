CREATE MIGRATION m1yo2iekalerramizessfg6o5bjzg7rljkpgk2r42veoiwn6qclcwa
    ONTO m1vb6sr4pyiijcses3sv6nmqdx45suybtcp35hq7yvmu3qbwpis4ya
{
              ALTER TYPE sys_core::SysOrg {
      CREATE MULTI LINK contacts: default::SysPerson;
  };
  ALTER TYPE sys_core::SysOrg {
      DROP PROPERTY contactEmail;
  };
  ALTER TYPE sys_core::SysOrg {
      DROP PROPERTY contactNameFirst;
  };
  ALTER TYPE sys_core::SysOrg {
      DROP PROPERTY contactNameLast;
  };
  ALTER TYPE sys_core::SysOrg {
      DROP PROPERTY contactPhone;
  };
};
