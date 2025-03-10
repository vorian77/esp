CREATE MIGRATION m1rplzk752ijt6j662ypees6hrgh6ft2ugyhky3zlno437pe6b4i4a
    ONTO m16zjr4dbrwt6umj5l7gdsg5y6dblnkzor2cri36hav72mzra4pmtq
{
  ALTER TYPE app_cm::CmClientServiceFlow {
      CREATE LINK objAttrSite: sys_core::SysObjEntAttr;
  };
};
