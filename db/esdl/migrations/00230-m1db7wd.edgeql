CREATE MIGRATION m1db7wdhxi6plghr6gqog6fwqslmw6ow5ggnns6pyjjvcvy2g57oga
    ONTO m1pn4jkouzuzuewdwg435hgsoi3trogacjrcb4ak6y7gy5wfply6ia
{
  ALTER TYPE sys_core::SysDataObjActionGroup RENAME TO sys_core::SysDataObjActionFieldGroup;
};
