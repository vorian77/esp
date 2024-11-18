CREATE MIGRATION m1sht5m4wgnwp4mgaugea64uotn5g25r3esc7ivjta5wobzbzuxbna
    ONTO m12lpwmy74nqtcmi4um3xgeu5cc2j7uyav5d3tagb73ifx5dgefhbq
{
  ALTER TYPE app_cm::CmCsfMsg {
      ALTER LINK sender {
          SET TYPE sys_user::SysStaff USING (.sender[IS sys_user::SysStaff]);
      };
  };
};
