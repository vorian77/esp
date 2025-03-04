CREATE MIGRATION m1w53hwzh4b4qwxudxtklb3vzorv3x754n4f2ihlfbrsp6zit7dsla
    ONTO m1gsofbtj34omgjz2nvww6dkpz6rmfabeafpgs5ewz33fp4pxlplzq
{
              ALTER TYPE app_cm::CmPartner {
      DROP EXTENDING sys_core::SysResource;
      EXTENDING sys_core::SysOrg LAST;
  };
};
