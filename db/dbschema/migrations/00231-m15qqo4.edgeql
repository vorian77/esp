CREATE MIGRATION m15qqo4ik6nyi3pfwbnbixpzmlskxtwdvsvuj2fp4hd4tovmgw6uba
    ONTO m1db7wdhxi6plghr6gqog6fwqslmw6ow5ggnns6pyjjvcvy2g57oga
{
  ALTER TYPE sys_core::SysDataObjAction RENAME TO sys_core::SysDataObjActionField;
};
