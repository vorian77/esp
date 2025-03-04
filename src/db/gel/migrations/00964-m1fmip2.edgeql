CREATE MIGRATION m1fmip2tkxt2n5lyr22if6lvwsaaxuragzmpgjv5h52xyy3elsnhva
    ONTO m1sg46ld2lq5xz74bbi2634tzrkp22lakide2pj74oe57eknydvhiq
{
  ALTER TYPE sys_core::SysNodeObj {
      ALTER LINK parent {
          ON TARGET DELETE DELETE SOURCE;
      };
  };
};
