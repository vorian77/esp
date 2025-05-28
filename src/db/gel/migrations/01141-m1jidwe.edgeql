CREATE MIGRATION m1jidwelcldutadgcosjr3gxeb4ih5df5me55xe4tvjt3sbsrizsna
    ONTO m1v6geimpqu6yt365h7mlcwa3vequrcylyxp2v3zpro42vjbrwqbxa
{
  ALTER TYPE sys_core::SysObjAttr {
      DROP EXTENDING sys_core::SysObjAttrEnt;
      EXTENDING sys_core::SysObj LAST;
  };
  ALTER TYPE sys_core::SysObjAttrEnt {
      DROP EXTENDING sys_core::SysObj;
      EXTENDING sys_core::SysObjAttr LAST;
  };
};
