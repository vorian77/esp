CREATE MIGRATION m1yttvwphqkn52kpgd2tvxvv54so732b65kigdsyisv4lkrsex6qwa
    ONTO m1yo2iekalerramizessfg6o5bjzg7rljkpgk2r42veoiwn6qclcwa
{
  ALTER TYPE sys_core::SysOrg {
      ALTER LINK contacts {
          ON TARGET DELETE ALLOW;
      };
  };
};
