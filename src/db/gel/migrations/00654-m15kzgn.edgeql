CREATE MIGRATION m15kzgnio42yxvumor5fbfg3nzbhhzdyry4dgw5qyphskfqyvxveva
    ONTO m1w3i7low3hxfjqwoo4chrzk72azng7pv6earhdtrub22qqyq6hezq
{
              ALTER TYPE sys_core::SysNote {
      DROP EXTENDING app_cm::CmCsfData;
      EXTENDING sys_user::Mgmt LAST;
      ALTER LINK owner {
          SET TYPE sys_core::SysObj USING (.owner[IS sys_core::SysObj]);
      };
  };
};
