CREATE MIGRATION m1yvmmihhbmvplvmsjbtqktqpm5hk6wl4yxi2244ww5wii5r3uazxa
    ONTO m1u5spxw4nuwrpmv2qd7p3gyxpzfhv6ehap5qozvuxokx5cfb2olra
{
              ALTER TYPE sys_user::Mgmt {
      ALTER LINK createdBy {
          RENAME TO createdByOld;
      };
  };
  ALTER TYPE sys_user::Mgmt {
      ALTER LINK modifiedBy {
          RENAME TO modifiedByOld;
      };
  };
};
