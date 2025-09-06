CREATE MIGRATION m1flxvnkw7l7g43rndlka2a3toqdyrs6y6gx4crtlrrxbuvz2dz7za
    ONTO m1w6z47vkkejxlgrkqamip7drv6kp6hrcnlemk54w75zg6t4jo52da
{
  ALTER TYPE app_crm::CrmSuggestion DROP EXTENDING sys_core::ObjRootCore;
};
